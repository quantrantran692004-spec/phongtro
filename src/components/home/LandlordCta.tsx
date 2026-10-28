import React from 'react';
import { Plus, Check } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] rounded-2xl p-6 sm:p-12 text-white relative overflow-hidden shadow-lg border border-stone-800">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white px-2.5 py-1 rounded-md inline-block mb-3 border border-emerald-700">
              Dành cho chủ nhà trọ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              Bạn Có Phòng Trọ Cần Cho Thuê?
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 mb-6 leading-relaxed font-medium">
              Đăng tin miễn phí 100%, tự động nhận lịch hẹn xem phòng và tiếp cận hơn 50.000+ sinh viên Thái Nguyên.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-stone-100 font-bold">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/40">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Đăng tin miễn phí trọn đời</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/40">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Hỗ trợ gắn huy hiệu CHÍNH CHỦ</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/40">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Nhận lịch hẹn xem phòng trực tiếp</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/40">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Dễ dàng bật/tắt khi đã hết phòng</span>
              </div>
            </div>

            <button
              onClick={onPostRoom}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition active:scale-98 tracking-wide uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin cho thuê ngay</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};