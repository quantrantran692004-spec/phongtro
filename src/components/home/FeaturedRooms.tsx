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
    <section className="py-14 sm:py-20 bg-[#F7F6F2] border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE8] border border-[#E5E2D9] text-[#23483D] text-xs font-semibold uppercase tracking-[0.18em] mb-3 shadow-whisper">
              <span className="w-1.5 h-1.5 rounded-full bg-[#23483D]"></span>
              <span>Tuyển Chọn Trong Tuần</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-[#252725] tracking-tight">
              Phòng Trọ Nổi Bật <span className="font-serif italic font-normal text-[#23483D]">& Đã Thẩm Định</span>
            </h2>
            <p className="text-sm sm:text-base text-[#777B78] mt-1.5 font-normal">
              Khảo sát thực tế 100%, ký hợp đồng trực tiếp không qua trung gian
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-md border border-[#E5E2D9] text-xs sm:text-sm font-medium overflow-x-auto no-scrollbar shadow-whisper">
            {[
              { id: 'all', label: 'Tất cả tuyển chọn' },
              { id: 'budget', label: 'Dưới 1.5 triệu' },
              { id: 'studio', label: 'Studio & Căn hộ' },
              { id: 'samsung', label: 'Khu Samsung' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`px-3.5 py-1.5 rounded transition whitespace-nowrap ${
                  tab === t.id
                    ? 'bg-[#23483D] text-white shadow-whisper'
                    : 'text-[#777B78] hover:text-[#252725] hover:bg-[#E8EEE9]'
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
            className="inline-flex items-center gap-2.5 bg-white hover:bg-[#FAF9F7] text-[#252725] font-medium text-sm px-7 py-3.5 rounded-md border border-[#E5E2D9] hover:border-[#23483D] shadow-whisper transition duration-200"
          >
            <span>Xem toàn bộ danh mục phòng trọ</span>
            <ArrowRight className="w-4 h-4 text-[#23483D]" />
          </button>
        </div>
      </div>
    </section>
  );
};
