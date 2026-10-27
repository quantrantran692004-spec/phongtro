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
    <header className="sticky top-0 z-50 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E6E4DE] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly uniform height bar: exactly 64px (h-16), perfectly balanced European architectural composition */}
        <div className="flex items-center justify-between h-16">
          {/* 1. Left Brand Wordmark: Inspired by European luxury real estate maison */}
          <div className="flex items-center gap-7">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 rounded-sm bg-[#23483D] flex items-center justify-center text-white shadow-whisper transition group-hover:bg-[#1A372E]">
                <svg className="w-4 h-4 fill-current tracking-tighter" viewBox="0 0 24 24">
                  <path d="M12 2L2 9.5V20C2 20.5523 2.44772 21 3 21H9V14H15V21H21C21.5523 21 22 20.5523 22 20V9.5L12 2ZM10.5 7H13.5V9.5H10.5V7Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm sm:text-base tracking-[0.14em] text-charcoal-900 group-hover:text-brand-700 transition">
                    TRỌ THÁI NGUYÊN
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-white text-brand-800 border border-[#E6E4DE] tracking-widest uppercase">
                    CHÍNH CHỦ
                  </span>
                </div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-charcoal-500 font-medium">
                  Bất Động Sản Cho Thuê • Minh Bạch
                </p>
              </div>
            </button>

            {/* 2. Desktop Navigation: Sleek Editorial Links (Height h-9) */}
            <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-charcoal-600">
              <button
                onClick={() => onNavigate('home')}
                className={`h-9 px-3.5 rounded-sm flex items-center transition ${
                  currentTab === 'home'
                    ? 'text-charcoal-900 font-bold bg-white border border-[#E6E4DE] shadow-whisper'
                    : 'hover:text-charcoal-900 hover:bg-white/60'
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
                  className={`h-9 px-3.5 rounded-sm flex items-center gap-1.5 transition ${
                    currentTab === 'search' || exploreMenuOpen
                      ? 'text-charcoal-900 font-bold bg-white border border-[#E6E4DE] shadow-whisper'
                      : 'hover:text-charcoal-900 hover:bg-white/60'
                  }`}
                >
                  <span>Khám phá trọ</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreMenuOpen ? 'rotate-180 text-charcoal-900' : 'text-charcoal-400'}`} />
                </button>

                <AnimatePresence>
                  {exploreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 top-full mt-1.5 w-68 bg-white rounded-md shadow-card border border-[#E6E4DE] p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onNavigate('search'); setExploreMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#F7F6F2] flex items-center gap-3 text-charcoal-800 transition"
                      >
                        <Search className="w-4 h-4 text-brand-700" />
                        <div>
                          <div className="font-bold text-charcoal-900">Tất cả phòng trọ</div>
                          <div className="text-[11px] text-charcoal-500">Xem hơn 450+ không gian lưu trú</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Tân Thịnh')}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#F7F6F2] flex items-center gap-3 text-charcoal-800 transition"
                      >
                        <GraduationCap className="w-4 h-4 text-brand-700" />
                        <div>
                          <div className="font-bold text-charcoal-900">Làng SV Tân Thịnh</div>
                          <div className="text-[11px] text-charcoal-500">ĐH CNTT, Sư Phạm, Kinh Tế</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('P. Quang Trung', 'Y Dược')}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#F7F6F2] flex items-center gap-3 text-charcoal-800 transition"
                      >
                        <MapPin className="w-4 h-4 text-brand-700" />
                        <div>
                          <div className="font-bold text-charcoal-900">Khu vực ĐH Y Dược</div>
                          <div className="text-[11px] text-charcoal-500">Lương Ngọc Quyến, Viện A</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleSelectArea('TX. Phổ Yên', 'Samsung')}
                        className="w-full text-left px-3 py-2.5 rounded hover:bg-[#F7F6F2] flex items-center gap-3 text-charcoal-800 transition"
                      >
                        <Building2 className="w-4 h-4 text-brand-700" />
                        <div>
                          <div className="font-bold text-charcoal-900">KCN Samsung Phổ Yên</div>
                          <div className="text-[11px] text-charcoal-500">Khu công nghệ cao SEVT</div>
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
                  className={`h-9 px-3.5 rounded-sm flex items-center gap-1.5 transition ${
                    guideMenuOpen
                      ? 'text-charcoal-900 font-bold bg-white border border-[#E6E4DE] shadow-whisper'
                      : 'hover:text-charcoal-900 hover:bg-white/60'
                  }`}
                >
                  <span>Cẩm nang an cư</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${guideMenuOpen ? 'rotate-180 text-charcoal-900' : 'text-charcoal-400'}`} />
                </button>

                <AnimatePresence>
                  {guideMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-md shadow-card border border-[#E6E4DE] p-2 z-50 text-xs"
                    >
                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded hover:bg-[#F7F6F2] flex items-center gap-2.5 text-charcoal-800 font-semibold"
                      >
                        <FileText className="w-4 h-4 text-brand-700" />
                        <span>Kinh nghiệm tránh lừa cọc</span>
                      </button>

                      <button
                        onClick={() => { onOpenGuide(); setGuideMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded hover:bg-[#F7F6F2] flex items-center gap-2.5 text-charcoal-800 font-semibold"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-700" />
                        <span>Mẫu hợp đồng thuê phòng chuẩn</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLandlord && (
                <button
                  onClick={() => onNavigate('landlord')}
                  className={`h-9 px-3.5 rounded-sm flex items-center gap-1.5 transition ${
                    currentTab === 'landlord'
                      ? 'text-charcoal-900 font-bold bg-white border border-[#E6E4DE] shadow-whisper'
                      : 'hover:text-charcoal-900 hover:bg-white/60'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-brand-700" />
                  <span>Kênh Chủ Trọ</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`h-9 px-3.5 rounded-sm flex items-center gap-1.5 transition ${
                    currentTab === 'admin'
                      ? 'text-charcoal-900 font-bold bg-white border border-[#E6E4DE] shadow-whisper'
                      : 'hover:text-charcoal-900 hover:bg-white/60'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                  <span>Quản trị (Admin)</span>
                </button>
              )}
            </nav>
          </div>

          {/* 3. Right Action Items: Clean European Architectural Baseline (All h-9) */}
          <div className="flex items-center gap-2">
            {/* Quick Search Trigger Pill */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden md:flex items-center gap-2 h-9 px-3 rounded-sm bg-white hover:bg-stone-50 text-charcoal-600 hover:text-charcoal-900 text-xs font-medium border border-[#E6E4DE] transition shadow-whisper"
                title="Tìm nhanh (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-charcoal-400" />
                <span>Tìm nhanh...</span>
                <kbd className="text-[10px] bg-[#F7F6F2] border border-[#E6E4DE] rounded px-1.5 py-0.2 font-mono text-charcoal-500">⌘K</kbd>
              </button>
            )}

            {/* Compare Tool: only when active */}
            {compareList.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 h-9 px-3 rounded-sm bg-white hover:bg-stone-50 border border-[#E6E4DE] text-charcoal-900 text-xs font-bold transition shadow-whisper"
              >
                <Scale className="w-3.5 h-3.5 text-brand-700" />
                <span className="hidden sm:inline">So sánh</span>
                <span className="w-4 h-4 rounded-full bg-[#23483D] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Favorites Button */}
            <button
              onClick={() => onOpenProfile('saved')}
              className="relative h-9 w-9 rounded-sm bg-white hover:bg-stone-50 border border-[#E6E4DE] hover:border-charcoal-400 text-charcoal-700 hover:text-rose-600 flex items-center justify-center transition shadow-whisper"
              title="Phòng đã lưu"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Post Room Primary CTA: BARNES Deep Forest Green button */}
            <button
              onClick={onOpenPostRoom}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-sm text-xs font-bold text-white bg-[#23483D] hover:bg-[#1A372E] transition shadow-whisper active:scale-98 tracking-wide"
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
                  className="flex items-center gap-2 h-9 pl-2.5 pr-2 rounded-sm bg-white hover:bg-stone-50 border border-[#E6E4DE] transition shadow-whisper"
                >
                  <span className="text-xs font-bold text-charcoal-900 max-w-[100px] truncate">
                    {currentUser?.name}
                  </span>
                  <span className="text-[10px] font-bold bg-[#F7F6F2] text-charcoal-700 px-1.5 py-0.5 rounded border border-[#E6E4DE] hidden sm:inline">
                    {currentUser?.role === 'admin' ? 'Admin' : currentUser?.role === 'landlord' ? 'Chủ trọ' : 'SV'}
                  </span>
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={currentUser?.name}
                    className="w-5 h-5 rounded-full object-cover shrink-0 border border-[#E6E4DE]"
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-md shadow-card border border-[#E6E4DE] p-2 z-50 text-xs"
                    >
                      <div className="px-3 py-2 bg-[#F7F6F2] rounded mb-1.5 border border-[#E6E4DE]">
                        <div className="font-bold text-charcoal-900">{currentUser?.name}</div>
                        <div className="text-[11px] text-charcoal-500 truncate">{currentUser?.email}</div>
                      </div>

                      <div className="font-bold text-charcoal-500 px-2 py-1 text-[10px] uppercase tracking-wider flex items-center justify-between">
                        <span>Đổi vai trò thử nghiệm:</span>
                        <Sparkles className="w-3 h-3 text-amber-600" />
                      </div>

                      <div className="space-y-0.5 mb-1.5">
                        <button
                          onClick={() => { switchDemoRole('tenant'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition ${
                            currentUser?.role === 'tenant' ? 'bg-[#F7F6F2] text-brand-900 font-bold border border-[#E6E4DE]' : 'hover:bg-stone-50 text-charcoal-700'
                          }`}
                        >
                          <span>🎓 Sinh viên (An)</span>
                          {currentUser?.role === 'tenant' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('landlord'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition ${
                            currentUser?.role === 'landlord' ? 'bg-[#F7F6F2] text-brand-900 font-bold border border-[#E6E4DE]' : 'hover:bg-stone-50 text-charcoal-700'
                          }`}
                        >
                          <span>🏡 Chủ trọ (Cô Lan)</span>
                          {currentUser?.role === 'landlord' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700" />}
                        </button>

                        <button
                          onClick={() => { switchDemoRole('admin'); setUserMenuOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition ${
                            currentUser?.role === 'admin' ? 'bg-[#F7F6F2] text-brand-900 font-bold border border-[#E6E4DE]' : 'hover:bg-stone-50 text-charcoal-700'
                          }`}
                        >
                          <span>🛡️ Quản trị (Admin)</span>
                          {currentUser?.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700" />}
                        </button>
                      </div>

                      <div className="border-t border-[#E6E4DE] my-1"></div>

                      <button
                        onClick={() => { onOpenProfile('profile'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-[#F7F6F2] transition flex items-center gap-2 text-charcoal-700 font-medium"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-charcoal-400" />
                        <span>Hồ sơ tài khoản</span>
                      </button>

                      <button
                        onClick={() => { onOpenProfile('appointments'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-[#F7F6F2] transition flex items-center gap-2 text-charcoal-700 font-medium"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-charcoal-400" />
                        <span>Lịch hẹn xem phòng</span>
                      </button>

                      <div className="border-t border-[#E6E4DE] my-1"></div>

                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-rose-50 text-rose-700 transition flex items-center gap-2 font-bold"
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
                className="h-9 px-4 bg-charcoal-900 hover:bg-black text-white font-bold text-xs rounded-sm shadow-whisper transition tracking-wide"
              >
                ĐĂNG NHẬP
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center text-charcoal-800 hover:bg-white rounded-sm border border-[#E6E4DE] shadow-whisper"
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
            className="lg:hidden border-t border-[#E6E4DE] bg-[#F7F6F2] px-4 pt-3 pb-6 space-y-3 overflow-hidden text-xs"
          >
            <div className="grid grid-cols-2 gap-2 font-bold">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-sm text-center border ${
                  currentTab === 'home' ? 'bg-white border-charcoal-400 text-charcoal-900 shadow-whisper' : 'bg-white/80 border-[#E6E4DE] text-charcoal-700'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
                className={`py-2.5 rounded-sm text-center border ${
                  currentTab === 'search' ? 'bg-white border-charcoal-400 text-charcoal-900 shadow-whisper' : 'bg-white/80 border-[#E6E4DE] text-charcoal-700'
                }`}
              >
                Tìm phòng trọ
              </button>
            </div>

            <div className="space-y-1 font-medium text-charcoal-800 bg-white p-2 rounded-sm border border-[#E6E4DE]">
              <button
                onClick={() => { onOpenGuide(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded hover:bg-[#F7F6F2] flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-brand-700" />
                <span>Cẩm nang thuê trọ sinh viên</span>
              </button>

              <button
                onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded hover:bg-[#F7F6F2] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-700" />
                  <span>So sánh phòng</span>
                </div>
                {compareList.length > 0 && (
                  <span className="font-bold bg-[#23483D] text-white px-2 py-0.5 rounded-full text-[10px]">
                    {compareList.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => { onOpenPostRoom(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-sm bg-[#23483D] text-white font-bold flex items-center justify-center gap-1.5 shadow-whisper tracking-wider uppercase"
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