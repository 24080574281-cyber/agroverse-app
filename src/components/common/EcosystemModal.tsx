import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles, ShieldCheck, Cpu, RefreshCw, Layers } from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';
import { AgroBotMascot } from './AgroBotMascot';

export const EcosystemModal: React.FC = () => {
  const { isEcosystemModalOpen, setIsEcosystemModalOpen, setCurrentView } = useApp();

  if (!isEcosystemModalOpen) return null;

  const flowSteps: {
    step: number;
    title: string;
    subtitle: string;
    description: string;
    targetView: AppView;
    tag: string;
    icon: string;
    color: string;
  }[] = [
    {
      step: 1,
      title: 'Petani → AGROEDU',
      subtitle: 'Peningkatan Kapasitas Digital & Usaha',
      description: 'Petani belajar strategi pemasaran, kemasan ramah lingkungan, manajemen cashflow, dan konsultasi bersama AI Assistant.',
      targetView: 'edu',
      tag: 'AI Education',
      icon: '🎓',
      color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300'
    },
    {
      step: 2,
      title: 'Petani → AGROFEED',
      subtitle: 'Social Commerce & Pemasaran Panen',
      description: 'Petani mengunggah video pendek dan foto panen segar, membangun audiens setia, dan menyematkan tombol belanja instan.',
      targetView: 'feed',
      tag: 'Social Commerce',
      icon: '📱',
      color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
    },
    {
      step: 3,
      title: 'AGROFEED → AGROMARKET',
      subtitle: 'Konsumen Membeli Produk Segar',
      description: 'Konsumen perkotaan membeli hasil panen segar langsung dari petani dengan sistem pembayaran escrow terlindungi.',
      targetView: 'market',
      tag: 'D2C Marketplace',
      icon: '🛒',
      color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
    },
    {
      step: 4,
      title: 'Petani → AGROMARKET (Hasil Samping)',
      subtitle: 'Menjual Biomassa ke Mitra Industri',
      description: 'Limbah sekam padi, ampas kopi, dan serat nanas dijual ke pabrik pengolah biomassa, menghasilkan cuan tambahan.',
      targetView: 'market',
      tag: 'B2B Sourcing',
      icon: '♻️',
      color: 'border-lime-500 bg-lime-50 dark:bg-lime-950/40 text-lime-800 dark:text-lime-300'
    },
    {
      step: 5,
      title: 'Mitra Industri → AGROINVEST',
      subtitle: 'Pengembangan Proyek Pengolahan',
      description: 'Industri mendirikan fasilitas bio-briket / ekstraksi serat nanas dengan pendanaan crowdfunding berbasis blockchain.',
      targetView: 'invest',
      tag: 'Blockchain Funding',
      icon: '⛓️',
      color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
    },
    {
      step: 6,
      title: 'Proyek Hilirisasi → AGROMARKET',
      subtitle: 'Produk Bernilai Tambah Dipasarkan',
      description: 'Produk olahan bernilai tinggi (bio-briket, pupuk organik, fashion serat nanas) kembali dipasarkan ke konsumen & industri.',
      targetView: 'market',
      tag: 'Circular Economy',
      icon: '✨',
      color: 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
    }
  ];

  const handleStepClick = (view: AppView) => {
    setCurrentView(view);
    setIsEcosystemModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#14532D] via-emerald-800 to-[#14532D] p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20">
                <RefreshCw className="w-6 h-6 text-lime-400 animate-spin [animation-duration:8s]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  Peta Integrasi Ekosistem AGROVERSE
                </h3>
                <p className="text-xs text-emerald-200">
                  Siklus Agribisnis Sirkular Berkelanjutan Berbasis AI & Blockchain
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEcosystemModalOpen(false)}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Pillars Bar */}
          <div className="px-6 py-3 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span><b>Artificial Intelligence:</b> Rekomendasi Pintar, Asisten Petani & Matchmaking Sourcing</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-lime-600" />
              <span><b>Blockchain:</b> Smart Contract Pendanaan, Transparansi Dana & Escrow Pembayaran</span>
            </div>
          </div>

          {/* Interactive Flow Grid */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flowSteps.map((step) => (
                <div
                  key={step.step}
                  onClick={() => handleStepClick(step.targetView)}
                  className="group relative p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-white dark:bg-slate-800/80 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${step.color}`}>
                      {step.tag}
                    </span>
                  </div>

                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Buka Fitur Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Mascot summary callout */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#14532D] text-white flex items-center gap-4">
              <AgroBotMascot pose="harvest" size="md" animated={false} />
              <div>
                <h5 className="font-bold text-sm text-lime-400">
                  Zero Waste & Nilai Tambah Maksimal!
                </h5>
                <p className="text-xs text-emerald-100 leading-relaxed mt-0.5">
                  Setiap rantai di AGROVERSE dirancang agar tidak ada biomassa yang terbuang sia-sia. Dari bibit, panen segar, limbah sekam, hingga briket ekspor, semua mengalir secara transparan didukung teknologi pintar.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
