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
    <section className="py-12 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md mb-1.5 border border-brand-200/60">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Làng Đại Học & Khu Công Nghiệp</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Khu vực quanh các trường ĐH & KCN trọng điểm
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Phòng trọ bán kính dưới 1km đi bộ hoặc tuyến xe bus sinh viên
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
            <button
              key={uni.id}
              onClick={() => handleSelect(uni.name, uni.ward)}
              className="group p-3.5 bg-stone-50/80 hover:bg-brand-50/50 border border-stone-200 hover:border-brand-400 rounded-2xl transition-all duration-200 text-left flex flex-col justify-between hover:shadow-subtle"
            >
              <div>
                <span className="text-[10px] font-semibold text-brand-700 bg-white border border-brand-200/60 px-1.5 py-0.5 rounded inline-block mb-2">
                  {uni.badge}
                </span>
                <div className="text-xs font-bold text-stone-900 group-hover:text-brand-800 transition line-clamp-1">
                  {uni.shortName}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1 truncate">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  <span className="truncate">{uni.ward}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px] font-semibold text-brand-700">
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
