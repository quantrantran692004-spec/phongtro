import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
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
    <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Tuyển Chọn Trong Tuần • Khảo Sát 100%</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Phòng Trọ Nổi Bật{' '}
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                & Đã Thẩm Định
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium max-w-xl">
              Tất cả phòng đều được xác minh ảnh chụp thực tế, minh bạch chỉ số điện nước và kết nối trực tiếp với chủ trọ.
            </p>
          </div>

          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-slate-200/80 shadow-sm overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả tuyển chọn' },
              { id: 'budget', label: 'Dưới 1.5 triệu' },
              { id: 'studio', label: 'Studio & Căn hộ' },
              { id: 'samsung', label: 'Khu Samsung' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  tab === t.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid with Airbnb-Plus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {featured.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={onSelectRoom} />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Xem toàn bộ {rooms.length} phòng trọ Thái Nguyên</span>
            <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
