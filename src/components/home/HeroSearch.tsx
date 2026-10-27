import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ArrowRight, 
  X, 
  RotateCcw,
  CheckCircle2
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
    <div className="relative bg-[#FAFAF9] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section: High-contrast, easy-to-read, professional typography */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-300 text-stone-900 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Cổng tra cứu phòng trọ chính chủ tỉnh Thái Nguyên</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight mb-3">
            Tìm phòng trọ Thái Nguyên
          </h1>

          <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed">
            Minh bạch chi phí điện nước • Khảo sát thực tế 100% • Gần trường & KCN Samsung Phổ Yên
          </p>
        </div>

        {/* Master Search Dock: High-contrast text & uniform 48px height */}
        <div className="bg-white rounded-2xl sm:rounded-full border border-stone-300 shadow-sm p-2">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
            {/* Field 1: Keyword Input */}
            <div 
              ref={suggestionRef}
              className="flex-1 h-12 px-4 flex flex-col justify-center rounded-xl sm:rounded-full hover:bg-stone-50 transition relative"
            >
              <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wide leading-none mb-1">
                Địa điểm / Tên trường
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
                  className="w-full bg-transparent text-sm font-bold text-stone-900 placeholder-stone-500 focus:outline-none leading-none"
                />
                {keyword && (
                  <button 
                    type="button" 
                    onClick={() => { setKeyword(''); setShowSuggestions(false); }}
                    className="p-0.5 text-stone-500 hover:text-stone-900"
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
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-elevated border border-stone-200 overflow-hidden z-30 max-h-56 overflow-y-auto"
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
                          className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-stone-100 flex items-center justify-between text-xs transition"
                        >
                          <div className="truncate mr-2">
                            <span className="font-extrabold text-stone-900">{s.label}</span>
                            {s.ward && <span className="text-stone-600 ml-1.5 font-medium">({s.ward})</span>}
                          </div>
                          <span className="text-[10px] bg-stone-100 text-stone-800 font-bold px-2 py-0.5 rounded border border-stone-200">
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
            <div className="hidden sm:block h-6 w-[1px] bg-stone-300 shrink-0 my-auto" />

            {/* Field 2: Ward Select */}
            <div className="sm:w-56 h-12 px-4 flex flex-col justify-center rounded-xl sm:rounded-full hover:bg-stone-50 transition cursor-pointer">
              <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wide leading-none mb-1">
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

            {/* Hairline Divider */}
            <div className="hidden sm:block h-6 w-[1px] bg-stone-300 shrink-0 my-auto" />

            {/* Field 3: Filter Trigger */}
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`h-12 px-4 flex items-center justify-center gap-1.5 rounded-xl sm:rounded-full text-xs font-bold transition shrink-0 ${
                isAdvancedOpen || activeAdvancedCount > 0
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-black'
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

            {/* Field 4: Search Action Button */}
            <button
              type="submit"
              className="h-12 px-6 bg-stone-900 hover:bg-black text-white font-bold text-sm rounded-xl sm:rounded-full shadow-xs transition flex items-center justify-center gap-2 shrink-0 active:scale-98"
            >
              <span>Tìm kiếm</span>
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
                className="overflow-hidden border-t border-stone-200 mt-2 pt-3 px-2 sm:px-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
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
                          className={`py-1.5 px-2 rounded-lg border font-bold transition text-center ${
                            priceTier === p.id
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-stone-200'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                      Loại hình phòng
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full bg-stone-100 border border-stone-300 rounded-lg p-2 text-xs font-bold text-stone-900 focus:outline-none"
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
                    <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
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
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                              isSelected
                                ? 'bg-stone-900 border-stone-900 text-white'
                                : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-stone-200'
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

                <div className="flex items-center justify-between pt-2.5 border-t border-stone-200 text-xs">
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
                      className="px-4 py-1.5 bg-stone-900 text-white rounded-lg font-bold shadow-xs hover:bg-black"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Tags: High contrast text on white/stone-100 */}
          <div className="mt-2 pt-2 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs px-2 sm:px-4">
            <span className="text-[11px] font-extrabold text-stone-700 whitespace-nowrap">
              Tìm nhanh:
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
                className="px-3 py-1 rounded-full bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold whitespace-nowrap transition border border-stone-300 shadow-2xs"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Proof Bar: High contrast, dark text */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-bold text-stone-800">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>450+ Phòng khảo sát thực tế</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Minh bạch tiền điện nước</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>0đ Phí môi giới</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Hợp đồng chuẩn pháp lý</span>
          </div>
        </div>
      </div>
    </div>
  );
};
