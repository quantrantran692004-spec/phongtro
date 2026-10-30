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
    <section className="relative w-full bg-slate-100 select-none overflow-hidden">
      
      {/* 1. CONTAINER CHUẨN TỶ LỆ 16:9 NGUYÊN BẢN CỦA ANHMOI.PNG - KHÔNG CROP, KHÔNG BÓP MÉO */}
      <div className="relative w-full aspect-[1672/941] min-h-[660px] md:min-h-0">
        <img
          src={heroBackground}
          alt="Không gian sống đẳng cấp"
          className="w-full h-auto block object-cover md:object-fill"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* 2. LỚP OVERLAY GIAO DIỆN RIÊNG BIỆT (TÁCH BIỆT HTML/CSS 100%) */}
        <div className="absolute inset-0 flex flex-col justify-between pt-24 sm:pt-28 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-[11.5%] pointer-events-auto">
          
          {/* NỘI DUNG CHÍNH TRÊN HERO */}
          <div className="w-full my-auto">
            
            {/* Eyebrow Label with subtle dash */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-6 sm:w-8 h-[2px] bg-teal-800"></span>
              <span className="text-teal-900 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase drop-shadow-xs">
                NỀN TẢNG TÌM PHÒNG TRỌ UY TÍN HÀNG ĐẦU
              </span>
            </div>

            {/* ĐẠI TIÊU ĐỀ: Giới hạn chiều rộng 620px, chia đúng 2 dòng như ảnh mẫu */}
            <h1 className="max-w-[620px] mb-2 sm:mb-3 tracking-tight">
              <span className="block font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-slate-900 leading-[1.14]">
                Kiến tạo không gian sống
              </span>
              <span className="block font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-teal-800 leading-[1.14]">
                Chuẩn mực & Minh bạch
              </span>
            </h1>

            {/* Đoạn mô tả: Rộng 450–480px, tối đa 2 dòng, cỡ chữ 16–18px, line-height 1.5 */}
            <p className="max-w-[480px] text-slate-800 text-[15px] sm:text-[16px] lg:text-[17px] font-normal leading-[1.5] mb-4 sm:mb-5 line-clamp-2">
              Phòng trọ cao cấp, khép kín, sạch sẽ, đầy đủ tiện nghi, an ninh 24/7. Tạo nên trải nghiệm sống tốt hơn cho mọi người.
            </p>

            {/* 4 Feature Badges có Icon: Căn thành hàng gọn gàng, khoảng cách đều */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 max-w-[620px] mb-5 sm:mb-7">
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

            {/* 3. THANH TÌM KIẾM COMMAND DOCK: Rộng 900–1020px trên màn hình desktop */}
            <div id="search-dock" className="w-full max-w-[980px] relative">
              <div className="bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-white">
                
                {/* Category Tabs: Kèm Icon */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
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
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
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

                {/* Main Search Bar: CÁC TRƯỜNG CHIA ĐỀU, CHỮ KHÔNG BỊ CẮT, NÚT TÌM KIẾM KHÔNG BỊ ÉP */}
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 md:divide-x md:divide-slate-200/80"
                >
                  {/* Cột 1: Từ khóa / Trường ĐH (flex-[1.4] min-w-0) */}
                  <div 
                    ref={suggestionRef}
                    className="flex-[1.4] min-w-0 flex items-center gap-2.5 hover:bg-slate-50/80 rounded-xl md:rounded-r-none px-3.5 py-2 transition cursor-pointer relative"
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

                  {/* Cột 2: Khu vực (flex-1 min-w-0 để hiện trọn Toàn Thái Nguyên) */}
                  <div className="flex-1 min-w-0 flex items-center gap-2 hover:bg-slate-50/80 rounded-xl md:rounded-none px-3.5 py-2 transition cursor-pointer">
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

                  {/* Cột 3: Mức giá (flex-1 min-w-0 để hiện trọn Tất cả mức giá) */}
                  <div className="flex-1 min-w-0 flex items-center gap-2 hover:bg-slate-50/80 rounded-xl md:rounded-none px-3.5 py-2 transition cursor-pointer">
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
                  <div className="p-1 md:pl-2.5 flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                      className={`p-2.5 sm:p-3 rounded-2xl transition-all duration-200 border flex items-center justify-center ${
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
                      className="flex-1 md:flex-initial bg-teal-800 hover:bg-teal-900 text-white font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
              <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-800">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
                  <span className="text-teal-800 font-bold">✓</span>
                  <span>100% Ảnh chụp thực tế</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
                  <span className="text-teal-800 font-bold">✓</span>
                  <span>Kết nối trực tiếp chủ nhà</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
                  <span className="text-teal-800 font-bold">✓</span>
                  <span>Minh bạch giá điện nước</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs hidden sm:inline-flex">
                  <span className="text-teal-800 font-bold">✓</span>
                  <span>Hỗ trợ từ A-Z</span>
                </span>
              </div>
            </div>

          </div>

          {/* 5. BOTTOM BAR: Căn thành hàng gọn gàng, không kéo dài tràn mép */}
          <div className="w-full pt-2 flex flex-wrap items-center justify-between gap-3 text-white">
            
            {/* Left Quote */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="font-serif italic text-white/90 text-sm tracking-wide drop-shadow-md">
                Không chỉ là nơi ở<br /> mà là một trải nghiệm sống
              </div>
              <div className="w-8 h-px bg-white/30"></div>
            </div>

            {/* 4 Live Metrics in Frosted Strip */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs bg-slate-900/40 backdrop-blur-md border border-white/15 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300" />
                <div>
                  <div className="font-extrabold text-white text-[11px] sm:text-xs">12.000+</div>
                  <div className="text-[9px] sm:text-[10px] text-white/70 whitespace-nowrap">phòng trọ đang đăng</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300" />
                <div>
                  <div className="font-extrabold text-white text-[11px] sm:text-xs">50.000+</div>
                  <div className="text-[9px] sm:text-[10px] text-white/70 whitespace-nowrap">người đã tìm được phòng</div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300 fill-teal-300" />
                <div>
                  <div className="font-extrabold text-white text-[11px] sm:text-xs">4.9/5</div>
                  <div className="text-[9px] sm:text-[10px] text-white/70 whitespace-nowrap">Đánh giá từ người dùng</div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300" />
                <div>
                  <div className="font-extrabold text-white text-[11px] sm:text-xs">Phục vụ 24/7</div>
                  <div className="text-[9px] sm:text-[10px] text-white/70 whitespace-nowrap">mọi lúc mọi nơi</div>
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
              className="inline-flex items-center gap-2 bg-teal-900/80 hover:bg-teal-900 text-white border border-teal-500/40 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl transition-all duration-200 active:scale-95"
            >
              <div className="w-6 h-6 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div className="text-left text-xs leading-tight pr-1">
                <span className="font-bold block text-white text-[11px] sm:text-xs">Chat ngay</span>
                <span className="text-[9px] sm:text-[10px] text-teal-300">Hỗ trợ nhanh</span>
              </div>
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};
