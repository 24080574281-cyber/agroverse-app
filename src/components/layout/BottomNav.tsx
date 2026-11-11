import React from 'react';
import { Home, Compass, ShoppingBag, BookOpen, TrendingUp, User } from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { view: 'feed', label: 'Feed', icon: <Compass className="w-5 h-5" /> },
    { view: 'market', label: 'Market', icon: <ShoppingBag className="w-5 h-5" /> },
    { view: 'edu', label: 'Edu', icon: <BookOpen className="w-5 h-5" /> },
    { view: 'invest', label: 'Invest', icon: <TrendingUp className="w-5 h-5" /> },
    { view: 'profile', label: 'Profil', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 font-medium'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
