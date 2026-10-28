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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {POPULAR_AREAS.map((area, idx) => (
            <div
              key={idx}
              onClick={() => handleClickArea(area.ward)}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-whisper hover:shadow-card-hover transition-all duration-500 border border-[#E5E2D9] hover:border-[#23483D] aspect-[3/4] flex flex-col justify-between p-6"
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:from-black/90 transition-colors" />

              {/* Top Tag */}
              <div className="relative z-10">
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-[#23483D] px-3 py-1 rounded-md inline-block shadow-whisper border border-[#E5E2D9]">
                  {area.tag}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-[#C9DCD3] transition leading-snug mb-1.5">
                  {area.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 mb-3.5 font-normal opacity-90 leading-relaxed">
                  {area.description}
                </p>

                <div className="flex items-center justify-between text-xs font-medium text-white/95 pt-3 border-t border-white/25">
                  <span>{area.count} không gian sẵn có</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#23483D] transition">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
