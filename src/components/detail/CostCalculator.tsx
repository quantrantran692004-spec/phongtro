import React, { useState } from 'react';
import { Calculator, Zap, Droplet, Wifi, Shield, Users, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { RoomCost } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface CostCalculatorProps {
  costs: RoomCost;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ costs }) => {
  const [estimatedKwh, setEstimatedKwh] = useState(120);
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

  const utilitiesTotal = electricityTotal + waterTotal + internet + parking + service;
  const monthlyRecurring = rent + utilitiesTotal;
  const firstMonthTotal = deposit + monthlyRecurring;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] space-y-6">
      
      {/* Header with Toss Fintech Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-700 flex items-center justify-center font-bold shadow-xs">
            <Calculator className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Dự Toán Chi Phí Thực Tế Mỗi Tháng
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Mô phỏng ngân sách sinh hoạt thực tế theo số người & mức điện nước sử dụng
            </p>
          </div>
        </div>

        {/* Toss "Cam kết không phí ẩn" Badge */}
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs self-start sm:self-center">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cam kết không phí ẩn</span>
        </span>
      </div>

      {/* Interactive Controls (Toss Style Sliders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/90 p-5 sm:p-6 rounded-2xl border border-slate-200/70">
        
        {/* Slider 1: People Count */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Số người cùng ở:</span>
            </span>
            <span className="text-sm font-extrabold text-teal-800 bg-white px-3 py-1 rounded-full border border-teal-200/80 shadow-2xs">
              {peopleCount} người
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-0.5">
            <span>1 người</span>
            <span>2 người</span>
            <span>3 người</span>
            <span>4 người</span>
          </div>
        </div>

        {/* Slider 2: Electricity Usage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Ước tính số điện / tháng:</span>
            </span>
            <span className="text-sm font-extrabold text-amber-700 bg-white px-3 py-1 rounded-full border border-amber-200 shadow-2xs">
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
          <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-0.5">
            <span>Tiết kiệm (30)</span>
            <span>Trung bình (120)</span>
            <span>Cao (300)</span>
          </div>
        </div>

      </div>

      {/* Breakdown: Base Rent + Utilities = True Monthly Cost */}
      <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Chi tiết cấu thành chi phí (VNĐ / Tháng)
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-600 font-medium">Tiền thuê phòng gốc:</span>
          <span className="font-extrabold text-slate-900">{formatCurrency(rent)}</span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-600 font-medium flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Tiền điện ({costs.electricity}đ × {estimatedKwh} kWh):</span>
          </span>
          <span className="font-bold text-slate-800">{formatCurrency(electricityTotal)}</span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-600 font-medium flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-blue-500" />
            <span>Tiền nước sinh hoạt ({peopleCount} người):</span>
          </span>
          <span className="font-bold text-slate-800">{formatCurrency(waterTotal)}</span>
        </div>

        {(internet > 0 || parking > 0 || service > 0) && (
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-600 font-medium flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-slate-400" />
              <span>Mạng Wifi & Phí dịch vụ:</span>
            </span>
            <span className="font-bold text-slate-800">{formatCurrency(internet + parking + service)}</span>
          </div>
        )}

        {/* Total Highlight Card */}
        <div className="pt-4 mt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-teal-50/60 p-4 rounded-xl border border-teal-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Tổng chi phí thực tế hàng tháng
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-800 tabular-nums">
              {formatCurrency(monthlyRecurring)}
              <span className="text-xs font-semibold text-teal-700 ml-1.5 font-sans">
                (~{formatCurrency(Math.round(monthlyRecurring / peopleCount))}/người)
              </span>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-[11px] text-slate-500 block">Tháng đầu tiên (kèm cọc):</span>
            <span className="text-sm font-extrabold text-slate-900 tabular-nums">
              {formatCurrency(firstMonthTotal)}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
