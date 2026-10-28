import React from 'react';
import { Plus, Check } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#23483D] rounded-xl p-8 sm:p-14 text-white relative overflow-hidden shadow-card border border-[#1A372E]">
          {/* Subtle architectural background texture */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" />
              <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] bg-[#1A372E] text-[#C9DCD3] px-3 py-1 rounded-full inline-block mb-4 border border-[#2A574A]">
              Dành Cho Chủ Nhà Trọ
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight mb-3">
              Bạn Có Phòng Trọ Cần Cho Thuê?
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
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F6F2] text-[#23483D] font-semibold text-sm px-7 py-3.5 rounded-md shadow-whisper transition active:scale-[0.99] tracking-wider uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng Tin Cho Thuê Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
