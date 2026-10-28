import React from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>Khu Vực Trọng Điểm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
            Khu Vực Thuê Trọ <span className="font-serif italic font-normal text-amber-600">Sôi Động Nhất</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
            Tập trung đông sinh viên các trường đại học, tiện đường lớn và chợ dân sinh
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {POPULAR_AREAS.map((area, idx) => {
            const isLarge = idx === 0;
            return (
              <div
                key={area.ward || idx}
                onClick={() => handleClickArea(area.ward)}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-slate-900 ${
                  isLarge
                    ? 'col-span-2 row-span-2 aspect-auto min-h-[300px] lg:h-full'
                    : idx === 3
                    ? 'col-span-2 lg:col-span-2 aspect-[16/9] sm:aspect-auto min-h-[160px]'
                    : 'col-span-1 aspect-square sm:aspect-[4/3] lg:aspect-square'
                }`}
              >
                <img
                  src={area.image}
                  alt={area.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

                {/* Top Tag */}
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                  {area.tag}
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="pr-10">
                    <h3 className="text-white font-semibold text-base sm:text-lg leading-tight mb-1">
                      {area.name}
                    </h3>
                    <div className="text-white/70 text-xs">
                      {area.count} không gian sẵn có
                    </div>
                    {isLarge && (
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mt-2 leading-relaxed font-normal">
                        {area.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow Action Button */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/40 transition">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
