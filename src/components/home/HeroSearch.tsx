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
    <section className="relative h-screen min-h-[760px] max-h-[1080px] w-full overflow-hidden flex flex-col justify-between select-none">
      
      {/* 1. ẢNH NỀN SẮC NÉT 100% - KHÔNG PHỦ TRẮNG ĐỤC */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSunsetVilla}
          alt="Không gian sống đẳng cấp"
          className="w-full h-full object-cover object-center contrast-[1.03] saturate-[1.05] scale-100 transition-transform duration-[10000ms] ease-out hover:scale-105"
        />
        {/* Chỉ phủ tối nhẹ ở sát mép trên (cho Header) và sát mép dưới (cho số liệu thống kê) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/55 via-slate-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
      </div>

      {/* Khoảng đệm cho Header */}
      <div className="h-24 shrink-0" />

      {/* 2. NỘI DUNG CHÍNH (ĐẶT TRÊN NỀN TRỜI SÁNG BÊN TRÁI GIỐNG HỆT BẢN GỐC LUMIÈRE) */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 my-auto">
        <div className="max-w-2xl">
          
          {/* Dòng Eyebrow nhỏ */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-slate-700"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-slate-700">
              Bất động sản & Phòng trọ chuẩn mực Thái Nguyên
            </span>
          </div>

          {/* ĐẠI TIÊU ĐỀ IN HOA SANG TRỌNG (Chữ màu Đen Than & Vàng Đồng trên nền trời sáng) */}
          <h1 className="font-luxury uppercase tracking-wide leading-[1.06] mb-5">
            <span className="block text-5xl sm:text-6xl lg:text-[68px] font-bold text-slate-800 drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]">
              KIẾN TẠO
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-[68px] font-bold bg-gradient-to-r from-[#8C6239] via-[#A67C52] to-[#734F2C] bg-clip-text text-transparent">
              TƯƠNG LAI SỐNG
            </span>
          </h1>

          {/* Mô tả ngắn gọn, rõ nét */}
          <p className="text-slate-700 font-medium text-sm sm:text-base max-w-md leading-relaxed mb-7 drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
            Những không gian sống đẳng cấp, khảo sát thực tế 100%, hợp đồng trực tiếp chủ trọ và minh bạch tuyệt đối chi phí điện nước.
          </p>

          {/* Cụm 2 nút bấm chuẩn mẫu */}
          <div className="flex flex-wrap items-center gap-4 mb-9">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('search-dock');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-4 bg-[#233539] hover:bg-[#182629] text-white px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Khám phá dự án</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="group flex items-center gap-3 text-slate-900 hover:text-[#8C6239] text-xs font-bold tracking-[0.15em] uppercase transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-slate-700/40 bg-white/80 backdrop-blur-md flex items-center justify-center group-hover:scale-105 group-hover:bg-white transition-all shadow-sm text-slate-900 font-bold">
                ▸
              </span>
              <span className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">Bộ lọc nâng cao</span>
              {activeAdvancedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
            </button>
          </div>

          {/* 3. THANH TÌM KIẾM SIÊU GỌN (1 DÒNG DUY NHẤT - KHÔNG CHE CẢNH BIỂN) */}
          <div id="search-dock" className="max-w-2xl relative">
            {/* Các pill chọn nhanh nhỏ gọn phía trên */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
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
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all backdrop-blur-md ${
                    activeCategoryTab === tab.id
                      ? 'bg-[#233539] text-white shadow-sm'
                      : 'bg-white/65 hover:bg-white/90 text-slate-800 border border-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Thanh Input chính mỏng gọn, trong suốt tinh tế */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-center gap-2 bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl p-2 shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
            >
              <div 
                ref={suggestionRef}
                className="flex-1 flex items-center gap-2.5 px-3 py-1.5 w-full border-b sm:border-b-0 sm:border-r border-slate-300/60 relative"
              >
                <span className="text-slate-400">🔍</span>
                <div className="w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                    placeholder="VD: ĐH Y Dược, CNTT, Tân Thịnh..."
                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                {keyword && (
                  <button 
                    type="button" 
                    onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                    className="p-1 text-slate-400 hover:text-slate-700"
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
                            <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
                              {s.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="sm:w-48 flex items-center gap-2 px-3 py-1.5 w-full">
                <span className="text-slate-400">📍</span>
                <div className="w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Khu vực
                  </span>
                  <select 
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Tất cả">Toàn Thái Nguyên</option>
                    {wards.filter(w => w !== 'Tất cả').map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#233539] hover:bg-[#182629] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shrink-0 shadow-md"
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
                          { id: '1_5m_2_5m', label: '1.5 - 2.5 triệu' },
                          { id: 'above_2_5m', label: '> 2.5 triệu' },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPriceTier(p.id)}
                            className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition text-center ${
                              priceTier === p.id
                                ? 'bg-[#233539] border-[#233539] text-white shadow-sm'
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
                                ? 'bg-[#233539] border-[#233539] text-white shadow-sm'
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
                      className="px-4 py-1.5 rounded-lg bg-[#233539] text-white font-medium hover:bg-[#182629] transition"
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

      {/* 4. THANH THỐNG KÊ Ở ĐÁY (NỔI BẬT TRÊN NỀN GRADIENT TỐI MẶT HỒ BƠI) */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-6 pt-4 flex flex-wrap items-end justify-between gap-6 text-white">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/80">
          <span>‹</span>
          <span className="text-white font-bold">01</span>
          <span>/</span>
          <span>04</span>
          <span>›</span>
        </div>

        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          <div>
            <div className="text-2xl sm:text-3xl font-luxury font-bold text-amber-200 drop-shadow">450+</div>
            <div className="text-[10px] uppercase tracking-widest text-white/80 font-medium">Phòng trọ đã khảo sát</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-luxury font-bold text-amber-200 drop-shadow">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-white/80 font-medium">Hợp đồng chính chủ</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-luxury font-bold text-amber-200 drop-shadow">0đ</div>
            <div className="text-[10px] uppercase tracking-widest text-white/80 font-medium">Phí môi giới trung gian</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80">
          <span className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
            <span className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </span>
          <span>Cuộn xuống</span>
        </div>
      </div>

    </section>
  );
};
