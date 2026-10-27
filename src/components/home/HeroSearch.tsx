import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Home, 
  GraduationCap, 
  Building, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Receipt, 
  PhoneCall, 
  ArrowRight,
  Zap
} from 'lucide-react';
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'uni' | 'samsung' | 'cheap' | 'studio'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applySearchWithParams(keyword, ward, roomType, priceTier);
  };

  const applySearchWithParams = (k: string, w: string, rt: string, pt: string) => {
    let minPrice = 0;
    let maxPrice = 10000000;

    if (pt === 'under_1_5m') {
      maxPrice = 1500000;
    } else if (pt === '1_5m_2_5m') {
      minPrice = 1500000;
      maxPrice = 2500000;
    } else if (pt === 'above_2_5m') {
      minPrice = 2500000;
    }

    updateFilters({
      keyword: k,
      ward: w === 'Tất cả' ? '' : w,
      roomType: rt,
      minPrice,
      maxPrice,
    });
    onSearchSubmit();
  };

  const handleQuickTagClick = (tagKeyword: string, tagWard?: string, tagRoomType?: string, tagPrice?: string) => {
    setKeyword(tagKeyword);
    if (tagWard !== undefined) setWard(tagWard);
    if (tagRoomType !== undefined) setRoomType(tagRoomType);
    if (tagPrice !== undefined) setPriceTier(tagPrice);
    
    applySearchWithParams(
      tagKeyword, 
      tagWard !== undefined ? tagWard : ward, 
      tagRoomType !== undefined ? tagRoomType : roomType, 
      tagPrice !== undefined ? tagPrice : priceTier
    );
  };

  const handleCategoryTab = (cat: 'all' | 'uni' | 'samsung' | 'cheap' | 'studio') => {
    setActiveCategory(cat);
    if (cat === 'all') {
      setKeyword('');
      setWard('Tất cả');
      setRoomType('all');
      setPriceTier('all');
    } else if (cat === 'uni') {
      setKeyword('Đại học');
      setWard('P. Tân Thịnh');
      setRoomType('all');
    } else if (cat === 'samsung') {
      setKeyword('Samsung Phổ Yên');
      setWard('TX. Phổ Yên');
      setRoomType('all');
    } else if (cat === 'cheap') {
      setPriceTier('under_1_5m');
      setRoomType('single');
    } else if (cat === 'studio') {
      setRoomType('studio');
      setPriceTier('1_5m_2_5m');
    }
  };

  const wards = WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-stone-50/80 pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-stone-200/80">
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Editorial Hero Typography */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200/90 text-brand-800 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 shadow-subtle hover:border-brand-300 transition">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <span>Nền tảng phòng trọ chính chủ số 1 Thái Nguyên</span>
            <span className="text-stone-300">|</span>
            <span className="text-brand-600 font-bold">Xác thực 100%</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.18] mb-4">
            Tìm phòng trọ Thái Nguyên{' '}
            <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 bg-clip-text text-transparent">
              đúng giá thực tế
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Khảo sát thực tế hơn 450+ phòng trọ gần Đại học Thái Nguyên (Y Dược, Sư Phạm, Kỹ Thuật, CNTT...) và KCN Samsung Phổ Yên. Minh bạch 100% tiền điện nước, điều hòa và hợp đồng thuê.
          </p>
        </div>

        {/* Master Search Dock */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_16px_40px_-10px_rgba(27,79,58,0.08)] border border-stone-200/90 p-3 sm:p-5 transition-all">
          {/* Top Quick Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-stone-100 no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả phòng', icon: Home },
              { id: 'uni', label: 'Gần trường ĐH', icon: GraduationCap },
              { id: 'samsung', label: 'Gần KCN Samsung', icon: Building },
              { id: 'cheap', label: 'Giá rẻ (< 1.5 triệu)', icon: DollarSign },
              { id: 'studio', label: 'Studio & Căn hộ mini', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategoryTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 bg-stone-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Unified Search Input Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-2.5 items-center">
            {/* Input 1: Keyword */}
            <div className="md:col-span-4 bg-stone-50/80 hover:bg-stone-50 rounded-2xl p-2.5 px-3.5 border border-stone-200/70 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                Địa điểm / Trường học
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-600 shrink-0" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Y Dược, Sư Phạm, Tân Thịnh..."
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Input 2: Ward */}
            <div className="md:col-span-3 bg-stone-50/80 hover:bg-stone-50 rounded-2xl p-2.5 px-3.5 border border-stone-200/70 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                Khu vực Phường / Xã
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer truncate"
                >
                  <option value="Tất cả">Toàn Thái Nguyên</option>
                  {wards.filter(w => w !== 'Tất cả').map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input 3: Price Tier */}
            <div className="md:col-span-3 bg-stone-50/80 hover:bg-stone-50 rounded-2xl p-2.5 px-3.5 border border-stone-200/70 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                Khoảng giá thuê
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-brand-600 shrink-0" />
                <select
                  value={priceTier}
                  onChange={(e) => setPriceTier(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer truncate"
                >
                  <option value="all">Tất cả mức giá</option>
                  <option value="under_1_5m">Dưới 1.5 tr/tháng</option>
                  <option value="1_5m_2_5m">1.5 - 2.5 tr/tháng</option>
                  <option value="above_2_5m">Trên 2.5 tr/tháng</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-900/15 transition-all flex items-center justify-center gap-2"
              >
                <span>Tìm phòng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Filter Tags Row */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
            <span className="text-[11px] font-semibold text-stone-400 mr-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              Gợi ý nhanh:
            </span>

            {[
              { label: 'ĐH Y Dược', keyword: 'Y Dược', ward: 'P. Quang Trung' },
              { label: 'Làng SV Tân Thịnh', keyword: '', ward: 'P. Tân Thịnh' },
              { label: 'Đường Z115', keyword: 'Z115', ward: 'P. Quyết Thắng' },
              { label: 'Samsung Phổ Yên', keyword: 'Samsung', ward: 'TX. Phổ Yên' },
              { label: 'Phòng < 1.5 triệu', keyword: '', ward: 'Tất cả', price: 'under_1_5m' },
              { label: 'Chung cư mini', keyword: '', ward: 'Tất cả', roomType: 'mini_apartment' },
            ].map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickTagClick(tag.keyword, tag.ward, tag.roomType, tag.price)}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-brand-50 hover:text-brand-800 text-stone-600 text-[11px] font-medium transition border border-stone-200/60"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Architectural Trust Pillars */}
        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3.5 border border-stone-200/70 shadow-subtle flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">450+ Khảo sát thực tế</div>
              <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">Ảnh thật 100%, có tọa độ bản đồ cụ thể</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3.5 border border-stone-200/70 shadow-subtle flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Minh bạch điện nước</div>
              <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">Rõ ràng theo công tơ, không phí ẩn</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3.5 border border-stone-200/70 shadow-subtle flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">0đ Phí môi giới</div>
              <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">Liên hệ trực tiếp chủ trọ qua Zalo/SĐT</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3.5 border border-stone-200/70 shadow-subtle flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Hợp đồng mẫu chuẩn</div>
              <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">Bảo vệ quyền lợi cọc & sinh viên</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
