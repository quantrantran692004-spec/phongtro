import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="py-14 sm:py-20 bg-[#F7F6F2] border-b border-[#E6E4DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.22em] uppercase text-brand-900 bg-white px-3 py-1 rounded-sm mb-3 border border-[#E6E4DE] shadow-whisper">
              <Sparkles className="w-3.5 h-3.5 text-brand-700" />
              <span>SÉLECTION EXCLUSIVE • TUYỂN CHỌN TUẦN NÀY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-charcoal-900 tracking-tight">
              Phòng Trọ Nổi Bật & Đã Thẩm Định Thực Tế
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 font-normal max-w-xl">
              Hệ thống phòng trọ chuẩn giá, ký hợp đồng trực tiếp với chủ nhà và bảo đảm quyền lợi người thuê
            </p>
          </div>

          {/* Segmented Filter Buttons: European architectural pill bar */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-sm border border-[#E6E4DE] text-xs font-semibold overflow-x-auto no-scrollbar shadow-whisper">
            <button
              onClick={() => setTab('all')}
              className={`px-3.5 py-1.5 rounded-sm transition whitespace-nowrap ${
                tab === 'all'
                  ? 'bg-[#23483D] text-white shadow-whisper'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-[#F7F6F2]'
              }`}
            >
              Nổi bật
            </button>
            <button
              onClick={() => setTab('budget')}
              className={`px-3.5 py-1.5 rounded-sm transition whitespace-nowrap ${
                tab === 'budget'
                  ? 'bg-[#23483D] text-white shadow-whisper'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-[#F7F6F2]'
              }`}
            >
              Dưới 1.5 triệu
            </button>
            <button
              onClick={() => setTab('studio')}
              className={`px-3.5 py-1.5 rounded-sm transition whitespace-nowrap ${
                tab === 'studio'
                  ? 'bg-[#23483D] text-white shadow-whisper'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-[#F7F6F2]'
              }`}
            >
              Studio & Căn hộ
            </button>
            <button
              onClick={() => setTab('samsung')}
              className={`px-3.5 py-1.5 rounded-sm transition whitespace-nowrap ${
                tab === 'samsung'
                  ? 'bg-[#23483D] text-white shadow-whisper'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-[#F7F6F2]'
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
        <div className="mt-12 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2.5 bg-white hover:bg-stone-50 text-charcoal-900 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-sm border border-[#E6E4DE] hover:border-charcoal-400 shadow-whisper transition tracking-wide uppercase"
          >
            <span>Khám phá toàn bộ danh mục phòng trọ tại Thái Nguyên</span>
            <ArrowRight className="w-4 h-4 text-brand-700" />
          </button>
        </div>
      </div>
    </section>
  );
};