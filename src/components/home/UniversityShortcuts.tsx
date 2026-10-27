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
    <section className="py-10 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full mb-1.5 border border-stone-200">
              <GraduationCap className="w-3.5 h-3.5 text-stone-600" />
              <span>Cụm trường trọng điểm</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Phòng trọ quanh các trường ĐH & KCN Thái Nguyên
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Bán kính dưới 1km đi bộ hoặc tuyến xe bus sinh viên
            </p>
          </div>
        </div>

        {/* 6 Cards with strictly uniform height and balanced baseline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
            <button
              key={uni.id}
              onClick={() => handleSelect(uni.name, uni.ward)}
              className="group p-3.5 bg-[#FAFAF9] hover:bg-white border border-stone-200 hover:border-stone-400 rounded-xl transition-all duration-200 text-left flex flex-col justify-between shadow-2xs hover:shadow-sm h-32"
            >
              <div>
                <span className="text-[10px] font-bold text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded-md inline-block mb-1.5">
                  {uni.badge}
                </span>
                <div className="text-xs font-bold text-stone-900 group-hover:text-black transition truncate">
                  {uni.shortName}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  <span className="truncate">{uni.ward}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-stone-900">
                <span>Xem phòng</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
