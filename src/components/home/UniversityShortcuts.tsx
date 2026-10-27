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
    <section className="py-12 bg-white border-b border-[#E6E4DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-charcoal-700 bg-[#F7F6F2] px-3 py-1 rounded-sm mb-2 border border-[#E6E4DE]">
              <GraduationCap className="w-3.5 h-3.5 text-brand-700" />
              <span>CAMPUS & ZONES INDUSTRIELLES • CỤM TRỌ TRỌNG ĐIỂM</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif text-charcoal-900 tracking-tight">
              Phòng Trọ Liền Kề Giảng Đường & Khu Công Nghiệp
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Bán kính di chuyển thuận tiện dưới 1.5km hoặc tiếp cận tuyến xe bus sinh viên
            </p>
          </div>
        </div>

        {/* 6 Cards with strictly uniform height and balanced baseline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {THAI_NGUYEN_UNIVERSITIES.slice(0, 6).map((uni) => (
            <button
              key={uni.id}
              onClick={() => handleSelect(uni.name, uni.ward)}
              className="group p-3.5 bg-[#F7F6F2] hover:bg-white border border-[#E6E4DE] hover:border-charcoal-400 rounded-sm transition-all duration-300 text-left flex flex-col justify-between shadow-whisper hover:shadow-card-hover h-34"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-800 bg-white border border-[#E6E4DE] px-2 py-0.5 rounded-sm inline-block mb-1.5 shadow-whisper">
                  {uni.badge}
                </span>
                <div className="text-xs font-bold text-charcoal-900 group-hover:text-brand-800 transition truncate">
                  {uni.shortName}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-charcoal-500 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-charcoal-400 shrink-0" />
                  <span className="truncate">{uni.ward}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6E4DE] flex items-center justify-between text-xs font-bold text-charcoal-700 group-hover:text-brand-800 transition">
                <span>Khám phá</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};