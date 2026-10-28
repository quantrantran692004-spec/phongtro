import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowRight, 
  X, 
  RotateCcw,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { WARDS_BY_DISTRICT, THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';
import heroSunsetVilla from '../../assets/hero-sunset-villa.jpg';

interface HeroSearchProps {
  onSearchSubmit: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearchSubmit }) => {
  const { filters, updateFilters, rooms } = useRooms();
  const [keyword, setKeyword] = useState(filters.keyword);
  const [ward, setWard] = useState(filters.ward);
  const [roomType, setRoomType] = useState(filters.roomType);
  const [priceTier, setPriceTier] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(filters.amenities || []);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'studio' | 'university' | 'samsung'>('all');

  // Autocomplete state
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
    applySearch();
  };

  const applySearch = () => {
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
      amenities: selectedAmenities,
    });
    onSearchSubmit();
  };

  const handleQuickSelect = (tagKeyword: string, tagWard?: string, tagRoomType?: string, tagPrice?: string) => {
    setKeyword(tagKeyword);
    if (tagWard !== undefined) setWard(tagWard);
    if (tagRoomType !== undefined) setRoomType(tagRoomType);
    if (tagPrice !== undefined) setPriceTier(tagPrice);
    
    let minPrice = 0;
    let maxPrice = 10000000;
    const pt = tagPrice !== undefined ? tagPrice : priceTier;
    if (pt === 'under_1_5m') maxPrice = 1500000;
    else if (pt === '1_5m_2_5m') { minPrice = 1500000; maxPrice = 2500000; }
    else if (pt === 'above_2_5m') minPrice = 2500000;

    updateFilters({
      keyword: tagKeyword,
      ward: (tagWard !== undefined ? tagWard : ward) === 'Tất cả' ? '' : (tagWard !== undefined ? tagWard : ward),
      roomType: tagRoomType !== undefined ? tagRoomType : roomType,
      minPrice,
      maxPrice,
      amenities: selectedAmenities,
    });
    onSearchSubmit();
  };

  const handleCategoryTabSelect = (tab: 'all' | 'studio' | 'university' | 'samsung') => {
    setActiveCategoryTab(tab);
    if (tab === 'all') {
      setRoomType('all');
      setWard('Tất cả');
    } else if (tab === 'studio') {
      setRoomType('studio');
      handleQuickSelect('', 'Tất cả', 'studio');
    } else if (tab === 'university') {
      handleQuickSelect('Y Dược', 'P. Quang Trung');
    } else if (tab === 'samsung') {
      handleQuickSelect('Samsung', 'TX. Phổ Yên');
    }
  };

  const handleToggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const resetAdvanced = () => {
    setPriceTier('all');
    setRoomType('all');
    setSelectedAmenities([]);
  };

  const activeAdvancedCount = (priceTier !== 'all' ? 1 : 0) + 
    (roomType !== 'all' ? 1 : 0) + 
    selectedAmenities.length;

  // Real-time suggestions
  const suggestions = React.useMemo(() => {
    if (!keyword.trim() || keyword.length < 2) return [];
    const q = keyword.toLowerCase();
    
    const uniMatches = THAI_NGUYEN_UNIVERSITIES
      .filter(u => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q))
      .slice(0, 3)
      .map(u => ({ label: u.shortName, type: 'Trường ĐH', ward: u.ward }));

    const wardMatches = (WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [])
      .filter(w => w.toLowerCase().includes(q))
      .slice(0, 3)
      .map(w => ({ label: w, type: 'Phường/Xã', ward: w }));

    const roomMatches = rooms
      .filter(r => r.title.toLowerCase().includes(q))
      .slice(0, 3)
      .map(r => ({ label: r.title, type: 'Phòng trọ', ward: r.location.ward }));

    return [...uniMatches, ...wardMatches, ...roomMatches].slice(0, 5);
  }, [keyword, rooms]);

  const wards = WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [];

  return (
    <div className="relative overflow-hidden bg-[#F7F6F2]">
      {/* Modern High-End Mediterranean Villa with Infinity Pool Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroSunsetVilla}
          alt="Không gian sống cao cấp hiện đại Thái Nguyên"
          className="w-full h-full object-cover object-center filter saturate-[1.05] brightness-[1.0]"
        />

        {/* Soft, Transparent Vignette - Keeps Luminous Sky, Turquoise Pool & Villa 100% Crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-14">
        {/* Left-Aligned Editorial Composition - Styled after The Horizon Luxury Architecture */}
        <div className="max-w-3xl mb-7 sm:mb-9 text-left">
          {/* Kicker Line with Thin Dash */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-10 h-[1.5px] bg-[#8F6627]"></span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#1C2826] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              Bất Động Sản & Phòng Trọ Chuẩn Mực Thái Nguyên
            </span>
          </div>

          {/* Majestic High-Fashion Serif Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-normal tracking-tight leading-[1.12] mb-3 sm:mb-4 font-serif">
            <span className="block text-[#14221D] drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
              Không Gian Sống Chuẩn Mực
            </span>
            <span className="block font-serif italic text-[#8F6627] drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] mt-1">
              Minh Bạch & An Tâm
            </span>
          </h1>

          {/* Elegant Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-[#2D3A35] font-medium max-w-xl leading-relaxed mb-6 drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
            Khảo sát thực tế 100% • Hợp đồng ký trực tiếp chủ trọ • Minh bạch tiền điện nước và cam kết 0đ môi giới.
          </p>

          {/* Action Button Pills */}
          <div className="flex items-center gap-3.5 mb-6 flex-wrap">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('search-console-card');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#182B24] hover:bg-[#23483D] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 shadow-xl border border-white/20 group"
            >
              <span>Khám phá phòng ngay</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-[#182B24] bg-white/80 hover:bg-white backdrop-blur-md border border-white/90 transition shadow-md"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8F6627]" />
              <span>{isAdvancedOpen ? 'Đóng bộ lọc' : 'Bộ lọc nâng cao'}</span>
              {activeAdvancedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#182B24] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Master Architectural Search Console - Floating Refined Frosted Glass Console */}
        <div id="search-console-card" className="bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/95 shadow-[0_24px_60px_rgba(20,40,30,0.14)] p-4 sm:p-5 text-[#252725] max-w-3xl">
          {/* 1. Category Segmented Navigation */}
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#E5E2D9]/60 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả phòng' },
              { id: 'studio', label: 'Studio & Căn hộ' },
              { id: 'university', label: 'Gần trường ĐH' },
              { id: 'samsung', label: 'KCN Samsung Phổ Yên' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryTabSelect(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  activeCategoryTab === tab.id
                    ? 'bg-[#182B24] text-white shadow-sm'
                    : 'bg-white/70 text-[#2D3A34] hover:text-[#182B24] hover:bg-white border border-white/80 shadow-2xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 2. Primary Search Controls */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-3.5">
            {/* Input: Keyword */}
            <div 
              ref={suggestionRef}
              className="flex-1 h-13 px-3.5 flex flex-col justify-center rounded-xl bg-white border border-[#E5E2D9] hover:border-[#182B24] focus-within:border-[#182B24] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(24,43,36,0.08)] transition relative shadow-xs"
            >
              <label className="block text-[10px] font-bold text-[#777B78] uppercase tracking-wider leading-none mb-1">
                Từ khóa / Địa điểm
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#777B78] shrink-0" />
                <input
                  type="text"
                  value={keyword}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="VD: Y Dược, Sư Phạm, Tân Thịnh, Z115..."
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1F2421] placeholder-[#B0B2AF] focus:outline-none leading-none"
                />
                {keyword && (
                  <button 
                    type="button" 
                    onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                    className="p-1 text-[#777B78] hover:text-[#1F2421]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-[#E5E2D9] overflow-hidden z-30 max-h-60 overflow-y-auto"
                  >
                    <div className="p-2 space-y-1">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setKeyword(s.label);
                            if (s.ward) setWard(s.ward);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-lg hover:bg-[#E8EEE9] flex items-center justify-between text-xs sm:text-sm transition"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-[#252725]">{s.label}</span>
                            {s.ward && <span className="text-[#777B78] ml-2 font-normal">({s.ward})</span>}
                          </div>
                          <span className="text-[11px] bg-[#EFEEE8] text-[#23483D] font-semibold px-2.5 py-0.5 rounded border border-[#E5E2D9]">
                            {s.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Select: Ward */}
            <div className="sm:w-56 h-13 px-3.5 flex flex-col justify-center rounded-xl bg-white border border-[#E5E2D9] hover:border-[#182B24] focus-within:border-[#182B24] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(24,43,36,0.08)] transition cursor-pointer shadow-xs">
              <label className="block text-[10px] font-bold text-[#777B78] uppercase tracking-wider leading-none mb-1">
                Khu vực Phường / Xã
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#182B24] shrink-0" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1F2421] focus:outline-none cursor-pointer truncate leading-none"
                >
                  <option value="Tất cả">Toàn Thái Nguyên</option>
                  {wards.filter(w => w !== 'Tất cả').map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Button: Submit */}
            <button
              type="submit"
              className="h-13 px-7 bg-[#182B24] hover:bg-[#23483D] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-[0_8px_20px_rgba(24,43,36,0.28)] hover:shadow-[0_12px_28px_rgba(24,43,36,0.38)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 shrink-0 tracking-wide"
            >
              <span>Tìm kiếm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 3. Expandable Advanced Filter Options */}
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden border-t border-[#E5E2D9] mt-3.5 pt-3.5 px-1 text-[#252725]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2 text-xs">
                  <div>
                    <label className="block text-xs font-semibold text-[#252725] mb-2">
                      Mức giá thuê:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'all', label: 'Tất cả giá' },
                        { id: 'under_1_5m', label: '< 1.5 triệu' },
                        { id: '1_5m_2_5m', label: '1.5 - 2.5 triệu' },
                        { id: 'above_2_5m', label: '> 2.5 triệu' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriceTier(p.id)}
                          className={`py-2 px-2.5 rounded border text-xs font-medium transition text-center ${
                            priceTier === p.id
                              ? 'bg-[#182B24] border-[#182B24] text-white'
                              : 'bg-white border-[#E5E2D9] text-[#252725] hover:bg-[#E8EEE9]'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252725] mb-2">
                      Loại hình phòng:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'all', label: 'Tất cả loại' },
                        { id: 'single', label: 'Phòng đơn' },
                        { id: 'studio', label: 'Studio' },
                        { id: 'mini_apartment', label: 'CC mini' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setRoomType(t.id)}
                          className={`py-2 px-2.5 rounded border text-xs font-medium transition text-center ${
                            roomType === t.id
                              ? 'bg-[#182B24] border-[#182B24] text-white'
                              : 'bg-white border-[#E5E2D9] text-[#252725] hover:bg-[#E8EEE9]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252725] mb-2">
                      Tiện nghi cơ bản:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'air_conditioner', label: 'Điều hòa' },
                        { id: 'water_heater', label: 'Nóng lạnh' },
                        { id: 'wifi', label: 'Wifi' },
                        { id: 'mezzanine', label: 'Gác xép' },
                      ].map((am) => {
                        const isSelected = selectedAmenities.includes(am.id);
                        return (
                          <button
                            key={am.id}
                            type="button"
                            onClick={() => handleToggleAmenity(am.id)}
                            className={`py-2 px-2.5 rounded border text-xs font-medium transition text-center ${
                              isSelected
                                ? 'bg-[#182B24] border-[#182B24] text-white'
                                : 'bg-white border-[#E5E2D9] text-[#252725] hover:bg-[#E8EEE9]'
                            }`}
                          >
                            {isSelected && '✓ '}
                            {am.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5E2D9] text-xs">
                  <button
                    type="button"
                    onClick={resetAdvanced}
                    className="text-[#777B78] hover:text-[#1F2421] flex items-center gap-1 font-medium transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại bộ lọc</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAdvancedOpen(false)}
                      className="px-3.5 py-1.5 text-[#777B78] hover:text-[#1F2421] font-medium"
                    >
                      Thu gọn
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAdvancedOpen(false); applySearch(); }}
                      className="px-4 py-1.5 bg-[#182B24] text-white rounded font-medium shadow-whisper hover:bg-[#23483D]"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Campus Recommendations */}
          <div className="mt-3 pt-3 border-t border-[#E5E2D9]/60">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
              <span className="text-[#3E4A44] font-semibold shrink-0 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#182B24]" />
                <span>Gợi ý theo trường:</span>
              </span>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
                  <button
                    key={uni.id}
                    type="button"
                    onClick={() => handleQuickSelect(uni.shortName, uni.ward)}
                    className="px-3 py-1 rounded-full bg-white hover:bg-[#182B24] hover:text-white border border-[#E5E2D9] text-[#252725] text-xs font-semibold whitespace-nowrap transition-all shadow-2xs"
                  >
                    {uni.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Architectural Metrics Bar - Exactly as in Reference Image */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-white/30 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-white">
          {/* Left: Slide counter */}
          <div className="flex items-center gap-3 font-serif">
            <span className="text-white/60 cursor-pointer hover:text-white transition text-lg select-none">‹</span>
            <span className="font-semibold tracking-widest text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">01 / 03</span>
            <span className="text-white/60 cursor-pointer hover:text-white transition text-lg select-none">›</span>
          </div>

          {/* Center: 3 metric columns with vertical dividers */}
          <div className="flex items-center gap-6 sm:gap-10">
            <div>
              <span className="text-2xl sm:text-3xl font-light font-serif text-white block leading-none mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                450+
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/95 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                Phòng trọ đã khảo sát
              </span>
            </div>
            <div className="w-[1px] h-8 bg-white/40"></div>
            <div>
              <span className="text-2xl sm:text-3xl font-light font-serif text-white block leading-none mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                100%
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/95 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                Hợp đồng ký chính chủ
              </span>
            </div>
            <div className="w-[1px] h-8 bg-white/40"></div>
            <div>
              <span className="text-2xl sm:text-3xl font-light font-serif text-white block leading-none mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                0đ
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/95 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                Phí môi giới trung gian
              </span>
            </div>
          </div>

          {/* Right: Scroll down indicator with pulsing dot */}
          <div className="flex items-center gap-3 uppercase tracking-[0.2em] text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            <span className="w-6 h-[1.5px] bg-white/70"></span>
            <span className="w-2 h-2 rounded-full bg-[#FBD38D] animate-ping"></span>
            <span>Cuộn xuống</span>
          </div>
        </div>
      </div>
    </div>
  );
};
