import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Layers, 
  CheckSquare, 
  Square,
  X
} from 'lucide-react';
import { WARDS_BY_DISTRICT, THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { ALL_AMENITIES } from '../../data/amenities';
import { useRooms } from '../../context/RoomContext';
import { formatCurrency } from '../../utils/formatters';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const { filters, updateFilters, resetFilters } = useRooms();

  const wards = WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [];

  const handleAmenityToggle = (amenityId: string) => {
    const current = filters.amenities;
    if (current.includes(amenityId)) {
      updateFilters({ amenities: current.filter((id) => id !== amenityId) });
    } else {
      updateFilters({ amenities: [...current, amenityId] });
    }
  };

  return (
    <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DE]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-700" />
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-charcoal-900">
            Bộ Lọc Tìm Kiếm
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-charcoal-500 hover:text-charcoal-900 flex items-center gap-1 transition"
            title="Đặt lại bộ lọc"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa lọc</span>
          </button>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 text-charcoal-500 hover:text-charcoal-900 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5">
          Từ khóa tìm kiếm
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => updateFilters({ keyword: e.target.value })}
            placeholder="Tên đường, địa chỉ, tên trọ..."
            className="w-full pl-8 pr-3 py-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-bold text-charcoal-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Ward / Area */}
      <div>
        <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-700" />
          <span>Khu vực Phường / Xã</span>
        </label>
        <select
          value={filters.ward}
          onChange={(e) => updateFilters({ ward: e.target.value })}
          className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white transition cursor-pointer"
        >
          {wards.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* University */}
      <div>
        <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-brand-700" />
          <span>Trường Đại Học / KCN</span>
        </label>
        <select
          value={filters.university}
          onChange={(e) => updateFilters({ university: e.target.value })}
          className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white transition cursor-pointer"
        >
          <option value="Tất cả">Tất cả trường & KCN</option>
          {THAI_NGUYEN_UNIVERSITIES.map((u) => (
            <option key={u.id} value={u.name}>{u.shortName}</option>
          ))}
        </select>
      </div>

      {/* Room Type */}
      <div>
        <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5">
          Loại hình không gian
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'single', label: 'Phòng đơn' },
            { id: 'studio', label: 'Studio' },
            { id: 'mini_apartment', label: 'CC mini' },
            { id: 'whole_house', label: 'Nguyên căn' },
            { id: 'dormitory', label: 'Ký túc xá' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateFilters({ roomType: item.id })}
              className={`py-2 px-2 rounded-sm text-center border font-bold transition ${
                filters.roomType === item.id
                  ? 'bg-[#23483D] border-[#23483D] text-white'
                  : 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-800 hover:bg-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Presets */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-brand-700" />
            <span>Mức giá</span>
          </label>
          <span className="text-xs font-extrabold text-brand-800">
            {formatCurrency(filters.minPrice, true)} - {filters.maxPrice >= 10000000 ? 'Tất cả' : formatCurrency(filters.maxPrice, true)}
          </span>
        </div>

        <div className="space-y-1">
          {[
            { label: 'Tất cả mức giá', min: 0, max: 10000000 },
            { label: 'Dưới 1 triệu/tháng', min: 0, max: 1000000 },
            { label: 'Từ 1 - 1.8 triệu/tháng', min: 1000000, max: 1800000 },
            { label: 'Từ 1.8 - 2.5 triệu/tháng', min: 1800000, max: 2500000 },
            { label: 'Trên 2.5 triệu/tháng', min: 2500000, max: 10000000 },
          ].map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => updateFilters({ minPrice: preset.min, maxPrice: preset.max })}
              className={`w-full text-left px-3 py-2 rounded-sm text-xs transition flex items-center justify-between border ${
                filters.minPrice === preset.min && filters.maxPrice === preset.max
                  ? 'bg-[#23483D] border-[#23483D] text-white font-bold'
                  : 'bg-white border-transparent text-charcoal-800 font-medium hover:bg-[#F7F6F2]'
              }`}
            >
              <span>{preset.label}</span>
              {filters.minPrice === preset.min && filters.maxPrice === preset.max && (
                <span className="text-white font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Area Presets */}
      <div>
        <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-700" />
          <span>Diện tích</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[
            { label: 'Tất cả', min: 0, max: 100 },
            { label: '< 20 m²', min: 0, max: 20 },
            { label: '20-30 m²', min: 20, max: 30 },
            { label: '> 30 m²', min: 30, max: 100 },
          ].map((a, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => updateFilters({ minArea: a.min, maxArea: a.max })}
              className={`py-2 px-2 rounded-sm text-center border font-bold transition ${
                filters.minArea === a.min && filters.maxArea === a.max
                  ? 'bg-[#23483D] border-[#23483D] text-white'
                  : 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-800 hover:bg-stone-200'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities Multi-check */}
      <div>
        <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5">
          Tiện nghi & Dịch vụ ({filters.amenities.length})
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {ALL_AMENITIES.map((amenity) => {
            const isChecked = filters.amenities.includes(amenity.id);
            return (
              <label
                key={amenity.id}
                onClick={() => handleAmenityToggle(amenity.id)}
                className={`flex items-center gap-2 p-2 rounded-sm text-xs cursor-pointer transition ${
                  isChecked ? 'bg-[#F7F6F2] text-brand-900 font-bold border border-[#E6E4DE]' : 'hover:bg-[#F7F6F2] text-charcoal-800 font-medium'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-brand-800 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-charcoal-400 shrink-0" />
                )}
                <span className="truncate">{amenity.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5">
          Tình trạng phòng
        </label>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => updateFilters({ status: 'all' })}
            className={`flex-1 py-2 rounded-sm border font-bold transition ${
              filters.status === 'all'
                ? 'bg-[#23483D] border-[#23483D] text-white'
                : 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-800 hover:bg-stone-200'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => updateFilters({ status: 'available' })}
            className={`flex-1 py-2 rounded-sm border font-bold transition ${
              filters.status === 'available'
                ? 'bg-[#23483D] border-[#23483D] text-white'
                : 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-800 hover:bg-stone-200'
            }`}
          >
            Còn trống
          </button>
        </div>
      </div>
    </div>
  );
};