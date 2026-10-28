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
    <div className="relative bg-[#111827] text-white overflow-hidden border-b border-stone-300">
      {/* Background Image with High-Contrast Dark Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85"
          alt="Phòng trọ Thái Nguyên"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/70 to-[#111827]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16">
        {/* Title: Big, Bold, Crisp, No Cutoff, Minimal Text */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Phòng Trọ Chính Chủ Thái Nguyên</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-2 drop-shadow-sm">
            Tìm Phòng Trọ Nhanh & Đúng Giá
          </h1>

          <p className="text-sm sm:text-base text-stone-200 font-semibold leading-relaxed">
            Khảo sát thực tế 100% • Minh bạch giá điện nước • Không qua trung gian
          </p>
        </div>

        {/* Master Consolidated Search Dock (GỘP HẾT VÔ ĐÂY) */}
        <div className="bg-white rounded-2xl border border-stone-300 shadow-xl p-3 sm:p-4 text-stone-900">
          {/* 1. Quick Category Tabs */}
          <div className="flex items-center gap-1.5 pb-3 border-b border-stone-200 overflow-x-auto no-scrollbar">
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition whitespace-nowrap ${
                  activeCategoryTab === tab.id
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 2. Main Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center gap-2 pt-3">
            {/* Input: Keyword */}
            <div 
              ref={suggestionRef}
              className="flex-1 h-12 px-3.5 flex flex-col justify-center rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-400 focus-within:border-stone-900 transition relative"
            >
              <label className="block text-[11px] font-black text-stone-800 uppercase tracking-wide leading-none mb-1">
                Tìm theo tên trường, đường, tên trọ
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-stone-600 shrink-0" />
                <input
                  type="text"
                  value={keyword}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Y Dược, Sư Phạm, Tân Thịnh, Z115..."
                  className="w-full bg-transparent text-sm font-bold text-stone-900 placeholder-stone-400 focus:outline-none leading-none"
                />
                {keyword && (
                  <button 
                    type="button" 
                    onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                    className="p-0.5 text-stone-500 hover:text-stone-900"
                  >
                    <X className="w-4 h-4" />
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
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-stone-300 overflow-hidden z-30 max-h-56 overflow-y-auto"
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
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center justify-between text-xs transition"
                        >
                          <div className="truncate mr-2">
                            <span className="font-extrabold text-stone-900">{s.label}</span>
                            {s.ward && <span className="text-stone-600 ml-1.5 font-semibold">({s.ward})</span>}
                          </div>
                          <span className="text-[10px] bg-stone-100 text-stone-800 font-bold px-2 py-0.5 rounded border border-stone-300">
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
            <div className="sm:w-56 h-12 px-3.5 flex flex-col justify-center rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-400 transition cursor-pointer">
              <label className="block text-[11px] font-black text-stone-800 uppercase tracking-wide leading-none mb-1">
                Khu vực Phường / Xã
              </label>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-stone-900 focus:outline-none cursor-pointer truncate leading-none"
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
              className={`h-12 px-4 flex items-center justify-center gap-1.5 rounded-xl text-xs font-extrabold border transition shrink-0 ${
                isAdvancedOpen || activeAdvancedCount > 0
                  ? 'bg-stone-200 border-stone-400 text-stone-900'
                  : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-stone-700" />
              <span>Bộ lọc</span>
              {activeAdvancedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
            </button>

            {/* Button: Submit */}
            <button
              type="submit"
              className="h-12 px-7 bg-[#111827] hover:bg-black text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0 active:scale-98 tracking-wide"
            >
              <span>Tìm phòng</span>
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
                className="overflow-hidden border-t border-stone-200 mt-3 pt-3 px-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-2 text-xs">
                  <div>
                    <label className="block text-xs font-black text-stone-900 mb-1.5">
                      Mức giá thuê:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'all', label: 'Tất cả mức giá' },
                        { id: 'under_1_5m', label: '< 1.5 triệu' },
                        { id: '1_5m_2_5m', label: '1.5 - 2.5 triệu' },
                        { id: 'above_2_5m', label: '> 2.5 triệu' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriceTier(p.id)}
                          className={`py-1.5 px-2 rounded-lg border font-bold transition text-center ${
                            priceTier === p.id
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-stone-900 mb-1.5">
                      Loại hình phòng:
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs font-bold text-stone-900 focus:outline-none"
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
                    <label className="block text-xs font-black text-stone-900 mb-1.5">
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
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                              isSelected
                                ? 'bg-stone-900 border-stone-900 text-white'
                                : 'bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100'
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

                <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                  <button
                    type="button"
                    onClick={resetAdvanced}
                    className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-bold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAdvancedOpen(false)}
                      className="px-3 py-1.5 text-stone-700 hover:text-stone-900 font-bold"
                    >
                      Thu gọn
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAdvancedOpen(false); applySearch(); }}
                      className="px-4 py-1.5 bg-stone-900 text-white rounded-lg font-bold shadow-sm hover:bg-black"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. GỘP CỤM TRƯỜNG ĐẠI HỌC VÀ KHU VỰC TRỌNG ĐIỂM NGAY DƯỚI THANH TÌM KIẾM */}
          <div className="mt-3 pt-3 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>Trường ĐH & Khu vực trọng điểm (Chọn nhanh):</span>
              </span>
            </div>

            {/* Quick Campus Buttons Grid: To, rõ ràng, đậm nét, dễ bấm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
                <button
                  key={uni.id}
                  type="button"
                  onClick={() => handleQuickSelect(uni.shortName, uni.ward)}
                  className="px-2.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-900 hover:text-white border border-stone-300 text-stone-900 transition-colors text-left flex flex-col justify-center group shadow-2xs"
                >
                  <div className="text-xs font-black truncate group-hover:text-white">
                    {uni.shortName}
                  </div>
                  <div className="text-[11px] text-stone-600 group-hover:text-stone-300 truncate font-semibold">
                    {uni.ward}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Minimal, Clean Trust Strip */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-bold text-stone-200">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Khảo sát thực tế</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Minh bạch tiền điện nước</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>0đ Phí môi giới</span>
          </div>
        </div>
      </div>
    </div>
  );
};