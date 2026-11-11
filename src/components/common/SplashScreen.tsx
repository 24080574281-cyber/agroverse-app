import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { AgroBotMascot } from './AgroBotMascot';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            sessionStorage.setItem('agroverse_splash_seen', 'true');
            onFinish();
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onFinish]);

  const handleSkip = () => {
    sessionStorage.setItem('agroverse_splash_seen', 'true');
    onFinish();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="agroverse-splash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-[#0e3b20] via-[#14532D] to-[#0a2314] text-white select-none overflow-hidden"
      >
        {/* Subtle agrarian background glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full flex items-center justify-between max-w-md pt-2"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-medium tracking-wide">
            <Cpu className="w-3.5 h-3.5 text-lime-400" />
            AI & Blockchain Ecosystem
          </div>
          <button
            onClick={handleSkip}
            className="text-xs text-emerald-200/80 hover:text-white transition-colors flex items-center gap-1 font-medium bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full cursor-pointer"
          >
            Lewati <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>

        {/* Center Hero: Logo, Title & Mascot */}
        <div className="flex flex-col items-center text-center my-auto max-w-sm sm:max-w-md">
          {/* Logo with pulse */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
            className="relative mb-6"
          >
            <div className="absolute -inset-4 rounded-3xl bg-lime-400/20 blur-xl animate-pulse" />
            <img
              src="/assets/aistudio/Agroverse_Leaf_Logo_5c2e4682.png"
              alt="AGROVERSE Logo"
              className="relative w-28 h-28 sm:w-36 sm:h-36 object-contain rounded-3xl shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-1.5"
            />
          </motion.div>

          {/* App Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2"
          >
            AGRO<span className="text-[#84CC16]">VERSE</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-sm sm:text-base font-medium text-emerald-200 mb-6 italic"
          >
            "Connecting Agriculture, Empowering Future."
          </motion.p>

          {/* Mascot Greeting */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              delay: 0.55
            }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-500/30 mb-8 shadow-inner"
          >
            <AgroBotMascot pose="celebrate" size="sm" animated={false} />
            <div className="text-left">
              <p className="text-xs font-bold text-lime-400">Halo! Saya Si Agro 🤖🌿</p>
              <p className="text-[11px] text-emerald-100">
                Menyiapkan ekosistem agribisnis pintar untuk Anda...
              </p>
            </div>
          </motion.div>

          {/* Loading bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="h-2 w-full bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-700/50 p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-lime-400 via-emerald-400 to-[#F5A623] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-emerald-300 font-mono">
              <span>Smart Contract & AI Ready</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        {/* Bottom trust footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-6 text-[11px] text-emerald-300/80 pt-4"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            <span>Transparansi Blockchain</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kecerdasan Buatan Terpadu</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
