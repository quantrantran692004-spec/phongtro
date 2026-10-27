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
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-card p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-stone-900">
            Bộ lọc tìm kiếm
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs text-stone-400 hover:text-brand-700 flex items-center gap-1 transition"
            title="Đặt lại bộ lọc"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa lọc</span>
          </button>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 text-stone-400 hover:text-stone-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-[11px] font-bold text-stone-600 mb-1">
          Từ khóa
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => updateFilters({ keyword: e.target.value })}
            placeholder="Tên đường, địa chỉ, tên trọ..."
            className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Ward / Area */}
      <div>
        <label className="block text-[11px] font-bold text-stone-600 mb-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-stone-400" />
          <span>Khu vực Phường / Xã</span>
        </label>
        <select
          value={filters.ward}
          onChange={(e) => updateFilters({ ward: e.target.value })}
          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-white transition cursor-pointer"
        >
          {wards.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* University */}
      <div>
        <label className="block text-[11px] font-bold text-stone-600 mb-1 flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-stone-400" />
          <span>Trường Đại Học / KCN</span>
        </label>
        <select
          value={filters.university}
          onChange={(e) => updateFilters({ university: e.target.value })}
          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-white transition cursor-pointer"
        >
          <option value="Tất cả">Tất cả trường & KCN</option>
          {THAI_NGUYEN_UNIVERSITIES.map((u) => (
            <option key={u.id} value={u.name}>{u.shortName}</option>
          ))}
        </select>
      </div>

      {/* Room Type */}
      <div>
        <label className="block text-[11px] font-bold text-stone-600 mb-1">
          Loại hình phòng
        </label>
        <div className="grid grid-cols-2 gap-1 text-[11px]">
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
              className={`py-1.5 px-2 rounded-lg text-center border transition ${
                filters.roomType === item.id
                  ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Presets */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-stone-400" />
            <span>Mức giá</span>
          </label>
          <span className="text-[11px] font-bold text-brand-700">
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
              className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                filters.minPrice === preset.min && filters.maxPrice === preset.max
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{preset.label}</span>
              {filters.minPrice === preset.min && filters.maxPrice === preset.max && (
                <span className="text-brand-600 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Area Presets */}
      <div>
        <label className="block text-[11px] font-bold text-stone-600 mb-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-stone-400" />
          <span>Diện tích</span>
        </label>
        <div className="grid grid-cols-3 gap-1 text-[11px]">
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
              className={`py-1.5 px-1 rounded-lg text-center border transition ${
                filters.minArea === a.min && filters.maxArea === a.max
                  ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities Multi-check */}
      <div>
        <label className="block text-[11px] font-bold text-stone-600 mb-1.5">
          Tiện nghi & Dịch vụ ({filters.amenities.length})
        </label>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
          {ALL_AMENITIES.map((amenity) => {
            const isChecked = filters.amenities.includes(amenity.id);
            return (
              <label
                key={amenity.id}
                onClick={() => handleAmenityToggle(amenity.id)}
                className={`flex items-center gap-2 p-1.5 rounded-lg text-xs cursor-pointer transition ${
                  isChecked ? 'bg-brand-50 text-brand-900 font-semibold' : 'hover:bg-stone-50 text-stone-600'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                )}
                <span className="truncate">{amenity.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-[11px] font-bold text-stone-600 mb-1">
          Tình trạng phòng
        </label>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => updateFilters({ status: 'all' })}
            className={`flex-1 py-1.5 rounded-lg border font-medium transition ${
              filters.status === 'all'
                ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold'
                : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => updateFilters({ status: 'available' })}
            className={`flex-1 py-1.5 rounded-lg border font-medium transition ${
              filters.status === 'available'
                ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold'
                : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}
          >
            Còn trống
          </button>
        </div>
      </div>
    </div>
  );
};
