import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Layers, 
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

  const activeCount = 
    (filters.keyword ? 1 : 0) +
    (filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã' ? 1 : 0) +
    (filters.university && filters.university !== 'Tất cả' ? 1 : 0) +
    (filters.roomType && filters.roomType !== 'all' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 10000000 ? 1 : 0) +
    (filters.minArea > 0 || filters.maxArea < 100 ? 1 : 0) +
    filters.amenities.length +
    (filters.status && filters.status !== 'all' ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-900" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
            Bộ Lọc Tìm Kiếm
          </h3>
          {activeCount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 transition"
            title="Đặt lại bộ lọc"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa lọc</span>
          </button>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-900 rounded"
              aria-label="Đóng bộ lọc"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">
          Từ khóa tìm kiếm
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => updateFilters({ keyword: e.target.value })}
            placeholder="Tên đường, địa chỉ, tên trọ..."
            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition"
          />
        </div>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* Ward / Area */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-900" />
          <span>Khu vực Phường / Xã</span>
        </label>
        <select
          value={filters.ward}
          onChange={(e) => updateFilters({ ward: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer"
        >
          {wards.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* University */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-slate-900" />
          <span>Trường Đại Học / KCN</span>
        </label>
        <select
          value={filters.university}
          onChange={(e) => updateFilters({ university: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer"
        >
          <option value="Tất cả">Tất cả trường & KCN</option>
          {THAI_NGUYEN_UNIVERSITIES.map((u) => (
            <option key={u.id} value={u.name}>{u.shortName}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* Room Type */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">
          Loại hình không gian
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'single', label: 'Phòng đơn' },
            { id: 'studio', label: 'Studio' },
            { id: 'mini_apartment', label: 'CC mini' },
            { id: 'whole_house', label: 'Nguyên căn' },
            { id: 'dormitory', label: 'Ký túc xá' },
          ].map((item) => {
            const isSelected = filters.roomType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateFilters({ roomType: item.id })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* Price Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-slate-900" />
            <span>Mức giá</span>
          </label>
          <span className="text-xs font-semibold text-slate-900">
            {formatCurrency(filters.minPrice, true)} - {filters.maxPrice >= 10000000 ? 'Tất cả' : formatCurrency(filters.maxPrice, true)}
          </span>
        </div>

        <div className="space-y-1.5">
          {[
            { label: 'Tất cả mức giá', min: 0, max: 10000000 },
            { label: 'Dưới 1 triệu/tháng', min: 0, max: 1000000 },
            { label: 'Từ 1 - 1.8 triệu/tháng', min: 1000000, max: 1800000 },
            { label: 'Từ 1.8 - 2.5 triệu/tháng', min: 1800000, max: 2500000 },
            { label: 'Trên 2.5 triệu/tháng', min: 2500000, max: 10000000 },
          ].map((preset, idx) => {
            const isSelected = filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => updateFilters({ minPrice: preset.min, maxPrice: preset.max })}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white font-medium shadow-sm'
                    : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{preset.label}</span>
                {isSelected && <span className="text-white font-bold text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* Area Presets */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-900" />
          <span>Diện tích</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Tất cả', min: 0, max: 100 },
            { label: '< 20 m²', min: 0, max: 20 },
            { label: '20 - 30 m²', min: 20, max: 30 },
            { label: '> 30 m²', min: 30, max: 100 },
          ].map((a, idx) => {
            const isSelected = filters.minArea === a.min && filters.maxArea === a.max;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => updateFilters({ minArea: a.min, maxArea: a.max })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* Amenities Multi-check */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            Tiện nghi & Dịch vụ
          </label>
          {filters.amenities.length > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {filters.amenities.length}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
          {ALL_AMENITIES.map((amenity) => {
            const isChecked = filters.amenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => handleAmenityToggle(amenity.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all inline-flex items-center gap-1.5 ${
                  isChecked
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{amenity.name}</span>
                {isChecked && <span className="text-[10px] font-bold">✕</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* Status Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">
          Tình trạng phòng
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateFilters({ status: 'all' })}
            className={`flex-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all text-center ${
              filters.status === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => updateFilters({ status: 'available' })}
            className={`flex-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all text-center ${
              filters.status === 'available'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            Còn trống
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 my-4" />

      {/* Apply / Reset Actions */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={() => {
            if (onCloseMobile) onCloseMobile();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-slate-900 text-white rounded-full py-3 text-sm font-semibold w-full hover:bg-slate-800 transition shadow-sm"
        >
          Áp dụng bộ lọc
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={resetFilters}
            className="text-slate-500 hover:text-slate-900 text-xs font-medium transition py-1"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};
