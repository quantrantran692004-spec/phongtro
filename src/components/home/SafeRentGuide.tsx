import React from 'react';
import { ShieldAlert, FileText, CheckCircle, Eye, ArrowRight } from 'lucide-react';

interface SafeRentGuideProps {
  onOpenGuideModal: () => void;
}

export const SafeRentGuide: React.FC<SafeRentGuideProps> = ({ onOpenGuideModal }) => {
  const tips = [
    {
      icon: <Eye className="w-5 h-5 text-amber-400" />,
      title: 'Khảo sát phòng trực tiếp',
      desc: 'Tuyệt đối không chuyển khoản đặt cọc qua mạng trước khi kiểm tra tận nơi và gặp chủ trọ.',
    },
    {
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      title: 'Hợp đồng thuê minh bạch',
      desc: 'Quy định cụ thể điều kiện hoàn cọc, chu kỳ thanh toán và các mức giá dịch vụ kèm theo.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-amber-400" />,
      title: 'Chốt chỉ số điện nước',
      desc: 'Chụp ảnh chỉ số công tơ điện và đồng hồ nước cùng chủ trọ ngay tại thời điểm nhận phòng.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      title: 'Kiểm tra an ninh & PCCC',
      desc: 'Ưu tiên phòng có khóa vân tay, camera an ninh, thang thoát hiểm và trang bị bình chữa cháy.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-amber-400/90 uppercase tracking-widest text-xs font-semibold mb-2">
              Cẩm Nang Thuê Phòng
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              4 Nguyên Tắc Thuê Phòng <span className="text-amber-300 font-luxury italic font-normal">An Toàn & Minh Bạch</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Kinh nghiệm thực tế giúp bảo vệ quyền lợi và tránh bẫy cọc khi thuê trọ
            </p>
          </div>

          <button
            onClick={onOpenGuideModal}
            className="shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm px-5 py-3 rounded-full text-sm font-medium transition"
          >
            <span>Xem cẩm nang đầy đủ</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    {tip.icon}
                  </div>
                  <span className="font-luxury italic text-3xl text-white/20">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mt-4 mb-2">
                  {tip.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {tip.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 text-amber-400/60 text-[10px] font-bold uppercase tracking-widest">
                Nguyên tắc chuẩn #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
