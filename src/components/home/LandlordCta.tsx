import React from 'react';
import { Plus, Check } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#23483D] rounded-2xl p-8 sm:p-14 text-white relative overflow-hidden shadow-card border border-[#1A372E]">
          {/* Subtle architectural background texture */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" />
              <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column (7 cols): Heading, Checklist & CTA */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] bg-[#1A372E] text-[#C9DCD3] px-3.5 py-1.5 rounded-full inline-block mb-4 border border-[#2A574A]">
                Dành Cho Chủ Nhà Trọ Thái Nguyên
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-light text-white tracking-tight leading-tight mb-3">
                Bạn Có Phòng Trọ <span className="font-serif italic font-normal text-[#C9DCD3]">Cần Cho Thuê?</span>
              </h2>
              <p className="text-sm sm:text-base text-[#C9DCD3] mb-8 leading-relaxed font-normal">
                Đăng tin miễn phí 100%, tiếp cận nhanh chóng hơn 50.000+ sinh viên và kỹ sư đang tìm chỗ ở tại Thái Nguyên.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 text-xs sm:text-sm text-stone-100 font-normal">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A372E] text-[#C9DCD3] flex items-center justify-center shrink-0 border border-[#2A574A]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Đăng tin trực tiếp không mất phí</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A372E] text-[#C9DCD3] flex items-center justify-center shrink-0 border border-[#2A574A]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Hỗ trợ cấp huy hiệu CHÍNH CHỦ</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A372E] text-[#C9DCD3] flex items-center justify-center shrink-0 border border-[#2A574A]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Nhận lịch hẹn xem phòng tự động</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A372E] text-[#C9DCD3] flex items-center justify-center shrink-0 border border-[#2A574A]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Dễ dàng cập nhật khi hết phòng</span>
                </div>
              </div>

              <button
                onClick={onPostRoom}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-[#F7F6F2] text-[#23483D] font-semibold text-sm px-8 py-4 rounded-lg shadow-whisper transition active:scale-[0.99] tracking-wider uppercase"
              >
                <Plus className="w-4 h-4" />
                <span>Đăng Tin Cho Thuê Ngay (0đ)</span>
              </button>
            </div>

            {/* Right Column (5 cols): Trust Card filling the space purposefully */}
            <div className="lg:col-span-5">
              <div className="bg-[#1A372E]/80 backdrop-blur-md rounded-xl p-6 sm:p-7 border border-[#2A574A] shadow-elevated space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#2A574A]">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#9EBFAF] font-semibold block">Cam kết nền tảng</span>
                    <span className="text-xl font-bold text-white">Minh Bạch & Trực Tiếp</span>
                  </div>
                  <span className="text-3xl">🛡️</span>
                </div>

                <div className="space-y-3.5 text-xs text-[#C9DCD3]">
                  <div className="flex items-start gap-3">
                    <span className="font-serif italic text-lg text-white font-normal shrink-0">01</span>
                    <div>
                      <strong className="text-white block font-medium">100% Không Phí Môi Giới:</strong>
                      <span>Chủ trọ và người thuê làm việc trực tiếp, không bị trích hoa hồng.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-serif italic text-lg text-white font-normal shrink-0">02</span>
                    <div>
                      <strong className="text-white block font-medium">Bảo Mật & Chủ Động:</strong>
                      <span>Tự bật/tắt hiển thị số điện thoại và chuyển trạng thái khi đã cho thuê.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-serif italic text-lg text-white font-normal shrink-0">03</span>
                    <div>
                      <strong className="text-white block font-medium">Lượng Khách Ổn Định:</strong>
                      <span>Hàng ngàn sinh viên ĐH Y Dược, Sư Phạm, Kỹ Thuật tìm phòng mỗi học kỳ.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2A574A] flex items-center justify-between text-xs text-[#9EBFAF]">
                  <span>Hỗ trợ kỹ thuật 24/7:</span>
                  <span className="text-white font-semibold">0984.512.345</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
