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
  Building2,
  CheckCircle2,
  Compass,
  Headphones,
  Home,
  Users,
  Star,
  RefreshCw,
  MessageCircle
} from 'lucide-react';
import { WARDS_BY_DISTRICT, THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';
import heroBackground from '../../assets/anhmoi.png';

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
    <section className="relative w-full min-h-screen lg:h-screen lg:min-h-[780px] lg:max-h-[1080px] overflow-hidden flex flex-col justify-between select-none">
      
      {/* 1. ẢNH NỀN GỐC ANHMOI.PNG - GIỮ NGUYÊN 100%, KHÔNG CẮT XÉN, KHÔNG KÉO GIÃN, KHÔNG PHỦ MỜ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroBackground}
          alt="Không gian sống đẳng cấp"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Khoảng đệm cho Header */}
      <div className="h-24 sm:h-28 shrink-0" />

      {/* 2. NỘI DUNG CHÍNH (CHUẨN THEO MẪU MOCKUP) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-8 w-full my-auto py-2">
        <div className="max-w-3xl relative">
          
          {/* Eyebrow Label with subtle dash */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-[2px] bg-teal-800"></span>
            <span className="text-teal-900 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">
              NỀN TẢNG TÌM PHÒNG TRỌ UY TÍN HÀNG ĐẦU
            </span>
          </div>

          {/* ĐẠI TIÊU ĐỀ CHUẨN SERIF LUXURY PROPTECH */}
          <h1 className="mb-3.5 tracking-tight">
            <span className="block font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 leading-[1.12]">
              Kiến tạo không gian sống
            </span>
            <span className="block font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-teal-800 leading-[1.12]">
              Chuẩn mực & Minh bạch
            </span>
          </h1>

          {/* Đoạn mô tả phụ theo mẫu */}
          <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed max-w-xl mb-5">
            Phòng trọ cao cấp, khép kín, sạch sẽ, đầy đủ tiện nghi, an ninh 24/7. Tạo nên trải nghiệm sống tốt hơn cho mọi người.
          </p>

          {/* 4 Feature Badges có Icon (Ảnh thật, Xác thực, Vị trí đẹp, Hỗ trợ 24/7) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl mb-6">
            <div className="flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold block text-slate-900">100%</span>
                <span className="text-slate-600 font-normal">Ảnh thật</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold block text-slate-900">Xác thực</span>
                <span className="text-slate-600 font-normal">chủ trọ</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-900">
              <Compass className="w-4 h-4 text-teal-800 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold block text-slate-900">Vị trí đẹp</span>
                <span className="text-slate-600 font-normal">thuận tiện</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-900">
              <Headphones className="w-4 h-4 text-teal-800 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold block text-slate-900">Hỗ trợ 24/7</span>
                <span className="text-slate-600 font-normal">nhanh chóng</span>
              </div>
            </div>
          </div>

          {/* 3. THANH TÌM KIẾM COMMAND DOCK BO TRÒN THEO MOCKUP */}
          <div id="search-dock" className="w-full max-w-4xl relative">
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-white">
              
              {/* Category Tabs: Kèm Icon theo mockup */}
              <div className="flex flex-wrap items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                {[
                  { id: 'all', label: 'Tất cả phòng', icon: Home },
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
                          ? 'bg-teal-800 text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Search Bar: 3 Cột rộng rãi có đường kẻ dọc phân cách */}
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

                {/* Cột 2: Khu vực */}
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

                {/* Cột 3: Mức giá */}
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
                    className={`p-3 rounded-2xl transition-all duration-200 border flex items-center justify-center ${
                      isAdvancedOpen || activeAdvancedCount > 0
                        ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 border-transparent text-slate-700'
                    }`}
                    title="Bộ lọc nâng cao"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    {activeAdvancedCount > 0 && (
                      <span className="ml-1 w-4 h-4 rounded-full bg-teal-800 text-white text-[10px] font-bold flex items-center justify-center">
                        {activeAdvancedCount}
                      </span>
                    )}
                  </button>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-teal-800 hover:bg-teal-900 text-white font-semibold px-7 py-3 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Tìm kiếm →</span>
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
                                ? 'bg-teal-800 border-teal-800 text-white font-bold shadow-sm'
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
                                ? 'bg-teal-800 border-teal-800 text-white font-bold shadow-sm'
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
                      className="px-4 py-1.5 rounded-lg bg-teal-800 text-white font-bold hover:bg-teal-900 transition shadow-sm"
                    >
                      Áp dụng bộ lọc
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. THANH TÍN NHIỆM (TRUST PILLS) THEO MẪU MOCKUP */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-800">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
                <span className="text-teal-800 font-bold">✓</span>
                <span>100% Ảnh chụp thực tế</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
                <span className="text-teal-800 font-bold">✓</span>
                <span>Kết nối trực tiếp chủ nhà</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
                <span className="text-teal-800 font-bold">✓</span>
                <span>Minh bạch giá điện nước</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
                <span className="text-teal-800 font-bold">✓</span>
                <span>Hỗ trợ từ A-Z</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. BOTTOM BAR TOÀN BỘ THEO MẪU MOCKUP (QUOTE BÊN TRÁI + 4 STATS + CHAT NGAY BÊN PHẢI) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-8 w-full pb-6 pt-4 flex flex-wrap items-center justify-between gap-4 text-white">
        
        {/* Left Quote */}
        <div className="flex items-center gap-3">
          <div className="font-serif italic text-white/90 text-sm sm:text-base tracking-wide drop-shadow-md">
            Không chỉ là nơi ở<br className="hidden sm:inline" /> mà là một trải nghiệm sống
          </div>
          <div className="w-10 h-px bg-white/30 hidden sm:block"></div>
        </div>

        {/* 4 Live Metrics in Frosted Strip */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-7 text-xs bg-slate-900/40 backdrop-blur-md border border-white/15 px-5 py-2.5 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-teal-300" />
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm">12.000+</div>
              <div className="text-[10px] text-white/70 whitespace-nowrap">phòng trọ đang đăng</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-300" />
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm">50.000+</div>
              <div className="text-[10px] text-white/70 whitespace-nowrap">người đã tìm được phòng</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-teal-300 fill-teal-300" />
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm">4.9/5</div>
              <div className="text-[10px] text-white/70 whitespace-nowrap">Đánh giá từ người dùng</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-teal-300" />
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm">Phục vụ 24/7</div>
              <div className="text-[10px] text-white/70 whitespace-nowrap">mọi lúc mọi nơi</div>
            </div>
          </div>
        </div>

        {/* Right Floating Chat Capsule */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('room-list-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2.5 bg-teal-900/80 hover:bg-teal-900 text-white border border-teal-500/40 px-4 py-2 rounded-full shadow-xl transition-all duration-200 active:scale-95"
        >
          <div className="w-7 h-7 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="text-left text-xs leading-tight pr-1">
            <span className="font-bold block text-white">Chat ngay</span>
            <span className="text-[10px] text-teal-300">Hỗ trợ nhanh</span>
          </div>
        </button>

      </div>

    </section>
  );
};
