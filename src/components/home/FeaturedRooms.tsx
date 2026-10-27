import React, { useState } from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { RoomCard } from '../common/RoomCard';

interface FeaturedRoomsProps {
  onViewAll: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({ onViewAll, onSelectRoom }) => {
  const { rooms } = useRooms();
  const [tab, setTab] = useState<'all' | 'budget' | 'studio' | 'samsung'>('all');

  // Filter based on tab
  const featured = rooms.filter((r) => {
    if (r.approvalStatus !== 'approved') return false;
    if (tab === 'budget') return r.costs.rent <= 1500000;
    if (tab === 'studio') return r.roomType === 'studio' || r.roomType === 'mini_apartment';
    if (tab === 'samsung') return r.location.ward === 'Phổ Yên';
    return r.isFeatured || r.isVerified;
  }).slice(0, 6);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-2 border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Được thuê nhiều nhất tuần này</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Phòng trọ nổi bật & đã xác minh
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Thông tin minh bạch, có kiểm tra phòng thực tế và hỗ trợ hợp đồng chuẩn
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl text-xs font-bold overflow-x-auto">
            <button
              onClick={() => setTab('all')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nổi bật
            </button>
            <button
              onClick={() => setTab('budget')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'budget' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dưới 1.5 triệu
            </button>
            <button
              onClick={() => setTab('studio')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'studio' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Studio & Căn hộ
            </button>
            <button
              onClick={() => setTab('samsung')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                tab === 'samsung' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Khu Phổ Yên - Samsung
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
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm px-6 py-3 rounded-xl border border-slate-300 shadow-sm transition hover:shadow"
          >
            <span>Khám phá thêm 450+ phòng trọ tại Thái Nguyên</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
