import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSearch: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSearch, onOpenGuide }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-stone-800 text-xs">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3zm0 4.2l5 4.5V18h-2v-5H9v5H7v-6.3l5-4.5zM17 6.5V3h-2v1.7l2 1.8z"/>
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-base text-white tracking-tight">TRỌ THÁI NGUYÊN</span>
                <p className="text-[10px] text-emerald-400 font-medium">Kênh phòng trọ chính chủ cho sinh viên & kỹ sư</p>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm font-light">
              Nền tảng hỗ trợ sinh viên các trường Đại học Thái Nguyên và người lao động tại KCN Samsung Phổ Yên tìm kiếm phòng trọ chuẩn giá, an toàn, không qua trung gian thu phí.
            </p>

            <div className="space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>284 Đường Lương Ngọc Quyến, TP. Thái Nguyên</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>Hotline hỗ trợ sinh viên: 0984.512.345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>lienhe@trothainguyen.vn</span>
              </div>
            </div>
          </div>

          {/* Khu vực sinh viên */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">
              Khu Vực Trọng Điểm
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Làng ĐH Tân Thịnh
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Khu ĐH Y Dược & Sư Phạm
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Đường Z115 (ICTU & Nông Lâm)
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Phường Tích Lương (TNUT)
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Khu Phổ Yên (KCN Samsung SEVT)
                </button>
              </li>
            </ul>
          </div>

          {/* Loại phòng */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">
              Loại Hình Phòng
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Phòng trọ đơn khép kín
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Studio full nội thất
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Chung cư mini cao cấp
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Nhà nguyên căn sinh viên
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Ký túc xá / Box bao điện nước
                </button>
              </li>
            </ul>
          </div>

          {/* An toàn */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">
              An Toàn & Pháp Lý
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={onOpenGuide} className="hover:text-white transition">
                  Cẩm nang tránh bẫy cọc online
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-white transition">
                  Mẫu hợp đồng thuê phòng chuẩn
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-white transition">
                  Kiểm tra PCCC & lối thoát hiểm
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-white transition">
                  Báo cáo tin đăng lừa đảo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} <strong>Trọ Thái Nguyên</strong>. Hệ thống phi lợi nhuận cho sinh viên Thái Nguyên.
          </div>
          <div className="flex items-center gap-1">
            <span>Thiết kế vì cộng đồng sinh viên & người lao động Thái Nguyên</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
