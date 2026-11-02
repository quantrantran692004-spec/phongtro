import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSearch: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSearch, onOpenGuide }) => {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#D1DCD6] bg-gradient-to-br from-[#E9EFEB] via-[#E4EBE7] to-[#DDE6E1] pt-16 pb-10 text-slate-800 shadow-[0_-12px_36px_rgba(15,23,42,0.035)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-36 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:-right-28 after:top-8 after:h-72 after:w-72 after:rounded-full after:bg-teal-400/10 after:blur-3xl after:content-['']">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-scroll-stagger className="grid grid-cols-1 gap-8 border-b border-[#CFD9D3] pb-12 text-xs md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info (2 cols) */}
          <div data-scroll-reveal="up" className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal-800 shadow-sm ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3zm0 4.2l5 4.5V18h-2v-5H9v5H7v-6.3l5-4.5zM17 6.5V3h-2v1.7l2 1.8z"/>
                </svg>
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900">TRỌ THÁI NGUYÊN</span>
                <p className="text-[11px] font-medium text-teal-800">Kênh phòng trọ chính chủ & minh bạch</p>
              </div>
            </div>

            <p className="max-w-sm leading-relaxed font-normal text-slate-700">
              Nền tảng hỗ trợ sinh viên các trường Đại học Thái Nguyên và kỹ sư tại KCN Samsung Phổ Yên tìm kiếm phòng trọ chuẩn giá, an toàn, không qua trung gian thu phí.
            </p>

            <div className="space-y-2 pt-1 font-normal text-slate-700">
              <div className="group flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-teal-700 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-slate-950">284 Đường Lương Ngọc Quyến, TP. Thái Nguyên</span>
              </div>
              <div className="group flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-teal-700 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-slate-950">Hotline hỗ trợ: 0984.512.345</span>
              </div>
              <div className="group flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-teal-700 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-slate-950">lienhe@trothainguyen.vn</span>
              </div>
            </div>
          </div>

          {/* Khu vực sinh viên */}
          <div data-scroll-reveal="up">
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-900">
              Khu Vực Trọng Điểm
            </h4>
            <ul className="space-y-2.5 font-normal text-slate-700">
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Làng ĐH Tân Thịnh
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Khu ĐH Y Dược & Sư Phạm
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Đường Z115 (ICTU & Nông Lâm)
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Phường Tích Lương (TNUT)
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Khu Phổ Yên (Samsung SEVT)
                </button>
              </li>
            </ul>
          </div>

          {/* Loại phòng */}
          <div data-scroll-reveal="up">
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-900">
              Loại Hình Phòng
            </h4>
            <ul className="space-y-2.5 font-normal text-slate-700">
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Phòng trọ đơn khép kín
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Studio đầy đủ tiện nghi
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Chung cư mini cao cấp
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Nhà nguyên căn sinh viên
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Ký túc xá / Box bao trọn chi phí
                </button>
              </li>
            </ul>
          </div>

          {/* An toàn */}
          <div data-scroll-reveal="up">
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-900">
              An Toàn & Pháp Lý
            </h4>
            <ul className="space-y-2.5 font-normal text-slate-700">
              <li>
                <button onClick={onOpenGuide} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Cẩm nang tránh bẫy cọc online
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Mẫu hợp đồng thuê phòng chuẩn
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Kiểm tra PCCC & an ninh
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="transition-all duration-200 hover:translate-x-1 hover:text-teal-900">
                  Báo cáo tin đăng vi phạm
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div data-scroll-reveal="up" className="flex flex-col items-center justify-between gap-3 pt-6 text-xs font-normal text-slate-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} <strong className="font-semibold text-slate-800">Trọ Thái Nguyên</strong>. Nền tảng tìm kiếm phòng trọ chính chủ tại Thái Nguyên.
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="h-4 w-4 text-teal-700" />
            <span>Đồng hành cùng người thuê nhà tại Thái Nguyên</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
