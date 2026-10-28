import React from 'react';
import { ShieldAlert, FileText, CheckCircle, Eye, ArrowRight } from 'lucide-react';

interface SafeRentGuideProps {
  onOpenGuideModal: () => void;
}

export const SafeRentGuide: React.FC<SafeRentGuideProps> = ({ onOpenGuideModal }) => {
  const tips = [
    {
      icon: <Eye className="w-5 h-5 text-emerald-700" />,
      title: '1. Xem phòng trực tiếp',
      desc: 'Tuyệt đối không chuyển tiền cọc qua mạng trước khi kiểm tra tận nơi.',
    },
    {
      icon: <FileText className="w-5 h-5 text-emerald-700" />,
      title: '2. Hợp đồng rõ ràng',
      desc: 'Quy định cụ thể điều kiện hoàn cọc, ngày chốt điện nước và tiền cọc.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-700" />,
      title: '3. Chốt số công tơ điện nước',
      desc: 'Chụp ảnh chỉ số công tơ điện và đồng hồ nước khi bắt đầu nhận phòng.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-emerald-700" />,
      title: '4. Kiểm tra an ninh & PCCC',
      desc: 'Ưu tiên phòng có camera, khóa vân tay, lối thoát hiểm và bình chữa cháy.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-stone-800">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white px-2.5 py-1 rounded-md inline-block mb-2">
                  Cẩm nang an toàn
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  4 Lưu Ý Quan Trọng Khi Thuê Phòng
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">
                  Kinh nghiệm thực tế giúp sinh viên tránh bẫy cọc và tranh chấp
                </p>
              </div>

              <button
                onClick={onOpenGuideModal}
                className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                <span>Xem cẩm nang đầy đủ</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 text-stone-900 shadow-sm border border-stone-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3">
                    {tip.icon}
                  </div>
                  <h3 className="text-sm font-black text-stone-900 mb-1 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
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