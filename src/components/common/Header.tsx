import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  User as UserIcon,
  MapPin,
  FileText
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
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  onOpenProfile,
  onOpenCompare,
  onOpenPostRoom,
  onOpenGuide,
  onOpenCommandPalette,
}) => {
  const { currentUser, logout, isAuthenticated, isAdmin, isLandlord, switchDemoRole } = useAuth();
  const { favorites, compareList, updateFilters } = useRooms();

  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const [guideMenuOpen, setGuideMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const exploreTimeout = useRef<any>(null);
  const guideTimeout = useRef<any>(null);
  const userTimeout = useRef<any>(null);

  const handleExploreEnter = () => {
    clearTimeout(exploreTimeout.current);
    setExploreMenuOpen(true);
  };
  const handleExploreLeave = () => {
    exploreTimeout.current = setTimeout(() => setExploreMenuOpen(false), 150);
  };

  const handleGuideEnter = () => {
    clearTimeout(guideTimeout.current);
    setGuideMenuOpen(true);
  };
  const handleGuideLeave = () => {
    guideTimeout.current = setTimeout(() => setGuideMenuOpen(false), 150);
  };

  const handleUserEnter = () => {
    clearTimeout(userTimeout.current);
    setUserMenuOpen(true);
  };
  const handleUserLeave = () => {
    userTimeout.current = setTimeout(() => setUserMenuOpen(false), 150);
  };

  const handleSelectArea = (ward: string, keyword: string = '') => {
    updateFilters({ ward, keyword });
    onNavigate('search');
    setExploreMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 1. Logo: Bold, Clear, No Clutter */}
          <div className="flex items-center gap-7">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center text-white shadow-xs transition group-hover:bg-emerald-800">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 9.5V20C2 20.5523 2.44772 21 3 21H9V14H15V21H21C21.5523 21 22 20.5523 22 20V9.5L12 2ZM10.5 7H13.5V9.5H10.5V7Z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-stone-900 group-hover:text-emerald-700 transition">
                  TRỌ THÁI NGUYÊN
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  CHÍNH CHỦ
                </span>
              </div>
            </button>

            {/* 2. Desktop Navigation: Bold, Clear, Clean */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-stone-700">
              <button
                onClick={() => onNavigate('home')}
                className={`h-9 px-3.5 rounded-lg flex items-center transition ${
                  currentTab === 'home'
                    ? 'text-stone-900 font-extrabold bg-stone-100'
                    : 'hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                Trang chủ
              </button>

              {/* Khám phá Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleExploreEnter}
                onMouseLeave={handleExploreLeave}
              >
                <button
                  onClick={() => onNavigate('search')}
                  className={`h-9 px-3.5 rounded-lg flex items-center gap-1.5 transition ${
                    currentTab === 'search' || exploreMenuOpen
                      ? 'text-stone-900 font-extrabold bg-stone-100'
                      : 'hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <span>Khám phá phòng</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreMenuOpen ? 'rotate-180 text-stone-900' : 'text-stone-500'}`} />
                </button>

                <AnimatePresence>
                  {exploreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onNavigate('search'); setExploreMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800 font-bold transition"
                      >
                        <Search className="w-4 h-4 text-emerald-700" />
                        <div>
                          <div className="font-extrabold text-stone-900">Tất cả phòng trọ</div>
                          <div className="text-[11px] text-stone-500 font-normal">Hơn 450+ phòng trống</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Tân Thịnh')}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800 font-bold transition"
                      >
                        <GraduationCap className="w-4 h-4 text-emerald-700" />
                        <div>
                          <div className="font-extrabold text-stone-900">Làng ĐH Tân Thịnh</div>
                          <div className="text-[11px] text-stone-500 font-normal">ĐH CNTT, Sư Phạm, Kinh Tế</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Quang Trung', 'Y Dược')}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800 font-bold transition"
                      >
                        <MapPin className="w-4 h-4 text-emerald-700" />
                        <div>
                          <div className="font-extrabold text-stone-900">Khu vực ĐH Y Dược</div>
                          <div className="text-[11px] text-stone-500 font-normal">Đường Lương Ngọc Quyến</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('TX. Phổ Yên', 'Samsung')}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800 font-bold transition"
                      >
                        <Building2 className="w-4 h-4 text-emerald-700" />
                        <div>
                          <div className="font-extrabold text-stone-900">KCN Samsung Phổ Yên</div>
                          <div className="text-[11px] text-stone-500 font-normal">Khu công nghệ cao SEVT</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cẩm nang Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleGuideEnter}
                onMouseLeave={handleGuideLeave}
              >
                <button
                  onClick={onOpenGuide}
                  className={`h-9 px-3.5 rounded-lg flex items-center gap-1.5 transition ${
                    guideMenuOpen
                      ? 'text-stone-900 font-extrabold bg-stone-100'
                      : 'hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <span>Cẩm nang</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${guideMenuOpen ? 'rotate-180 text-stone-900' : 'text-stone-500'}`} />
                </button>

                <AnimatePresence>
                  {guideMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-900 font-bold"
                      >
                        <FileText className="w-4 h-4 text-emerald-700" />
                        <span>Kinh nghiệm tránh lừa cọc</span>
                      </button>

                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-900 font-bold"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>Mẫu hợp đồng thuê phòng</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLandlord && (
                <button
                  onClick={() => onNavigate('landlord')}
                  className={`h-9 px-3.5 rounded-lg flex items-center gap-1.5 transition ${
                    currentTab === 'landlord'
                      ? 'text-stone-900 font-extrabold bg-stone-100'
                      : 'hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`h-9 px-3.5 rounded-lg flex items-center gap-1.5 transition ${
                    currentTab === 'admin'
                      ? 'text-stone-900 font-extrabold bg-stone-100'
                      : 'hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Quản trị (Admin)</span>
                </button>
              )}
            </nav>
          </div>

          {/* 3. Right Action Items: Clean & High-Contrast */}
          <div className="flex items-center gap-2">
            {/* Quick Search Trigger Pill */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-bold transition"
                title="Tìm nhanh (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-stone-600" />
                <span>Tìm nhanh...</span>
                <kbd className="text-[11px] bg-white border border-stone-300 rounded px-1.5 py-0.5 font-mono text-stone-600 font-bold">⌘K</kbd>
              </button>
            )}

            {/* Compare Tool: only when active */}
            {compareList.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-900 text-xs font-extrabold transition shadow-xs"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">So sánh</span>
                <span className="w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Favorites Button */}
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative h-9 w-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-rose-600 flex items-center justify-center transition"
              title="Phòng đã lưu"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Post Room Primary CTA */}
            <button
              onClick={onOpenPostRoom}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-xs font-black text-white bg-emerald-800 hover:bg-emerald-900 transition shadow-sm active:scale-98 tracking-wide"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ĐĂNG TIN</span>
            </button>

            {/* Unified User & Role Capsule */}
            {isAuthenticated ? (
              <div 
                className="relative"
                onMouseEnter={handleUserEnter}
                onMouseLeave={handleUserLeave}
              >
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 h-9 pl-2.5 pr-2 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 transition"
                >
                  <span className="text-xs font-black text-stone-900 max-w-[100px] truncate">
                    {currentUser?.name}
                  </span>
                  <span className="text-[11px] font-bold bg-white text-stone-700 px-1.5 py-0.5 rounded border border-stone-200 hidden sm:inline">
                    {currentUser?.role === 'admin' ? 'Admin' : currentUser?.role === 'landlord' ? 'Chủ trọ' : 'SV'}
                  </span>
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={currentUser?.name}
                    className="w-5 h-5 rounded-full object-cover shrink-0"
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 text-xs"
                    >
                      <div className="px-3 py-2 bg-stone-50 rounded-lg mb-1.5 border border-stone-200">
                        <div className="font-extrabold text-stone-900">{currentUser?.name}</div>
                        <div className="text-[11px] text-stone-600 truncate">{currentUser?.email}</div>
                      </div>

                      <div className="font-extrabold text-stone-600 px-2 py-1 text-[11px] uppercase tracking-wide flex items-center justify-between">
                        <span>Đổi vai trò thử nghiệm:</span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      </div>

                      <div className="space-y-0.5 mb-1.5">
                        <button
                          onClick={() => { switchDemoRole('tenant'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'tenant' ? 'bg-stone-100 text-stone-900 font-extrabold' : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <span>🎓 Sinh viên (An)</span>
                          {currentUser?.role === 'tenant' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('landlord'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'landlord' ? 'bg-stone-100 text-stone-900 font-extrabold' : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <span>🏡 Chủ trọ (Cô Lan)</span>
                          {currentUser?.role === 'landlord' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('admin'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'admin' ? 'bg-stone-100 text-stone-900 font-extrabold' : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <span>🛡️ Quản trị (Admin)</span>
                          {currentUser?.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                        </button>
                      </div>

                      <div className="border-t border-stone-200 my-1"></div>

                      <button
                        onClick={() => { onOpenProfile('profile'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-stone-50 transition flex items-center gap-2 text-stone-800 font-semibold"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-stone-500" />
                        <span>Hồ sơ tài khoản</span>
                      </button>

                      <button
                        onClick={() => { onOpenProfile('appointments'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-stone-50 transition flex items-center gap-2 text-stone-800 font-semibold"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-stone-500" />
                        <span>Lịch hẹn xem phòng</span>
                      </button>

                      <div className="border-t border-stone-200 my-1"></div>

                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-50 text-rose-700 transition flex items-center gap-2 font-bold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="h-9 px-4 bg-stone-900 hover:bg-black text-white font-extrabold text-xs rounded-lg shadow-sm transition tracking-wide"
              >
                ĐĂNG NHẬP
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center text-stone-900 hover:bg-stone-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 overflow-hidden text-xs"
          >
            <div className="grid grid-cols-2 gap-2 font-black">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-xl text-center border ${
                  currentTab === 'home' ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 border-stone-200 text-stone-900'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-xl text-center border ${
                  currentTab === 'search' ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 border-stone-200 text-stone-900'
                }`}
              >
                Tìm phòng trọ
              </button>
            </div>

            <div className="space-y-1 font-bold text-stone-800 bg-stone-50 p-2 rounded-xl border border-stone-200">
              <button
                onClick={() => { onOpenGuide(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Cẩm nang thuê trọ</span>
              </button>

              <button
                onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>So sánh phòng</span>
                </div>
                {compareList.length > 0 && (
                  <span className="font-bold bg-stone-900 text-white px-2 py-0.5 rounded-full text-[10px]">
                    {compareList.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => { onOpenPostRoom(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-black flex items-center justify-center gap-1.5 shadow-sm tracking-wide uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin cho thuê</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};