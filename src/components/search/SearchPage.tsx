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
import { getRoomTypeLabel } from '../../utils/formatters';
import { RoomType } from '../../types';

interface SearchPageProps {
  onSelectRoom: (roomId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSelectRoom }) => {
  const { filteredRooms, filters, updateFilters, resetFilters } = useRooms();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);

  const hasActiveFilters = 
    filters.keyword ||
    (filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã') ||
    (filters.university && filters.university !== 'Tất cả') ||
    (filters.roomType && filters.roomType !== 'all') ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000000 ||
    filters.amenities.length > 0;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight flex items-center gap-3">
              <span>Phòng Trọ Cho Thuê <span className="font-serif italic font-normal text-slate-700">Thái Nguyên</span></span>
              <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                {filteredRooms.length} kết quả
              </span>
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              Khảo sát thực tế 100%, chuẩn giá từ chủ trọ và sinh viên
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:bg-slate-800 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-medium shadow-sm hover:border-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="newest">Mới cập nhật</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="area_desc">Diện tích: Lớn nhất</option>
                <option value="views">Lượt xem nhiều nhất</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full text-xs font-medium">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 rounded-full shadow-sm px-4 py-1.5 font-semibold'
                    : 'text-slate-500 px-4 py-1.5 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Danh sách</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 transition ${
                  viewMode === 'map'
                    ? 'bg-white text-slate-900 rounded-full shadow-sm px-4 py-1.5 font-semibold'
                    : 'text-slate-500 px-4 py-1.5 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Bản đồ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-6 bg-white p-4 rounded-2xl border border-slate-200 text-xs shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <span className="font-semibold text-slate-700 mr-1">Đang lọc:</span>

            {filters.keyword && (
              <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                "{filters.keyword}"
                <button
                  onClick={() => updateFilters({ keyword: '' })}
                  className="ml-1 hover:text-red-300 transition"
                  aria-label="Xóa từ khóa"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã' && (
              <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                Khu vực: {filters.ward}
                <button
                  onClick={() => updateFilters({ ward: 'Tất cả' })}
                  className="ml-1 hover:text-red-300 transition"
                  aria-label="Xóa khu vực"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.university && filters.university !== 'Tất cả' && (
              <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                Gần: {filters.university}
                <button
                  onClick={() => updateFilters({ university: 'Tất cả' })}
                  className="ml-1 hover:text-red-300 transition"
                  aria-label="Xóa trường đại học"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.roomType && filters.roomType !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                Loại: {getRoomTypeLabel(filters.roomType as RoomType)}
                <button
                  onClick={() => updateFilters({ roomType: 'all' })}
                  className="ml-1 hover:text-red-300 transition"
                  aria-label="Xóa loại phòng"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(filters.minPrice > 0 || filters.maxPrice < 10000000) && (
              <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                Khoảng giá
                <button
                  onClick={() => updateFilters({ minPrice: 0, maxPrice: 10000000 })}
                  className="ml-1 hover:text-red-300 transition"
                  aria-label="Xóa khoảng giá"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.amenities.length > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                {filters.amenities.length} tiện nghi
                <button
                  onClick={() => updateFilters({ amenities: [] })}
                  className="ml-1 hover:text-red-300 transition"
                  aria-label="Xóa tiện nghi"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-slate-500 hover:text-slate-900 font-medium ml-auto flex items-center gap-1 transition text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        )}

        {/* Layout: Split-screen on lg */}
        <div className="flex gap-6 lg:gap-8 items-start">
          <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24">
            <FilterSidebar />
          </div>

          <div className="flex-1 min-w-0">
            {filteredRooms.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center max-w-md mx-auto shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5 text-3xl">
                  🔍
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Không tìm thấy không gian phù hợp
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed font-normal">
                  Hiện chưa có phòng nào đáp ứng đủ toàn bộ các tiêu chí lọc. Bạn hãy thử nới rộng khoảng giá hoặc xóa bớt tiêu chí lọc nhé.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-slate-800 transition shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Xóa bộ lọc & xem tất cả</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    onMouseEnter={() => setHoveredRoomId(room.id)}
                    onMouseLeave={() => setHoveredRoomId(null)}
                  >
                    <RoomCard room={room} onSelect={onSelectRoom} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[680px] w-full rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200">
                <MapView rooms={filteredRooms} selectedRoomId={hoveredRoomId} onSelectRoom={onSelectRoom} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="bg-[#F8FAFC] w-full max-w-sm h-full overflow-y-auto p-4 shadow-2xl flex flex-col justify-between">
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
            <div className="sticky bottom-0 pt-3 pb-2 bg-[#F8FAFC] border-t border-slate-200 mt-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full shadow-sm tracking-wider uppercase transition"
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
