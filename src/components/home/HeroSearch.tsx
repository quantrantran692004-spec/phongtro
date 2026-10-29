import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowRight, 
  X, 
  RotateCcw,
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
    } else if (priceTier === '1_5m_3m') {
      minPrice = 1500000;
      maxPrice = 3000000;
    } else if (priceTier === 'above_3m') {
      minPrice = 3000000;
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
    <section className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden flex flex-col justify-between select-none">
      
      {/* 1. ẢNH NỀN SẮC NÉT NGUYÊN BẢN 100% - ĐỘ TRONG SẮC NÉT CAO, KHÔNG PHỦ MỜ ĐỤC */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSunsetVilla}
          alt="Không gian sống đẳng cấp"
          className="w-full h-full object-cover object-center scale-[1.01]"
        />
      </div>

      {/* Khoảng đệm cho Header */}
      <div className="h-20 shrink-0" />

      {/* 2. NỘI DUNG CHÍNH (TYPOGRAPHY NÂNG CẤP SANG TRỌNG, GỌN GÀNG) */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 my-auto py-2">
        <div className="max-w-2xl relative">
          
          {/* Eyebrow badge inside sleek frosted glass pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-sm text-teal-800 text-[11px] font-semibold tracking-wide uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
            <span>Bất động sản & Phòng trọ Thái Nguyên</span>
          </div>

          {/* ĐẠI TIÊU ĐỀ GỌN GÀNG, SANG TRỌNG (FONT BALANCE, KHÔNG CỒNG KỀNH) */}
          <h1 className="tracking-tight leading-[1.15] mb-3">
            <span className="block text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900">
              Kiến tạo Không gian sống
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-[38px] font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Chuẩn mực & Minh bạch
            </span>
          </h1>

          {/* Mô tả tinh tế, cỡ chữ vừa vặn, ngắt dòng tự nhiên */}
          <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed max-w-lg mb-5 font-normal">
            Phòng trọ cao cấp khảo sát thực tế 100%, kết nối trực tiếp chủ trọ và cam kết minh bạch tuyệt đối chi phí điện nước.
          </p>

          {/* Cụm 2 nút bấm: Nút chính Teal + Nút phụ Frosted Glass */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('search-dock');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap active:scale-[0.98]"
            >
              <span>Khám phá ngay</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="bg-white/90 hover:bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-full px-4 py-2 font-medium text-xs tracking-wide backdrop-blur-md flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap active:scale-[0.98]"
            >
              <span className="w-4 h-4 rounded-full bg-slate-100 text-teal-700 flex items-center justify-center font-bold text-[10px]">
                ▸
              </span>
              <span>Bộ lọc nâng cao</span>
              {activeAdvancedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
            </button>
          </div>

          {/* 3. TẤT CẢ GỘP VÀO 1 THẺ CARD TÌM KIẾM DUY NHẤT */}
          <div id="search-dock" className="w-full max-w-[840px] relative">
            <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-3 md:p-3.5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] border border-white">
              
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-1 pb-2 mb-2 border-b border-slate-100">
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
                    className={`rounded-full px-3.5 py-1 text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeCategoryTab === tab.id
                        ? 'bg-teal-600 text-white shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Main Search Bar: Cân đối, không bị cụt chữ */}
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1.1fr_auto] items-center gap-1.5"
              >
                {/* Cột 1: Từ khóa / Trường ĐH */}
                <div 
                  ref={suggestionRef}
                  className="flex items-center gap-2 hover:bg-slate-50/90 rounded-xl px-3 py-2 transition cursor-pointer relative min-w-0"
                >
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="w-full min-w-0">
                    <span className="block text-[10px] font-medium text-slate-400 whitespace-nowrap">
                      Từ khóa / Trường ĐH
                    </span>
                    <input
                      type="text"
                      value={keyword}
                      onFocus={() => setShowSuggestions(true)}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        setShowSuggestions(true);
                      }}
                      placeholder="VD: ĐH Y Dược, CNTT..."
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  {keyword && (
                    <button 
                      type="button" 
                      onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                      className="p-1 text-slate-400 hover:text-slate-700 shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-float border border-slate-200 overflow-hidden z-30 max-h-60 overflow-y-auto"
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
                              className="w-full text-left px-3.5 py-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs sm:text-sm transition"
                            >
                              <div className="truncate mr-2">
                                <span className="font-semibold text-slate-900">{s.label}</span>
                                {s.ward && <span className="text-slate-500 ml-2 font-normal">({s.ward})</span>}
                              </div>
                              <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200 shrink-0">
                                {s.type}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cột 2: Khu vực */}
                <div className="flex items-center gap-2 hover:bg-slate-50/90 rounded-xl px-3 py-2 transition cursor-pointer min-w-0 border-t md:border-t-0 md:border-l border-slate-200/80">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="w-full min-w-0">
                    <span className="block text-[10px] font-medium text-slate-400 whitespace-nowrap">
                      Khu vực
                    </span>
                    <select 
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer truncate pr-1"
                    >
                      <option value="Tất cả">Toàn Thái Nguyên</option>
                      {wards.filter(w => w !== 'Tất cả').map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cột 3: Mức giá */}
                <div className="flex items-center gap-2 hover:bg-slate-50/90 rounded-xl px-3 py-2 transition cursor-pointer min-w-0 border-t md:border-t-0 md:border-l border-slate-200/80">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="w-full min-w-0">
                    <span className="block text-[10px] font-medium text-slate-400 whitespace-nowrap">
                      Mức giá
                    </span>
                    <select 
                      value={priceTier}
                      onChange={(e) => setPriceTier(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer truncate pr-1"
                    >
                      <option value="all">Tất cả mức giá</option>
                      <option value="under_1_5m">Dưới 1.5 triệu</option>
                      <option value="1_5m_3m">1.5 - 3 triệu</option>
                      <option value="above_3m">Trên 3 triệu</option>
                    </select>
                  </div>
                </div>

                {/* Nút Tìm Kiếm CTA */}
                <div className="p-1 shrink-0">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-xs tracking-wide"
                  >
                    Tìm kiếm →
                  </button>
                </div>
              </form>
            </div>

            {/* Advanced filter toggle panel */}
            <AnimatePresence>
              {isAdvancedOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2.5 bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl p-4 shadow-xl overflow-hidden text-slate-800 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                        Mức giá thuê:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'all', label: 'Tất cả giá' },
                          { id: 'under_1_5m', label: '< 1.5 triệu' },
                          { id: '1_5m_3m', label: '1.5 - 3 triệu' },
                          { id: 'above_3m', label: '> 3 triệu' },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPriceTier(p.id)}
                            className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition text-center ${
                              priceTier === p.id
                                ? 'bg-teal-600 border-teal-600 text-white font-bold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
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
                            className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition text-center ${
                              roomType === t.id
                                ? 'bg-teal-600 border-teal-600 text-white font-bold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 flex items-center justify-between border-t border-slate-200">
                    <button
                      type="button"
                      onClick={resetAdvanced}
                      className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Đặt lại</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAdvancedOpen(false); applySearch(); }}
                      className="px-4 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-500 transition shadow-sm"
                    >
                      Áp dụng bộ lọc
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 4. STREAMLINED BOTTOM BAR (AIRY & CLEAN, PRESERVES WATER REFLECTION) */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-6 pt-2 flex flex-wrap items-center justify-between gap-4 text-white">
        
        {/* Bottom-left pagination pill */}
        <div className="inline-flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider shadow-lg">
          <span className="text-white/60">‹</span>
          <span className="text-emerald-400 font-bold">01</span>
          <span className="text-white/30">/</span>
          <span className="text-white/70">04</span>
          <span className="text-white/60">›</span>
        </div>

        {/* Floating luxury glass capsule for 3 trust metrics */}
        <div className="bg-slate-900/65 backdrop-blur-xl border border-white/20 text-white rounded-full px-6 md:px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg md:text-xl text-emerald-400 tabular-nums">
              450+
            </span>
            <span className="text-[10px] md:text-xs text-slate-200 uppercase tracking-wider font-semibold whitespace-nowrap">
              Phòng trọ đã khảo sát
            </span>
          </div>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg md:text-xl text-emerald-400 tabular-nums">
              100%
            </span>
            <span className="text-[10px] md:text-xs text-slate-200 uppercase tracking-wider font-semibold whitespace-nowrap">
              Hợp đồng chính chủ
            </span>
          </div>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg md:text-xl text-emerald-400 tabular-nums">
              0đ
            </span>
            <span className="text-[10px] md:text-xs text-slate-200 uppercase tracking-wider font-semibold whitespace-nowrap">
              Phí môi giới trung gian
            </span>
          </div>
        </div>

        {/* Bottom-right scroll indicator pill */}
        <div className="hidden md:inline-flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider shadow-lg">
          <span className="w-4 h-6 rounded-full border border-white/40 flex items-start justify-center p-0.5">
            <span className="w-1 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
          </span>
          <span className="uppercase tracking-widest text-[11px]">Cuộn xuống</span>
        </div>
      </div>

    </section>
  );
};
