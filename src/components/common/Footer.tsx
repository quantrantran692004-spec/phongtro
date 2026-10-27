import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSearch: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSearch, onOpenGuide }) => {
  return (
    <footer className="bg-[#161816] text-stone-300 pt-16 pb-10 border-t border-[#252825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2E2A] text-xs">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#23483D] flex items-center justify-center text-white shadow-whisper">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3zm0 4.2l5 4.5V18h-2v-5H9v5H7v-6.3l5-4.5zM17 6.5V3h-2v1.7l2 1.8z"/>
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-[0.14em] text-white">TRỌ THÁI NGUYÊN</span>
                <p className="text-[9px] uppercase tracking-[0.16em] text-emerald-400 font-medium">Bất Động Sản Cho Thuê • Minh Bạch</p>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm font-light">
              Nền tảng hỗ trợ sinh viên các trường Đại học Thái Nguyên và kỹ sư, công nhân tại KCN Samsung Phổ Yên tìm kiếm không gian lưu trú an toàn, khảo sát thực tế và ký kết trực tiếp với chủ trọ.
            </p>

            <div className="space-y-2 text-stone-400 pt-1 font-light">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>284 Đường Lương Ngọc Quyến, TP. Thái Nguyên</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hotline hỗ trợ sinh viên: 0984.512.345</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>lienhe@trothainguyen.vn</span>
              </div>
            </div>
          </div>

          {/* Khu vực sinh viên */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white font-bold mb-3.5">
              Địa Bàn Trọng Điểm
            </h4>
            <ul className="space-y-2 text-stone-400 font-light">
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
                  Khu Phổ Yên (Samsung SEVT)
                </button>
              </li>
            </ul>
          </div>

          {/* Loại phòng */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white font-bold mb-3.5">
              Loại Hình Không Gian
            </h4>
            <ul className="space-y-2 text-stone-400 font-light">
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Phòng trọ đơn khép kín
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Studio full tiện nghi
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
                  Ký túc xá / Box bao trọn chi phí
                </button>
              </li>
            </ul>
          </div>

          {/* An toàn */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white font-bold mb-3.5">
              An Toàn & Pháp Lý
            </h4>
            <ul className="space-y-2 text-stone-400 font-light">
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
                  Kiểm tra PCCC & thoát hiểm
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-white transition">
                  Báo cáo tin đăng có dấu hiệu vi phạm
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-light">
          <div>
            © {new Date().getFullYear()} <strong className="text-stone-300 font-medium">Trọ Thái Nguyên</strong>. Hệ thống hỗ trợ tìm kiếm phòng trọ chính chủ tỉnh Thái Nguyên.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tiêu chuẩn minh bạch & đồng hành cùng sinh viên</span>
          </div>
        </div>
      </div>
    </footer>
  );
};