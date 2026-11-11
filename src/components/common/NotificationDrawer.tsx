import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, ShoppingBag, Coins, MessageSquare, Sparkles, CheckCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    isNotificationOpen,
    setIsNotificationOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setCurrentView
  } = useApp();

  if (!isNotificationOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'investment':
        return <Coins className="w-4 h-4 text-amber-500" />;
      case 'feed':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-lime-500" />;
    }
  };

  const handleNotificationClick = (item: any) => {
    markNotificationAsRead(item.id);
    if (item.linkTo) {
      setCurrentView(item.linkTo as AppView);
      setIsNotificationOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={() => setIsNotificationOpen(false)} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        >
          <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#14532D] to-emerald-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-lime-400" />
                <h3 className="font-bold text-base">Pusat Notifikasi</h3>
                {unreadCount > 0 && (
                  <span className="text-[11px] bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                    {unreadCount} Baru
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    title="Tandai Semua Dibaca"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white text-xs flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span className="text-[10px] hidden sm:inline">Tandai Dibaca</span>
                  </button>
                )}
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="font-semibold text-slate-600 dark:text-slate-300 text-sm">
                    Belum Ada Notifikasi Baru
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Aktivitas pesanan, transaksi escrow, dan interaksi feed Anda akan muncul di sini.
                  </p>
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                      item.read
                        ? 'bg-white dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 opacity-80'
                        : 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 shadow-xs'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shrink-0 shadow-xs h-fit">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                      {item.linkTo && (
                        <span className="inline-block mt-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                          Lihat detail →
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
