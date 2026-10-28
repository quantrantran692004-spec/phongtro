import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-[0.18em] mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Tuyển Chọn Trong Tuần</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Phòng Trọ Nổi Bật <span className="font-serif italic font-normal text-amber-600">& Đã Thẩm Định</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1.5 font-normal">
              Khảo sát thực tế 100%, ký hợp đồng trực tiếp không qua trung gian
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-slate-200 text-xs sm:text-sm font-medium overflow-x-auto no-scrollbar shadow-sm">
            {[
              { id: 'all', label: 'Tất cả tuyển chọn' },
              { id: 'budget', label: 'Dưới 1.5 triệu' },
              { id: 'studio', label: 'Studio & Căn hộ' },
              { id: 'samsung', label: 'Khu Samsung' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`px-4 py-1.5 rounded-full transition whitespace-nowrap ${
                  tab === t.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {featured.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={onSelectRoom} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full shadow-float hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <span>Xem toàn bộ danh mục phòng trọ</span>
            <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
