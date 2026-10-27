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
    <section className="py-14 sm:py-20 bg-white border-b border-[#E6E4DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.22em] uppercase text-brand-900 bg-[#F7F6F2] px-3 py-1 rounded-sm mb-3 border border-[#E6E4DE]">
            <MapPin className="w-3.5 h-3.5 text-brand-700" />
            <span>QUARTIER & LOCALISATION • ĐỊA BÀN TRỌNG ĐIỂM</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-charcoal-900 tracking-tight">
            Khám Phá Các Khu Vực An Cư Tiêu Biểu
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 font-normal">
            Hạ tầng dân sinh tiện nghi, an ninh đảm bảo và kết nối nhanh chóng tới các giảng đường, khu công nghiệp
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_AREAS.map((area, idx) => (
            <div
              key={idx}
              onClick={() => handleClickArea(area.ward)}
              className="group relative rounded-md overflow-hidden cursor-pointer shadow-whisper hover:shadow-card-hover transition-all duration-300 border border-[#E6E4DE] aspect-[4/3] flex flex-col justify-end p-5"
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] bg-[#23483D] text-white px-2 py-0.5 rounded-sm inline-block mb-1.5 shadow-whisper">
                  {area.tag}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                  {area.name}
                </h3>
                <p className="text-xs text-stone-200/90 line-clamp-1 mt-0.5 font-light">
                  {area.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span>{area.count} không gian có sẵn</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};