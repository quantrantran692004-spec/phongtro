import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { POPULAR_AREAS } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';

interface AreaExplorerProps {
  onSelectArea: () => void;
}

export const AreaExplorer: React.FC<AreaExplorerProps> = ({ onSelectArea }) => {
  const { updateFilters } = useRooms();

  const handleClickArea = (ward: string) => {
    updateFilters({
      ward,
      keyword: '',
      university: 'Tất cả',
    });
    onSelectArea();
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE8] border border-[#E5E2D9] text-[#23483D] text-xs font-semibold uppercase tracking-[0.18em] mb-3 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#23483D]"></span>
            <span>Khu Vực Trọng Điểm</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-[#252725] tracking-tight">
            Khu Vực Thuê Trọ <span className="font-serif italic font-normal text-[#23483D]">Sôi Động Nhất</span>
          </h2>
          <p className="text-sm sm:text-base text-[#777B78] mt-1.5 font-normal">
            Tập trung đông sinh viên các trường đại học, tiện đường lớn và chợ dân sinh
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {POPULAR_AREAS.map((area, idx) => (
            <div
              key={idx}
              onClick={() => handleClickArea(area.ward)}
              className="group relative rounded-lg overflow-hidden cursor-pointer shadow-whisper hover:shadow-card-hover transition-all duration-300 border border-[#E5E2D9] hover:border-[#23483D] aspect-[4/3] flex flex-col justify-end p-5"
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-[#23483D] px-2.5 py-0.5 rounded-sm inline-block mb-2 shadow-whisper border border-[#E5E2D9]">
                  {area.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-[#C9DCD3] transition leading-snug">
                  {area.name}
                </h3>
                <p className="text-xs text-stone-200 line-clamp-1 mt-1 font-normal opacity-90">
                  {area.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs font-medium text-[#FAF9F7] pt-2 border-t border-white/20">
                  <span>{area.count} phòng có sẵn</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
