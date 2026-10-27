import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Home, 
  GraduationCap, 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  Receipt, 
  PhoneCall, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import { WARDS_BY_DISTRICT, THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';

interface HeroSearchProps {
  onSearchSubmit: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearchSubmit }) => {
  const { filters, updateFilters, rooms } = useRooms();
  const [keyword, setKeyword] = useState(filters.keyword);
  const [ward, setWard] = useState(filters.ward);
  const [roomType, setRoomType] = useState(filters.roomType);
  const [priceTier, setPriceTier] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'uni' | 'samsung' | 'cheap' | 'studio'>('all');
  
  // Real-time suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
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
      setKeyword('Samsung');
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

  // Filter dynamic suggestions based on typed keyword
  const suggestions = React.useMemo(() => {
    const q = keyword.toLowerCase().trim();
    if (!q) return [];
    
    const uniMatches = THAI_NGUYEN_UNIVERSITIES
      .filter(u => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q))
      .map(u => ({ label: u.name, type: 'Trường học', ward: u.ward }));

    const wardMatches = (WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [])
      .filter(w => w !== 'Tất cả' && w.toLowerCase().includes(q))
      .map(w => ({ label: w, type: 'Phường/Xã', ward: w }));

    const roomMatches = rooms
      .filter(r => r.title.toLowerCase().includes(q))
      .slice(0, 3)
      .map(r => ({ label: r.title, type: 'Phòng trọ', ward: r.location.ward }));

    return [...uniMatches, ...wardMatches, ...roomMatches].slice(0, 6);
  }, [keyword, rooms]);

  const wards = WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [];

  return (
    <div className="relative bg-gradient-to-b from-emerald-50/50 via-white to-stone-50/70 pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-stone-200 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-10"
        >
          {/* Eyebrow Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-stone-300 text-stone-800 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-3 sm:mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Hệ thống phòng trọ chính chủ số 1 Thái Nguyên</span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700 font-bold">Xác thực 100%</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight sm:leading-tight mb-3">
            Tìm phòng trọ Thái Nguyên{' '}
            <span className="text-brand-700">đúng giá thực tế</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Hơn 450+ phòng trọ khảo sát thực tế gần Đại học Thái Nguyên (Y Dược, Sư Phạm, Kỹ Thuật, CNTT...) và KCN Samsung Phổ Yên. Minh bạch tiền điện nước, điều hòa và hợp đồng thuê.
          </p>
        </motion.div>

        {/* Master Search Dock with layout transition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-card border border-stone-200 p-3.5 sm:p-5"
        >
          {/* Top Categories Scroll Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-stone-100 no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả phòng', icon: Home },
              { id: 'uni', label: 'Gần các trường ĐH', icon: GraduationCap },
              { id: 'samsung', label: 'Gần KCN Samsung', icon: Building },
              { id: 'cheap', label: 'Giá rẻ (< 1.5 triệu)', icon: DollarSign },
              { id: 'studio', label: 'Studio tiện nghi', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategoryTab(tab.id as any)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 bg-stone-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Inputs: Responsive Form with Autocomplete */}
          <form onSubmit={handleSearch} className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2.5 items-center relative">
            {/* Field 1: Keyword with real-time suggestion dropdown */}
            <div 
              ref={suggestionRef} 
              className="sm:col-span-5 bg-stone-50 rounded-xl p-2.5 px-3.5 border border-stone-200 focus-within:border-brand-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition relative"
            >
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-0.5">
                Địa điểm / Tên trường ĐH
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-700 shrink-0" />
                <input
                  type="text"
                  value={keyword}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Y Dược, Sư Phạm, Tân Thịnh, Z115..."
                  className="w-full bg-transparent text-sm font-semibold text-stone-900 placeholder-stone-400 focus:outline-none"
                />
                {keyword && (
                  <button 
                    type="button" 
                    onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Dynamic Suggestion Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-elevated border border-stone-200 overflow-hidden z-30 max-h-60 overflow-y-auto"
                  >
                    <div className="p-1 space-y-0.5">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setKeyword(s.label);
                            if (s.ward) setWard(s.ward);
                            setShowSuggestions(false);
                            applySearchWithParams(s.label, s.ward || ward, roomType, priceTier);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-brand-50 flex items-center justify-between text-xs transition"
                        >
                          <div className="truncate mr-2">
                            <span className="font-bold text-stone-900">{s.label}</span>
                            {s.ward && <span className="text-stone-400 ml-1.5 font-normal">({s.ward})</span>}
                          </div>
                          <span className="text-[10px] bg-stone-100 text-stone-500 font-semibold px-1.5 py-0.5 rounded shrink-0">
                            {s.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 2 & 3: Ward and Price */}
            <div className="grid grid-cols-2 gap-2 sm:contents">
              {/* Field 2: Ward */}
              <div className="sm:col-span-3 bg-stone-50 rounded-xl p-2.5 px-3.5 border border-stone-200 focus-within:border-brand-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-0.5 truncate">
                  Khu vực Phường / Xã
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-700 shrink-0" />
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none cursor-pointer truncate"
                  >
                    <option value="Tất cả">Toàn Thái Nguyên</option>
                    {wards.filter(w => w !== 'Tất cả').map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 3: Price */}
              <div className="sm:col-span-2 bg-stone-50 rounded-xl p-2.5 px-3.5 border border-stone-200 focus-within:border-brand-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wide mb-0.5 truncate">
                  Khoảng giá
                </label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-700 shrink-0" />
                  <select
                    value={priceTier}
                    onChange={(e) => setPriceTier(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">Tất cả giá</option>
                    <option value="under_1_5m">&lt; 1.5 triệu</option>
                    <option value="1_5m_2_5m">1.5 - 2.5 triệu</option>
                    <option value="above_2_5m">&gt; 2.5 triệu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Field 4: Search Button */}
            <div className="sm:col-span-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 sm:py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <span>Tìm kiếm</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </form>

          {/* Quick Suggestion Pills */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-stone-500 whitespace-nowrap">
              Gợi ý nhanh:
            </span>

            {[
              { label: 'ĐH Y Dược', keyword: 'Y Dược', ward: 'P. Quang Trung' },
              { label: 'Làng ĐH Tân Thịnh', keyword: '', ward: 'P. Tân Thịnh' },
              { label: 'Đường Z115', keyword: 'Z115', ward: 'P. Quyết Thắng' },
              { label: 'Samsung Phổ Yên', keyword: 'Samsung', ward: 'TX. Phổ Yên' },
              { label: 'Phòng < 1.5tr', keyword: '', ward: 'Tất cả', price: 'under_1_5m' },
              { label: 'Chung cư mini', keyword: '', ward: 'Tất cả', roomType: 'mini_apartment' },
            ].map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickTagClick(tag.keyword, tag.ward, tag.roomType, tag.price)}
                className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-brand-50 hover:text-brand-900 text-stone-700 text-xs font-semibold whitespace-nowrap transition border border-stone-200"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4 Trust Highlights: Clean & Balanced on both Mobile and Desktop */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-stone-200 shadow-xs flex items-center gap-2.5 hover:border-emerald-500 transition">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">450+ Khảo sát</div>
              <div className="text-[11px] text-stone-500 font-medium">Ảnh chụp thực tế 100%</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-stone-200 shadow-xs flex items-center gap-2.5 hover:border-amber-500 transition">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Minh bạch điện nước</div>
              <div className="text-[11px] text-stone-500 font-medium">Theo công tơ chuẩn</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-stone-200 shadow-xs flex items-center gap-2.5 hover:border-emerald-500 transition">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">0đ Phí môi giới</div>
              <div className="text-[11px] text-stone-500 font-medium">Liên hệ thẳng chủ trọ</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-stone-200 shadow-xs flex items-center gap-2.5 hover:border-blue-500 transition">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Hợp đồng mẫu chuẩn</div>
              <div className="text-[11px] text-stone-500 font-medium">Bảo vệ quyền lợi cọc</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
