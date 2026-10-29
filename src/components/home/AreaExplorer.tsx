import React from 'react';
import { ArrowRight, MapPin, Sparkles, Building2 } from 'lucide-react';
import { POPULAR_AREAS } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';

interface AreaExplorerProps {
  onSelectArea: () => void;
}

export const AreaExplorer: React.FC<AreaExplorerProps> = ({ onSelectArea }) => {
  const { updateFilters, rooms } = useRooms();

  const handleClickArea = (ward: string) => {
    updateFilters({
      ward,
      keyword: '',
      university: 'Tất cả',
    });
    onSelectArea();
  };

  const getAreaLiveCount = (ward: string, defaultCount: number) => {
    const matching = rooms.filter(
      (r) => r.location.ward === ward || r.location.address.toLowerCase().includes(ward.toLowerCase())
    );
    return matching.length > 0 ? matching.length : defaultCount;
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 border border-teal-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
            <span>Khu Vực Trọng Điểm Thái Nguyên</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Khu Vực Thuê Trọ{' '}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Sôi Động Nhất
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-medium">
            Tập trung đông sinh viên các trường đại học, gần các tiện ích sầm uất, bệnh viện và các cụm khu công nghiệp trọng điểm.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {POPULAR_AREAS.map((area, idx) => {
            const isLarge = idx === 0;
            const liveCount = getAreaLiveCount(area.ward, area.count);

            return (
              <div
                key={area.ward || idx}
                onClick={() => handleClickArea(area.ward)}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-sm hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-300 ${
                  isLarge
                    ? 'col-span-1 sm:col-span-2 row-span-2 min-h-[340px] lg:h-full'
                    : idx === 3
                    ? 'col-span-1 sm:col-span-2 min-h-[180px]'
                    : 'col-span-1 aspect-[4/3] sm:aspect-square'
                }`}
              >
                <img
                  src={area.image}
                  alt={area.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Dynamic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-teal-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>{area.tag}</span>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="pr-12">
                    <h3 className="text-white font-extrabold text-lg sm:text-xl leading-tight mb-1 group-hover:text-teal-200 transition-colors">
                      {area.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{liveCount}+ phòng đang cho thuê</span>
                    </div>
                    {isLarge && (
                      <p className="text-xs sm:text-sm text-white/85 line-clamp-2 mt-2.5 leading-relaxed font-normal">
                        {area.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow Action Button */}
                  <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-400 transition-all duration-200">
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
