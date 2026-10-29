import React, { useState } from 'react';
import { ShieldCheck, FileCheck2, Eye, KeyRound, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface SafeRentGuideProps {
  onOpenGuideModal: () => void;
}

export const SafeRentGuide: React.FC<SafeRentGuideProps> = ({ onOpenGuideModal }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Khảo sát tận nơi & Gặp mặt chủ trọ',
      subtitle: 'Trực quan & Thực tế',
      desc: 'Tuyệt đối không chuyển khoản giữ chỗ qua mạng xã hội trước khi xem phòng trực tiếp, kiểm tra hệ thống điện nước, cửa sổ, ban công và an ninh xung quanh.',
      icon: <Eye className="w-6 h-6 text-teal-600" />,
      checklist: ['Kiểm tra áp lực nước và ánh sáng tự nhiên', 'Gặp trực tiếp chủ trọ có CCCD đối chiếu', 'Thử mở khóa vân tay & camera khu vực'],
    },
    {
      step: '02',
      title: 'Hợp đồng minh bạch & Chốt chỉ số ban đầu',
      subtitle: 'Rõ ràng từng con số',
      desc: 'Lập biên bản chốt số công tơ điện và đồng hồ nước ngay khi nhận phòng. Hợp đồng cần ghi rõ tiền cọc, ngày trả phòng và cam kết không tăng giá điện nước giữa chừng.',
      icon: <FileCheck2 className="w-6 h-6 text-teal-600" />,
      checklist: ['Chụp ảnh công tơ điện & nước lưu vào điện thoại', 'Ghi rõ chi phí dịch vụ (Wifi, rác, thang máy)', 'Quy định cụ thể điều kiện hoàn tiền cọc 100%'],
    },
    {
      step: '03',
      title: 'Nhận chìa khóa & Bắt đầu cuộc sống mới',
      subtitle: 'An tâm lưu trú dài lâu',
      desc: 'Bàn giao hiện trạng nội thất (giường, tủ, nóng lạnh, điều hòa). Kết nối nhóm cư dân khu trọ để nhận thông báo vệ sinh, an ninh và hỗ trợ khẩn cấp.',
      icon: <KeyRound className="w-6 h-6 text-teal-600" />,
      checklist: ['Kiểm tra hoạt động điều hòa & bình nóng lạnh', 'Đăng ký tạm trú online theo hướng dẫn chủ nhà', 'Lưu số điện thoại hotline hỗ trợ kỹ thuật tòa nhà'],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Tiêu Chuẩn Thuê Trọ An Toàn 3 Bước</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 Bước Thuê Phòng{' '}
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                An Toàn & Minh Bạch
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium max-w-xl">
              Cẩm nang thực tế được đúc kết từ hàng nghìn sinh viên và người đi làm tại Thái Nguyên, giúp bạn hoàn toàn an tâm khi tìm phòng.
            </p>
          </div>

          <button
            onClick={onOpenGuideModal}
            className="group inline-flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition self-start md:self-end"
          >
            <span>Đọc cẩm nang chi tiết</span>
            <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Step Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={s.step}
                onMouseEnter={() => setActiveStep(idx)}
                className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-teal-50/60 to-white border-teal-300 shadow-[0_20px_45px_rgba(13,148,136,0.12)] -translate-y-1'
                    : 'bg-[#F8FAFC] border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Step Pill & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
                      {s.icon}
                    </div>
                    <span className="text-3xl font-extrabold text-slate-300">
                      {s.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block mb-2">
                    {s.subtitle}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {s.desc}
                  </p>
                </div>

                {/* Checklist */}
                <div className="pt-4 border-t border-slate-200/70 space-y-2">
                  {s.checklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
