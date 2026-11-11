import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { SplashScreen } from './components/common/SplashScreen';
import { AuthModal } from './components/common/AuthModal';
import { CartDrawer } from './components/common/CartDrawer';
import { ChatDrawer } from './components/common/ChatDrawer';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AgroBotAssistantModal } from './components/common/AgroBotAssistantModal';
import { EcosystemModal } from './components/common/EcosystemModal';
import { AgroBotMascot } from './components/common/AgroBotMascot';

// Views
import { DashboardView } from './components/views/DashboardView';
import { AgroFeedView } from './components/views/AgroFeedView';
import { AgroMarketView } from './components/views/AgroMarketView';
import { AgroEduView } from './components/views/AgroEduView';
import { AgroInvestView } from './components/views/AgroInvestView';
import { AiRecommendationView } from './components/views/AiRecommendationView';
import { ProfileView } from './components/views/ProfileView';

import { Sparkles, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    showSplash,
    setShowSplash,
    isAuthModalOpen,
    setIsAuthModalOpen,
    setIsAgroBotOpen,
    setIsEcosystemModalOpen
  } = useApp();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'feed':
        return <AgroFeedView />;
      case 'market':
        return <AgroMarketView />;
      case 'edu':
        return <AgroEduView />;
      case 'invest':
        return <AgroInvestView />;
      case 'ai-hub':
        return <AiRecommendationView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0c1610] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-12">
        {renderCurrentView()}
      </main>

      {/* Floating AgroBot Mascot Digital Assistant Trigger (Bottom Right) */}
      <div className="fixed bottom-18 lg:bottom-6 right-4 sm:right-6 z-30 select-none">
        <div
          onClick={() => setIsAgroBotOpen(true)}
          className="relative group cursor-pointer"
        >
          {/* Animated Glow Halo */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse" />

          {/* Floating Pill Badge */}
          <div className="relative bg-white dark:bg-slate-900 rounded-full p-1.5 shadow-2xl border-2 border-emerald-500 flex items-center gap-2 pr-3 hover:scale-105 transition-transform">
            <AgroBotMascot pose="thumbs_up" size="sm" animated={false} className="w-10 h-10" />
            <div className="hidden sm:block text-left">
              <p className="text-[11px] font-extrabold text-[#14532D] dark:text-lime-400 leading-tight flex items-center gap-1">
                Tanya Si Agro <Sparkles className="w-3 h-3 text-amber-500" />
              </p>
              <p className="text-[9px] text-slate-400">Asisten AI Agribisnis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Drawers & Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer />
      <ChatDrawer />
      <NotificationDrawer />
      <AgroBotAssistantModal />
      <EcosystemModal />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Modern Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-10 pb-24 lg:pb-10 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/aistudio/Agroverse_Leaf_Logo_5c2e4682.png"
                  alt="AGROVERSE"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-extrabold text-lg text-[#14532D] dark:text-emerald-400">
                  AGRO<span className="text-[#84CC16]">VERSE</span>
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Connecting Agriculture, Empowering Future. Ekosistem agribisnis digital terintegrasi berbasis Artificial Intelligence & Blockchain.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Terverifikasi & Transparan On-Chain</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
                Fitur Ekosistem
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => setCurrentView('feed')} className="hover:text-emerald-600 transition-colors">
                    AGROFEED — Social Commerce Tani
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('market')} className="hover:text-emerald-600 transition-colors">
                    AGROMARKET — Produk Segar & Hasil Samping
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('edu')} className="hover:text-emerald-600 transition-colors">
                    AGROEDU — Edukasi & AI Consultant
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('invest')} className="hover:text-emerald-600 transition-colors">
                    AGROINVEST — Pendanaan Bio-Ekonomi
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
                Peran Pengguna
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => setIsAuthModalOpen(true)} className="hover:text-emerald-600">Akun Petani Organik</button></li>
                <li><button onClick={() => setIsAuthModalOpen(true)} className="hover:text-emerald-600">Akun Konsumen Sehat</button></li>
                <li><button onClick={() => setIsAuthModalOpen(true)} className="hover:text-emerald-600">Akun Mitra Industri Pengolah</button></li>
                <li><button onClick={() => setIsAuthModalOpen(true)} className="hover:text-emerald-600">Akun Investor Berdampak</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
                Pilar Keberlanjutan
              </h4>
              <p className="text-[11px] leading-relaxed mb-3">
                Mendorong Zero Waste Agriculture dengan mentransformasi limbah sekam padi, ampas kopi, dan serat nanas menjadi produk bernilai ekonomi tinggi.
              </p>
              <button
                onClick={() => setIsEcosystemModalOpen(true)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Jelajahi Peta Alur Ekosistem →
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>© 2026 AGROVERSE (Agribusiness Digital Ecosystem). Hak Cipta Dilindungi.</p>
            <p className="flex items-center gap-1 text-slate-400">
              Dibuat dengan semangat memajukan pertanian Indonesia <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
