import React, { lazy, Suspense, useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { RoomProvider, useRooms } from './context/RoomContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CompareFloatingBar } from './components/common/CompareFloatingBar';
import { HomeLanding } from './components/home/HomeLanding';
import { FeaturedRooms } from './components/home/FeaturedRooms';
import { UniversityShortcuts } from './components/home/UniversityShortcuts';
import { AreaExplorer } from './components/home/AreaExplorer';
import { SafeRentGuide } from './components/home/SafeRentGuide';
import { LandlordCta } from './components/home/LandlordCta';
const SearchPage = lazy(() => import('./components/search/SearchPage').then((module) => ({ default: module.SearchPage })));
const RoomDetailView = lazy(() => import('./components/detail/RoomDetailView').then((module) => ({ default: module.RoomDetailView })));
import { ComparisonModal } from './components/compare/ComparisonModal';
const LandlordPortal = lazy(() => import('./components/landlord/LandlordPortal').then((module) => ({ default: module.LandlordPortal })));
import { RoomFormModal } from './components/landlord/RoomFormModal';
const AdminPortal = lazy(() => import('./components/admin/AdminPortal').then((module) => ({ default: module.AdminPortal })));
import { AuthModal } from './components/user/AuthModal';
import { UserProfileModal } from './components/user/UserProfileModal';
import { GuideModal } from './components/info/GuideModal';
import { CommandPalette } from './components/common/CommandPalette';
import { MOTION_DURATION, MOTION_EASE } from './utils/motionTokens';

const MainApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'search' | 'landlord' | 'admin'>('home');
  const { selectedRoom, selectedRoomId, setSelectedRoomId, addToHistory } = useRooms();

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState<'saved' | 'appointments' | 'profile'>('saved');
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [postRoomModalOpen, setPostRoomModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    let active = true;
    let dispose: (() => void) | undefined;

    import('./utils/motionSystem').then(({ initializeMotionSystem }) => {
      if (active) dispose = initializeMotionSystem();
    });

    return () => {
      active = false;
      dispose?.();
    };
  }, []);

  React.useEffect(() => {
    const syncFromHistory = () => {
      const route = window.history.state as { motionRoute?: string; roomId?: string; tab?: 'home' | 'search' | 'landlord' | 'admin' } | null;
      if (route?.motionRoute === 'room' && route.roomId) {
        setSelectedRoomId(route.roomId);
        return;
      }
      setSelectedRoomId(null);
      if (route?.motionRoute === 'tab' && route.tab) setCurrentTab(route.tab);
      else setCurrentTab(new URLSearchParams(window.location.search).get('view') as typeof currentTab || 'home');
    };

    const params = new URLSearchParams(window.location.search);
    const initialRoomId = params.get('room');
    const initialTab = params.get('view');
    if (initialRoomId) {
      setSelectedRoomId(initialRoomId);
      window.history.replaceState({ motionRoute: 'room', roomId: initialRoomId }, '', window.location.href);
    } else {
      const tab = initialTab && ['home', 'search', 'landlord', 'admin'].includes(initialTab) ? initialTab : currentTab;
      setCurrentTab(tab as typeof currentTab);
      window.history.replaceState({ motionRoute: 'tab', tab }, '', window.location.href);
    }

    window.addEventListener('popstate', syncFromHistory);
    return () => window.removeEventListener('popstate', syncFromHistory);
  }, [setSelectedRoomId]);

  const handleSelectRoom = (roomId: string) => {
    addToHistory(roomId);
    window.history.pushState({ motionRoute: 'room', roomId }, '', `?room=${encodeURIComponent(roomId)}`);
    setSelectedRoomId(roomId);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleBackFromDetail = () => {
    if ((window.history.state as { motionRoute?: string } | null)?.motionRoute === 'room') {
      window.history.back();
      return;
    }
    setSelectedRoomId(null);
  };

  const handleNavigate = (tab: 'home' | 'search' | 'landlord' | 'admin') => {
    window.history.pushState({ motionRoute: 'tab', tab }, '', `?view=${tab}`);
    setSelectedRoomId(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleOpenProfile = (tab: 'saved' | 'appointments' | 'profile' = 'profile') => {
    setProfileInitialTab(tab);
    setProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenProfile={handleOpenProfile}
        onOpenCompare={() => setCompareModalOpen(true)}
        onOpenPostRoom={() => setPostRoomModalOpen(true)}
        onOpenGuide={() => setGuideModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        <LayoutGroup id="room-detail-transition">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={selectedRoom ? `room-${selectedRoom.id}` : currentTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION_DURATION.page, ease: MOTION_EASE }}
          >
            <Suspense fallback={<div className="min-h-[35vh] px-4 py-10 text-center text-sm text-slate-500" role="status">Đang mở khu vực…</div>}>
            {selectedRoom ? (
              <RoomDetailView
                room={selectedRoom}
                onBack={handleBackFromDetail}
                onSelectSimilarRoom={handleSelectRoom}
              />
            ) : currentTab === 'home' ? (
              <div>
                <HomeLanding
                  onSearchSubmit={() => handleNavigate('search')}
                  onOpenGuide={() => setGuideModalOpen(true)}
                />
                <FeaturedRooms
                  onViewAll={() => handleNavigate('search')}
                  onSelectRoom={handleSelectRoom}
                />
                <UniversityShortcuts onSelectUniversity={() => handleNavigate('search')} />
                <AreaExplorer onSelectArea={() => handleNavigate('search')} />
                <SafeRentGuide onOpenGuideModal={() => setGuideModalOpen(true)} />
                <LandlordCta onPostRoom={() => setPostRoomModalOpen(true)} />
              </div>
            ) : currentTab === 'search' ? (
              <SearchPage onSelectRoom={handleSelectRoom} />
            ) : currentTab === 'landlord' ? (
              <LandlordPortal onSelectRoom={handleSelectRoom} />
            ) : (
              <AdminPortal onSelectRoom={handleSelectRoom} />
            )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
        </LayoutGroup>
      </main>

      {/* Floating Compare Bar */}
      <CompareFloatingBar onOpenCompare={() => setCompareModalOpen(true)} />

      {/* Footer */}
      <Footer
        onNavigateSearch={() => handleNavigate('search')}
        onOpenGuide={() => setGuideModalOpen(true)}
      />

      {/* Modals */}
      <AnimatePresence initial={false}>
        {compareModalOpen && (
          <ComparisonModal
            key="comparison-modal"
            onClose={() => setCompareModalOpen(false)}
            onSelectRoom={handleSelectRoom}
          />
        )}

        {authModalOpen && (
          <AuthModal key="auth-modal" onClose={() => setAuthModalOpen(false)} />
        )}

        {profileModalOpen && (
          <UserProfileModal
            key="profile-modal"
            initialTab={profileInitialTab}
            onClose={() => setProfileModalOpen(false)}
            onSelectRoom={handleSelectRoom}
          />
        )}

        {postRoomModalOpen && (
          <RoomFormModal key="room-form-modal" onClose={() => setPostRoomModalOpen(false)} />
        )}

        {guideModalOpen && (
          <GuideModal key="guide-modal" onClose={() => setGuideModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectRoom={handleSelectRoom}
        onNavigate={handleNavigate}
        onOpenCompare={() => setCompareModalOpen(true)}
        onOpenPostRoom={() => setPostRoomModalOpen(true)}
        onOpenGuide={() => setGuideModalOpen(true)}
      />
    </div>
  );
};

export function App() {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: 'tween', duration: MOTION_DURATION.standard, ease: MOTION_EASE }}
    >
      <ToastProvider>
        <AuthProvider>
          <RoomProvider>
            <MainApp />
          </RoomProvider>
        </AuthProvider>
      </ToastProvider>
    </MotionConfig>
  );
}

export default App;
