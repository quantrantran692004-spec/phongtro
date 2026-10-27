import React, { useState } from 'react';
import { Calculator, Zap, Droplet, Wifi, Shield } from 'lucide-react';
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
    <div className="bg-gradient-to-br from-brand-50/60 to-stone-50 rounded-2xl border border-brand-200/70 p-5 sm:p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-200/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-stone-900">Bảng dự toán chi phí minh bạch</h3>
            <p className="text-[11px] text-stone-500">Ước tính thực tế trước khi thuê, tránh chi phí phát sinh</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-brand-800 bg-brand-100/70 px-2 py-0.5 rounded-md">
          Tùy chỉnh số người
        </span>
      </div>

      {/* Slider Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-white/90 p-3.5 rounded-xl border border-stone-200/70">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1">
            <span>Số người ở cùng:</span>
            <span className="font-bold text-brand-700">{peopleCount} người</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1">
            <span>Ước tính số điện/tháng:</span>
            <span className="font-bold text-clay-700">{estimatedKwh} kWh</span>
          </div>
          <input
            type="range"
            min="30"
            max="300"
            step="10"
            value={estimatedKwh}
            onChange={(e) => setEstimatedKwh(Number(e.target.value))}
            className="w-full accent-clay-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Detailed Lines */}
      <div className="space-y-1.5 text-xs text-stone-700 mb-4">
        <div className="flex items-center justify-between py-1 border-b border-dashed border-stone-200">
          <span className="text-stone-500">Tiền phòng:</span>
          <span className="font-bold text-stone-900">{formatCurrency(costs.rent)}/tháng</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-stone-200">
          <span className="flex items-center gap-1 text-stone-500">
            <Shield className="w-3.5 h-3.5 text-brand-600" />
            <span>Tiền đặt cọc (hoàn lại khi hết hạn hợp đồng):</span>
          </span>
          <span className="font-bold text-stone-900">{formatCurrency(costs.deposit)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-stone-200">
          <span className="flex items-center gap-1 text-stone-500">
            <Zap className="w-3.5 h-3.5 text-clay-500" />
            <span>Tiền điện ({costs.electricity}đ × {estimatedKwh} kWh):</span>
          </span>
          <span className="font-medium text-stone-900">{formatCurrency(electricityTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-stone-200">
          <span className="flex items-center gap-1 text-stone-500">
            <Droplet className="w-3.5 h-3.5 text-blue-500" />
            <span>Tiền nước:</span>
          </span>
          <span className="font-medium text-stone-900">{formatCurrency(waterTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-stone-200">
          <span className="flex items-center gap-1 text-stone-500">
            <Wifi className="w-3.5 h-3.5 text-teal-600" />
            <span>Mạng Wifi:</span>
          </span>
          <span className="font-medium text-stone-900">
            {costs.internet > 0 ? `${formatCurrency(costs.internet)}` : 'Miễn phí'}
          </span>
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-subtle">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Chi phí cố định hàng tháng
          </div>
          <div className="text-base font-extrabold text-brand-700 mt-0.5">
            ~{formatCurrency(monthlyRecurring)}
          </div>
          <p className="text-[10px] text-stone-400">
            (~{formatCurrency(Math.round(monthlyRecurring / peopleCount))}/người)
          </p>
        </div>

        <div className="bg-white rounded-xl p-3 border border-clay-200 shadow-subtle">
          <div className="text-[10px] font-bold text-clay-800 uppercase tracking-wider">
            Tổng tiền chuẩn bị tháng đầu
          </div>
          <div className="text-base font-extrabold text-clay-600 mt-0.5">
            ~{formatCurrency(firstMonthTotal)}
          </div>
          <p className="text-[10px] text-stone-400">
            (Đã bao gồm 1 tháng cọc + tháng đầu)
          </p>
        </div>
      </div>
    </div>
  );
};
