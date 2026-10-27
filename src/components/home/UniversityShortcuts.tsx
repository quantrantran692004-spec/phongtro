import React from 'react';
import { GraduationCap, ArrowRight, MapPin } from 'lucide-react';
import { THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';

interface UniversityShortcutsProps {
  onSelectUniversity: () => void;
}

export const UniversityShortcuts: React.FC<UniversityShortcutsProps> = ({ onSelectUniversity }) => {
  const { updateFilters } = useRooms();

  const handleSelect = (uniName: string, ward: string) => {
    updateFilters({
      university: uniName,
      ward: ward || 'Tất cả',
      keyword: '',
    });
    onSelectUniversity();
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Dành riêng cho sinh viên & người đi làm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tìm phòng quanh các Trường ĐH & KCN lớn
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Bán kính đi bộ hoặc xe bus dưới 1km, thuận tiện học tập và làm việc
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
            <button
              key={uni.id}
              onClick={() => handleSelect(uni.name, uni.ward)}
              className="group p-4 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/90 hover:border-emerald-400 rounded-2xl transition-all duration-200 text-left flex flex-col justify-between hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center font-bold text-xs shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  🎓
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                  {uni.shortName}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 truncate">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{uni.ward}</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                <span>Xem phòng</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
