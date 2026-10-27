import React, { useState } from 'react';
import { 
  Grid, 
  Map as MapIcon, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  RotateCcw
} from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { RoomCard } from '../common/RoomCard';
import { MapView } from '../common/MapView';
import { FilterSidebar } from './FilterSidebar';

interface SearchPageProps {
  onSelectRoom: (roomId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSelectRoom }) => {
  const { filteredRooms, filters, updateFilters, resetFilters } = useRooms();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const hasActiveFilters = 
    filters.keyword ||
    (filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã') ||
    (filters.university && filters.university !== 'Tất cả') ||
    (filters.roomType && filters.roomType !== 'all') ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000000 ||
    filters.amenities.length > 0;

  return (
    <div className="bg-stone-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <span>Phòng trọ cho thuê tại Thái Nguyên</span>
              <span className="text-xs font-bold bg-brand-50 text-brand-800 px-2.5 py-0.5 rounded-full border border-brand-200">
                {filteredRooms.length} kết quả
              </span>
            </h1>
            <p className="text-xs text-stone-700 mt-0.5 font-medium">
              Khảo sát thực địa, chuẩn giá từ các chủ trọ và sinh viên
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-xl text-xs font-bold transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-700" />
              <span>Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-700 inline-block"></span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-stone-100 rounded-xl px-2.5 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="newest">Mới cập nhật</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="area_desc">Diện tích: Lớn nhất</option>
                <option value="views">Lượt xem nhiều nhất</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Danh sách</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                  viewMode === 'map'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Bản đồ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-4 bg-brand-50/70 p-2.5 rounded-xl border border-brand-200 text-xs">
            <span className="font-bold text-brand-900">Đang lọc:</span>

            {filters.keyword && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-200 text-brand-900 px-2 py-0.5 rounded-lg shadow-xs font-medium">
                "{filters.keyword}"
                <button onClick={() => updateFilters({ keyword: '' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã' && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-200 text-brand-900 px-2 py-0.5 rounded-lg shadow-xs font-medium">
                Khu vực: {filters.ward}
                <button onClick={() => updateFilters({ ward: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.university && filters.university !== 'Tất cả' && (
              <span className="inline-flex items-center gap-1 bg-white border border-brand-200 text-brand-900 px-2 py-0.5 rounded-lg shadow-xs font-medium">
                Gần: {filters.university}
                <button onClick={() => updateFilters({ university: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-stone-500 hover:text-rose-600 font-bold ml-auto flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Results */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Filter Sidebar */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-20">
            <FilterSidebar />
          </div>

          {/* Results Grid */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9">
            {filteredRooms.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                  🔍
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1">
                  Không tìm thấy phòng trọ phù hợp
                </h3>
                <p className="text-xs text-stone-600 mb-5 leading-relaxed font-medium">
                  Hiện chưa có phòng nào đáp ứng đủ các tiêu chí lọc. Bạn hãy thử nới rộng khoảng giá hoặc xóa bớt tiêu chí lọc nhé.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
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
              <div className="h-[620px] w-full">
                <MapView rooms={filteredRooms} onSelectRoom={onSelectRoom} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto p-4 shadow-2xl animate-in slide-in-from-right duration-200">
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
            <div className="sticky bottom-0 pt-3 pb-2 bg-white border-t border-stone-200 mt-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-sm"
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
