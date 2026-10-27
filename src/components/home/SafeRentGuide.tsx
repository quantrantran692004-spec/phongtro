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
      icon: <FileText className="w-5 h-5 text-brand-700" />,
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
      desc: 'Ưu tiên trọ có camera, khóa vân tay, lối thoát hiểm và bình chữa cháy đạt chuẩn an toàn.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-elevated">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-clay-500 text-white px-2.5 py-1 rounded-md inline-block mb-2.5">
                  Cẩm nang an toàn
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  4 Nguyên tắc vàng khi thuê phòng trọ sinh viên
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 font-normal">
                  Được đúc kết từ kinh nghiệm thực tế của sinh viên ĐH Thái Nguyên
                </p>
              </div>

              <button
                onClick={onOpenGuideModal}
                className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                <span>Xem cẩm nang đầy đủ</span>
                <ArrowRight className="w-4 h-4 text-brand-700" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 hover:border-stone-600 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-xs">
                    {tip.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
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
