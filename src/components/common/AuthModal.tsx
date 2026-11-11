import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { AgroBotMascot } from './AgroBotMascot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { switchRole, currentRole, currentUser } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = (role: UserRole) => {
    switchRole(role);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const roleDescriptions: Record<UserRole, { title: string; desc: string; icon: string }> = {
    Petani: {
      title: 'Akun Petani / Kelompok Tani',
      desc: 'Jual hasil panen, tawarkan limbah sekam/ampas, pelajari modul digital.',
      icon: '🌾'
    },
    Konsumen: {
      title: 'Akun Konsumen & Pembeli',
      desc: 'Beli sayur organik langsung dari kebun, belanja produk olahan sehat.',
      icon: '🛒'
    },
    'Mitra Industri': {
      title: 'Akun Mitra Industri / Pengolah',
      desc: 'Sourcing bahan baku biomassa, kembangkan proyek pengolahan hasil samping.',
      icon: '🏭'
    },
    Investor: {
      title: 'Akun Investor Berdampak',
      desc: 'Danai proyek pengolahan pertanian via blockchain dengan bagi hasil transparan.',
      icon: '💼'
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden my-8"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#14532D] via-[#1b6b3b] to-[#14532D] p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <img
                src="/assets/aistudio/Agroverse_Leaf_Logo_5c2e4682.png"
                alt="Agroverse"
                className="w-10 h-10 object-contain rounded-xl bg-white/10 p-1"
              />
              <div>
                <h3 className="font-extrabold text-xl tracking-tight">AGROVERSE</h3>
                <p className="text-xs text-emerald-200">Connecting Agriculture, Empowering Future</p>
              </div>
            </div>

            <p className="text-xs text-emerald-100 mt-2">
              Satu portal terintegrasi untuk Petani, Konsumen, Industri, dan Investor.
            </p>
          </div>

          {/* Success Overlay Animation */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 bg-white/95 dark:bg-slate-900/95 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                Berhasil Masuk sebagai {currentUser.role}!
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Memuat dashboard dan data aktivitas agribisnis Anda...
              </p>
            </motion.div>
          )}

          {/* Quick Demo Login Preset Buttons */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Masuk Cepat Demo (Pilih Peran):
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                1-Klik
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Petani', 'Konsumen', 'Mitra Industri', 'Investor'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleDemoLogin(r)}
                  className={`p-2.5 rounded-2xl text-left border text-xs font-medium transition-all cursor-pointer ${
                    currentRole === r
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-base mb-1">{roleDescriptions[r].icon}</div>
                  <div className="font-bold text-[11px] truncate">{r}</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                    {r === 'Petani' && 'Pak Joko'}
                    {r === 'Konsumen' && 'Siti R.'}
                    {r === 'Mitra Industri' && 'PT BioEnergi'}
                    {r === 'Investor' && 'Hendro K.'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Standard Login / Register Form */}
          <div className="p-6">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex-1 text-center ${
                  authMode === 'login'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Masuk ke Akun
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex-1 text-center ${
                  authMode === 'register'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Daftar Akun Baru
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Lengkap / Instansi
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Contoh: Kelompok Tani Mandiri"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Pilih Jenis Peran Anda
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Petani', 'Konsumen', 'Mitra Industri', 'Investor'] as UserRole[]).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`p-2 rounded-xl text-left border text-xs cursor-pointer ${
                            selectedRole === role
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {roleDescriptions[role].icon} {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email atau Nomor Telepon
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@agroverse.id"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kata Sandi
                  </label>
                  {authMode === 'login' && (
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Link pemulihan kata sandi telah dikirim ke email demo Anda.'); }} className="text-[11px] text-emerald-600 hover:underline">
                      Lupa sandi?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#14532D] to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
              >
                {authMode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun Agroverse'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Mascot note */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <AgroBotMascot pose="thinking" size="sm" animated={false} />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Tips Si Agro:</span> Anda bisa beralih peran kapan saja dari menu navigasi atas untuk menjelajahi semua fitur!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
