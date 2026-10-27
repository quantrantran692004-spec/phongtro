import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowRight, 
  Sparkles, 
  X, 
  Check, 
  CheckCircle2, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { WARDS_BY_DISTRICT, THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';
import { ALL_AMENITIES } from '../../data/amenities';

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
  
  // Progressive Disclosure: Advanced filters panel toggle
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Real-time suggestions state
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

  // Filter dynamic suggestions
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
    <div className="relative bg-gradient-to-b from-emerald-50/40 via-white to-stone-50/60 pt-8 pb-10 sm:pt-12 sm:pb-16 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title Section - Focused & Uncluttered */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 bg-white border border-stone-300 text-stone-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Cổng tra cứu phòng trọ chính chủ tỉnh Thái Nguyên</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-2.5">
            Tìm phòng trọ Thái Nguyên{' '}
            <span className="text-brand-700">chuẩn giá & minh bạch</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
            Khảo sát thực tế hơn 450+ phòng gần ĐH Thái Nguyên (Y Dược, Sư Phạm, CNTT...) & KCN Samsung Phổ Yên.
          </p>
        </div>

        {/* Master Search Capsule with Progressive Disclosure */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-card border border-stone-200 p-3 sm:p-4">
          <form onSubmit={handleSearch} className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
            {/* Field 1: Keyword with Autocomplete */}
            <div 
              ref={suggestionRef}
              className="flex-1 bg-stone-50 rounded-xl p-2.5 px-3.5 border border-stone-200 focus-within:border-brand-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition relative"
            >
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-0.5">
                Địa điểm / Trường ĐH
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
                  className="w-full bg-transparent text-sm font-semibold text-stone-900 placeholder-stone-400 focus:outline-none"
                />
                {keyword && (
                  <button 
                    type="button" 
                    onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Dynamic Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-elevated border border-stone-200 overflow-hidden z-30 max-h-56 overflow-y-auto"
                  >
                    <div className="p-1 space-y-0.5">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setKeyword(s.label);
                            if (s.ward) setWard(s.ward);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-brand-50 flex items-center justify-between text-xs transition"
                        >
                          <div className="truncate mr-2">
                            <span className="font-bold text-stone-900">{s.label}</span>
                            {s.ward && <span className="text-stone-400 ml-1.5 font-normal">({s.ward})</span>}
                          </div>
                          <span className="text-[10px] bg-stone-100 text-stone-500 font-semibold px-1.5 py-0.5 rounded shrink-0">
                            {s.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 2: Ward Select */}
            <div className="sm:w-56 bg-stone-50 rounded-xl p-2.5 px-3.5 border border-stone-200 focus-within:border-brand-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-0.5 truncate">
                Khu vực Phường / Xã
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-700 shrink-0" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none cursor-pointer truncate"
                >
                  <option value="Tất cả">Toàn Thái Nguyên</option>
                  {wards.filter(w => w !== 'Tất cả').map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Secondary Action: Progressive Disclosure Filter Button */}
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`py-3 px-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 ${
                isAdvancedOpen || activeAdvancedCount > 0
                  ? 'bg-brand-50 border-brand-300 text-brand-800'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Bộ lọc</span>
              {activeAdvancedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-700 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
            </button>

            {/* Primary Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto py-3 sm:py-3.5 px-6 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Tìm kiếm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Progressive Disclosure: Expandable Advanced Filters Drawer */}
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-stone-200 mt-3 pt-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
                  {/* Filter 1: Khoảng giá */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
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
                          className={`py-1.5 px-2 rounded-lg border font-medium transition text-center ${
                            priceTier === p.id
                              ? 'bg-brand-50 border-brand-600 text-brand-900 font-bold'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter 2: Loại phòng */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Loại hình phòng
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-semibold text-stone-800 focus:outline-none"
                    >
                      <option value="all">Tất cả loại phòng</option>
                      <option value="single">Phòng trọ khép kín</option>
                      <option value="studio">Studio tiện nghi</option>
                      <option value="mini_apartment">Chung cư mini</option>
                      <option value="whole_house">Nhà nguyên căn</option>
                      <option value="dormitory">Ký túc xá / Box</option>
                    </select>
                  </div>

                  {/* Filter 3: Tiện ích ưu tiên */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Tiện ích quan trọng
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'air_conditioner', label: 'Điều hòa' },
                        { id: 'water_heater', label: 'Nóng lạnh' },
                        { id: 'private_bathroom', label: 'Khép kín' },
                        { id: 'free_hours', label: 'Tự do 24/7' },
                      ].map((am) => {
                        const isSelected = selectedAmenities.includes(am.id);
                        return (
                          <button
                            key={am.id}
                            type="button"
                            onClick={() => handleToggleAmenity(am.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                              isSelected
                                ? 'bg-brand-700 border-brand-700 text-white'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
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

                {/* Footer Controls in Advanced Drawer */}
                <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 text-xs">
                  <button
                    type="button"
                    onClick={resetAdvanced}
                    className="text-stone-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại bộ lọc</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAdvancedOpen(false)}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 font-semibold"
                    >
                      Thu gọn
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAdvancedOpen(false); applySearch(); }}
                      className="px-4 py-1.5 bg-brand-700 text-white rounded-lg font-bold shadow-xs hover:bg-brand-800"
                    >
                      Áp dụng lọc
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Popular Tags (Progressive - Only 4 clean items) */}
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-stone-500 whitespace-nowrap">
              Tìm nhanh:
            </span>

            {[
              { label: 'ĐH Y Dược', keyword: 'Y Dược', ward: 'P. Quang Trung' },
              { label: 'Làng ĐH Tân Thịnh', keyword: '', ward: 'P. Tân Thịnh' },
              { label: 'Samsung Phổ Yên', keyword: 'Samsung', ward: 'TX. Phổ Yên' },
              { label: 'Dưới 1.5 triệu', keyword: '', ward: 'Tất cả', price: 'under_1_5m' },
            ].map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickTagClick(tag.keyword, tag.ward, undefined, tag.price)}
                className="px-2.5 py-0.5 rounded-md bg-stone-100 hover:bg-brand-50 hover:text-brand-900 text-stone-700 text-xs font-semibold whitespace-nowrap transition border border-stone-200"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Integrated Proof Ribbon (Replaces 4 bulky cards to save 180px of vertical space) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-stone-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-700" />
            <span>450+ Phòng khảo sát thực tế</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-700" />
            <span>Minh bạch số điện nước</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-700" />
            <span>0đ Phí môi giới / Không trung gian</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-700" />
            <span>Hợp đồng mẫu bảo vệ tiền cọc</span>
          </div>
        </div>
      </div>
    </div>
  );
};
