import React, { useState } from 'react';
import { Search, MapPin, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WARDS_BY_DISTRICT } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';

interface HeroSearchProps {
  onSearchSubmit: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearchSubmit }) => {
  const { filters, updateFilters } = useRooms();
  const [keyword, setKeyword] = useState(filters.keyword);
  const [ward, setWard] = useState(filters.ward);
  const [roomType, setRoomType] = useState(filters.roomType);
  const [priceTier, setPriceTier] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let minPrice = 0;
    let maxPrice = 10000000;

    if (priceTier === 'under_1_5m') {
      maxPrice = 1500000;
    } else if (priceTier === '1_5m_2_5m') {
      minPrice = 1500000;
      maxPrice = 2500000;
    } else if (priceTier === 'above_2_5m') {
      minPrice = 2500000;
    }

    updateFilters({
      keyword,
      ward: ward === 'Tất cả' ? '' : ward,
      roomType,
      minPrice,
      maxPrice,
    });
    onSearchSubmit();
  };

  const wards = WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/40 via-white to-stone-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200/70">
      {/* Subtle organic light behind */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-clay-200/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-semibold px-3 py-1 rounded-full mb-3.5 shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
            <span>Nền tảng phòng trọ chính chủ cho sinh viên & người đi làm</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.18] mb-3.5">
            Tìm phòng trọ Thái Nguyên{' '}
            <span className="text-brand-600 underline decoration-brand-200 underline-offset-4">
              chuẩn giá & minh bạch
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto leading-relaxed">
            Hơn 450+ phòng trọ khảo sát thực tế tại các làng ĐH Tân Thịnh, Quang Trung, Z115 và KCN Samsung Phổ Yên.
          </p>
        </div>

        {/* Integrated Floating Search Console */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-card border border-stone-200/80 p-2 sm:p-4">
          {/* Segmented Room Type Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2.5 mb-2.5 border-b border-stone-100 text-xs font-semibold px-2">
            {[
              { id: 'all', label: 'Tất cả loại phòng' },
              { id: 'single', label: 'Phòng đơn khép kín' },
              { id: 'studio', label: 'Studio tiện nghi' },
              { id: 'mini_apartment', label: 'Chung cư mini' },
              { id: 'whole_house', label: 'Nhà nguyên căn' },
              { id: 'dormitory', label: 'Ký túc xá / Box' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoomType(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  roomType === tab.id
                    ? 'bg-brand-600 text-white font-bold shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0 items-center bg-stone-50/80 sm:bg-white rounded-2xl p-2 sm:p-0">
            {/* Field 1: Keyword */}
            <div className="sm:col-span-4 p-2 sm:px-4 sm:py-2.5 sm:border-r sm:border-stone-200">
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                Địa điểm / Trường ĐH
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-0 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Y Dược, Sư Phạm, Z115..."
                  className="w-full pl-6 pr-2 py-1 bg-transparent text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Field 2: Ward */}
            <div className="sm:col-span-3 p-2 sm:px-4 sm:py-2.5 sm:border-r sm:border-stone-200">
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                Khu vực Phường / Xã
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full pl-5 pr-4 py-1 bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer truncate"
                >
                  {wards.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 3: Price */}
            <div className="sm:col-span-3 p-2 sm:px-4 sm:py-2.5">
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                Khoảng giá
              </label>
              <div className="relative">
                <DollarSign className="w-3.5 h-3.5 text-stone-400 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={priceTier}
                  onChange={(e) => setPriceTier(e.target.value)}
                  className="w-full pl-5 pr-4 py-1 bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer truncate"
                >
                  <option value="all">Tất cả mức giá</option>
                  <option value="under_1_5m">Dưới 1.5 tr/tháng</option>
                  <option value="1_5m_2_5m">1.5 - 2.5 tr/tháng</option>
                  <option value="above_2_5m">Trên 2.5 tr/tháng</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 p-1">
              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-subtle hover:shadow transition flex items-center justify-center gap-1.5"
              >
                <span>Tìm phòng</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Minimalist Trust Indicator Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
            <span>450+ phòng có sẵn tại Thái Nguyên</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
            <span>Bán kính 8 trường ĐH & KCN</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
            <span>100% khảo sát chính chủ</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
            <span>Không thu phí sinh viên</span>
          </div>
        </div>
      </div>
    </div>
  );
};
