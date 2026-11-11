import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Cpu,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Recycle,
  BookOpen,
  Coins,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgroBotMascot } from '../common/AgroBotMascot';

export const AiRecommendationView: React.FC = () => {
  const {
    currentRole,
    currentUser,
    products,
    byproducts,
    eduModules,
    investmentProjects,
    setCurrentView,
    addToCart,
    setIsAgroBotOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'byproducts' | 'edu' | 'invest'>('all');
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 800);
  };

  const aiInsights = [
    {
      title: 'Optimalisasi Panen & Direct-to-Consumer',
      targetRole: 'Petani',
      score: 96,
      category: 'Pemasaran Digital',
      icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />,
      recommendation: 'Tomat Cherry & Selada Butterhead memiliki lonjakan permintaan +34% dari konsumen urban Jakarta minggu ini. Posting video panen subuh di AGROFEED untuk konversi pembelian instan.',
      actionLabel: 'Buat Konten di AGROFEED',
      actionView: 'feed' as const
    },
    {
      title: 'Peluang Pasokan Sourcing Biomassa Sekam',
      targetRole: 'Petani & Industri',
      score: 98,
      category: 'Bio-Sirkular Sourcing',
      icon: <Recycle className="w-5 h-5 text-lime-600" />,
      recommendation: 'PT BioEnergi Nusantara membuka permintaan pasokan 50 Ton Sekam Padi dengan jaminan harga Rp 720.000/Ton. Stok di gudang Lembang Anda cocok dengan spesifikasi kadar air < 12%.',
      actionLabel: 'Buka Bursa Biomassa',
      actionView: 'market' as const
    },
    {
      title: 'Rekomendasi Jalur Belajar Kapasitas Digital',
      targetRole: 'Petani',
      score: 92,
      category: 'Edukasi Mandiri',
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      recommendation: 'Berdasarkan data penjualan Anda, modul "Desain Branding & Kemasan Ramah Lingkungan" direkomendasikan untuk menaikkan harga jual produk olahan sebesar 25%.',
      actionLabel: 'Pelajari Modul Ini',
      actionView: 'edu' as const
    },
    {
      title: 'Proyek Hilirisasi Sesuai Profil Risiko Rendah',
      targetRole: 'Investor',
      score: 95,
      category: 'Smart Crowdfunding',
      icon: <Coins className="w-5 h-5 text-amber-500" />,
      recommendation: 'Pabrik Bio-Briket Sekam Subang telah terdanai 81% dengan kontrak offtaker ekspor 2 tahun. Estimasi ROI 16.5% p.a. dengan audit smart contract on-chain.',
      actionLabel: 'Lihat Proyek di AGROINVEST',
      actionView: 'invest' as const
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#14532D] via-emerald-800 to-slate-900 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AGROVERSE AI ENGINE • Model Gemini 2.5 Flash</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Sistem Rekomendasi Cerdas Agribisnis
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-4">
              Menghubungkan data hasil panen, kebutuhan bahan baku industri, profil risiko pendanaan, dan materi edukasi secara real-time.
            </p>

            <button
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRecalculating ? 'animate-spin' : ''}`} />
              <span>{isRecalculating ? 'Menghitung Ulang...' : 'Sinkronisasi Rekomendasi AI'}</span>
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-3 w-full md:w-auto">
            <AgroBotMascot pose="thinking" size="md" animated={false} />
            <div className="text-xs">
              <p className="font-extrabold text-lime-300">Si Agro AI Matchmaker</p>
              <p className="text-emerald-100 text-[11px]">Match Score Anda: 96.4%</p>
              <button
                onClick={() => setIsAgroBotOpen(true)}
                className="mt-1 text-[10px] text-amber-300 hover:underline font-bold"
              >
                Konsultasikan Detail →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Matchmaking Pillars Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiInsights.map((insight, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                  {insight.category}
                </span>
                <span className="text-xs font-extrabold text-amber-500 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  Match {insight.score}%
                </span>
              </div>

              <div className="flex items-center gap-2.5 my-2">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700">
                  {insight.icon}
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {insight.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                {insight.recommendation}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Target: <b>{insight.targetRole}</b>
              </span>
              <button
                onClick={() => setCurrentView(insight.actionView)}
                className="px-4 py-2 bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{insight.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Fresh Products Carousel */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Produk Tani Paling Relevan untuk Anda
            </h3>
            <p className="text-xs text-slate-400">Dipilih berdasarkan pola konsumsi pangan organik berkualitas</p>
          </div>
          <button
            onClick={() => setCurrentView('market')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Buka Katalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 flex gap-3 items-center"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white truncate">{p.name}</h4>
                <p className="text-emerald-600 font-extrabold mt-0.5">
                  Rp {p.price.toLocaleString('id-ID')}
                </p>
                <button
                  onClick={() => addToCart(p, 1)}
                  className="mt-1 text-[11px] font-bold text-[#14532D] dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  + Tambah Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
