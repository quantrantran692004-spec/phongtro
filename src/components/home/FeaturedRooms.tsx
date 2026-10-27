import React, { useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { RoomCard } from '../common/RoomCard';

interface FeaturedRoomsProps {
  onViewAll: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({ onViewAll, onSelectRoom }) => {
  const { rooms } = useRooms();
  const [tab, setTab] = useState<'all' | 'budget' | 'studio' | 'samsung'>('all');

  const featured = rooms.filter((r) => {
    if (r.approvalStatus !== 'approved') return false;
    if (tab === 'budget') return r.costs.rent <= 1500000;
    if (tab === 'studio') return r.roomType === 'studio' || r.roomType === 'mini_apartment';
    if (tab === 'samsung') return r.location.ward === 'Phổ Yên';
    return r.isFeatured || r.isVerified;
  }).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-clay-700 bg-clay-50 px-2.5 py-1 rounded-md mb-2 border border-clay-200">
              <Flame className="w-3.5 h-3.5 text-clay-600 fill-clay-500" />
              <span>Phòng tuyển chọn tuần này</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Phòng trọ nổi bật & Đã xác minh thực địa
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              Thông tin rõ ràng, hỗ trợ ký hợp đồng minh bạch và bảo đảm quyền lợi người thuê
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-xl text-xs font-bold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setTab('all')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'all' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Nổi bật
            </button>
            <button
              onClick={() => setTab('budget')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'budget' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dưới 1.5 triệu
            </button>
            <button
              onClick={() => setTab('studio')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'studio' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Studio & Căn hộ
            </button>
            <button
              onClick={() => setTab('samsung')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'samsung' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Khu Samsung Phổ Yên
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={onSelectRoom} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl border border-stone-300 shadow-xs hover:shadow transition"
          >
            <span>Khám phá thêm các phòng trọ khác tại Thái Nguyên</span>
            <ArrowRight className="w-4 h-4 text-brand-700" />
          </button>
        </div>
      </div>
    </section>
  );
};
