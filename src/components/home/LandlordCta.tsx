import React from 'react';
import { Plus, Check, ShieldCheck, Building2 } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E6E4DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#23483D] rounded-md p-7 sm:p-14 text-white relative overflow-hidden shadow-card border border-[#1A372E]">
          {/* Subtle architectural geometric background line */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] bg-white/10 text-emerald-300 border border-white/20 px-3 py-1 rounded-sm inline-block mb-3.5">
              PARTENARIAT PROPRIÉTAIRES • HỢP TÁC CHỦ NHÀ
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight leading-snug mb-3.5">
              Đăng Tin Cho Thuê Chuẩn Mực, Tiếp Cận Khách Thuê Văn Minh
            </h2>
            <p className="text-xs sm:text-sm text-stone-200/90 mb-8 leading-relaxed font-light">
              Nền tảng hỗ trợ chủ nhà cập nhật trạng thái phòng trống tự động, bảo vệ số điện thoại chống cuộc gọi rác và cấp huy hiệu chứng thực chính chủ hoàn toàn miễn phí.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9 text-xs sm:text-sm text-stone-100 font-medium">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Đăng tin trực tiếp, không phí môi giới</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Cấp huy hiệu CHÍNH CHỦ sau thẩm định</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Nhận lịch hẹn xem phòng trực tiếp từ khách</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Chủ động bật/tắt khi phòng đã có người thuê</span>
              </div>
            </div>

            <button
              onClick={onPostRoom}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F6F2] text-charcoal-900 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-sm shadow-whisper transition active:scale-98 tracking-wider uppercase"
            >
              <Plus className="w-4 h-4 text-brand-700" />
              <span>ĐĂNG TIN CHO THUÊ NGAY</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};