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
  GraduationCap,
  Sparkles
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

  const activeAdvancedCount = (priceTier !== 'all' ? 1 : 0) + (roomType !== 'all' ? 1 : 0) + selectedAmenities.length;

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

    return [...uniMatches, ...wardMatches, ...roomMatches].slice(0, 5);
  }, [keyword, rooms]);

  const wards = WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [];

  return (
    <div className="relative bg-[#11241E] overflow-hidden border-b border-[#E5E2D9]">
      {/* Prominent Architectural Backdrop with Rich Atmospheric Contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Không gian phòng trọ Thái Nguyên cao cấp"
          className="w-full h-full object-cover object-center filter brightness-[0.75] saturate-[1.1] scale-[1.02]"
        />
        {/* Deep European Forest & Warm Charcoal Scrim - perfectly balances photo clarity with reading comfort */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#11241E]/80 via-[#11241E]/60 to-[#11241E]/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">
        {/* Editorial Heading: European Architectural Poise */}
        <div className="text-center max-w-3xl mx-auto mb-9 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C9DCD3] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8D5BA] shadow-[0_0_8px_#A8D5BA]"></span>
            <span>Bất Động Sản & Phòng Trọ Thái Nguyên</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-light text-white tracking-tight leading-[1.14] mb-3.5 drop-shadow-md font-sans">
            Không Gian Sống Chuẩn Mực <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#C9DCD3]">Minh Bạch & An Tâm</span>
          </h1>

          <p className="text-sm sm:text-base text-white/85 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow">
            Khảo sát thực tế 100% • Hợp đồng chính chủ • Minh bạch tiền điện nước
          </p>
        </div>

        {/* Master Architectural Search Dock - Floating Crisp Console */}
        <div className="bg-white rounded-xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 sm:p-5 text-[#252725]">
          {/* 1. Refined Category Segment */}
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#E5E2D9] overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả phòng' },
              { id: 'studio', label: 'Studio & Căn hộ' },
              { id: 'university', label: 'Gần trường ĐH' },
              { id: 'samsung', label: 'KCN Samsung' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryTabSelect(tab.id as any)}
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                  activeCategoryTab === tab.id
                    ? 'bg-[#23483D] text-white shadow-whisper'
                    : 'bg-[#FAF9F7] text-[#555955] hover:text-[#252725] hover:bg-[#E8EEE9] border border-[#E5E2D9]'
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
              className="flex-1 h-12 px-3.5 flex flex-col justify-center rounded-md bg-[#FAF9F7] border border-[#E5E2D9] hover:border-[#23483D] focus-within:border-[#23483D] focus-within:bg-white transition relative"
            >
              <label className="block text-[11px] font-semibold text-[#777B78] uppercase tracking-wider leading-none mb-1">
                Từ khóa / Địa điểm
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#777B78] shrink-0" />
                <input
                  type="text"
                  value={keyword}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Y Dược, Sư Phạm, Tân Thịnh, Z115..."
                  className="w-full bg-transparent text-sm font-medium text-[#252725] placeholder-[#B0B2AF] focus:outline-none leading-none"
                />
                {keyword && (
                  <button 
                    type="button" 
                    onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                    className="p-1 text-[#777B78] hover:text-[#252725]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-md shadow-card-hover border border-[#E5E2D9] overflow-hidden z-30 max-h-56 overflow-y-auto"
                  >
                    <div className="p-1.5 space-y-0.5">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setKeyword(s.label);
                            if (s.ward) setWard(s.ward);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded hover:bg-[#E8EEE9] flex items-center justify-between text-xs transition"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-[#252725]">{s.label}</span>
                            {s.ward && <span className="text-[#777B78] ml-1.5 font-normal">({s.ward})</span>}
                          </div>
                          <span className="text-[10px] bg-[#EFEEE8] text-[#23483D] font-medium px-2 py-0.5 rounded border border-[#E5E2D9]">
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
            <div className="sm:w-56 h-12 px-3.5 flex flex-col justify-center rounded-md bg-[#FAF9F7] border border-[#E5E2D9] hover:border-[#23483D] focus-within:border-[#23483D] focus-within:bg-white transition cursor-pointer">
              <label className="block text-[11px] font-semibold text-[#777B78] uppercase tracking-wider leading-none mb-1">
                Khu vực Phường / Xã
              </label>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#23483D] shrink-0" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#252725] focus:outline-none cursor-pointer truncate leading-none"
                >
                  <option value="Tất cả">Toàn Thái Nguyên</option>
                  {wards.filter(w => w !== 'Tất cả').map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Button: Filter Trigger */}
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`h-12 px-4 flex items-center justify-center gap-2 rounded-md text-sm font-medium border transition shrink-0 ${
                isAdvancedOpen || activeAdvancedCount > 0
                  ? 'bg-[#E8EEE9] border-[#23483D] text-[#23483D]'
                  : 'bg-[#FAF9F7] border-[#E5E2D9] text-[#252725] hover:bg-[#EFEEE8]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#23483D]" />
              <span>Bộ lọc</span>
              {activeAdvancedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#23483D] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
            </button>

            {/* Button: Submit in signature BARNES Deep Forest Green */}
            <button
              type="submit"
              className="h-12 px-7 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-sm rounded-md shadow-whisper transition-all duration-200 flex items-center justify-center gap-2 shrink-0 active:scale-[0.99] tracking-wide"
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
                className="overflow-hidden border-t border-[#E5E2D9] mt-3.5 pt-3.5 px-1"
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
                              ? 'bg-[#23483D] border-[#23483D] text-white'
                              : 'bg-[#FAF9F7] border-[#E5E2D9] text-[#252725] hover:bg-[#EFEEE8]'
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
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full bg-[#FAF9F7] border border-[#E5E2D9] rounded p-2 text-xs font-medium text-[#252725] focus:outline-none focus:border-[#23483D]"
                    >
                      <option value="all">Tất cả loại phòng</option>
                      <option value="single">Phòng trọ khép kín</option>
                      <option value="studio">Studio đầy đủ đồ</option>
                      <option value="mini_apartment">Chung cư mini</option>
                      <option value="whole_house">Nhà nguyên căn</option>
                      <option value="dormitory">Ký túc xá / Box</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252725] mb-2">
                      Tiện ích ưu tiên:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'air_conditioner', label: 'Điều hòa' },
                        { id: 'water_heater', label: 'Nóng lạnh' },
                        { id: 'private_bathroom', label: 'Khép kín' },
                        { id: 'free_hours', label: 'Giờ tự do' },
                      ].map((am) => {
                        const isSelected = selectedAmenities.includes(am.id);
                        return (
                          <button
                            key={am.id}
                            type="button"
                            onClick={() => handleToggleAmenity(am.id)}
                            className={`px-2.5 py-1.5 rounded text-xs font-medium border transition ${
                              isSelected
                                ? 'bg-[#23483D] border-[#23483D] text-white'
                                : 'bg-[#FAF9F7] border-[#E5E2D9] text-[#252725] hover:bg-[#EFEEE8]'
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
                    className="text-[#777B78] hover:text-[#252725] flex items-center gap-1 font-medium transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại bộ lọc</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAdvancedOpen(false)}
                      className="px-3.5 py-1.5 text-[#777B78] hover:text-[#252725] font-medium"
                    >
                      Thu gọn
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAdvancedOpen(false); applySearch(); }}
                      className="px-4 py-1.5 bg-[#23483D] text-white rounded font-medium shadow-whisper hover:bg-[#1A372E]"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Elegant Campus & Key Area Recommendations */}
          <div className="mt-3.5 pt-3.5 border-t border-[#E5E2D9]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
              <span className="text-[#777B78] font-medium shrink-0 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#23483D]" />
                <span>Gợi ý nhanh theo trường:</span>
              </span>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
                  <button
                    key={uni.id}
                    type="button"
                    onClick={() => handleQuickSelect(uni.shortName, uni.ward)}
                    className="px-2.5 py-1 rounded-full bg-[#FAF9F7] hover:bg-[#E8EEE9] hover:text-[#23483D] border border-[#E5E2D9] text-[#252725] text-xs font-medium whitespace-nowrap transition-colors"
                  >
                    {uni.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Minimal, Understated Proof Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-white/90">
          <div className="flex items-center gap-2 drop-shadow">
            <CheckCircle2 className="w-4 h-4 text-[#A8D5BA]" />
            <span>100% Khảo sát thực tế</span>
          </div>

          <div className="flex items-center gap-2 drop-shadow">
            <CheckCircle2 className="w-4 h-4 text-[#A8D5BA]" />
            <span>Minh bạch tiền điện nước</span>
          </div>

          <div className="flex items-center gap-2 drop-shadow">
            <CheckCircle2 className="w-4 h-4 text-[#A8D5BA]" />
            <span>Ký trực tiếp chủ trọ – 0đ môi giới</span>
          </div>
        </div>
      </div>
    </div>
  );
};
