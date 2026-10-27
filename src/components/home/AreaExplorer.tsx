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
    <section className="py-14 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md mb-1.5 border border-brand-200/60">
            <MapPin className="w-3.5 h-3.5" />
            <span>Khu Vực Tập Trung</span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Khám phá các điểm thuê trọ sôi động nhất
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Gợi ý các cung đường và phường có hạ tầng ăn uống, dịch vụ và an ninh thuận tiện
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_AREAS.map((area, idx) => (
            <div
              key={idx}
              onClick={() => handleClickArea(area.ward)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 border border-stone-200 aspect-[4/3] flex flex-col justify-end p-5"
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded inline-block mb-1.5">
                  {area.tag}
                </span>
                <h3 className="font-display text-base font-bold text-white group-hover:text-brand-200 transition">
                  {area.name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-1 mt-0.5 font-light">
                  {area.description}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-xs font-semibold text-brand-300">
                  <span>{area.count} phòng có sẵn</span>
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
