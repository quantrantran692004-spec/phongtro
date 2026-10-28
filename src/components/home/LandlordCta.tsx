import React from 'react';
import { Plus, Check } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 lg:p-16 shadow-[0_24px_48px_rgba(0,0,0,0.2)]">
          {/* Subtle architectural background texture */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 pointer-events-none hidden lg:block text-white">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" />
              <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Decorative amber glow blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column (7 cols): Heading, Checklist & CTA */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] bg-white/10 text-white/80 border border-white/10 px-3.5 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm">
                Dành Cho Chủ Nhà Trọ Thái Nguyên
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-3">
                Bạn Có Phòng Trọ <span className="text-amber-300 font-luxury italic font-normal">Cần Cho Thuê?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed font-normal">
                Đăng tin miễn phí 100%, tiếp cận nhanh chóng hơn 50.000+ sinh viên và kỹ sư đang tìm chỗ ở tại Thái Nguyên.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Đăng tin trực tiếp không mất phí</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Hỗ trợ cấp huy hiệu CHÍNH CHỦ</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Nhận lịch hẹn xem phòng tự động</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Dễ dàng cập nhật khi hết phòng</span>
                </div>
              </div>

              <button
                onClick={onPostRoom}
                className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-8 py-4 rounded-full shadow-[0_8px_24px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Đăng Tin Cho Thuê Ngay (0đ)</span>
              </button>
            </div>

            {/* Right Column (5 cols): Trust Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-semibold block">Cam kết nền tảng</span>
                    <span className="text-xl font-bold text-white">Minh Bạch & Trực Tiếp</span>
                  </div>
                  <span className="text-3xl">🛡️</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="font-luxury italic text-2xl text-amber-400/60 font-normal shrink-0">01</span>
                    <div>
                      <strong className="text-white block font-medium">100% Không Phí Môi Giới:</strong>
                      <span className="text-slate-400 text-xs">Chủ trọ và người thuê làm việc trực tiếp, không bị trích hoa hồng.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-luxury italic text-2xl text-amber-400/60 font-normal shrink-0">02</span>
                    <div>
                      <strong className="text-white block font-medium">Bảo Mật & Chủ Động:</strong>
                      <span className="text-slate-400 text-xs">Tự bật/tắt hiển thị số điện thoại và chuyển trạng thái khi đã cho thuê.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-luxury italic text-2xl text-amber-400/60 font-normal shrink-0">03</span>
                    <div>
                      <strong className="text-white block font-medium">Lượng Khách Ổn Định:</strong>
                      <span className="text-slate-400 text-xs">Hàng ngàn sinh viên ĐH Y Dược, Sư Phạm, Kỹ Thuật tìm phòng mỗi học kỳ.</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Hỗ trợ kỹ thuật 24/7:</span>
                  <span className="text-amber-400 font-bold">0984.512.345</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
