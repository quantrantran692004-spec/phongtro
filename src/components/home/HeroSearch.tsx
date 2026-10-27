import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home as HomeIcon, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    <div className="relative overflow-hidden bg-gradient-to-b from-tea-50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-sm border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Nền tảng tìm phòng trọ thông minh số 1 tại Thái Nguyên</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.18] mb-4">
            Tìm phòng trọ Thái Nguyên{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
              chuẩn giá, uy tín
            </span>{' '}
            và an tâm ở
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Kết nối trực tiếp với hơn 450+ chủ trọ chính chủ tại các làng đại học Tân Thịnh, Quang Trung, Z115 và KCN Samsung Phổ Yên.
          </p>
        </div>

        {/* Search Box Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-card border border-slate-200 p-3 sm:p-5">
          {/* Quick Room Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-slate-100 text-xs sm:text-sm font-semibold">
            {[
              { id: 'all', label: 'Tất cả loại phòng' },
              { id: 'single', label: 'Phòng đơn khép kín' },
              { id: 'studio', label: 'Studio cao cấp' },
              { id: 'mini_apartment', label: 'Chung cư mini' },
              { id: 'whole_house', label: 'Nhà nguyên căn' },
              { id: 'dormitory', label: 'Ký túc xá / Box' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoomType(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition ${
                  roomType === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Keyword Input */}
            <div className="sm:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Từ khóa / Đường / Trường ĐH
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="VD: Y Dược, Z115, Tân Thịnh..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Ward Select */}
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Khu vực Phường / Xã
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition appearance-none cursor-pointer"
                >
                  {wards.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Khoảng giá mong muốn
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={priceTier}
                  onChange={(e) => setPriceTier(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition appearance-none cursor-pointer"
                >
                  <option value="all">Tất cả mức giá</option>
                  <option value="under_1_5m">Dưới 1.5 triệu/tháng</option>
                  <option value="1_5m_2_5m">Từ 1.5 - 2.5 triệu/tháng</option>
                  <option value="above_2_5m">Trên 2.5 triệu/tháng</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 sm:self-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition"
              >
                <span>Tìm kiếm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges Counter */}
        <div className="mt-8 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>450+</strong> phòng trọ có sẵn</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>8+</strong> Trường ĐH & KCN Thái Nguyên</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>100%</strong> Đã xác minh thực địa</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Miễn phí liên hệ chủ nhà</span>
          </div>
        </div>
      </div>
    </div>
  );
};
