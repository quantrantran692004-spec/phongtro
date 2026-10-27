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
    <div className="bg-white rounded-md border border-[#E6E4DE] p-5 sm:p-6 shadow-whisper">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E6E4DE]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#23483D] text-white flex items-center justify-center shadow-whisper">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-charcoal-900">Bảng Dự Toán Chi Phí Minh Bạch</h3>
            <p className="text-[11px] text-charcoal-500 font-normal">Ước tính thực tế trước khi thuê, hoàn toàn không phát sinh chi phí ẩn</p>
          </div>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-900 bg-[#F7F6F2] border border-[#E6E4DE] px-2.5 py-0.5 rounded-sm">
          Tùy chỉnh số người
        </span>
      </div>

      {/* Slider Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-[#F7F6F2] p-4 rounded-sm border border-[#E6E4DE]">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-charcoal-800 mb-1.5">
            <span>Số người ở cùng:</span>
            <span className="font-bold text-brand-800">{peopleCount} người</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-[#23483D] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-charcoal-800 mb-1.5">
            <span>Ước tính số điện/tháng:</span>
            <span className="font-bold text-amber-800">{estimatedKwh} kWh</span>
          </div>
          <input
            type="range"
            min="30"
            max="300"
            step="10"
            value={estimatedKwh}
            onChange={(e) => setEstimatedKwh(Number(e.target.value))}
            className="w-full accent-[#23483D] cursor-pointer"
          />
        </div>
      </div>

      {/* Detailed Lines */}
      <div className="space-y-2 text-xs text-charcoal-700 mb-5">
        <div className="flex items-center justify-between py-1 border-b border-dashed border-[#E6E4DE]">
          <span className="text-charcoal-600 font-medium">Tiền phòng cơ bản:</span>
          <span className="font-bold text-charcoal-900">{formatCurrency(costs.rent)}/tháng</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-[#E6E4DE]">
          <span className="flex items-center gap-1.5 text-charcoal-600 font-medium">
            <Shield className="w-3.5 h-3.5 text-brand-700" />
            <span>Tiền đặt cọc (hoàn lại khi thanh lý hợp đồng):</span>
          </span>
          <span className="font-bold text-charcoal-900">{formatCurrency(costs.deposit)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-[#E6E4DE]">
          <span className="flex items-center gap-1.5 text-charcoal-600 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-700" />
            <span>Tiền điện ({costs.electricity}đ × {estimatedKwh} kWh):</span>
          </span>
          <span className="font-bold text-charcoal-900">{formatCurrency(electricityTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-[#E6E4DE]">
          <span className="flex items-center gap-1.5 text-charcoal-600 font-medium">
            <Droplet className="w-3.5 h-3.5 text-blue-700" />
            <span>Tiền nước:</span>
          </span>
          <span className="font-bold text-charcoal-900">{formatCurrency(waterTotal)}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-dashed border-[#E6E4DE]">
          <span className="flex items-center gap-1.5 text-charcoal-600 font-medium">
            <Wifi className="w-3.5 h-3.5 text-brand-700" />
            <span>Mạng Internet / Wifi:</span>
          </span>
          <span className="font-bold text-charcoal-900">
            {costs.internet > 0 ? `${formatCurrency(costs.internet)}` : 'Miễn phí'}
          </span>
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="bg-[#F7F6F2] rounded-sm p-3.5 border border-[#E6E4DE] shadow-whisper">
          <div className="text-[10px] font-mono font-bold text-charcoal-500 uppercase tracking-wider">
            Chi phí cố định hàng tháng
          </div>
          <div className="text-lg font-display font-extrabold text-brand-800 mt-0.5">
            ~{formatCurrency(monthlyRecurring)}
          </div>
          <p className="text-[11px] text-charcoal-500 font-medium">
            (~{formatCurrency(Math.round(monthlyRecurring / peopleCount))}/người)
          </p>
        </div>

        <div className="bg-white rounded-sm p-3.5 border border-[#E6E4DE] shadow-whisper">
          <div className="text-[10px] font-mono font-bold text-charcoal-700 uppercase tracking-wider">
            Tổng tiền chuẩn bị tháng đầu
          </div>
          <div className="text-lg font-display font-extrabold text-charcoal-900 mt-0.5">
            ~{formatCurrency(firstMonthTotal)}
          </div>
          <p className="text-[11px] text-charcoal-500 font-medium">
            (Đã bao gồm 1 tháng cọc + tháng đầu)
          </p>
        </div>
      </div>
    </div>
  );
};