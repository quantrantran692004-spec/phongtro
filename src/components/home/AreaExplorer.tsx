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
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Địa bàn trọng điểm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Khám phá các khu vực thuê trọ phổ biến
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Chọn khu vực gần trường học hoặc công ty để tiết kiệm thời gian di chuyển hàng ngày
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_AREAS.map((area, idx) => (
            <div
              key={idx}
              onClick={() => handleClickArea(area.ward)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-xl transition-all duration-300 border border-slate-200 aspect-[4/3] flex flex-col justify-end p-5"
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded inline-block mb-1.5">
                  {area.tag}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                  {area.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                  {area.description}
                </p>

                <div className="mt-2 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>{area.count} phòng trọ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
