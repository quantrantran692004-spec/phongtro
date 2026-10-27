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
  ShieldCheck,
  Building,
  GraduationCap
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

  const handleQuickTagClick = (tagKeyword: string, tagWard?: string, tagRoomType?: string, tagPrice?: string) => {
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
    } else if (tab === 'university') {
      setKeyword('Y Dược');
      setWard('P. Quang Trung');
    } else if (tab === 'samsung') {
      setKeyword('Samsung');
      setWard('TX. Phổ Yên');
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
    <div className="relative bg-[#161816] text-white overflow-hidden border-b border-[#E6E4DE]">
      {/* High-Resolution Architectural Photography Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85"
          alt="Không gian sống chuẩn mực Trọ Thái Nguyên"
          className="w-full h-full object-cover object-center transform scale-102 filter brightness-[0.78] contrast-[1.05]"
        />
        {/* Restrained Architectural Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#161816]/85 via-[#161816]/65 to-[#161816]/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">
        {/* Editorial Heading: European Architectural Poise */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase px-4 py-1.5 rounded-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>BỘ SƯU TẬP KHÔNG GIAN SỐNG AN CƯ • THÁI NGUYÊN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.12] mb-4">
            Nghệ Thuật An Cư & Không Gian Sống Chuẩn Mực
          </h1>

          <p className="text-sm sm:text-base text-stone-200/90 font-light leading-relaxed max-w-2xl mx-auto">
            Tuyển chọn phòng trọ khép kín, studio và chung cư mini chính chủ tại TP. Thái Nguyên & KCN Samsung Phổ Yên. Khảo sát thực địa 100%, bảo vệ quyền lợi người thuê.
          </p>
        </div>

        {/* Master Architectural Search Dock */}
        <div className="max-w-4xl mx-auto">
          {/* Category Tabs: Architectural segment buttons */}
          <div className="flex items-center gap-1 mb-2.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả không gian' },
              { id: 'studio', label: 'Studio & CC Mini' },
              { id: 'university', label: 'Khu vực Làng Đại Học' },
              { id: 'samsung', label: 'KCN Samsung Phổ Yên' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryTabSelect(tab.id as any)}
                className={`px-4 py-2 rounded-t-md text-xs font-semibold tracking-wide transition whitespace-nowrap ${
                  activeCategoryTab === tab.id
                    ? 'bg-white text-charcoal-900 border-t-2 border-[#23483D]'
                    : 'bg-black/40 text-stone-300 hover:text-white hover:bg-black/60 backdrop-blur-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Master Search Bar: Pure white surface with disciplined hairline dividers */}
          <div className="bg-white rounded-b-md rounded-tr-md border border-[#E6E4DE] shadow-card p-2 sm:p-2.5 text-charcoal-900">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
              {/* Field 1: Keyword Input */}
              <div 
                ref={suggestionRef}
                className="flex-1 h-12 px-4 flex flex-col justify-center rounded-sm hover:bg-[#F7F6F2] transition relative"
              >
                <label className="block text-[10px] font-extrabold text-charcoal-700 uppercase tracking-[0.14em] leading-none mb-1">
                  Địa điểm / Tên trường
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
                    className="w-full bg-transparent text-sm font-bold text-charcoal-900 placeholder-stone-400 focus:outline-none leading-none"
                  />
                  {keyword && (
                    <button 
                      type="button" 
                      onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                      className="p-0.5 text-stone-400 hover:text-charcoal-900"
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
                      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-md shadow-card border border-[#E6E4DE] overflow-hidden z-30 max-h-56 overflow-y-auto"
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
                            className="w-full text-left px-3.5 py-2.5 rounded hover:bg-[#F7F6F2] flex items-center justify-between text-xs transition"
                          >
                            <div className="truncate mr-2">
                              <span className="font-extrabold text-charcoal-900">{s.label}</span>
                              {s.ward && <span className="text-charcoal-500 ml-1.5 font-medium">({s.ward})</span>}
                            </div>
                            <span className="text-[10px] bg-[#F7F6F2] text-brand-800 font-bold px-2 py-0.5 rounded border border-[#E6E4DE]">
                              {s.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hairline Divider */}
              <div className="hidden sm:block h-7 w-[1px] bg-[#E6E4DE] shrink-0 my-auto" />

              {/* Field 2: Ward Select */}
              <div className="sm:w-56 h-12 px-4 flex flex-col justify-center rounded-sm hover:bg-[#F7F6F2] transition cursor-pointer">
                <label className="block text-[10px] font-extrabold text-charcoal-700 uppercase tracking-[0.14em] leading-none mb-1">
                  Khu vực Phường / Xã
                </label>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-charcoal-900 focus:outline-none cursor-pointer truncate leading-none"
                  >
                    <option value="Tất cả">Toàn Thái Nguyên</option>
                    {wards.filter(w => w !== 'Tất cả').map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hairline Divider */}
              <div className="hidden sm:block h-7 w-[1px] bg-[#E6E4DE] shrink-0 my-auto" />

              {/* Field 3: Filter Trigger */}
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className={`h-12 px-4 flex items-center justify-center gap-1.5 rounded-sm text-xs font-bold transition shrink-0 ${
                  isAdvancedOpen || activeAdvancedCount > 0
                    ? 'bg-[#F7F6F2] text-brand-900 border border-[#E6E4DE]'
                    : 'text-charcoal-700 hover:bg-[#F7F6F2]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-700" />
                <span>Bộ lọc</span>
                {activeAdvancedCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#23483D] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeAdvancedCount}
                  </span>
                )}
              </button>

              {/* Field 4: Search Action Button: Signature BARNES Deep Forest Green */}
              <button
                type="submit"
                className="h-12 px-7 bg-[#23483D] hover:bg-[#1A372E] text-white font-bold text-xs sm:text-sm rounded-sm shadow-whisper transition flex items-center justify-center gap-2 shrink-0 active:scale-98 tracking-wider uppercase"
              >
                <span>TÌM KIẾM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Expandable Advanced Filters Drawer */}
            <AnimatePresence>
              {isAdvancedOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-[#E6E4DE] mt-2 pt-3 px-2 sm:px-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
                    <div>
                      <label className="block text-xs font-extrabold text-charcoal-900 mb-1.5">
                        Khoảng giá thuê
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {[
                          { id: 'all', label: 'Tất cả giá' },
                          { id: 'under_1_5m', label: '< 1.5 triệu' },
                          { id: '1_5m_2_5m', label: '1.5 - 2.5 tr' },
                          { id: 'above_2_5m', label: '> 2.5 triệu' },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPriceTier(p.id)}
                            className={`py-1.5 px-2 rounded-sm border font-bold transition text-center ${
                              priceTier === p.id
                                ? 'bg-[#23483D] border-[#23483D] text-white'
                                : 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-800 hover:bg-stone-200'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-charcoal-900 mb-1.5">
                        Loại hình phòng
                      </label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm p-2 text-xs font-bold text-charcoal-900 focus:outline-none"
                      >
                        <option value="all">Tất cả loại phòng</option>
                        <option value="single">Phòng trọ khép kín</option>
                        <option value="studio">Studio tiện nghi</option>
                        <option value="mini_apartment">Chung cư mini</option>
                        <option value="whole_house">Nhà nguyên căn</option>
                        <option value="dormitory">Ký túc xá / Box</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-charcoal-900 mb-1.5">
                        Tiện ích ưu tiên
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
                              className={`px-2.5 py-1 rounded-sm text-xs font-bold border transition ${
                                isSelected
                                  ? 'bg-[#23483D] border-[#23483D] text-white'
                                  : 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-800 hover:bg-stone-200'
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

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#E6E4DE] text-xs">
                    <button
                      type="button"
                      onClick={resetAdvanced}
                      className="text-charcoal-500 hover:text-charcoal-900 flex items-center gap-1 font-bold transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Đặt lại</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAdvancedOpen(false)}
                        className="px-3 py-1.5 text-charcoal-700 hover:text-charcoal-900 font-bold"
                      >
                        Thu gọn
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsAdvancedOpen(false); applySearch(); }}
                        className="px-4 py-1.5 bg-[#23483D] text-white rounded-sm font-bold shadow-whisper hover:bg-[#1A372E] tracking-wider uppercase"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Suggestions Line */}
            <div className="mt-2 pt-2 border-t border-[#E6E4DE] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs px-2 sm:px-4">
              <span className="text-[10px] font-extrabold text-charcoal-500 uppercase tracking-wider whitespace-nowrap">
                Gợi ý nhanh:
              </span>

              {[
                { label: 'ĐH Y Dược', keyword: 'Y Dược', ward: 'P. Quang Trung' },
                { label: 'Làng SV Tân Thịnh', keyword: '', ward: 'P. Tân Thịnh' },
                { label: 'Samsung Phổ Yên', keyword: 'Samsung', ward: 'TX. Phổ Yên' },
                { label: 'Dưới 1.5 triệu', keyword: '', ward: 'Tất cả', price: 'under_1_5m' },
              ].map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickTagClick(tag.keyword, tag.ward, undefined, tag.price)}
                  className="px-3 py-1 rounded-sm bg-[#F7F6F2] hover:bg-white text-charcoal-900 text-xs font-bold whitespace-nowrap transition border border-[#E6E4DE] shadow-whisper"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Proof Bar: Restrained European Architectural Markers */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-stone-200/90 tracking-wide">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Khảo sát thực địa</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Minh bạch tiền điện & nước</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>0đ Phí môi giới người thuê</span>
            </div>

            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" />
              <span>Hợp đồng chuẩn pháp lý</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};