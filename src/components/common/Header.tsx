import React, { useState, useRef, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isHomeTransparent = currentTab === 'home';
  const isTransparent = isHomeTransparent && !isScrolled;

  const headerClasses = isHomeTransparent
    ? isScrolled
      ? 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-sm'
      : 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-transparent py-4'
    : 'sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3 transition-all duration-300';

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* 1. Logo */}
          <div className="flex items-center gap-7">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition shadow-sm ${
                isTransparent 
                  ? 'bg-white/20 text-white border border-white/30 backdrop-blur-md' 
                  : 'bg-[#23483D] text-white hover:bg-[#1A372E]'
              }`}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 9.5V20C2 20.5523 2.44772 21 3 21H9V14H15V21H21C21.5523 21 22 20.5523 22 20V9.5L12 2ZM10.5 7H13.5V9.5H10.5V7Z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-base sm:text-lg tracking-tight transition ${
                  isTransparent ? 'text-white drop-shadow-sm' : 'text-slate-900 group-hover:text-[#23483D]'
                }`}>
                  TRỌ THÁI NGUYÊN
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition ${
                  isTransparent
                    ? 'bg-white/20 text-white border-white/30 backdrop-blur-sm'
                    : 'bg-[#E8EEE9] text-[#23483D] border-[#C9DCD3]'
                }`}>
                  CHÍNH CHỦ
                </span>
              </div>
            </button>

            {/* 2. Desktop Navigation (Placed inside frosted glass pill when transparent) */}
            <nav className={`hidden lg:flex items-center gap-1 text-sm font-medium transition-all ${
              isTransparent
                ? 'bg-slate-950/35 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 shadow-sm'
                : ''
            }`}>
              <button
                onClick={() => onNavigate('home')}
                className={`h-8 px-3.5 rounded-full flex items-center transition ${
                  currentTab === 'home'
                    ? isTransparent
                      ? 'text-white font-semibold bg-white/20 backdrop-blur-sm'
                      : 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                    : isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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
                  className={`h-8 px-3.5 rounded-full flex items-center gap-1.5 transition ${
                    currentTab === 'search' || exploreMenuOpen
                      ? isTransparent
                        ? 'text-white font-semibold bg-white/20 backdrop-blur-sm'
                        : 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Khám phá phòng</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    exploreMenuOpen 
                      ? 'rotate-180 ' + (isTransparent ? 'text-white' : 'text-[#23483D]')
                      : isTransparent ? 'text-white/70' : 'text-slate-400'
                  }`} />
                </button>

                <AnimatePresence>
                  {exploreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-float border border-slate-200/80 p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onNavigate('search'); setExploreMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-slate-800 font-medium transition"
                      >
                        <Search className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-slate-900">Tất cả phòng trọ</div>
                          <div className="text-[11px] text-slate-500 font-normal">Hơn 450+ phòng đã xác thực</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Tân Thịnh')}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-slate-800 font-medium transition"
                      >
                        <GraduationCap className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-slate-900">Làng ĐH Tân Thịnh</div>
                          <div className="text-[11px] text-slate-500 font-normal">ĐH CNTT, Sư Phạm, Kinh Tế</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Quang Trung', 'Y Dược')}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-slate-800 font-medium transition"
                      >
                        <MapPin className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-slate-900">Khu vực ĐH Y Dược</div>
                          <div className="text-[11px] text-slate-500 font-normal">Đường Lương Ngọc Quyến</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('TX. Phổ Yên', 'Samsung')}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-slate-800 font-medium transition"
                      >
                        <Building2 className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-slate-900">KCN Samsung Phổ Yên</div>
                          <div className="text-[11px] text-slate-500 font-normal">Khu công nghệ cao SEVT</div>
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
                  className={`h-8 px-3.5 rounded-full flex items-center gap-1.5 transition ${
                    guideMenuOpen
                      ? isTransparent
                        ? 'text-white font-semibold bg-white/20 backdrop-blur-sm'
                        : 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Cẩm nang</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    guideMenuOpen 
                      ? 'rotate-180 ' + (isTransparent ? 'text-white' : 'text-[#23483D]')
                      : isTransparent ? 'text-white/70' : 'text-slate-400'
                  }`} />
                </button>

                <AnimatePresence>
                  {guideMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-float border border-slate-200/80 p-2 z-50 text-xs text-slate-800"
                    >
                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-slate-800 font-medium transition"
                      >
                        <FileText className="w-4 h-4 text-[#23483D]" />
                        <span>Kinh nghiệm tránh lừa cọc</span>
                      </button>

                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-slate-800 font-medium transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#23483D]" />
                        <span>Mẫu hợp đồng thuê phòng</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLandlord && (
                <button
                  onClick={() => onNavigate('landlord')}
                  className={`h-8 px-3.5 rounded-full flex items-center gap-1.5 transition ${
                    currentTab === 'landlord'
                      ? isTransparent
                        ? 'text-white font-semibold bg-white/20 backdrop-blur-sm'
                        : 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className={`w-3.5 h-3.5 ${isTransparent ? 'text-white' : 'text-[#23483D]'}`} />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`h-8 px-3.5 rounded-full flex items-center gap-1.5 transition ${
                    currentTab === 'admin'
                      ? isTransparent
                        ? 'text-white font-semibold bg-white/20 backdrop-blur-sm'
                        : 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className={`w-3.5 h-3.5 ${isTransparent ? 'text-white' : 'text-[#23483D]'}`} />
                  <span>Quản trị (Admin)</span>
                </button>
              )}
            </nav>
          </div>

          {/* 3. Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Trigger Pill (Ctrl+K) */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border transition ${
                  isTransparent
                    ? 'bg-slate-950/35 border-white/20 text-white hover:bg-slate-950/50 backdrop-blur-md shadow-sm'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
                title="Tìm nhanh (Ctrl+K)"
              >
                <Search className={`w-3.5 h-3.5 ${isTransparent ? 'text-white/80' : 'text-slate-500'}`} />
                <span>Tìm nhanh...</span>
                <kbd className={`text-[10px] rounded px-1.5 py-0.5 font-mono border ${
                  isTransparent 
                    ? 'bg-white/15 border-white/25 text-white/90' 
                    : 'bg-white border-slate-200 text-slate-500'
                }`}>⌘K</kbd>
              </button>
            )}

            {/* Compare Tool: only when active */}
            {compareList.length > 0 && (
              <button
                onClick={onOpenCompare}
                className={`flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-semibold transition ${
                  isTransparent
                    ? 'bg-slate-950/35 border-white/20 text-white hover:bg-slate-950/50 backdrop-blur-md shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                }`}
              >
                <Scale className={`w-3.5 h-3.5 ${isTransparent ? 'text-amber-300' : 'text-[#23483D]'}`} />
                <span className="hidden sm:inline">So sánh</span>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Favorites Button */}
            <button
              onClick={() => onOpenProfile('saved')}
              className={`relative h-9 w-9 rounded-full flex items-center justify-center transition border ${
                isTransparent
                  ? 'bg-slate-950/35 border-white/20 text-white hover:text-rose-300 hover:bg-slate-950/50 backdrop-blur-md shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-rose-600'
              }`}
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
              className={`hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md active:scale-[0.99] ${
                isTransparent
                  ? 'bg-white text-slate-900 hover:bg-amber-50 shadow-lg'
                  : 'bg-[#23483D] hover:bg-[#1A372E] text-white'
              }`}
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
                  className={`flex items-center gap-2 h-9 pl-3 pr-2 rounded-full border transition ${
                    isTransparent
                      ? 'bg-slate-950/35 border-white/20 text-white hover:bg-slate-950/50 backdrop-blur-md shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className="text-xs font-semibold max-w-[100px] truncate text-inherit">
                    {currentUser?.name}
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border hidden sm:inline ${
                    isTransparent
                      ? 'bg-white/20 border-white/30 text-white'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}>
                    {currentUser?.role === 'admin' ? 'Admin' : currentUser?.role === 'landlord' ? 'Chủ trọ' : 'SV'}
                  </span>
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={currentUser?.name}
                    className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-white/30"
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-float border border-slate-200/80 p-2 z-50 text-xs"
                    >
                      <div className="px-3 py-2 bg-slate-50 rounded-xl mb-1.5 border border-slate-200/60">
                        <div className="font-semibold text-slate-900">{currentUser?.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{currentUser?.email}</div>
                      </div>

                      <div className="font-medium text-slate-500 px-2 py-1 text-[11px] uppercase tracking-wider flex items-center justify-between">
                        <span>Đổi vai trò thử nghiệm:</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#23483D]" />
                      </div>

                      <div className="space-y-0.5 mb-1.5">
                        <button
                          onClick={() => { switchDemoRole('tenant'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'tenant' ? 'bg-[#E8EEE9] text-[#23483D] font-semibold' : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <span>🎓 Sinh viên (An)</span>
                          {currentUser?.role === 'tenant' && <CheckCircle2 className="w-3.5 h-3.5 text-[#23483D]" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('landlord'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'landlord' ? 'bg-[#E8EEE9] text-[#23483D] font-semibold' : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <span>🏡 Chủ trọ (Cô Lan)</span>
                          {currentUser?.role === 'landlord' && <CheckCircle2 className="w-3.5 h-3.5 text-[#23483D]" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('admin'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'admin' ? 'bg-[#E8EEE9] text-[#23483D] font-semibold' : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <span>🛡️ Quản trị (Admin)</span>
                          {currentUser?.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-[#23483D]" />}
                        </button>
                      </div>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => { onOpenProfile('profile'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 text-slate-800 font-medium"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Hồ sơ tài khoản</span>
                      </button>

                      <button
                        onClick={() => { onOpenProfile('appointments'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 text-slate-800 font-medium"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span>Lịch hẹn xem phòng</span>
                      </button>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-50 text-rose-700 transition flex items-center gap-2 font-semibold"
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
                className={`h-9 px-4 font-semibold text-xs rounded-full transition shadow-sm tracking-wider uppercase ${
                  isTransparent
                    ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm'
                    : 'bg-[#23483D] hover:bg-[#1A372E] text-white'
                }`}
              >
                ĐĂNG NHẬP
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden h-9 w-9 flex items-center justify-center rounded-full transition ${
                isTransparent 
                  ? 'text-white hover:bg-white/15' 
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
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
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 overflow-hidden text-xs shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2 font-medium">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-xl text-center border transition ${
                  currentTab === 'home' ? 'bg-[#23483D] text-white border-[#23483D]' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-xl text-center border transition ${
                  currentTab === 'search' ? 'bg-[#23483D] text-white border-[#23483D]' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                Tìm phòng trọ
              </button>
            </div>

            <div className="space-y-1 font-medium text-slate-800 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <button
                onClick={() => { onOpenGuide(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#23483D]" />
                <span>Cẩm nang thuê trọ</span>
              </button>

              <button
                onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#23483D]" />
                  <span>So sánh phòng</span>
                </div>
                {compareList.length > 0 && (
                  <span className="font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px]">
                    {compareList.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => { onOpenPostRoom(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-full bg-[#23483D] hover:bg-[#1A372E] text-white font-medium flex items-center justify-center gap-1.5 shadow-sm tracking-wider uppercase"
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
