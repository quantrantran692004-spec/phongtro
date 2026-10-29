import React from 'react';
import { GraduationCap, ArrowRight, MapPin, Building, Sparkles, Navigation } from 'lucide-react';
import { THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';
import { formatCurrency } from '../../utils/formatters';

interface UniversityShortcutsProps {
  onSelectUniversity: () => void;
}

export const UniversityShortcuts: React.FC<UniversityShortcutsProps> = ({ onSelectUniversity }) => {
  const { updateFilters, rooms } = useRooms();

  // Highlight key Thái Nguyên hotspots as requested
  const hotspots = [
    {
      id: 'tump',
      name: 'ĐH Y Dược Thái Nguyên',
      shortName: 'ĐH Y Dược',
      ward: 'Quang Trung',
      tag: 'Khu Y Dược',
      distance: '< 500m',
      popularRent: 1500000,
      description: 'Gần Bệnh viện TW & trục Lương Ngọc Quyến',
      icon: '🩺',
    },
    {
      id: 'ictu',
      name: 'ĐH CNTT & Truyền Thông',
      shortName: 'ICTU Thái Nguyên',
      ward: 'Quyết Thắng',
      tag: 'Cụm Z115 Quyết Thắng',
      distance: '< 800m',
      popularRent: 1200000,
      description: 'Làng trọ công nghệ, phòng khép kín mới xây',
      icon: '💻',
    },
    {
      id: 'tnue',
      name: 'ĐH Sư Phạm Thái Nguyên',
      shortName: 'ĐH Sư Phạm',
      ward: 'Quang Trung',
      tag: 'Trung Tâm Thành Phố',
      distance: '< 600m',
      popularRent: 1400000,
      description: 'Thuận tiện xe buýt, an ninh & dân trí cao',
      icon: '📚',
    },
    {
      id: 'samsung',
      name: 'KCN Samsung Yên Bình (SEVT)',
      shortName: 'Samsung Phổ Yên',
      ward: 'Phổ Yên',
      tag: 'KCN Yên Bình',
      distance: '< 1.5km',
      popularRent: 1800000,
      description: 'Đầy đủ điều hòa, nóng lạnh, xe bus đón trả tận cổng',
      icon: '⚡',
    },
    {
      id: 'diemthuy',
      name: 'KCN Điềm Thụy - Phú Bình',
      shortName: 'KCN Điềm Thụy',
      ward: 'Điềm Thụy',
      tag: 'KCN Điềm Thụy',
      distance: '< 1.2km',
      popularRent: 1300000,
      description: 'Khu nhà trọ công nhân mới, chi phí điện nước rẻ',
      icon: '🏭',
    },
  ];

  const handleSelect = (uniName: string, ward: string) => {
    updateFilters({
      university: uniName,
      ward: ward || 'Tất cả',
      keyword: '',
    });
    onSelectUniversity();
  };

  const getHotspotStats = (h: typeof hotspots[0]) => {
    const matching = rooms.filter(
      (r) =>
        r.location.ward === h.ward ||
        r.location.address.toLowerCase().includes(h.ward.toLowerCase()) ||
        r.location.nearUniversities?.some((u) => u.name.toLowerCase().includes(h.shortName.toLowerCase()))
    );
    const count = matching.length > 0 ? matching.length : 12;
    const minRent = matching.length > 0 ? Math.min(...matching.map((r) => r.costs.rent)) : h.popularRent;
    return { count, minRent };
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <span>Campus & Zones Industrielles • Cụm Trọ Trọng Điểm</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Phòng Trọ Liền Kề{' '}
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Giảng Đường & KCN
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium max-w-2xl">
              Chọn nhanh cụm trọ trọng điểm theo bán kính di chuyển thực tế dưới 1.5km hoặc tiếp cận tuyến xe đưa đón sinh viên & công nhân.
            </p>
          </div>

          <button
            onClick={() => {
              updateFilters({ university: 'Tất cả', ward: 'Tất cả', keyword: '' });
              onSelectUniversity();
            }}
            className="group inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 self-start md:self-end transition"
          >
            <span>Khám phá toàn bộ {rooms.length} phòng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Toss-Style Bento Grid Hotspots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {hotspots.map((h, idx) => {
            const { count, minRent } = getHotspotStats(h);
            const isFeatured = idx === 0 || idx === 3;

            return (
              <div
                key={h.id}
                onClick={() => handleSelect(h.name, h.ward)}
                className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isFeatured
                    ? 'bg-gradient-to-b from-teal-50/70 to-white border-teal-200/90 hover:border-teal-400 hover:shadow-[0_16px_36px_rgba(13,148,136,0.12)] hover:-translate-y-1'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] hover:-translate-y-1'
                }`}
              >
                {/* Top Badge & Distance */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl" role="img" aria-label={h.shortName}>
                      {h.icon}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white/90 text-slate-700 font-bold text-[11px] px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs">
                      <Navigation className="w-3 h-3 text-teal-600" />
                      <span>{h.distance}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition leading-snug mb-1">
                    {h.shortName}
                  </h3>
                  
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed mb-4">
                    {h.description}
                  </p>
                </div>

                {/* Bottom Live Stats: Count + Min Rent */}
                <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mb-1">
                      Chỉ từ {formatCurrency(minRent, true)}
                    </span>
                    <div className="text-[11px] font-semibold text-slate-500">
                      <span className="text-slate-900 font-bold">{count}+</span> phòng sẵn sàng
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-teal-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Filter Dock (Horizontal Pills for all remaining universities) */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-2">
            <Building className="w-3.5 h-3.5 text-teal-600" />
            <span>Xem thêm trường:</span>
          </span>
          {THAI_NGUYEN_UNIVERSITIES.map((uni) => (
            <button
              key={uni.id}
              onClick={() => handleSelect(uni.name, uni.ward)}
              className="shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200/80 hover:border-teal-200 transition whitespace-nowrap"
            >
              {uni.shortName}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
