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
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none">
      
      {/* 1. ẢNH NỀN SẮC NÉT 100% - KHÔNG BỊ TRẮNG ĐỤC, SCALE 1.01 ĐỂ TRIỆT TIÊU 100% LỖI HỞ VIỀN 1PX */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSunsetVilla}
          alt="Không gian sống đẳng cấp"
          className="w-full h-full object-cover object-center contrast-[1.03] saturate-[1.05] scale-[1.01]"
        />
        {/* Subtle top & bottom ambient vignettes */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />
        
        {/* PART 1 #3: Left Content Light Backdrop for crystal-clear readability over dark shrubs */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 lg:w-[58%] bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Khoảng đệm cho Header */}
      <div className="h-24 shrink-0" />

      {/* 2. NỘI DUNG CHÍNH (ĐẶT TRÊN NỀN BACKDROP SÁNG BÊN TRÁI - RÕ NÉT 100%) */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 my-auto py-6">
        <div className="max-w-2xl">
          
          {/* Dòng Eyebrow nhỏ */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-teal-600"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-teal-800">
              Bất động sản & Phòng trọ chuẩn mực Thái Nguyên
            </span>
          </div>

          {/* ĐẠI TIÊU ĐỀ IN HOA HIỆN ĐẠI (Bold Sans-Serif & Vibrant Accent) */}
          <h1 className="font-sans font-extrabold uppercase tracking-tight leading-[1.06] mb-5">
            <span className="block text-4xl sm:text-5xl lg:text-[62px] text-slate-900 drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
              KIẾN TẠO
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-[62px] bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
              TƯƠNG LAI SỐNG
            </span>
          </h1>

          {/* Mô tả ngắn gọn, độ tương phản cao, siêu dễ đọc */}
          <p className="text-slate-800 font-semibold text-sm sm:text-base max-w-md leading-relaxed mb-7 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            Những không gian sống đẳng cấp, khảo sát thực tế 100%, hợp đồng trực tiếp chủ trọ và minh bạch tuyệt đối chi phí điện nước.
          </p>

          {/* Cụm 2 nút bấm: Nút chính Teal-600 + Nút phụ Frosted Pill sáng */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('search-dock');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 bg-teal-600 hover:bg-teal-500 text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Khám phá dự án</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="bg-white/95 hover:bg-white text-slate-900 border border-slate-200/80 shadow-md rounded-full px-5 py-2.5 font-bold text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-2.5 transition-all hover:shadow-lg whitespace-nowrap"
            >
              <span className="w-6 h-6 rounded-full bg-slate-100 text-teal-700 flex items-center justify-center font-bold text-xs">
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

          {/* 3. THANH TÌM KIẾM 3 CỘT NÂNG CẤP (CÓ BỘ LỌC GIÁ, CHUẨN CRO) */}
          <div id="search-dock" className="max-w-2xl relative">
            {/* Các pill chọn nhanh nhỏ gọn phía trên */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                    activeCategoryTab === tab.id
                      ? 'bg-teal-600 text-white font-bold shadow-teal-600/25'
                      : 'bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md border border-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Thanh Input chính: 3 CỘT PHÂN TÁCH RÕ RÀNG */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row items-stretch md:items-center bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white p-2.5 gap-2"
            >
              {/* Cột 1: Từ khóa / Trường ĐH */}
              <div 
                ref={suggestionRef}
                className="flex-1 flex items-center gap-2.5 px-3 py-1.5 border-b md:border-b-0 md:border-r border-slate-200 relative min-w-0"
              >
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="w-full min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
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
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none truncate"
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
              <div className="w-full md:w-44 flex items-center gap-2 px-3 py-1.5 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="w-full min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    Khu vực
                  </span>
                  <select 
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer truncate"
                  >
                    <option value="Tất cả">Toàn Thái Nguyên</option>
                    {wards.filter(w => w !== 'Tất cả').map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cột 3: Mức giá (NEW REQUIRED FIELD) */}
              <div className="w-full md:w-40 flex items-center gap-2 px-3 py-1.5 shrink-0">
                <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="w-full min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    Mức giá
                  </span>
                  <select 
                    value={priceTier}
                    onChange={(e) => setPriceTier(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">Tất cả mức giá</option>
                    <option value="under_1_5m">Dưới 1.5 triệu</option>
                    <option value="1_5m_3m">1.5 - 3 triệu</option>
                    <option value="above_3m">Trên 3 triệu</option>
                  </select>
                </div>
              </div>

              {/* Nút Tìm Kiếm CTA */}
              <button
                type="submit"
                className="w-full md:w-auto bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shrink-0 shadow-md shadow-teal-600/30 whitespace-nowrap"
              >
                Tìm kiếm →
              </button>
            </form>

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

      {/* 4. THANH THỐNG KÊ Ở ĐÁY: Grouped inside a clean floating glass pill + Geometric Sans-Serif font-extrabold */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 pt-2 flex flex-wrap items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/90">
          <span>‹</span>
          <span className="text-teal-300 font-bold">01</span>
          <span>/</span>
          <span>04</span>
          <span>›</span>
        </div>

        {/* Floating Glass Stats Bar */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-2xl px-6 sm:px-8 py-3 shadow-xl">
          <div>
            <div className="text-xl sm:text-2xl font-sans font-extrabold tabular-nums text-white">
              450<span className="text-teal-400">+</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold whitespace-nowrap">
              Phòng trọ đã khảo sát
            </div>
          </div>
          <div className="h-7 w-px bg-white/20 hidden sm:block" />
          <div>
            <div className="text-xl sm:text-2xl font-sans font-extrabold tabular-nums text-white">
              100<span className="text-teal-400">%</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold whitespace-nowrap">
              Hợp đồng chính chủ
            </div>
          </div>
          <div className="h-7 w-px bg-white/20 hidden sm:block" />
          <div>
            <div className="text-xl sm:text-2xl font-sans font-extrabold tabular-nums text-teal-300">
              0đ
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold whitespace-nowrap">
              Phí môi giới trung gian
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/90">
          <span className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
            <span className="w-1 h-2 bg-teal-400 rounded-full animate-bounce" />
          </span>
          <span className="font-semibold">Cuộn xuống</span>
        </div>
      </div>

      {/* Part 2 #4: Subtle bottom gradient fade to seamlessly transition into next section without harsh cut */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none z-10" />

    </section>
  );
};
