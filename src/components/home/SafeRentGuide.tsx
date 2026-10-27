import React from 'react';
import { ShieldAlert, FileText, CheckCircle, Eye, ArrowRight, BookOpen } from 'lucide-react';

interface SafeRentGuideProps {
  onOpenGuideModal: () => void;
}

export const SafeRentGuide: React.FC<SafeRentGuideProps> = ({ onOpenGuideModal }) => {
  const tips = [
    {
      icon: <Eye className="w-5 h-5 text-brand-700" />,
      title: '1. Khảo sát thực địa trước khi đặt cọc',
      desc: 'Cảnh giác với bài đăng hình ảnh quá lộng lẫy nhưng giá thấp bất thường yêu cầu chuyển tiền cọc giữ chỗ qua mạng.',
    },
    {
      icon: <FileText className="w-5 h-5 text-brand-700" />,
      title: '2. Hợp đồng chuẩn mực & minh bạch',
      desc: 'Quy định cụ thể điều kiện hoàn cọc (báo trước số ngày), ngày chốt điện nước và quyền bảo đảm tài sản cá nhân.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-brand-700" />,
      title: '3. Chốt số công tơ điện nước bàn giao',
      desc: 'Chụp ảnh lại mặt đồng hồ điện, công tơ nước ban đầu có sự chứng kiến của chủ nhà để đối chiếu minh bạch cuối tháng.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-brand-700" />,
      title: '4. Kiểm tra an ninh & thiết bị PCCC',
      desc: 'Ưu tiên không gian có camera hành lang, khóa vân tay, lối thoát hiểm thoáng đãng và bình chữa cháy đạt chuẩn an toàn.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F7F6F2] border-b border-[#E6E4DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A372E] rounded-md p-7 sm:p-12 text-white relative overflow-hidden shadow-card border border-[#23483D]">
          {/* Subtle architectural watermark */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#23483D]/40 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#2D5749]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] bg-white/10 text-emerald-300 border border-white/15 px-3 py-1 rounded-sm inline-block mb-3">
                  GUIDE PRATIQUE • CẨM NANG AN CƯ
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
                  4 Nguyên Tắc Vàng Khi Thuê Phòng Trọ Sinh Viên
                </h2>
                <p className="text-xs sm:text-sm text-stone-200/80 mt-1.5 font-light max-w-xl">
                  Kinh nghiệm thực tế từ cộng đồng sinh viên và chuyên gia thẩm định nhà trọ Thái Nguyên
                </p>
              </div>

              <button
                onClick={onOpenGuideModal}
                className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-[#F7F6F2] text-charcoal-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-sm transition shadow-whisper tracking-wider uppercase"
              >
                <span>Xem cẩm nang chi tiết</span>
                <ArrowRight className="w-4 h-4 text-brand-700" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 rounded-sm p-5 border border-[#E6E4DE] text-charcoal-900 shadow-whisper hover:bg-white transition"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#F7F6F2] border border-[#E6E4DE] flex items-center justify-center mb-4">
                    {tip.icon}
                  </div>
                  <h3 className="text-sm font-bold text-charcoal-900 mb-2 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};