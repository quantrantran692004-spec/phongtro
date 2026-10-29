import React from 'react';
import { Plus, Check, Sparkles, TrendingUp, ShieldCheck, Users, ArrowRight } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-8 sm:p-12 lg:p-16 shadow-[0_30px_60px_rgba(15,23,42,0.25)] border border-slate-800">
          
          {/* Subtle Ambient Light Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column (7 cols): Heading, Features & CTA */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Dành Cho Chủ Nhà Trọ Thái Nguyên</span>
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Bạn Có Phòng Trọ{' '}
                <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  Cần Tìm Khách Nhanh?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed font-normal max-w-xl">
                Đăng tin miễn phí 100%, tiếp cận ngay hơn 50.000+ sinh viên các trường ĐH Thái Nguyên và kỹ sư KCN Samsung Phổ Yên. Tỷ lệ lấp đầy phòng trống trung bình chỉ trong 5 ngày.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Đăng tin trực tiếp không mất phí môi giới</span>
                </div>

                <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Hỗ trợ cấp huy hiệu CHÍNH CHỦ uy tín</span>
                </div>

                <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Nhận lịch hẹn xem phòng tự động qua SMS/Zalo</span>
                </div>

                <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Công cụ Nâng Cấp Tin VIP & Đẩy Top thông minh</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onPostRoom}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm px-8 py-4 rounded-full shadow-[0_12px_28px_rgba(20,184,166,0.35)] hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Đăng Tin Cho Thuê Ngay (0đ)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Column (5 cols): Modern Dashboard Preview Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5">
                
                {/* Header Mockup */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-bold">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-teal-400 font-bold block">Bảng điều khiển chủ trọ</span>
                      <span className="text-base font-extrabold text-white">Hiệu Quả Đăng Tin Thực Tế</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>

                {/* Mini Stat Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Lượt xem tin tuần</span>
                    <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 tabular-nums">
                      1.420+
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5">
                      ↑ +38% so với tuần trước
                    </span>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Lịch hẹn xem phòng</span>
                    <div className="text-xl sm:text-2xl font-extrabold text-teal-300 mt-1 tabular-nums">
                      12 lịch
                    </div>
                    <span className="text-[10px] text-teal-400 font-semibold flex items-center gap-0.5 mt-0.5">
                      Tỷ lệ chốt thuê 85%
                    </span>
                  </div>
                </div>

                {/* VIP Upgrade Preview Strip */}
                <div className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 rounded-2xl p-4 border border-teal-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      VIP
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Gói Đẩy Top Vị Trí #1</div>
                      <div className="text-[11px] text-teal-200/80">Hiển thị ưu tiên trang đầu tìm kiếm</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-white/15 text-white px-3 py-1.5 rounded-xl border border-white/20 whitespace-nowrap">
                    Xem demo
                  </span>
                </div>

                {/* Trust Footer */}
                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Hỗ trợ kỹ thuật: <strong>0984.512.345</strong></span>
                  <span className="text-emerald-400 font-semibold">✓ Đã xác minh CCCD</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
