import React from 'react';
import { PlusCircle, ShieldCheck, Users, Zap, Check } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-slate-700">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 px-3 py-1 rounded-full inline-block mb-3">
              Dành cho chủ nhà trọ
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Đăng tin cho thuê nhanh chóng, tiếp cận hơn 50.000+ sinh viên Thái Nguyên
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              Hệ thống quản lý tin đăng thông minh, tự động bật/tắt trạng thái phòng trống, bảo vệ số điện thoại chống cuộc gọi rác và hỗ trợ cấp huy hiệu xác minh miễn phí.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Đăng tin miễn phí 100% trọn đời</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Hỗ trợ gắn tích xanh ĐÃ XÁC MINH</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Nhận lịch hẹn xem phòng trực tiếp</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Dễ dàng cập nhật phòng còn/hết</span>
              </div>
            </div>

            <button
              onClick={onPostRoom}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Đăng tin cho thuê phòng ngay</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
