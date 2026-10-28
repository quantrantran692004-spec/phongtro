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
    <div className="bg-[#F7F6F2] min-h-screen py-7 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar: Architectural Poise */}
        <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-4 sm:p-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-3">
              <span>Phòng Trọ Cho Thuê Thái Nguyên</span>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {filteredRooms.length} kết quả
              </span>
            </h1>
            <p className="text-xs text-stone-600 mt-1 font-semibold">
              Khảo sát thực tế 100%, chuẩn giá từ chủ trọ và sinh viên
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 bg-[#F7F6F2] hover:bg-stone-200 text-charcoal-900 px-3.5 py-2 rounded-sm text-xs font-bold border border-[#E6E4DE] transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-700" />
              <span>Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#23483D] inline-block"></span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#F7F6F2] rounded-sm px-3 py-2 text-xs border border-[#E6E4DE]">
              <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="bg-transparent font-bold text-charcoal-900 focus:outline-none cursor-pointer"
              >
                <option value="newest">Mới cập nhật</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="area_desc">Diện tích: Lớn nhất</option>
                <option value="views">Lượt xem nhiều nhất</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#F7F6F2] p-1 rounded-sm text-xs font-bold border border-[#E6E4DE]">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-charcoal-900 shadow-whisper border border-[#E6E4DE]'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Danh sách</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition ${
                  viewMode === 'map'
                    ? 'bg-white text-charcoal-900 shadow-whisper border border-[#E6E4DE]'
                    : 'text-charcoal-600 hover:text-charcoal-900'
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
          <div className="flex items-center gap-2 flex-wrap mb-5 bg-white p-3 rounded-sm border border-[#E6E4DE] text-xs shadow-whisper">
            <span className="font-bold text-charcoal-900">Đang lọc theo:</span>

            {filters.keyword && (
              <span className="inline-flex items-center gap-1.5 bg-[#F7F6F2] border border-[#E6E4DE] text-charcoal-900 px-2.5 py-1 rounded-sm font-medium">
                "{filters.keyword}"
                <button onClick={() => updateFilters({ keyword: '' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã' && (
              <span className="inline-flex items-center gap-1.5 bg-[#F7F6F2] border border-[#E6E4DE] text-charcoal-900 px-2.5 py-1 rounded-sm font-medium">
                Khu vực: {filters.ward}
                <button onClick={() => updateFilters({ ward: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.university && filters.university !== 'Tất cả' && (
              <span className="inline-flex items-center gap-1.5 bg-[#F7F6F2] border border-[#E6E4DE] text-charcoal-900 px-2.5 py-1 rounded-sm font-medium">
                Gần: {filters.university}
                <button onClick={() => updateFilters({ university: 'Tất cả' })} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-charcoal-500 hover:text-charcoal-900 font-bold ml-auto flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Results */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Filter Sidebar */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-22">
            <FilterSidebar />
          </div>

          {/* Results Grid */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9">
            {filteredRooms.length === 0 ? (
              <div className="bg-white rounded-md border border-[#E6E4DE] p-12 text-center max-w-md mx-auto shadow-whisper">
                <div className="w-14 h-14 rounded-full bg-[#F7F6F2] border border-[#E6E4DE] text-brand-700 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔍
                </div>
                <h3 className="text-base font-bold text-charcoal-900 mb-1.5">
                  Không tìm thấy không gian phù hợp
                </h3>
                <p className="text-xs text-charcoal-600 mb-6 leading-relaxed font-normal">
                  Hiện chưa có phòng nào đáp ứng đủ toàn bộ các tiêu chí lọc. Bạn hãy thử nới rộng khoảng giá hoặc xóa bớt tiêu chí lọc nhé.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-bold text-xs px-5 py-2.5 rounded-sm shadow-whisper transition tracking-wider uppercase"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-[#F7F6F2] w-full max-w-sm h-full overflow-y-auto p-4 shadow-elevated animate-in slide-in-from-right duration-200">
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
            <div className="sticky bottom-0 pt-3 pb-2 bg-[#F7F6F2] border-t border-[#E6E4DE] mt-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-bold text-xs rounded-sm shadow-whisper tracking-wider uppercase"
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