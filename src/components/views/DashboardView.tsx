import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Recycle,
  Coins,
  Compass,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Star,
  MapPin,
  Flame,
  Award,
  Layers,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgroBotMascot } from '../common/AgroBotMascot';
import { Product, ByproductListing, InvestmentProject } from '../../types';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    currentRole,
    products,
    byproducts,
    investmentProjects,
    setCurrentView,
    addToCart,
    setIsAgroBotOpen,
    setIsEcosystemModalOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  // Role-specific statistics and widgets
  const renderRoleStats = () => {
    switch (currentRole) {
      case 'Petani':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
                <span>Total Omzet Panen</span>
                <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600">Rp</span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Rp {(currentUser.stats?.totalSales || 48500000).toLocaleString('id-ID')}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18.4% vs bulan lalu</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
                <span>Produk Aktif</span>
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentUser.stats?.activeProducts || 9} Produk
              </p>
              <span className="text-[11px] text-slate-400">Siap panen & dipesan</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
                <span>Hasil Samping Terserap</span>
                <Recycle className="w-4 h-4 text-lime-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentUser.stats?.byproductsSupplied || 45} Ton
              </p>
              <span className="text-[11px] text-lime-600 font-bold">Sekam & Ampas Padi</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
                <span>Saldo AgroPay</span>
                <Coins className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                Rp {currentUser.walletBalance.toLocaleString('id-ID')}
              </p>
              <span className="text-[11px] text-slate-400">Dapat ditarik ke bank kapan saja</span>
            </div>
          </div>
        );

      case 'Konsumen':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Total Belanja Sehat</span>
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentUser.stats?.totalOrders || 28} Pesanan
              </p>
              <span className="text-[11px] text-emerald-600 font-bold">100% Petani Lokal</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Saldo AgroPay</span>
                <Coins className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                Rp {currentUser.walletBalance.toLocaleString('id-ID')}
              </p>
              <span className="text-[11px] text-slate-400">Siap dipakai checkout</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Petani Favorit</span>
                <Star className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                12 Mitra
              </p>
              <span className="text-[11px] text-slate-400">Langganan sayur segar mingguan</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Dampak Karbon Terhemat</span>
                <Recycle className="w-4 h-4 text-lime-500" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-lime-600">
                142 kg CO₂e
              </p>
              <span className="text-[11px] text-lime-600 font-semibold">Zero food waste</span>
            </div>
          </div>
        );

      case 'Mitra Industri':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Total Sourcing Biomassa</span>
                <Recycle className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentUser.stats?.byproductsSupplied || 240} Ton
              </p>
              <span className="text-[11px] text-emerald-600 font-bold">Sekam, Serat Nanas & Kakao</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Proyek Aktif Didanai</span>
                <Layers className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentUser.stats?.activeProjects || 3} Pabrik
              </p>
              <span className="text-[11px] text-purple-600 font-bold">Didukung 400+ Investor</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Kelompok Tani Mitra</span>
                <ShieldCheck className="w-4 h-4 text-lime-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                38 Poktan
              </p>
              <span className="text-[11px] text-slate-400">Kontrak pasokan smart contract</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Saldo Kas Industri</span>
                <Coins className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                Rp {(currentUser.walletBalance).toLocaleString('id-ID')}
              </p>
              <span className="text-[11px] text-slate-400">Alokasi escrow sourcing</span>
            </div>
          </div>
        );

      case 'Investor':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Portofolio Terdanai</span>
                <Coins className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Rp {(currentUser.stats?.investedAmount || 85000000).toLocaleString('id-ID')}
              </p>
              <span className="text-[11px] text-emerald-600 font-bold">4 Proyek Bio-Hilirisasi</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Estimasi ROI Rata-rata</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">
                16.8% p.a.
              </p>
              <span className="text-[11px] text-slate-400">Pembayaran dividen kuartalan</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Smart Contract Audit</span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-purple-600">
                100% On-Chain
              </p>
              <span className="text-[11px] text-slate-400">Ledger audit publik tanpa perantara</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Saldo Dompet Tersedia</span>
                <Coins className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Rp {currentUser.walletBalance.toLocaleString('id-ID')}
              </p>
              <span className="text-[11px] text-slate-400">Siap dialokasikan ke proyek baru</span>
            </div>
          </div>
        );
    }
  };

  const categories = [
    { name: 'Sayur Segar', icon: '🥬', count: '140+ Produk' },
    { name: 'Buah Organik', icon: '🍎', count: '95+ Produk' },
    { name: 'Rempah & Herbal', icon: '🌿', count: '60+ Produk' },
    { name: 'Kopi & Teh', icon: '☕', count: '85+ Produk' },
    { name: 'Olahan Pangan', icon: '🍯', count: '120+ Produk' },
    { name: 'Hasil Samping', icon: '♻️', count: '45+ Biomassa' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner with Greeting, Branding & Interactive Mascot */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#14532D] via-[#1b6437] to-[#0f3d21] text-white p-6 sm:p-8 shadow-xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-lime-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ekosistem Agribisnis Masa Depan • Berbasis AI & Blockchain</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
              Selamat Datang, {currentUser.name}! 🌾
            </h1>

            <p className="text-sm text-emerald-100 leading-relaxed mb-4">
              {currentRole === 'Petani' &&
                'Tingkatkan kapasitas digital kebun Anda, jual hasil panen langsung tanpa tengkulak, dan ciptakan cuan dari hasil samping biomassa.'}
              {currentRole === 'Konsumen' &&
                'Dapatkan sayur dan buah organik langsung dari kelompok tani terverifikasi dengan jaminan kesegaran dan harga jujur.'}
              {currentRole === 'Mitra Industri' &&
                'Akses pasokan hasil samping pertanian terstandarisasi (sekam, ampas kopi, serat nanas) untuk industri bio-sirkular Anda.'}
              {currentRole === 'Investor' &&
                'Danai fasilitas pengolahan dan hilirisasi biomassa pertanian bernilai tambah tinggi dengan transparansi smart contract blockchain.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentView('market')}
                className="px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-500 text-[#14532D] font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Jelajahi AGROMARKET</span>
              </button>

              <button
                onClick={() => setCurrentView('feed')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-lime-300" />
                <span>Nonton AGROFEED</span>
              </button>

              <button
                onClick={() => setIsEcosystemModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-600/50 text-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Alur Ekosistem</span>
              </button>
            </div>
          </div>

          {/* Interactive Mascot Calling Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => setIsAgroBotOpen(true)}
            className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex md:flex-col items-center gap-3 cursor-pointer shadow-lg hover:border-lime-400 transition-colors"
          >
            <AgroBotMascot
              pose="thumbs_up"
              size="lg"
              speechBubble="Ada yang bisa kubantu?"
              animated={false}
            />
            <div className="text-left md:text-center">
              <p className="font-extrabold text-xs text-lime-300">Si Agro (AI Assistant)</p>
              <p className="text-[11px] text-emerald-200">Klik untuk konsultasi gratis</p>
              <span className="inline-block mt-1 text-[10px] bg-lime-400 text-[#14532D] font-bold px-2 py-0.5 rounded-full">
                Chat Sekarang
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Role-Specific Statistics Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Ringkasan Aktivitas ({currentRole})</span>
            <span className="text-xs font-normal text-slate-400">• Real-Time</span>
          </h2>
          <button
            onClick={() => setCurrentView('profile')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            Lihat Laporan Lengkap <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {renderRoleStats()}
      </div>

      {/* Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
            Kategori Komoditas & Biomassa
          </h2>
          <button
            onClick={() => setCurrentView('market')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Semua Kategori →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentView('market')}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                {cat.name}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Smart Recommendation Showcase */}
      <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-emerald-50 via-white to-lime-50/50 dark:from-slate-800/80 dark:via-slate-900 dark:to-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-600 text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                Rekomendasi Cerdas Artificial Intelligence
                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  Skor Match 96%
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Disesuaikan dengan preferensi {currentRole} dan tren agribisnis saat ini
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('ai-hub')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Buka AI Matchmaking Hub <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recommended Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-emerald-700 dark:text-emerald-400 backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" /> AI Pick
                </span>
                {product.isOrganic && (
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                    Organik
                  </span>
                )}
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{product.location}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400">Harga:</span>
                    <p className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white transition-colors cursor-pointer"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Agricultural Byproducts Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Recycle className="w-5 h-5 text-lime-600" />
              <span>Bursa Hasil Samping Pertanian (Bio-Biomassa)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ubah sekam, ampas kopi, dan serat nanas menjadi komoditas industri bernilai tambah
            </p>
          </div>
          <button
            onClick={() => setCurrentView('market')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Lihat Semua Pasokan →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {byproducts.slice(0, 2).map((bp) => (
            <div
              key={bp.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-4"
            >
              <img
                src={bp.image}
                alt={bp.name}
                className="w-full sm:w-36 h-36 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-lime-700 dark:text-lime-300 bg-lime-100 dark:bg-lime-950/80 px-2 py-0.5 rounded-full">
                      Kapasitas: {bp.monthlyCapacity}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      Rp {bp.pricePerUnit.toLocaleString('id-ID')} / {bp.unit}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                    {bp.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {bp.producerName} • {bp.location}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {bp.potentialProducts.map((pp, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                    >
                      {pp}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentView('market')}
                  className="mt-3 w-full py-1.5 rounded-xl border border-emerald-600 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors text-center cursor-pointer"
                >
                  Ajukan Pasokan / Permintaan Sourcing
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Blockchain Project (AGROINVEST) */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>AGROINVEST • Smart Contract Crowdfunding</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Pabrik Bio-Briket & Karbon Aktif Sekam Padi Modern
            </h3>
            <p className="text-xs text-emerald-200 leading-relaxed mb-4">
              Mendanai pembangunan fasilitas konversi 150 Ton/bulan limbah sekam padi Subang menjadi briket ramah lingkungan bersertifikasi ekspor.
            </p>
            <div className="flex items-center gap-6 text-xs mb-4">
              <div>
                <span className="text-slate-400 text-[11px]">Terkumpul</span>
                <p className="text-base font-extrabold text-lime-400">Rp 532.000.000</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Target ROI</span>
                <p className="text-base font-extrabold text-amber-400">15.5% - 18.2% p.a.</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Smart Contract</span>
                <p className="text-xs font-mono text-emerald-300">0x7F9a...E98b (Audited)</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => setCurrentView('invest')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-[#14532D] font-extrabold text-xs shadow-lg transition-all cursor-pointer text-center"
            >
              Danai Proyek Ini via Blockchain
            </button>
            <button
              onClick={() => setCurrentView('invest')}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Pelajari Analisis Risiko
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
