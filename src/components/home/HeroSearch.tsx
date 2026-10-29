import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowRight, 
  X, 
  RotateCcw,
  GraduationCap,
  Sparkles,
  Building2
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
      
      {/* 1. ẢNH NỀN SẮC NÉT NGUYÊN BẢN 100% */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSunsetVilla}
          alt="Không gian sống đẳng cấp"
          className="w-full h-full object-cover object-center scale-[1.01]"
        />
        {/* Hero Scrim Protection: Lớp phủ chuyển sắc bên trái w-3/5 tách biệt hoàn toàn chữ khỏi nền */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-white/95 via-white/75 to-transparent pointer-events-none" />
      </div>

      {/* Khoảng đệm cho Header */}
      <div className="h-20 sm:h-24 shrink-0" />

      {/* 2. NỘI DUNG CHÍNH (CHUẨN LƯỚI max-w-[1360px] mx-auto px-6 lg:px-8) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-8 w-full my-auto py-2">
        <div className="max-w-4xl relative">
          
          {/* Badge trên cùng: BẤT ĐỘNG SẢN & PHÒNG TRỌ THÁI NGUYÊN */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-sm text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>BẤT ĐỘNG SẢN & PHÒNG TRỌ THÁI NGUYÊN</span>
          </div>

          {/* ĐẠI TIÊU ĐỀ CHÍNH */}
          <h1 className="tracking-tight leading-[1.15] mb-4">
            <span className="block text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900">
              Kiến tạo Không gian sống
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-[50px] font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Chuẩn mực & Minh bạch
            </span>
          </h1>

          {/* Đoạn mô tả phụ */}
          <p className="text-slate-700 text-base lg:text-lg font-medium leading-relaxed max-w-xl mt-4 mb-8">
            Phòng trọ cao cấp khảo sát thực tế 100%, kết nối trực tiếp chủ trọ và cam kết minh bạch tuyệt đối chi phí điện nước.
          </p>

          {/* 3. TỐI GIẢN & NÂNG CẤP THANH TÌM KIẾM (UNIFIED COMMAND SEARCH DOCK - max-w-4xl mt-8) */}
          <div id="search-dock" className="w-full max-w-4xl relative mt-4">
            <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-3 md:p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-white">
              
              {/* Category Tabs: Kèm Icon mảnh tinh tế, tab đang chọn có shadow-emerald-600/25 */}
              <div className="flex flex-wrap items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                {[
                  { id: 'all', label: 'Tất cả phòng', icon: Sparkles },
                  { id: 'studio', label: 'Studio & Căn hộ', icon: Building2 },
                  { id: 'university', label: 'Gần trường ĐH', icon: GraduationCap },
                  { id: 'samsung', label: 'KCN Samsung', icon: MapPin },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategoryTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleCategoryTabSelect(tab.id as any)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Search Bar: 3 Cột rộng rãi có đường kẻ dọc phân cách (divide-x divide-slate-200/80) */}
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 md:grid-cols-[1.4fr_1.1fr_1.1fr_auto] items-center gap-2 md:gap-0 md:divide-x md:divide-slate-200/80"
              >
                {/* Cột 1: Từ khóa / Trường ĐH */}
                <div 
                  ref={suggestionRef}
                  className="flex items-center gap-2.5 hover:bg-slate-50/80 rounded-xl md:rounded-r-none px-3.5 py-2 transition cursor-pointer relative min-w-0"
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
                      placeholder="VD: ĐH Y Dược, KCN Samsung..."
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

                {/* Cột 2: Khu vực (Hiển thị trọn vẹn Toàn Thái Nguyên) */}
                <div className="flex items-center gap-2 hover:bg-slate-50/80 rounded-xl md:rounded-none px-3.5 py-2 transition cursor-pointer min-w-0">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="w-full min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
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

                {/* Cột 3: Mức giá (Hiển thị trọn vẹn Tất cả mức giá) */}
                <div className="flex items-center gap-2 hover:bg-slate-50/80 rounded-xl md:rounded-none px-3.5 py-2 transition cursor-pointer min-w-0">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="w-full min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                      Mức giá
                    </span>
                    <select 
                      value={priceTier}
                      onChange={(e) => setPriceTier(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="all">Tất cả mức giá</option>
                      <option value="under_1_5m">Dưới 1.5 triệu</option>
                      <option value="1_5m_3m">1.5 - 3 triệu</option>
                      <option value="above_3m">Trên 3 triệu</option>
                    </select>
                  </div>
                </div>

                {/* Cụm nút hành động bên phải: Nút Icon Bộ lọc nâng cao + Nút Tìm Kiếm CTA */}
                <div className="p-1 pl-2.5 flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className={`p-3 rounded-xl transition-all duration-200 border flex items-center justify-center ${
                      isAdvancedOpen || activeAdvancedCount > 0
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 border-transparent text-slate-700'
                    }`}
                    title="Bộ lọc nâng cao"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    {activeAdvancedCount > 0 && (
                      <span className="ml-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {activeAdvancedCount}
                      </span>
                    )}
                  </button>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-xs uppercase tracking-wider"
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
                                ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-sm'
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
                                ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-sm'
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
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition shadow-sm"
                    >
                      Áp dụng bộ lọc
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. THANH TÍN NHIỆM (TRUST INDICATORS) NGAY DƯỚI KHUNG TÌM KIẾM */}
            <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-700">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-xs">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>100% Ảnh chụp thực tế</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-xs">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Kết nối trực tiếp chủ nhà</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-xs">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Minh bạch giá điện nước</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. NÚT CUỘN XUỐNG KÍNH MỜ TRONG SUỐT GÓC DƯỚI PHẢI */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-8 w-full pb-6 pt-2 flex items-center justify-end text-white">
        <button
          type="button"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
          }}
          className="hidden md:inline-flex items-center gap-2.5 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/25 text-white rounded-full px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 shadow-lg"
        >
          <span className="w-3.5 h-5 rounded-full border border-white/50 flex items-start justify-center p-0.5">
            <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" />
          </span>
          <span>Cuộn xuống</span>
        </button>
      </div>

    </section>
  );
};
