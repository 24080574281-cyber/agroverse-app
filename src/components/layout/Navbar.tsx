import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Bell,
  MessageCircle,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Network,
  User,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';
import { UserRole } from '../../types';
import { AgroBotMascot } from '../common/AgroBotMascot';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    currentRole,
    switchRole,
    currentUser,
    cart,
    setIsCartOpen,
    notifications,
    setIsNotificationOpen,
    setIsChatOpen,
    darkMode,
    toggleDarkMode,
    setIsAuthModalOpen,
    setIsEcosystemModalOpen,
    setIsAgroBotOpen
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const navLinks: { view: AppView; label: string; badge?: string }[] = [
    { view: 'dashboard', label: 'Home' },
    { view: 'feed', label: 'AGROFEED', badge: 'Live' },
    { view: 'market', label: 'AGROMARKET' },
    { view: 'edu', label: 'AGROEDU', badge: 'AI' },
    { view: 'invest', label: 'AGROINVEST', badge: 'Blockchain' },
    { view: 'ai-hub', label: 'AI Hub' },
    { view: 'profile', label: 'Profile' }
  ];

  const roles: UserRole[] = ['Petani', 'Konsumen', 'Mitra Industri', 'Investor'];

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'Petani':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
      case 'Konsumen':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300';
      case 'Mitra Industri':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      case 'Investor':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top micro bar for quick announcements & role switcher */}
      <div className="bg-[#14532D] text-white px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-lime-400 text-[#14532D] font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            AGROVERSE
          </span>
          <span className="hidden sm:inline text-emerald-100">
            Connecting Agriculture, Empowering Future
          </span>
          <span className="sm:hidden text-emerald-100 text-[11px] truncate">
            Ekosistem Agribisnis AI & Blockchain
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ecosystem map button */}
          <button
            onClick={() => setIsEcosystemModalOpen(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-lime-300 hover:text-white transition-colors cursor-pointer"
          >
            <Network className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Peta Ekosistem</span>
          </button>

          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-lime-300 border border-emerald-600/50 cursor-pointer transition-colors"
            >
              <span>Peran: {currentRole}</span>
              <ChevronDown className="w-3 h-3 text-white" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                  Ganti Tampilan Peran:
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer ${
                      currentRole === r ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' : ''
                    }`}
                  >
                    <span>{r}</span>
                    {currentRole === r && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none group"
        >
          <img
            src="/assets/aistudio/Agroverse_Leaf_Logo_5c2e4682.png"
            alt="AGROVERSE"
            className="w-10 h-10 object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-extrabold text-xl tracking-tight text-[#14532D] dark:text-emerald-400 flex items-center leading-none">
              AGRO<span className="text-[#84CC16]">VERSE</span>
            </div>
            <p className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
              Digital Agribusiness
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari panen segar, sekam, pupuk, proyek..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-[#14532D] shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                      isActive
                        ? 'bg-lime-400 text-[#14532D]'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Cart, Chat, Notif, Dark Mode, Mascot */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* AgroBot AI Trigger Button */}
          <button
            onClick={() => setIsAgroBotOpen(true)}
            title="Tanya Si Agro AI"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-lime-600 text-white text-xs font-bold shadow-xs hover:shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <AgroBotMascot pose="thumbs_up" size="sm" animated={false} className="w-5 h-5" />
            <span className="hidden xl:inline">Tanya Si Agro</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>

          {/* Direct Chat */}
          <button
            onClick={() => setIsChatOpen(true)}
            title="Pesan Langsung"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Cart with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            title="Keranjang Belanja"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-600 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications with Badge */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            title="Notifikasi"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1 right-1 bg-amber-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Profile Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            title="Profil & Ganti Akun"
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-emerald-500"
            />
            <span className="hidden md:inline text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[90px] truncate">
              {currentUser.name.split(' ')[0]}
            </span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk segar, sekam, briket..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between cursor-pointer ${
                  currentView === item.view
                    ? 'bg-[#14532D] text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] bg-lime-400 text-[#14532D] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsAgroBotOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Tanya Si Agro AI
            </button>
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-slate-600 dark:text-slate-400"
            >
              Ganti Akun Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
