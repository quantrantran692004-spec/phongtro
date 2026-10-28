import React, { useState } from 'react';
import { Calculator, Zap, Droplet, Wifi, Shield, Users, Sparkles } from 'lucide-react';
import { RoomCost } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface CostCalculatorProps {
  costs: RoomCost;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ costs }) => {
  const [estimatedKwh, setEstimatedKwh] = useState(100);
  const [peopleCount, setPeopleCount] = useState(2);

  const rent = costs.rent;
  const deposit = costs.deposit;
  const electricityTotal = costs.electricityType === 'counter' ? estimatedKwh * costs.electricity : costs.electricity;
  const waterTotal = costs.waterType === 'person' 
    ? peopleCount * costs.water 
    : costs.waterType === 'counter' 
    ? 4 * costs.water 
    : costs.water;
  const internet = costs.internet;
  const parking = costs.parking;
  const service = costs.serviceFee || 0;

  const monthlyRecurring = rent + electricityTotal + waterTotal + internet + parking + service;
  const firstMonthTotal = deposit + monthlyRecurring;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold shadow-xs">
            <Calculator className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Dự Toán Chi Phí Thực Tế
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <Sparkles className="w-2.5 h-2.5" />
                Minh bạch 100%
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Mô phỏng ngân sách sinh hoạt thực tế, không chi phí ẩn
            </p>
          </div>
        </div>

        <span className="self-start sm:self-center text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          Chế độ Toss Interactive
        </span>
      </div>

      {/* Interactive Controls (Toss Style Sliders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Số người cùng ở:</span>
            </span>
            <span className="text-sm font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              {peopleCount} người
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
            <span>1 người</span>
            <span>2 người</span>
            <span>3 người</span>
            <span>4 người</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Ước tính số điện / tháng:</span>
            </span>
            <span className="text-sm font-bold text-amber-600 bg-white px-2.5 py-0.5 rounded-full border border-amber-200 shadow-2xs">
              {estimatedKwh} kWh
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="300"
            step="10"
            value={estimatedKwh}
            onChange={(e) => setEstimatedKwh(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
            <span>30 kWh (Ít)</span>
            <span>150 kWh (TB)</span>
            <span>300 kWh (Cao)</span>
          </div>
        </div>
      </div>

      {/* Itemized Breakdown Rows */}
      <div className="space-y-2.5 text-xs text-slate-600">
        <div className="flex items-center justify-between py-2 border-b border-dashed border-slate-200">
          <span className="font-medium text-slate-700">Tiền phòng cơ bản:</span>
          <span className="font-bold text-slate-900 text-sm">{formatCurrency(costs.rent)}/tháng</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Tiền đặt cọc (hoàn lại khi kết thúc hợp đồng):</span>
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(costs.deposit)}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Tiền điện ({costs.electricity}đ × {estimatedKwh} kWh):</span>
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(electricityTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Droplet className="w-3.5 h-3.5 text-blue-500" />
            <span>Tiền nước:</span>
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(waterTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mạng Internet / Wifi:</span>
          </span>
          <span className="font-semibold text-slate-900">
            {costs.internet > 0 ? `${formatCurrency(costs.internet)}` : 'Miễn phí'}
          </span>
        </div>
      </div>

      {/* Summary KPI Cards (Toss Visual Financial Deck) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,23,42,0.15)] flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
              Chi Phí Sinh Hoạt Hàng Tháng
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              ~{formatCurrency(monthlyRecurring)}
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2 font-medium">
            Chia đều: <strong className="text-amber-300">~{formatCurrency(Math.round(monthlyRecurring / peopleCount))}</strong> / người
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-200/80 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
              Tổng Chuẩn Bị Tháng Đầu Tiên
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              ~{formatCurrency(firstMonthTotal)}
            </div>
          </div>
          <p className="text-xs text-amber-900/80 mt-2 font-medium">
            (Bao gồm 1 tháng cọc hoàn lại + tiền phòng tháng đầu)
          </p>
        </div>
      </div>
    </div>
  );
};
