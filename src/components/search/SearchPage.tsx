import React, { useState } from 'react';
import { 
  Grid, 
  Map as MapIcon, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Home, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { RoomCard } from '../common/RoomCard';
import { MapView } from '../common/MapView';
import { FilterSidebar } from './FilterSidebar';
import { formatCurrency } from '../../utils/formatters';

interface SearchPageProps {
  onSelectRoom: (roomId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSelectRoom }) => {
  const { filteredRooms, filters, updateFilters, resetFilters } = useRooms();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active filter tags
  const hasActiveFilters = 
    filters.keyword ||
    (filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã') ||
    (filters.university && filters.university !== 'Tất cả') ||
    (filters.roomType && filters.roomType !== 'all') ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000000 ||
    filters.amenities.length > 0;

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Phòng trọ cho thuê tại Thái Nguyên</span>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                {filteredRooms.length} kết quả
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Cập nhật liên tục từ các chủ trọ và sinh viên khu vực Thái Nguyên
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl px-2.5 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="newest">Mới cập nhật</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="area_desc">Diện tích: Lớn nhất</option>
                <option value="views">Lượt xem nhiều nhất</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Danh sách</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'map'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Bản đồ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-4 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
            <span className="text-xs font-bold text-emerald-900">Đang lọc theo:</span>

            {filters.keyword && (
              <span className="inline-flex items-center gap-1 bg-white border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                Từ khóa: "{filters.keyword}"
                <button onClick={() => updateFilters({ keyword: '' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã' && (
              <span className="inline-flex items-center gap-1 bg-white border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                Khu vực: {filters.ward}
                <button onClick={() => updateFilters({ ward: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.university && filters.university !== 'Tất cả' && (
              <span className="inline-flex items-center gap-1 bg-white border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                Gần: {filters.university}
                <button onClick={() => updateFilters({ university: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(filters.minPrice > 0 || filters.maxPrice < 10000000) && (
              <span className="inline-flex items-center gap-1 bg-white border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                Giá: {formatCurrency(filters.minPrice, true)} - {formatCurrency(filters.maxPrice, true)}
                <button onClick={() => updateFilters({ minPrice: 0, maxPrice: 10000000 })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold ml-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Xóa toàn bộ bộ lọc</span>
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Desktop Filter Sidebar (4 cols) */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-20">
            <FilterSidebar />
          </div>

          {/* Results Area (8 or 9 cols) */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9">
            {filteredRooms.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Không tìm thấy phòng trọ phù hợp
                </h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Rất tiếc, hiện chưa có phòng nào đáp ứng tất cả các tiêu chí lọc của bạn. Bạn hãy thử mở rộng khoảng giá hoặc xóa bớt tiêu chí lọc nhé.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Xóa bộ lọc & xem lại tất cả</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} onSelect={onSelectRoom} />
                ))}
              </div>
            ) : (
              <div className="h-[650px] w-full">
                <MapView
                  rooms={filteredRooms}
                  onSelectRoom={onSelectRoom}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto p-4 shadow-2xl animate-in slide-in-from-right duration-300">
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
            <div className="sticky bottom-0 pt-3 pb-2 bg-white border-t border-slate-100 mt-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow"
              >
                Áp dụng bộ lọc ({filteredRooms.length} phòng)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
