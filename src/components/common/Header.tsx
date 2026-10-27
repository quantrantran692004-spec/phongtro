import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Scale, 
  Plus, 
  Menu, 
  X, 
  ShieldCheck, 
  Building2, 
  LogOut,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  User as UserIcon
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
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Thái Nguyên
            </span>
            <span className="text-stone-300 truncate font-normal text-[11px] sm:text-xs">
              Cổng phòng trọ chính chủ cho SV Đại học Thái Nguyên & KCN Samsung Phổ Yên
            </span>
          </div>

          {/* Quick Demo Switcher */}
          <div className="relative shrink-0 flex items-center ml-2">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition border border-stone-700"
              title="Đổi vai trò trải nghiệm"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Thử vai trò: </span>
              <span className="font-semibold text-white">
                {currentUser?.role === 'admin'
                  ? 'Admin'
                  : currentUser?.role === 'landlord'
                  ? 'Chủ trọ'
                  : 'Sinh viên'}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {roleMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-64 bg-white text-stone-900 rounded-xl shadow-elevated border border-stone-200 p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setRoleMenuOpen(false)}
              >
                <div className="font-bold text-stone-400 px-3 py-1.5 text-[10px] uppercase tracking-wider">
                  Chuyển nhanh tài khoản:
                </div>
                <button
                  onClick={() => switchDemoRole('tenant')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'tenant' ? 'bg-brand-50 text-brand-800 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🎓</span>
                    <div>
                      <div className="font-bold text-stone-900">Sinh viên (An - ĐH Y Dược)</div>
                      <div className="text-[11px] text-stone-500 font-normal">Tìm phòng, so sánh, đặt lịch hẹn</div>
                    </div>
                  </div>
                  {currentUser?.role === 'tenant' && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </button>

                <button
                  onClick={() => switchDemoRole('landlord')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'landlord' ? 'bg-brand-50 text-brand-800 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🏡</span>
                    <div>
                      <div className="font-bold text-stone-900">Chủ trọ (Cô Lan - Tân Thịnh)</div>
                      <div className="text-[11px] text-stone-500 font-normal">Đăng tin trọ, bật/tắt phòng trống</div>
                    </div>
                  </div>
                  {currentUser?.role === 'landlord' && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </button>

                <button
                  onClick={() => switchDemoRole('admin')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'admin' ? 'bg-brand-50 text-brand-800 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🛡️</span>
                    <div>
                      <div className="font-bold text-stone-900">Ban Quản Trị (Admin)</div>
                      <div className="text-[11px] text-stone-500 font-normal">Duyệt tin, cấp tích xanh, nhập CSV</div>
                    </div>
                  </div>
                  {currentUser?.role === 'admin' && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">
          {/* Brand Logo & Desktop Nav */}
          <div className="flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-800 transition">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 9.5V20C2 20.5523 2.44772 21 3 21H9V14H15V21H21C21.5523 21 22 20.5523 22 20V9.5L12 2ZM10.5 7H13.5V9.5H10.5V7Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base sm:text-lg text-stone-900 tracking-tight leading-none">
                    TRỌ THÁI NGUYÊN
                  </span>
                  <span className="bg-brand-100 text-brand-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    CHÍNH CHỦ
                  </span>
                </div>
                <p className="hidden sm:block text-[11px] text-stone-500 font-medium mt-0.5">
                  Minh bạch chi phí • Làng ĐH & KCN Samsung
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-stone-700">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-lg transition ${
                  currentTab === 'home'
                    ? 'text-brand-800 bg-brand-50 font-bold'
                    : 'hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Trang chủ
              </button>

              <button
                onClick={() => onNavigate('search')}
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                  currentTab === 'search'
                    ? 'text-brand-800 bg-brand-50 font-bold'
                    : 'hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-stone-500" />
                <span>Tìm phòng trọ</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="px-3 py-2 rounded-lg hover:text-stone-900 hover:bg-stone-100 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                <span>Cẩm nang thuê trọ</span>
              </button>

              {isLandlord && (
                <button
                  onClick={() => onNavigate('landlord')}
                  className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                    currentTab === 'landlord'
                      ? 'text-brand-800 bg-brand-50 font-bold'
                      : 'hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-brand-600" />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                    currentTab === 'admin'
                      ? 'text-stone-900 bg-stone-200 font-bold'
                      : 'hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                  <span>Quản trị (Admin)</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="relative p-2 text-stone-700 hover:text-brand-800 hover:bg-stone-100 rounded-lg transition border border-stone-200"
              title="So sánh phòng đã chọn"
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-clay-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Saved Favorites */}
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative p-2 text-stone-700 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition border border-stone-200"
              title="Phòng đã lưu"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Post Room Primary CTA */}
            <button
              onClick={onOpenPostRoom}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition"
            >
              <Plus className="w-3.5 h-3.5 text-brand-700" />
              <span>Đăng tin cho thuê</span>
            </button>

            {/* User Profile / Auth Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 bg-stone-100 hover:bg-stone-200 rounded-full transition border border-stone-200"
                >
                  <span className="text-xs font-bold text-stone-900 max-w-[120px] truncate">
                    {currentUser?.name}
                  </span>
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={currentUser?.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-600"
                  />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-elevated border border-stone-200 p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-stone-100">
                      <div className="font-bold text-stone-900">{currentUser?.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">{currentUser?.email}</div>
                    </div>

                    <button
                      onClick={() => onOpenProfile('profile')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 transition flex items-center gap-2 text-stone-700 font-medium"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                      <span>Thông tin tài khoản</span>
                    </button>

                    <button
                      onClick={() => onOpenProfile('saved')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 transition flex items-center justify-between text-stone-700 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <Heart className="w-3.5 h-3.5 text-stone-400" />
                        <span>Phòng đã lưu</span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full">
                        {favorites.length}
                      </span>
                    </button>

                    <button
                      onClick={() => onOpenProfile('appointments')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 transition flex items-center gap-2 text-stone-700 font-medium"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-stone-400" />
                      <span>Lịch hẹn xem phòng</span>
                    </button>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 transition flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-lg shadow-sm transition"
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile Right Icons & Hamburger */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative p-2 text-stone-700 rounded-lg hover:bg-stone-100"
              title="Phòng đã lưu"
            >
              <Heart className="w-5 h-5 text-rose-600" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:bg-stone-100 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-center border ${
                currentTab === 'home' ? 'bg-brand-50 border-brand-300 text-brand-900' : 'bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-center border ${
                currentTab === 'search' ? 'bg-brand-50 border-brand-300 text-brand-900' : 'bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              Tìm phòng trọ
            </button>
          </div>

          <div className="space-y-1 text-sm font-medium">
            <button
              onClick={() => { onOpenGuide(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800"
            >
              <BookOpen className="w-4 h-4 text-stone-500" />
              <span>Cẩm nang thuê trọ sinh viên</span>
            </button>

            <button
              onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center justify-between text-stone-800"
            >
              <div className="flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-stone-500" />
                <span>So sánh phòng trọ</span>
              </div>
              {compareList.length > 0 && (
                <span className="text-xs bg-clay-100 text-clay-800 px-2 py-0.5 rounded-full font-bold">
                  {compareList.length} phòng
                </span>
              )}
            </button>

            <button
              onClick={() => { onNavigate('landlord'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800"
            >
              <Building2 className="w-4 h-4 text-brand-700" />
              <span>Kênh Quản lý Chủ Trọ</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800"
              >
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>Bảng Quản Trị Hệ Thống (Admin)</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-stone-200 space-y-2">
            <button
              onClick={() => { onOpenPostRoom(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-lg bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin cho thuê trọ</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center justify-between px-2 pt-2">
                <span className="text-xs text-stone-700 font-bold">{currentUser?.name}</span>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-xs text-rose-600 font-bold"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full py-2 rounded-lg bg-stone-100 text-stone-800 font-bold text-xs"
              >
                Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
