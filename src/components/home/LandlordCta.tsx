import React from 'react';
import { Plus, Check } from 'lucide-react';

interface LandlordCtaProps {
  onPostRoom: () => void;
}

export const LandlordCta: React.FC<LandlordCtaProps> = ({ onPostRoom }) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-elevated border border-brand-800">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-brand-700 text-white px-2.5 py-1 rounded-md inline-block mb-3 border border-brand-600">
              Dành cho chủ nhà trọ
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Đăng tin cho thuê nhanh chóng, tiếp cận hơn 50.000+ sinh viên Thái Nguyên
            </h2>
            <p className="text-xs sm:text-sm text-brand-100 mb-6 leading-relaxed font-normal">
              Hệ thống tự động bật/tắt trạng thái phòng trống, bảo vệ số điện thoại chống cuộc gọi rác và hỗ trợ cấp huy hiệu chính chủ miễn phí.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-stone-100 font-medium">
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
                <span>Hỗ trợ gắn tích xanh CHÍNH CHỦ</span>
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
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin cho thuê phòng ngay</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
