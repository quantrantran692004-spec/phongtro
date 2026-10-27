import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Scale, 
  Plus, 
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Sleek Utility Bar */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
              Thái Nguyên
            </span>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="text-stone-300 truncate font-normal">
              Cổng thông tin trọ chuẩn cho SV Đại học Thái Nguyên & KCN Samsung Yên Bình
            </span>
          </div>

          {/* Quick Demo Switcher */}
          <div className="relative shrink-0 flex items-center gap-2">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-0.5 rounded-md text-[11px] font-medium transition border border-stone-700"
              title="Đổi vai trò kiểm thử tính năng"
            >
              <Sparkles className="w-3 h-3 text-clay-400" />
              <span>
                {currentUser?.role === 'admin'
                  ? 'Admin: Quản trị'
                  : currentUser?.role === 'landlord'
                  ? 'Chủ trọ: Cô Lan'
                  : 'Sinh viên: An (Y Dược)'}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {demoMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-1.5 w-64 bg-white text-stone-800 rounded-xl shadow-elevated border border-stone-200 p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setDemoMenuOpen(false)}
              >
                <div className="font-semibold text-stone-400 px-2 py-1 text-[10px] uppercase tracking-wider">
                  Chuyển nhanh tài khoản test:
                </div>
                <button
                  onClick={() => switchDemoRole('tenant')}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'tenant' ? 'bg-brand-50 text-brand-700 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎓</span>
                    <div>
                      <div className="font-semibold">Sinh viên (An - ĐH Y Dược)</div>
                      <div className="text-[10px] text-stone-500 font-normal">Tìm phòng, lưu tin, hẹn xem phòng</div>
                    </div>
                  </div>
                  {currentUser?.role === 'tenant' && <span className="text-brand-600">✓</span>}
                </button>

                <button
                  onClick={() => switchDemoRole('landlord')}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'landlord' ? 'bg-brand-50 text-brand-700 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏡</span>
                    <div>
                      <div className="font-semibold">Chủ trọ (Cô Lan Tân Thịnh)</div>
                      <div className="text-[10px] text-stone-500 font-normal">Quản lý tin, bật/tắt phòng trống</div>
                    </div>
                  </div>
                  {currentUser?.role === 'landlord' && <span className="text-brand-600">✓</span>}
                </button>

                <button
                  onClick={() => switchDemoRole('admin')}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition ${
                    currentUser?.role === 'admin' ? 'bg-brand-50 text-brand-700 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <div>
                      <div className="font-semibold">Ban Quản Trị (Admin)</div>
                      <div className="text-[10px] text-stone-500 font-normal">Duyệt tin, tích xanh, nhập CSV</div>
                    </div>
                  </div>
                  {currentUser?.role === 'admin' && <span className="text-brand-600">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              {/* Refined emblem */}
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-900/10 group-hover:bg-brand-700 transition">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3zm0 4.2l5 4.5V18h-2v-5H9v5H7v-6.3l5-4.5zM17 6.5V3h-2v1.7l2 1.8z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-[17px] text-stone-900 tracking-tight">
                    TRỌ THÁI NGUYÊN
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                </div>
                <p className="text-[11px] text-stone-500 font-normal">Phòng trọ chuẩn giá • Sinh viên & Đi làm</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-[13px] font-semibold text-stone-600">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  currentTab === 'home'
                    ? 'text-brand-700 bg-brand-50/80 font-bold'
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                Trang chủ
              </button>

              <button
                onClick={() => onNavigate('search')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  currentTab === 'search'
                    ? 'text-brand-700 bg-brand-50/80 font-bold'
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Tìm phòng trọ</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="px-3 py-1.5 rounded-lg hover:text-stone-900 hover:bg-stone-100/70 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                <span>Cẩm nang thuê</span>
              </button>

              {isLandlord && (
                <button
                  onClick={() => onNavigate('landlord')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    currentTab === 'landlord'
                      ? 'text-brand-700 bg-brand-50/80 font-bold'
                      : 'hover:text-stone-900 hover:bg-stone-100/70'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    currentTab === 'admin'
                      ? 'text-stone-900 bg-stone-100 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Quản trị (Admin)</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="relative p-2 text-stone-600 hover:text-brand-700 hover:bg-stone-100 rounded-xl transition border border-transparent hover:border-stone-200"
              title="So sánh phòng"
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
              className="relative p-2 text-stone-600 hover:text-rose-600 hover:bg-stone-100 rounded-xl transition border border-transparent hover:border-stone-200"
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
              className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-subtle hover:shadow transition transform active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin cho thuê</span>
            </button>

            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative ml-1">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 hover:bg-stone-100 rounded-xl transition border border-stone-200"
                >
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-7 h-7 rounded-lg object-cover border border-stone-200"
                  />
                  <span className="text-xs font-semibold text-stone-800 max-w-[110px] truncate">
                    {currentUser?.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 mr-1" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-stone-200 py-1.5 z-50 text-xs"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-stone-100">
                      <p className="font-bold text-stone-900 truncate">{currentUser?.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{currentUser?.email}</p>
                    </div>

                    <button
                      onClick={() => onOpenProfile('profile')}
                      className="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                      <span>Thông tin tài khoản</span>
                    </button>

                    <button
                      onClick={() => onOpenProfile('saved')}
                      className="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Phòng đã lưu ({favorites.length})</span>
                    </button>

                    <button
                      onClick={() => onOpenProfile('appointments')}
                      className="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                    >
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>Lịch hẹn xem phòng</span>
                    </button>

                    {isLandlord && (
                      <button
                        onClick={() => onNavigate('landlord')}
                        className="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2 text-brand-700 font-medium"
                      >
                        <Building2 className="w-3.5 h-3.5 text-brand-600" />
                        <span>Kênh quản lý chủ trọ</span>
                      </button>
                    )}

                    {isAdmin && (
                      <button
                        onClick={() => onNavigate('admin')}
                        className="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-900 font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                        <span>Trang quản trị (Admin)</span>
                      </button>
                    )}

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
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
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-brand-700 hover:bg-stone-100 px-3 py-2 rounded-xl transition border border-stone-200"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative p-2 text-stone-700 rounded-lg"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:bg-stone-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2.5 shadow-lg">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-stone-700 hover:bg-brand-50"
          >
            Trang chủ
          </button>

          <button
            onClick={() => {
              onNavigate('search');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-stone-700 hover:bg-brand-50 flex items-center justify-between"
          >
            <span>Tìm phòng trọ</span>
            <Search className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => {
              onOpenCompare();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-stone-700 hover:bg-brand-50 flex items-center justify-between"
          >
            <span>So sánh phòng</span>
            {compareList.length > 0 && (
              <span className="bg-clay-500 text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                {compareList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onOpenGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-stone-700 hover:bg-brand-50"
          >
            Cẩm nang thuê trọ an toàn
          </button>

          {isLandlord && (
            <button
              onClick={() => {
                onNavigate('landlord');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-brand-700 bg-brand-50 flex items-center gap-2"
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
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-stone-900 bg-stone-100 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Trang Quản Trị Hệ Thống</span>
            </button>
          )}

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPostRoom();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-brand-600 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin cho thuê</span>
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  onOpenProfile('profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 border border-stone-200 text-stone-700 rounded-xl font-medium"
              >
                Tài khoản ({currentUser?.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 border border-stone-200 text-stone-700 rounded-xl font-medium"
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
