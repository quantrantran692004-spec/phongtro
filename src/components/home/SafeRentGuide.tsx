import React from 'react';
import { ShieldAlert, FileText, CheckCircle, Eye, ArrowRight } from 'lucide-react';

interface SafeRentGuideProps {
  onOpenGuideModal: () => void;
}

export const SafeRentGuide: React.FC<SafeRentGuideProps> = ({ onOpenGuideModal }) => {
  const tips = [
    {
      icon: <Eye className="w-5 h-5 text-clay-600" />,
      title: '1. Không cọc tiền online khi chưa xem phòng',
      desc: 'Cảnh giác với bài đăng hình ảnh lung linh nhưng giá rẻ bất thường, yêu cầu chuyển cọc giữ chỗ trước.',
    },
    {
      icon: <FileText className="w-5 h-5 text-brand-600" />,
      title: '2. Hợp đồng rõ ràng, minh bạch khoản cọc',
      desc: 'Quy định rõ điều kiện hoàn trả cọc (báo trước bao nhiêu ngày), ngày chốt số điện nước hàng tháng.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
      title: '3. Kiểm tra chỉ số điện nước khi nhận',
      desc: 'Chụp ảnh lại chỉ số công tơ điện và đồng hồ nước ban đầu để đối chiếu chính xác vào cuối tháng.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-purple-600" />,
      title: '4. Kiểm tra an ninh và thiết bị PCCC',
      desc: 'Ưu tiên trọ có camera, khóa vân tay, lối thoát hiểm và bình chữa cháy đạt chuẩn an toàn nghiệm thu.',
    },
  ];

  return (
    <section className="py-14 bg-stone-50 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-elevated">
          {/* Subtle architectural gradient */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-700/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-clay-500 text-white px-2.5 py-0.5 rounded-md inline-block mb-2">
                  Cẩm nang an toàn
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  4 Nguyên tắc vàng khi thuê phòng trọ sinh viên
                </h2>
                <p className="text-xs sm:text-sm text-brand-100/70 mt-1">
                  Được đúc kết từ kinh nghiệm của hàng ngàn sinh viên ĐH Thái Nguyên
                </p>
              </div>

              <button
                onClick={onOpenGuideModal}
                className="shrink-0 inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow"
              >
                <span>Xem cẩm nang đầy đủ</span>
                <ArrowRight className="w-4 h-4 text-brand-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-xs">
                    {tip.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-brand-100/70 leading-relaxed font-light">
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
