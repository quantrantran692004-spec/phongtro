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
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
              <span>Campus & Zones Industrielles • Cụm Trọ Trọng Điểm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Phòng Trọ Liền Kề <span className="font-serif italic font-normal text-amber-600">Giảng Đường & KCN</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bán kính di chuyển thuận tiện dưới 1.5km hoặc tiếp cận tuyến xe bus sinh viên
            </p>
          </div>

          <button
            onClick={() => {
              updateFilters({ university: 'Tất cả', ward: 'Tất cả', keyword: '' });
              onSelectUniversity();
            }}
            className="text-sm font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 underline-offset-4 hover:underline transition self-start sm:self-end"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal scrollable pills/cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mt-6">
          {THAI_NGUYEN_UNIVERSITIES.map((uni) => (
            <button
              key={uni.id}
              className="shrink-0 group flex items-start gap-3 bg-white border border-slate-200 rounded-2xl p-4 hover:border-slate-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 text-left w-52"
              onClick={() => handleSelect(uni.name, uni.ward)}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-slate-900 flex items-center justify-center transition-colors shrink-0">
                <GraduationCap className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900 line-clamp-1 leading-tight">{uni.shortName}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-500 truncate">{uni.ward}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
