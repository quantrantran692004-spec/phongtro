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
    <section className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2 border border-brand-200">
              <GraduationCap className="w-3.5 h-3.5 text-brand-700" />
              <span>Làng Đại Học & Khu Công Nghiệp</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Khu vực quanh các trường ĐH & KCN trọng điểm
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
              Phòng trọ bán kính dưới 1km đi bộ hoặc tuyến xe bus sinh viên
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
            <button
              key={uni.id}
              onClick={() => handleSelect(uni.name, uni.ward)}
              className="group p-3 sm:p-3.5 bg-stone-50 hover:bg-brand-50/60 border border-stone-200 hover:border-brand-600 rounded-xl transition-all duration-200 text-left flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div>
                <span className="text-[10px] font-bold text-brand-800 bg-white border border-brand-200 px-2 py-0.5 rounded inline-block mb-2 shadow-2xs">
                  {uni.badge}
                </span>
                <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-brand-800 transition line-clamp-1">
                  {uni.shortName}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium mt-1 truncate">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  <span className="truncate">{uni.ward}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-brand-800">
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
