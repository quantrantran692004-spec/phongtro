import React, { useState } from 'react';
import { Calculator, Zap, Droplet, Wifi, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';
import { RoomCost } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface CostCalculatorProps {
  costs: RoomCost;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ costs }) => {
  const [estimatedKwh, setEstimatedKwh] = useState(100); // 100 kWh/tháng cho phòng có điều hòa
  const [peopleCount, setPeopleCount] = useState(2);     // 2 người

  // Calculations
  const rent = costs.rent;
  const deposit = costs.deposit;
  const electricityTotal = costs.electricityType === 'counter' ? estimatedKwh * costs.electricity : costs.electricity;
  const waterTotal = costs.waterType === 'person' 
    ? peopleCount * costs.water 
    : costs.waterType === 'counter' 
    ? 4 * costs.water // est 4 khối
    : costs.water;
  const internet = costs.internet;
  const parking = costs.parking;
  const service = costs.serviceFee || 0;

  // Monthly Recurring Cost
  const monthlyRecurring = rent + electricityTotal + waterTotal + internet + parking + service;

  // First Month Move-in Total (Rent + Deposit + First Month Services)
  const firstMonthTotal = deposit + monthlyRecurring;

  return (
    <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 rounded-2xl border border-emerald-200/80 p-5 sm:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-200/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Bảng dự toán chi phí minh bạch</h3>
            <p className="text-xs text-slate-500">Ước tính thực tế không lo phát sinh phụ phí</p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
          Dễ dàng tính toán
        </span>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 bg-white/80 p-3.5 rounded-xl border border-emerald-100">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Số người ở cùng:</span>
            <span className="font-bold text-emerald-700">{peopleCount} người</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Ước tính điện/tháng:</span>
            <span className="font-bold text-amber-700">{estimatedKwh} kWh</span>
          </div>
          <input
            type="range"
            min="30"
            max="300"
            step="10"
            value={estimatedKwh}
            onChange={(e) => setEstimatedKwh(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Cost Breakdown Items */}
      <div className="space-y-2 text-xs sm:text-sm text-slate-700 mb-5">
        <div className="flex items-center justify-between py-1 border-b border-dashed border-slate-200">
          <span className="text-slate-600">Tiền thuê phòng:</span>
          <span className="font-bold text-slate-900">{formatCurrency(costs.rent)}/tháng</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1 text-slate-600">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tiền đặt cọc phòng (hoàn lại khi trả):</span>
          </span>
          <span className="font-bold text-slate-900">{formatCurrency(costs.deposit)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1 text-slate-600">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Tiền điện ({costs.electricity}đ/kWh × {estimatedKwh} số):</span>
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(electricityTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1 text-slate-600">
            <Droplet className="w-3.5 h-3.5 text-blue-500" />
            <span>Tiền nước ({costs.waterType === 'person' ? `${costs.water}đ/người` : `${costs.water}đ/khối`}):</span>
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(waterTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-slate-200">
          <span className="flex items-center gap-1 text-slate-600">
            <Wifi className="w-3.5 h-3.5 text-teal-600" />
            <span>Mạng Internet / Wifi:</span>
          </span>
          <span className="font-semibold text-slate-900">
            {costs.internet > 0 ? `${formatCurrency(costs.internet)}/phòng` : 'Miễn phí'}
          </span>
        </div>

        {costs.parking > 0 && (
          <div className="flex items-center justify-between py-1 border-b border-dashed border-slate-200">
            <span className="text-slate-600">Phí gửi xe:</span>
            <span className="font-semibold text-slate-900">{formatCurrency(costs.parking)}/xe</span>
          </div>
        )}
      </div>

      {/* Summary Highlight Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 border border-emerald-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Chi phí cố định hàng tháng
          </div>
          <div className="text-lg font-black text-emerald-700 mt-0.5">
            ~{formatCurrency(monthlyRecurring)}
          </div>
          <p className="text-[11px] text-slate-400">
            (~{formatCurrency(Math.round(monthlyRecurring / peopleCount))}/người)
          </p>
        </div>

        <div className="bg-white rounded-xl p-3 border border-amber-300 shadow-2xs">
          <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Tổng tiền chuẩn bị tháng đầu
          </div>
          <div className="text-lg font-black text-amber-600 mt-0.5">
            ~{formatCurrency(firstMonthTotal)}
          </div>
          <p className="text-[11px] text-slate-500">
            (Đã bao gồm 1 tháng cọc + tháng đầu)
          </p>
        </div>
      </div>
    </div>
  );
};
