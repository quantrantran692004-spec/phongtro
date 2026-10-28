import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSearch: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSearch, onOpenGuide }) => {
  return (
    <footer className="bg-[#252725] text-[#D5D5D5] pt-16 pb-10 border-t border-[#383C38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#383C38] text-xs">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#23483D] flex items-center justify-center text-white shadow-whisper">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3zm0 4.2l5 4.5V18h-2v-5H9v5H7v-6.3l5-4.5zM17 6.5V3h-2v1.7l2 1.8z"/>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-base tracking-tight text-white">TRỌ THÁI NGUYÊN</span>
                <p className="text-[11px] text-[#C9DCD3] font-normal">Kênh phòng trọ chính chủ & minh bạch</p>
              </div>
            </div>

            <p className="text-[#B0B2AF] leading-relaxed max-w-sm font-normal">
              Nền tảng hỗ trợ sinh viên các trường Đại học Thái Nguyên và kỹ sư tại KCN Samsung Phổ Yên tìm kiếm phòng trọ chuẩn giá, an toàn, không qua trung gian thu phí.
            </p>

            <div className="space-y-2 text-[#B0B2AF] pt-1 font-normal">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9EBFAF] shrink-0" />
                <span>284 Đường Lương Ngọc Quyến, TP. Thái Nguyên</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9EBFAF] shrink-0" />
                <span>Hotline hỗ trợ: 0984.512.345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9EBFAF] shrink-0" />
                <span>lienhe@trothainguyen.vn</span>
              </div>
            </div>
          </div>

          {/* Khu vực sinh viên */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-white mb-3.5">
              Khu Vực Trọng Điểm
            </h4>
            <ul className="space-y-2.5 text-[#B0B2AF] font-normal">
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
            <h4 className="font-semibold text-xs uppercase tracking-wider text-white mb-3.5">
              Loại Hình Phòng
            </h4>
            <ul className="space-y-2.5 text-[#B0B2AF] font-normal">
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Phòng trọ đơn khép kín
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-white transition">
                  Studio đầy đủ tiện nghi
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
            <h4 className="font-semibold text-xs uppercase tracking-wider text-white mb-3.5">
              An Toàn & Pháp Lý
            </h4>
            <ul className="space-y-2.5 text-[#B0B2AF] font-normal">
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
                  Kiểm tra PCCC & an ninh
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-white transition">
                  Báo cáo tin đăng vi phạm
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8E918E] font-normal">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-medium">Trọ Thái Nguyên</strong>. Nền tảng tìm kiếm phòng trọ chính chủ tại Thái Nguyên.
          </div>
          <div className="flex items-center gap-1.5 text-[#B0B2AF]">
            <ShieldCheck className="w-4 h-4 text-[#9EBFAF]" />
            <span>Đồng hành cùng người thuê nhà tại Thái Nguyên</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
