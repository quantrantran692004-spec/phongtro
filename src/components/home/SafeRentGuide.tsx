import React from 'react';
import { ShieldAlert, FileText, CheckCircle, Eye, ArrowRight } from 'lucide-react';

interface SafeRentGuideProps {
  onOpenGuideModal: () => void;
}

export const SafeRentGuide: React.FC<SafeRentGuideProps> = ({ onOpenGuideModal }) => {
  const tips = [
    {
      icon: <Eye className="w-5 h-5 text-amber-600" />,
      title: '1. Không cọc tiền online khi chưa xem phòng',
      desc: 'Cảnh giác với các bài đăng ảnh đẹp lung linh, giá siêu rẻ yêu cầu chuyển khoản cọc giữ chỗ trước.',
    },
    {
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      title: '2. Hợp đồng rõ ràng, minh bạch khoản cọc',
      desc: 'Ghi rõ số tiền cọc, điều kiện hoàn cọc (báo trước bao nhiêu ngày), ngày chốt số điện nước hàng tháng.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
      title: '3. Kiểm tra đồng hồ điện nước ngay lúc nhận',
      desc: 'Chụp ảnh lại chỉ số công tơ điện và đồng hồ nước ban đầu để đối chiếu chính xác vào cuối tháng.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-purple-600" />,
      title: '4. Kiểm tra an ninh và thiết bị PCCC',
      desc: 'Ưu tiên trọ có camera, khóa vân tay, lối thoát hiểm và bình chữa cháy đạt chuẩn an toàn.',
    },
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-tea-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          {/* Decorative Pattern */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-900 px-3 py-1 rounded-full inline-block mb-2">
                  Cẩm nang an toàn
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  4 Nguyên tắc vàng khi thuê phòng trọ sinh viên
                </h2>
                <p className="text-sm text-emerald-100/80 mt-1">
                  Được đúc kết từ kinh nghiệm của hàng ngàn sinh viên ĐH Thái Nguyên
                </p>
              </div>

              <button
                onClick={onOpenGuideModal}
                className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow"
              >
                <span>Xem cẩm nang đầy đủ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:bg-white/15 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow">
                    {tip.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
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
