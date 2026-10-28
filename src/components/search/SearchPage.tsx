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
    <div className="bg-[#F7F6F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar: Architectural Poise */}
        <div className="bg-white rounded-lg border border-[#E5E2D9] shadow-whisper p-4 sm:p-6 mb-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-light text-[#252725] tracking-tight flex items-center gap-3">
              <span>Phòng Trọ Cho Thuê <span className="font-serif italic font-normal text-[#23483D]">Thái Nguyên</span></span>
              <span className="text-xs font-semibold bg-[#E8EEE9] text-[#23483D] px-2.5 py-0.5 rounded-full border border-[#C9DCD3]">
                {filteredRooms.length} kết quả
              </span>
            </h1>
            <p className="text-sm text-[#777B78] mt-1 font-normal">
              Khảo sát thực tế 100%, chuẩn giá từ chủ trọ và sinh viên
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 bg-[#FAF9F7] hover:bg-[#EFEEE8] text-[#252725] px-3.5 py-2 rounded-md text-xs font-medium border border-[#E5E2D9] transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#23483D]" />
              <span>Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#23483D] inline-block"></span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F7] rounded-md px-3 py-2 text-xs font-medium border border-[#E5E2D9]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#777B78]" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="bg-transparent font-medium text-[#252725] focus:outline-none cursor-pointer"
              >
                <option value="newest">Mới cập nhật</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="area_desc">Diện tích: Lớn nhất</option>
                <option value="views">Lượt xem nhiều nhất</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#FAF9F7] p-1 rounded-md text-xs font-medium border border-[#E5E2D9]">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#23483D] shadow-whisper border border-[#E5E2D9] font-semibold'
                    : 'text-[#777B78] hover:text-[#252725]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Danh sách</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                  viewMode === 'map'
                    ? 'bg-white text-[#23483D] shadow-whisper border border-[#E5E2D9] font-semibold'
                    : 'text-[#777B78] hover:text-[#252725]'
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
          <div className="flex items-center gap-2 flex-wrap mb-6 bg-white p-3.5 rounded-lg border border-[#E5E2D9] text-xs shadow-whisper">
            <span className="font-semibold text-[#252725]">Đang lọc:</span>

            {filters.keyword && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF9F7] border border-[#E5E2D9] text-[#252725] px-2.5 py-1 rounded-md font-medium">
                "{filters.keyword}"
                <button onClick={() => updateFilters({ keyword: '' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã' && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF9F7] border border-[#E5E2D9] text-[#252725] px-2.5 py-1 rounded-md font-medium">
                Khu vực: {filters.ward}
                <button onClick={() => updateFilters({ ward: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.university && filters.university !== 'Tất cả' && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF9F7] border border-[#E5E2D9] text-[#252725] px-2.5 py-1 rounded-md font-medium">
                Gần: {filters.university}
                <button onClick={() => updateFilters({ university: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-[#777B78] hover:text-[#252725] font-medium ml-auto flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Results */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-start">
          {/* Filter Sidebar */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-22">
            <FilterSidebar />
          </div>

          {/* Results Grid */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9">
            {filteredRooms.length === 0 ? (
              <div className="bg-white rounded-lg border border-[#E5E2D9] p-12 text-center max-w-md mx-auto shadow-whisper">
                <div className="w-14 h-14 rounded-full bg-[#FAF9F7] border border-[#E5E2D9] text-[#23483D] flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔍
                </div>
                <h3 className="text-base font-semibold text-[#252725] mb-2">
                  Không tìm thấy không gian phù hợp
                </h3>
                <p className="text-xs sm:text-sm text-[#777B78] mb-6 leading-relaxed font-normal">
                  Hiện chưa có phòng nào đáp ứng đủ toàn bộ các tiêu chí lọc. Bạn hãy thử nới rộng khoảng giá hoặc xóa bớt tiêu chí lọc nhé.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs px-5 py-2.5 rounded-md shadow-whisper transition tracking-wider uppercase"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xóa bộ lọc & xem lại tất cả</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-[#F7F6F2] w-full max-w-sm h-full overflow-y-auto p-4 shadow-elevated">
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
            <div className="sticky bottom-0 pt-3 pb-2 bg-[#F7F6F2] border-t border-[#E5E2D9] mt-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs rounded-md shadow-whisper tracking-wider uppercase"
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
