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
  FileText,
  Compass
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

  // Progressive Disclosure: Dropdown states
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[66px]">
          {/* Brand Logo & Progressive Navigation */}
          <div className="flex items-center gap-7 lg:gap-9">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-xs group-hover:bg-brand-800 transition">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 9.5V20C2 20.5523 2.44772 21 3 21H9V14H15V21H21C21.5523 21 22 20.5523 22 20V9.5L12 2ZM10.5 7H13.5V9.5H10.5V7Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[17px] sm:text-lg text-stone-900 tracking-tight leading-none group-hover:text-brand-800 transition">
                    TRỌ THÁI NGUYÊN
                  </span>
                  <span className="bg-brand-100 text-brand-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                    CHÍNH CHỦ
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Progressive Navigation with Hover Mega-Menus */}
            <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-stone-700">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  currentTab === 'home'
                    ? 'text-brand-800 bg-brand-50 font-bold'
                    : 'hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Trang chủ
              </button>

              {/* 1. Khám phá Dropdown (Progressive Disclosure) */}
              <div 
                className="relative"
                onMouseEnter={handleExploreEnter}
                onMouseLeave={handleExploreLeave}
              >
                <button
                  onClick={() => onNavigate('search')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                    currentTab === 'search' || exploreMenuOpen
                      ? 'text-brand-800 bg-brand-50 font-bold'
                      : 'hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-brand-700" />
                  <span>Khám phá trọ</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreMenuOpen ? 'rotate-180 text-brand-700' : 'text-stone-400'}`} />
                </button>

                <AnimatePresence>
                  {exploreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-elevated border border-stone-200 p-2 z-50 text-xs"
                    >
                      <div className="font-bold text-stone-400 px-3 py-1 text-[10px] uppercase tracking-wider">
                        Khu vực sinh viên & KCN
                      </div>
                      
                      <button
                        onClick={() => { onNavigate('search'); setExploreMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 flex items-center justify-between text-stone-800 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <Search className="w-4 h-4 text-brand-700" />
                          <div>
                            <div className="font-bold">Tất cả phòng trọ Thái Nguyên</div>
                            <div className="text-[11px] text-stone-500 font-normal">Hơn 450+ phòng có sẵn</div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Tân Thịnh')}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 flex items-center gap-2.5 text-stone-800 transition"
                      >
                        <GraduationCap className="w-4 h-4 text-emerald-700" />
                        <div>
                          <div className="font-bold">Làng SV Tân Thịnh</div>
                          <div className="text-[11px] text-stone-500 font-normal">ĐH CNTT, Sư Phạm, Kinh Tế</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Quang Trung', 'Y Dược')}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 flex items-center gap-2.5 text-stone-800 transition"
                      >
                        <MapPin className="w-4 h-4 text-rose-600" />
                        <div>
                          <div className="font-bold">Khu vực ĐH Y Dược</div>
                          <div className="text-[11px] text-stone-500 font-normal">Ngõ 284 Lương Ngọc Quyến</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('TX. Phổ Yên', 'Samsung')}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 flex items-center gap-2.5 text-stone-800 transition"
                      >
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-bold">KCN Samsung Phổ Yên</div>
                          <div className="text-[11px] text-stone-500 font-normal">Ba Hàng, Yên Bình SEVT</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Cẩm nang Dropdown (Progressive Disclosure) */}
              <div 
                className="relative"
                onMouseEnter={handleGuideEnter}
                onMouseLeave={handleGuideLeave}
              >
                <button
                  onClick={onOpenGuide}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                    guideMenuOpen
                      ? 'text-brand-800 bg-brand-50 font-bold'
                      : 'hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                  <span>Cẩm nang thuê</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${guideMenuOpen ? 'rotate-180 text-brand-700' : 'text-stone-400'}`} />
                </button>

                <AnimatePresence>
                  {guideMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-elevated border border-stone-200 p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 flex items-center gap-2.5 text-stone-800 transition"
                      >
                        <FileText className="w-4 h-4 text-brand-700" />
                        <div>
                          <div className="font-bold">4 Nguyên tắc tránh lừa cọc</div>
                          <div className="text-[11px] text-stone-500 font-normal">Kinh nghiệm bỏ túi cho tân sinh viên</div>
                        </div>
                      </button>

                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 flex items-center gap-2.5 text-stone-800 transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <div>
                          <div className="font-bold">Hợp đồng thuê mẫu</div>
                          <div className="text-[11px] text-stone-500 font-normal">Điều khoản cọc & trả phòng rõ ràng</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLandlord && (
                <button
                  onClick={() => onNavigate('landlord')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    currentTab === 'landlord'
                      ? 'text-brand-800 bg-brand-50 font-bold'
                      : 'hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-brand-700" />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
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

          {/* Right Action Bar (Progressive & Context-Aware) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Command Trigger Pill */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden md:flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-xl text-xs font-semibold border border-stone-200 transition"
                title="Tìm kiếm nhanh (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-stone-500" />
                <span>Tìm nhanh...</span>
                <kbd className="text-[10px] bg-white border border-stone-200 rounded px-1.5 py-0.5 font-mono text-stone-500 shadow-2xs">⌘K</kbd>
              </button>
            )}

            {/* Compare Tool: Only reveals prominently when items are in compareList */}
            {compareList.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-clay-50 hover:bg-clay-100 text-clay-800 border border-clay-200 rounded-xl text-xs font-bold transition"
                title="Xem danh sách so sánh"
              >
                <Scale className="w-3.5 h-3.5 text-clay-600" />
                <span className="hidden sm:inline">So sánh</span>
                <span className="bg-clay-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {compareList.length}
                </span>
              </motion.button>
            )}

            {/* Favorites Icon */}
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative p-2 text-stone-700 hover:text-rose-600 hover:bg-stone-100 rounded-xl transition border border-stone-200"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-xs transition active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Đăng tin</span>
            </button>

            {/* Unified User & Role Switcher Capsule */}
            {isAuthenticated ? (
              <div 
                className="relative"
                onMouseEnter={handleUserEnter}
                onMouseLeave={handleUserLeave}
              >
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 bg-stone-100 hover:bg-stone-200 rounded-full transition border border-stone-200"
                >
                  <span className="text-xs font-bold text-stone-900 max-w-[110px] truncate">
                    {currentUser?.name}
                  </span>
                  <span className="text-[10px] font-semibold bg-white text-stone-600 px-1.5 py-0.5 rounded-full border border-stone-200 hidden sm:inline">
                    {currentUser?.role === 'admin' ? 'Admin' : currentUser?.role === 'landlord' ? 'Chủ trọ' : 'SV'}
                  </span>
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={currentUser?.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-700 shrink-0"
                  />
                </button>

                {/* Progressive User & Role Switcher Popover */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-elevated border border-stone-200 p-2 z-50 text-xs"
                    >
                      {/* User Info Header */}
                      <div className="px-3 py-2.5 bg-stone-50 rounded-xl mb-2">
                        <div className="font-bold text-stone-900 text-sm">{currentUser?.name}</div>
                        <div className="text-[11px] text-stone-500 truncate">{currentUser?.email}</div>
                      </div>

                      {/* Demo Role Switcher Section (Unified) */}
                      <div className="font-bold text-stone-400 px-2.5 py-1 text-[10px] uppercase tracking-wider flex items-center justify-between">
                        <span>Chuyển vai trò thử nghiệm:</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </div>

                      <div className="space-y-0.5 mb-2">
                        <button
                          onClick={() => { switchDemoRole('tenant'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'tenant' ? 'bg-brand-50 text-brand-900 font-bold' : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>🎓</span>
                            <span>Sinh viên (An - ĐH Y Dược)</span>
                          </div>
                          {currentUser?.role === 'tenant' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('landlord'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'landlord' ? 'bg-brand-50 text-brand-900 font-bold' : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>🏡</span>
                            <span>Chủ trọ (Cô Lan Tân Thịnh)</span>
                          </div>
                          {currentUser?.role === 'landlord' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('admin'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                            currentUser?.role === 'admin' ? 'bg-brand-50 text-brand-900 font-bold' : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>🛡️</span>
                            <span>Quản trị viên (Admin)</span>
                          </div>
                          {currentUser?.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700" />}
                        </button>
                      </div>

                      <div className="border-t border-stone-100 my-1"></div>

                      {/* Navigation links */}
                      <button
                        onClick={() => { onOpenProfile('profile'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 transition flex items-center gap-2 text-stone-800 font-medium"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                        <span>Hồ sơ tài khoản</span>
                      </button>

                      <button
                        onClick={() => { onOpenProfile('appointments'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 transition flex items-center gap-2 text-stone-800 font-medium"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-stone-400" />
                        <span>Lịch hẹn xem phòng</span>
                      </button>

                      <div className="border-t border-stone-100 my-1"></div>

                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 transition flex items-center gap-2 font-bold"
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
                className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Đăng nhập
              </button>
            )}

            {/* Mobile Drawer Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-800 hover:bg-stone-100 rounded-xl transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Progressive Touch Interface) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-center border ${
                  currentTab === 'home' ? 'bg-brand-50 border-brand-300 text-brand-900' : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-center border ${
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

              {isLandlord && (
                <button
                  onClick={() => { onNavigate('landlord'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-2.5 text-stone-800"
                >
                  <Building2 className="w-4 h-4 text-brand-700" />
                  <span>Kênh Quản lý Chủ Trọ</span>
                </button>
              )}

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
                className="w-full py-2.5 rounded-xl bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Đăng tin cho thuê trọ</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
