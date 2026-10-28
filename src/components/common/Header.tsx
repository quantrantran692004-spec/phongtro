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
      setIsScrolled(window.scrollY > 30);
    };
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

  return (
    <header className={`${
      isHomeTransparent
        ? isScrolled
          ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E2D9] shadow-sm transition-all duration-300'
          : 'fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/20 shadow-xs transition-all duration-300'
        : 'sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E2D9] transition-colors'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 1. Logo: Refined Architectural Identity */}
          <div className="flex items-center gap-7">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 rounded-md bg-[#23483D] flex items-center justify-center text-white shadow-whisper transition group-hover:bg-[#1A372E]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 9.5V20C2 20.5523 2.44772 21 3 21H9V14H15V21H21C21.5523 21 22 20.5523 22 20V9.5L12 2ZM10.5 7H13.5V9.5H10.5V7Z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-[#252725] group-hover:text-[#23483D] transition">
                  TRỌ THÁI NGUYÊN
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E8EEE9] text-[#23483D] border border-[#C9DCD3]">
                  CHÍNH CHỦ
                </span>
              </div>
            </button>

            {/* 2. Desktop Navigation: Sophisticated, Spacious Typography */}
            <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-[#252725]">
              <button
                onClick={() => onNavigate('home')}
                className={`h-9 px-3.5 rounded-md flex items-center transition ${
                  currentTab === 'home'
                    ? 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                    : 'text-[#252725] hover:text-[#23483D] hover:bg-[#FAF9F7]'
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
                  className={`h-9 px-3.5 rounded-md flex items-center gap-1.5 transition ${
                    currentTab === 'search' || exploreMenuOpen
                      ? 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : 'text-[#252725] hover:text-[#23483D] hover:bg-[#FAF9F7]'
                  }`}
                >
                  <span>Khám phá phòng</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreMenuOpen ? 'rotate-180 text-[#23483D]' : 'text-[#777B78]'}`} />
                </button>

                <AnimatePresence>
                  {exploreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-lg shadow-card-hover border border-[#E5E2D9] p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onNavigate('search'); setExploreMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#E8EEE9] flex items-center gap-2.5 text-[#252725] font-medium transition"
                      >
                        <Search className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-[#252725]">Tất cả phòng trọ</div>
                          <div className="text-[11px] text-[#777B78] font-normal">Hơn 450+ phòng đã xác thực</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Tân Thịnh')}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#E8EEE9] flex items-center gap-2.5 text-[#252725] font-medium transition"
                      >
                        <GraduationCap className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-[#252725]">Làng ĐH Tân Thịnh</div>
                          <div className="text-[11px] text-[#777B78] font-normal">ĐH CNTT, Sư Phạm, Kinh Tế</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Quang Trung', 'Y Dược')}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#E8EEE9] flex items-center gap-2.5 text-[#252725] font-medium transition"
                      >
                        <MapPin className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-[#252725]">Khu vực ĐH Y Dược</div>
                          <div className="text-[11px] text-[#777B78] font-normal">Đường Lương Ngọc Quyến</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('TX. Phổ Yên', 'Samsung')}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#E8EEE9] flex items-center gap-2.5 text-[#252725] font-medium transition"
                      >
                        <Building2 className="w-4 h-4 text-[#23483D]" />
                        <div>
                          <div className="font-semibold text-[#252725]">KCN Samsung Phổ Yên</div>
                          <div className="text-[11px] text-[#777B78] font-normal">Khu công nghệ cao SEVT</div>
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
                  className={`h-9 px-3.5 rounded-md flex items-center gap-1.5 transition ${
                    guideMenuOpen
                      ? 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : 'text-[#252725] hover:text-[#23483D] hover:bg-[#FAF9F7]'
                  }`}
                >
                  <span>Cẩm nang</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${guideMenuOpen ? 'rotate-180 text-[#23483D]' : 'text-[#777B78]'}`} />
                </button>

                <AnimatePresence>
                  {guideMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-lg shadow-card-hover border border-[#E5E2D9] p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#E8EEE9] flex items-center gap-2.5 text-[#252725] font-medium transition"
                      >
                        <FileText className="w-4 h-4 text-[#23483D]" />
                        <span>Kinh nghiệm tránh lừa cọc</span>
                      </button>

                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#E8EEE9] flex items-center gap-2.5 text-[#252725] font-medium transition"
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
                  className={`h-9 px-3.5 rounded-md flex items-center gap-1.5 transition ${
                    currentTab === 'landlord'
                      ? 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : 'text-[#252725] hover:text-[#23483D] hover:bg-[#FAF9F7]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#23483D]" />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`h-9 px-3.5 rounded-md flex items-center gap-1.5 transition ${
                    currentTab === 'admin'
                      ? 'text-[#23483D] font-semibold bg-[#E8EEE9]'
                      : 'text-[#252725] hover:text-[#23483D] hover:bg-[#FAF9F7]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#23483D]" />
                  <span>Quản trị (Admin)</span>
                </button>
              )}
            </nav>
          </div>

          {/* 3. Right Action Items: Clean & High-Contrast */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Trigger Pill */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden md:flex items-center gap-2 h-9 px-3 rounded-md bg-[#EFEEE8] hover:bg-[#E8EEE9] text-[#777B78] hover:text-[#252725] text-xs font-medium transition border border-[#E5E2D9]"
                title="Tìm nhanh (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-[#777B78]" />
                <span>Tìm nhanh...</span>
                <kbd className="text-[10px] bg-white border border-[#E5E2D9] rounded px-1.5 py-0.5 font-mono text-[#777B78]">⌘K</kbd>
              </button>
            )}

            {/* Compare Tool: only when active */}
            {compareList.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 h-9 px-3 rounded-md bg-[#EFEEE8] hover:bg-[#E8EEE9] border border-[#E5E2D9] text-[#252725] text-xs font-semibold transition shadow-whisper"
              >
                <Scale className="w-3.5 h-3.5 text-[#23483D]" />
                <span className="hidden sm:inline">So sánh</span>
                <span className="w-4 h-4 rounded-full bg-[#23483D] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Favorites Button */}
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative h-9 w-9 rounded-md bg-[#EFEEE8] hover:bg-[#E8EEE9] text-[#777B78] hover:text-rose-600 flex items-center justify-center transition border border-[#E5E2D9]"
              title="Phòng đã lưu"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Post Room Primary CTA in BARNES Forest Green */}
            <button
              onClick={onOpenPostRoom}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-md text-xs font-semibold text-white bg-[#23483D] hover:bg-[#1A372E] transition shadow-whisper active:scale-[0.99] tracking-wider"
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
                  className="flex items-center gap-2 h-9 pl-2.5 pr-2 rounded-md bg-[#EFEEE8] hover:bg-[#E8EEE9] border border-[#E5E2D9] transition"
                >
                  <span className="text-xs font-semibold text-[#252725] max-w-[100px] truncate">
                    {currentUser?.name}
                  </span>
                  <span className="text-[10px] font-medium bg-white text-[#777B78] px-1.5 py-0.5 rounded border border-[#E5E2D9] hidden sm:inline">
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
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-lg shadow-card-hover border border-[#E5E2D9] p-2 z-50 text-xs"
                    >
                      <div className="px-3 py-2 bg-[#FAF9F7] rounded-md mb-1.5 border border-[#E5E2D9]">
                        <div className="font-semibold text-[#252725]">{currentUser?.name}</div>
                        <div className="text-[11px] text-[#777B78] truncate">{currentUser?.email}</div>
                      </div>

                      <div className="font-medium text-[#777B78] px-2 py-1 text-[11px] uppercase tracking-wider flex items-center justify-between">
                        <span>Đổi vai trò thử nghiệm:</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#23483D]" />
                      </div>

                      <div className="space-y-0.5 mb-1.5">
                        <button
                          onClick={() => { switchDemoRole('tenant'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                            currentUser?.role === 'tenant' ? 'bg-[#E8EEE9] text-[#23483D] font-semibold' : 'hover:bg-[#FAF9F7] text-[#252725]'
                          }`}
                        >
                          <span>🎓 Sinh viên (An)</span>
                          {currentUser?.role === 'tenant' && <CheckCircle2 className="w-3.5 h-3.5 text-[#23483D]" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('landlord'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                            currentUser?.role === 'landlord' ? 'bg-[#E8EEE9] text-[#23483D] font-semibold' : 'hover:bg-[#FAF9F7] text-[#252725]'
                          }`}
                        >
                          <span>🏡 Chủ trọ (Cô Lan)</span>
                          {currentUser?.role === 'landlord' && <CheckCircle2 className="w-3.5 h-3.5 text-[#23483D]" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('admin'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                            currentUser?.role === 'admin' ? 'bg-[#E8EEE9] text-[#23483D] font-semibold' : 'hover:bg-[#FAF9F7] text-[#252725]'
                          }`}
                        >
                          <span>🛡️ Quản trị (Admin)</span>
                          {currentUser?.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-[#23483D]" />}
                        </button>
                      </div>

                      <div className="border-t border-[#E5E2D9] my-1"></div>

                      <button
                        onClick={() => { onOpenProfile('profile'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#FAF9F7] transition flex items-center gap-2 text-[#252725] font-medium"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-[#777B78]" />
                        <span>Hồ sơ tài khoản</span>
                      </button>

                      <button
                        onClick={() => { onOpenProfile('appointments'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#FAF9F7] transition flex items-center gap-2 text-[#252725] font-medium"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-[#777B78]" />
                        <span>Lịch hẹn xem phòng</span>
                      </button>

                      <div className="border-t border-[#E5E2D9] my-1"></div>

                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-md hover:bg-rose-50 text-rose-700 transition flex items-center gap-2 font-semibold"
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
                className="h-9 px-4 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs rounded-md shadow-whisper transition tracking-wider uppercase"
              >
                ĐĂNG NHẬP
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center text-[#252725] hover:bg-[#EFEEE8] rounded-md"
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
            className="lg:hidden border-t border-[#E5E2D9] bg-white px-4 pt-3 pb-6 space-y-3 overflow-hidden text-xs"
          >
            <div className="grid grid-cols-2 gap-2 font-medium">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-md text-center border transition ${
                  currentTab === 'home' ? 'bg-[#23483D] text-white border-[#23483D]' : 'bg-[#FAF9F7] border-[#E5E2D9] text-[#252725]'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-md text-center border transition ${
                  currentTab === 'search' ? 'bg-[#23483D] text-white border-[#23483D]' : 'bg-[#FAF9F7] border-[#E5E2D9] text-[#252725]'
                }`}
              >
                Tìm phòng trọ
              </button>
            </div>

            <div className="space-y-1 font-medium text-[#252725] bg-[#FAF9F7] p-2 rounded-md border border-[#E5E2D9]">
              <button
                onClick={() => { onOpenGuide(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-white flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#23483D]" />
                <span>Cẩm nang thuê trọ</span>
              </button>

              <button
                onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-white flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#23483D]" />
                  <span>So sánh phòng</span>
                </div>
                {compareList.length > 0 && (
                  <span className="font-semibold bg-[#23483D] text-white px-2 py-0.5 rounded-full text-[10px]">
                    {compareList.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => { onOpenPostRoom(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-md bg-[#23483D] hover:bg-[#1A372E] text-white font-medium flex items-center justify-center gap-1.5 shadow-whisper tracking-wider uppercase"
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