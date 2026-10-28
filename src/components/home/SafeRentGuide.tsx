import React from 'react';
import { ShieldAlert, FileText, CheckCircle, Eye, ArrowRight } from 'lucide-react';

interface SafeRentGuideProps {
  onOpenGuideModal: () => void;
}

export const SafeRentGuide: React.FC<SafeRentGuideProps> = ({ onOpenGuideModal }) => {
  const tips = [
    {
      icon: <Eye className="w-5 h-5 text-[#23483D]" />,
      title: '1. Khảo sát phòng trực tiếp',
      desc: 'Tuyệt đối không chuyển khoản đặt cọc qua mạng trước khi kiểm tra tận nơi và gặp chủ trọ.',
    },
    {
      icon: <FileText className="w-5 h-5 text-[#23483D]" />,
      title: '2. Hợp đồng thuê minh bạch',
      desc: 'Quy định cụ thể điều kiện hoàn cọc, chu kỳ thanh toán và các mức giá dịch vụ kèm theo.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-[#23483D]" />,
      title: '3. Chốt chỉ số điện nước',
      desc: 'Chụp ảnh chỉ số công tơ điện và đồng hồ nước cùng chủ trọ ngay tại thời điểm nhận phòng.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#23483D]" />,
      title: '4. Kiểm tra an ninh & PCCC',
      desc: 'Ưu tiên phòng có khóa vân tay, camera an ninh, thang thoát hiểm và trang bị bình chữa cháy.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F7F6F2] border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFEEE8] rounded-xl p-8 sm:p-12 border border-[#E5E2D9] shadow-whisper relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] bg-white text-[#23483D] px-3 py-1 rounded-full inline-block mb-3 border border-[#E5E2D9] shadow-whisper">
                  Cẩm Nang Thuê Phòng
                </span>
                <h2 className="text-2xl sm:text-4xl font-light text-[#252725] tracking-tight">
                  4 Nguyên Tắc Thuê Phòng <span className="font-serif italic font-normal text-[#23483D]">An Toàn & Minh Bạch</span>
                </h2>
                <p className="text-sm sm:text-base text-[#777B78] mt-1.5 font-normal">
                  Kinh nghiệm thực tế giúp bảo vệ quyền lợi và tránh bẫy cọc khi thuê trọ
                </p>
              </div>

              <button
                onClick={onOpenGuideModal}
                className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F7] text-[#252725] font-medium text-sm px-5 py-3 rounded-md border border-[#E5E2D9] hover:border-[#23483D] transition shadow-whisper"
              >
                <span>Xem cẩm nang đầy đủ</span>
                <ArrowRight className="w-4 h-4 text-[#23483D]" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-5 text-[#252725] shadow-whisper border border-[#E5E2D9] hover:border-[#23483D] transition duration-200"
                >
                  <div className="w-10 h-10 rounded-md bg-[#E8EEE9] flex items-center justify-center mb-4">
                    {tip.icon}
                  </div>
                  <h3 className="text-base font-medium text-[#252725] mb-1.5 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777B78] leading-relaxed font-normal">
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
