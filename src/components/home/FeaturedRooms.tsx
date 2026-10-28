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
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2 border border-emerald-200">
              <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Phòng tuyển chọn tuần này</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Phòng Trọ Nổi Bật & Đã Thẩm Định
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-semibold">
              Ký hợp đồng trực tiếp với chủ nhà, không thu phí trung gian
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-300 text-xs font-extrabold overflow-x-auto no-scrollbar shadow-xs">
            <button
              onClick={() => setTab('all')}
              className={`px-3.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Nổi bật
            </button>
            <button
              onClick={() => setTab('budget')}
              className={`px-3.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'budget'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Dưới 1.5 triệu
            </button>
            <button
              onClick={() => setTab('studio')}
              className={`px-3.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'studio'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Studio & Căn hộ
            </button>
            <button
              onClick={() => setTab('samsung')}
              className={`px-3.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'samsung'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Khu Samsung Phổ Yên
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={onSelectRoom} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl border border-stone-300 shadow-xs transition"
          >
            <span>Xem thêm tất cả các phòng trọ khác</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>
    </section>
  );
};