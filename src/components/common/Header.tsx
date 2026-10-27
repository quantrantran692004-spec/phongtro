import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Heart, 
  Scale, 
  PlusCircle, 
  User as UserIcon, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  LogOut,
  MapPin,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRooms } from '../../context/RoomContext';

interface HeaderProps {
  currentTab: 'home' | 'search' | 'landlord' | 'admin';
  onNavigate: (tab: 'home' | 'search' | 'landlord' | 'admin') => void;
  onOpenAuth: () => void;
  onOpenProfile: (tab?: 'saved' | 'appointments' | 'profile') => void;
  onOpenCompare: () => void;
  onOpenPostRoom: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  onOpenProfile,
  onOpenCompare,
  onOpenPostRoom,
  onOpenGuide,
}) => {
  const { currentUser, logout, isAuthenticated, isAdmin, isLandlord, switchDemoRole } = useAuth();
  const { favorites, compareList } = useRooms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Banner Notice for Thai Nguyen Students */}
      <div className="bg-gradient-to-r from-tea-700 via-emerald-700 to-tea-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
              Thái Nguyên
            </span>
            <span className="truncate">
              Chào mừng tân sinh viên ĐH Thái Nguyên & kỹ sư Samsung! Nền tảng miễn phí 100% cho người thuê.
            </span>
          </div>

          {/* Quick Demo Switcher */}
          <div className="relative shrink-0 flex items-center gap-2">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition"
              title="Chuyển đổi nhanh giữa các tài khoản mẫu để kiểm tra tính năng"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>
                {currentUser?.role === 'admin'
                  ? '🛡️ Vai trò: Admin'
                  : currentUser?.role === 'landlord'
                  ? '🏡 Vai trò: Chủ trọ'
                  : '🎓 Vai trò: Sinh viên'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {demoMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-1.5 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-2 z-50 text-xs"
                onClick={() => setDemoMenuOpen(false)}
              >
                <div className="font-semibold text-slate-500 px-2 py-1 text-[11px] uppercase tracking-wider">
                  Chuyển nhanh tài khoản test:
                </div>
                <button
                  onClick={() => switchDemoRole('tenant')}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'tenant' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎓</span>
                    <div>
                      <div className="font-medium">Sinh viên (An - Y Dược)</div>
                      <div className="text-[10px] text-slate-500">Tìm phòng, lưu yêu thích, hẹn lịch</div>
                    </div>
                  </div>
                  {currentUser?.role === 'tenant' && <span className="text-xs text-emerald-600">✓</span>}
                </button>

                <button
                  onClick={() => switchDemoRole('landlord')}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'landlord' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏡</span>
                    <div>
                      <div className="font-medium">Chủ trọ (Cô Lan Tân Thịnh)</div>
                      <div className="text-[10px] text-slate-500">Đăng tin, sửa phòng, quản lý tin</div>
                    </div>
                  </div>
                  {currentUser?.role === 'landlord' && <span className="text-xs text-emerald-600">✓</span>}
                </button>

                <button
                  onClick={() => switchDemoRole('admin')}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'admin' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <div>
                      <div className="font-medium">Quản trị viên (Admin)</div>
                      <div className="text-[10px] text-slate-500">Duyệt phòng, xử lý report, import CSV</div>
                    </div>
                  </div>
                  {currentUser?.role === 'admin' && <span className="text-xs text-emerald-600">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-tea-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">TRỌ THÁI NGUYÊN</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Kênh phòng trọ sinh viên & người đi làm</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3.5 py-2 rounded-lg transition ${
                  currentTab === 'home'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Trang chủ
              </button>

              <button
                onClick={() => onNavigate('search')}
                className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
                  currentTab === 'search'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Tìm phòng trọ</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="px-3.5 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Cẩm nang thuê</span>
              </button>

              {isLandlord && (
                <button
                  onClick={() => onNavigate('landlord')}
                  className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
                    currentTab === 'landlord'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
                    currentTab === 'admin'
                      ? 'text-purple-700 bg-purple-50'
                      : 'text-purple-600 hover:text-purple-900 hover:bg-purple-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quản Trị Hệ Thống</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              className="relative p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition"
              title="So sánh phòng đã chọn"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition"
              title="Phòng yêu thích"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Post Room Button */}
            <button
              onClick={onOpenPostRoom}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Đăng tin cho thuê</span>
            </button>

            {/* User Profile / Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition border border-transparent hover:border-slate-200"
                >
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-300"
                  />
                  <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                    {currentUser?.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-sm"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{currentUser?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                    </div>

                    <button
                      onClick={() => onOpenProfile('profile')}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>Thông tin tài khoản</span>
                    </button>

                    <button
                      onClick={() => onOpenProfile('saved')}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Phòng đã lưu ({favorites.length})</span>
                    </button>

                    <button
                      onClick={() => onOpenProfile('appointments')}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>Lịch hẹn xem phòng</span>
                    </button>

                    {isLandlord && (
                      <button
                        onClick={() => onNavigate('landlord')}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-emerald-700 font-medium"
                      >
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <span>Kênh quản lý chủ trọ</span>
                      </button>
                    )}

                    {isAdmin && (
                      <button
                        onClick={() => onNavigate('admin')}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-purple-700 font-medium"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span>Trang quản trị (Admin)</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 px-3.5 py-2 rounded-xl transition"
              >
                <UserIcon className="w-4 h-4" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative p-2 text-slate-600 rounded-lg"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              {favorites.length > 0 && (
                <span className="absolute 0 top-0 right-0 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </button>

          <button
            onClick={() => {
              onNavigate('search');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Tìm phòng trọ</span>
          </button>

          <button
            onClick={() => {
              onOpenCompare();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>So sánh phòng trọ</span>
            </div>
            {compareList.length > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {compareList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onOpenGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Cẩm nang thuê trọ an toàn</span>
          </button>

          {isLandlord && (
            <button
              onClick={() => {
                onNavigate('landlord');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-emerald-700 bg-emerald-50 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Kênh Quản Lý Chủ Trọ</span>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-purple-700 bg-purple-50 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Trang Quản Trị Hệ Thống</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPostRoom();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Đăng tin cho thuê phòng</span>
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  onOpenProfile('profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 border border-slate-300 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>Tài khoản ({currentUser?.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 border border-slate-300 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <span>Đăng nhập / Đăng ký</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
