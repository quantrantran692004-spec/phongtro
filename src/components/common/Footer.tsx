import React from 'react';
import { Home, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';

interface FooterProps {
  onNavigateSearch: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSearch, onOpenGuide }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Bio (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-tea-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">TRỌ THÁI NGUYÊN</span>
                <p className="text-[11px] text-emerald-400 font-semibold">Minh bạch • An tâm • Chuẩn giá</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Nền tảng công nghệ hỗ trợ sinh viên các trường Đại học Thái Nguyên và người lao động tại KCN Samsung Phổ Yên tìm kiếm phòng trọ chính chủ, không qua môi giới lừa đảo.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>284 Đường Lương Ngọc Quyến, TP. Thái Nguyên</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline hỗ trợ sinh viên: 0984.512.345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>lienhe@trothainguyen.vn</span>
              </div>
            </div>
          </div>

          {/* Col 2: Khu vực sinh viên */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Khu Vực Sinh Viên
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Làng ĐH Tân Thịnh
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Khu ĐH Y Dược & Sư Phạm
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Đường Z115 (ICTU & Nông Lâm)
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Phường Tích Lương (TNUT)
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Khu Phổ Yên (KCN Samsung SEVT)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Loại hình phòng */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Loại Hình Phòng
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Phòng trọ đơn khép kín
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Studio full nội thất
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Chung cư mini cao cấp
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Nhà nguyên căn sinh viên
                </button>
              </li>
              <li>
                <button onClick={onNavigateSearch} className="hover:text-emerald-400 transition">
                  Ký túc xá / Box bao điện nước
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hướng dẫn & Hỗ trợ */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              An Toàn & Pháp Lý
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenGuide} className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>Cẩm nang tránh bẫy cọc</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-emerald-400 transition">
                  Mẫu hợp đồng thuê phòng chuẩn
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-emerald-400 transition">
                  Quy định kiểm tra PCCC
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-emerald-400 transition">
                  Báo cáo tin đăng lừa đảo
                </button>
              </li>
              <li>
                <button onClick={onOpenGuide} className="hover:text-emerald-400 transition">
                  Chính sách bảo vệ thông tin
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>Trọ Thái Nguyên</strong>. Xây dựng vì cộng đồng sinh viên Thái Nguyên.
          </div>
          <div className="flex items-center gap-1">
            <span>Dự án được xây dựng chuẩn mực với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>và công nghệ hiện đại</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
