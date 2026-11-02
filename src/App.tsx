import React, { useState } from 'react';
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
import { SearchPage } from './components/search/SearchPage';
import { RoomDetailView } from './components/detail/RoomDetailView';
import { ComparisonModal } from './components/compare/ComparisonModal';
import { LandlordPortal } from './components/landlord/LandlordPortal';
import { RoomFormModal } from './components/landlord/RoomFormModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { AuthModal } from './components/user/AuthModal';
import { UserProfileModal } from './components/user/UserProfileModal';
import { GuideModal } from './components/info/GuideModal';
import { CommandPalette } from './components/common/CommandPalette';

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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const observed = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.add('is-scroll-revealed');
        observer.unobserve(element);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    const observeElement = (element: HTMLElement) => {
      if (observed.has(element)) return;
      observed.add(element);
      const staggerContainer = element.parentElement?.closest('[data-scroll-stagger]');
      if (staggerContainer) {
        const siblings = Array.from(staggerContainer.children).filter((child): child is HTMLElement => (
          child instanceof HTMLElement && child.hasAttribute('data-scroll-reveal')
        ));
        const index = Math.max(0, siblings.indexOf(element));
        element.style.setProperty('--scroll-reveal-delay', `${Math.min(index, 4) * 75}ms`);
      }
      observer.observe(element);
    };

    const observeTree = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.hasAttribute('data-scroll-reveal')) observeElement(node);
      node.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach(observeElement);
    };

    observeTree(document.body);
    // Only enable the hidden pre-reveal state after every current target is observed.
    // If the browser misses the initial observer notification, fail open for anything
    // already visible so the first screen can never remain blank.
    root.classList.add('scroll-reveal-ready');
    const initialRevealFallback = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-scroll-reveal]:not(.is-scroll-revealed)').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          element.classList.add('is-scroll-revealed');
          observer.unobserve(element);
        }
      });
    }, 900);
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeTree));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(initialRevealFallback);
      mutationObserver.disconnect();
      observer.disconnect();
      root.classList.remove('scroll-reveal-ready');
    };
  }, []);

  const handleSelectRoom = (roomId: string) => {
    addToHistory(roomId);
    setSelectedRoomId(roomId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setSelectedRoomId(null);
  };

  const handleNavigate = (tab: 'home' | 'search' | 'landlord' | 'admin') => {
    setSelectedRoomId(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {selectedRoom ? (
          /* Room Detail View */
          <RoomDetailView
            room={selectedRoom}
            onBack={handleBackFromDetail}
            onSelectSimilarRoom={handleSelectRoom}
          />
        ) : currentTab === 'home' ? (
          /* Home View */
          <div>
            <HomeLanding
              onSearchSubmit={() => setCurrentTab('search')}
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
          /* Search & Filter View */
          <SearchPage onSelectRoom={handleSelectRoom} />
        ) : currentTab === 'landlord' ? (
          /* Landlord Portal */
          <LandlordPortal onSelectRoom={handleSelectRoom} />
        ) : (
          /* Admin Portal */
          <AdminPortal onSelectRoom={handleSelectRoom} />
        )}
      </main>

      {/* Floating Compare Bar */}
      <CompareFloatingBar onOpenCompare={() => setCompareModalOpen(true)} />

      {/* Footer */}
      <Footer
        onNavigateSearch={() => handleNavigate('search')}
        onOpenGuide={() => setGuideModalOpen(true)}
      />

      {/* Modals */}
      {compareModalOpen && (
        <ComparisonModal
          onClose={() => setCompareModalOpen(false)}
          onSelectRoom={handleSelectRoom}
        />
      )}

      {authModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}

      {profileModalOpen && (
        <UserProfileModal
          initialTab={profileInitialTab}
          onClose={() => setProfileModalOpen(false)}
          onSelectRoom={handleSelectRoom}
        />
      )}

      {postRoomModalOpen && (
        <RoomFormModal onClose={() => setPostRoomModalOpen(false)} />
      )}

      {guideModalOpen && (
        <GuideModal onClose={() => setGuideModalOpen(false)} />
      )}

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
    <ToastProvider>
      <AuthProvider>
        <RoomProvider>
          <MainApp />
        </RoomProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
