import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RoomProvider, useRooms } from './context/RoomContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CompareFloatingBar } from './components/common/CompareFloatingBar';
import { HeroSearch } from './components/home/HeroSearch';
import { UniversityShortcuts } from './components/home/UniversityShortcuts';
import { FeaturedRooms } from './components/home/FeaturedRooms';
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenProfile={handleOpenProfile}
        onOpenCompare={() => setCompareModalOpen(true)}
        onOpenPostRoom={() => setPostRoomModalOpen(true)}
        onOpenGuide={() => setGuideModalOpen(true)}
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
            <HeroSearch onSearchSubmit={() => setCurrentTab('search')} />
            <UniversityShortcuts onSelectUniversity={() => setCurrentTab('search')} />
            <FeaturedRooms
              onViewAll={() => setCurrentTab('search')}
              onSelectRoom={handleSelectRoom}
            />
            <AreaExplorer onSelectArea={() => setCurrentTab('search')} />
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
