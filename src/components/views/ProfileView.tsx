import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Coins,
  ShoppingBag,
  TrendingUp,
  Heart,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronUp,
  Trash2,
  ArrowRight,
  Sparkles,
  BarChart3,
  CreditCard,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { AgroBotMascot } from '../common/AgroBotMascot';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    updateCurrentUser,
    currentRole,
    switchRole,
    orders,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    setIsAuthModalOpen,
    setShowSplash
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'orders' | 'wishlist' | 'faq' | 'settings'>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [locationInput, setLocationInput] = useState(currentUser.location);
  const [bioInput, setBioInput] = useState(currentUser.bio);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: nameInput,
      location: locationInput,
      bio: bioInput
    });
    setIsEditingProfile(false);
    alert('Profil Anda berhasil diperbarui!');
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const faqs = [
    {
      q: 'Bagaimana sistem pembayaran escrow di AGROVERSE melindungi transaksi?',
      a: 'Dana pembayaran pembeli disimpan aman dalam smart escrow contract. Dana baru akan diteruskan ke saldo petani setelah produk panen sampai dengan kondisi segar dan diverifikasi oleh sistem kurir ekspedisi.'
    },
    {
      q: 'Apa perbedaan AGROVERSE dengan marketplace biasa?',
      a: 'AGROVERSE mengintegrasikan 4 pilar lengkap: Social Commerce (AGROFEED), Marketplace Produk & Hasil Samping (AGROMARKET), Pusat Edukasi Berbasis AI (AGROEDU), serta Pendanaan Pabrik Hilirisasi Berbasis Blockchain (AGROINVEST).'
    },
    {
      q: 'Bagaimana cara mitra industri mengajukan penawaran sourcing biomassa?',
      a: 'Mitra Industri dapat membuka menu AGROMARKET tab "Hasil Samping" untuk melihat stok sekam padi, ampas kopi, atau serat nanas, atau memasang kebutuhan pengadaan di tab "Permintaan Sourcing Industri B2B".'
    },
    {
      q: 'Apakah investasi di AGROINVEST memiliki jaminan keuntungan pasti?',
      a: 'Tidak. AGROINVEST menyalurkan pendanaan ke fasilitas fisik pengolahan bernilai tambah riil dengan skema bagi hasil laba (revenue sharing). Seluruh proyek diaudit transparan pada blockchain ledger, namun tetap memiliki risiko operasional dan pasar.'
    }
  ];

  // Visual Chart Data
  const monthlySalesData = [
    { month: 'Mei', sales: 24 },
    { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 28 },
    { month: 'Agu', sales: 41 },
    { month: 'Sep', sales: 38 },
    { month: 'Okt', sales: 48.5 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Header Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#14532D]"
              />
              <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-600 text-white shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {currentUser.name}
                </h1>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                  {currentUser.role}
                </span>
              </div>

              {currentUser.farmOrBusinessName && (
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {currentUser.farmOrBusinessName}
                </p>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg leading-relaxed">
                {currentUser.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.email}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer text-center"
            >
              {isEditingProfile ? 'Batal Edit' : 'Edit Biodata'}
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer text-center shadow-xs"
            >
              Ganti Akun Demo
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Perbarui Profil</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Lokasi Domisili / Kebun</label>
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Bio Singkat</label>
              <textarea
                rows={2}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </form>
        )}
      </div>

      {/* Profile Section Navigation Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Grafik & Statistik', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'orders', label: `Riwayat Transaksi (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'wishlist', label: `Wishlist Tersimpan (${wishlist.length})`, icon: <Heart className="w-4 h-4" /> },
          { id: 'faq', label: 'FAQ & Bantuan', icon: <HelpCircle className="w-4 h-4" /> },
          { id: 'settings', label: 'Pengaturan Akun', icon: <Settings className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveProfileTab(tab.id as any)}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeProfileTab === tab.id
                ? 'bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: OVERVIEW & ANALYTICS CHARTS */}
      {activeProfileTab === 'overview' && (
        <div className="space-y-6">
          {/* Sales / Performance Chart (Interactive SVG Bar Chart) */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>
                    {currentRole === 'Petani' && 'Grafik Penjualan Hasil Panen & Biomassa'}
                    {currentRole === 'Konsumen' && 'Grafik Pengeluaran Belanja Sehat'}
                    {currentRole === 'Mitra Industri' && 'Grafik Penyerapan Biomassa (Ton)'}
                    {currentRole === 'Investor' && 'Grafik Pertumbuhan Nilai Portofolio (Juta Rp)'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Data performa 6 bulan terakhir dengan estimasi proyeksi tren positif
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                Tren Naik +18.4%
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="space-y-2">
              <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100 dark:border-slate-700">
                {monthlySalesData.map((d, i) => {
                  const heightPercent = (d.sales / 55) * 100;
                  const isCurrent = i === monthlySalesData.length - 1;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Rp {d.sales} Jt
                      </span>
                      <div
                        className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 ${
                          isCurrent
                            ? 'bg-gradient-to-t from-emerald-700 to-lime-400 shadow-md'
                            : 'bg-emerald-200 dark:bg-emerald-950/60 hover:bg-emerald-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {d.month}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                <span>0 Juta Rp</span>
                <span>Satuan dalam Juta Rupiah (IDR)</span>
                <span>Puncak: Rp 48.5 Jt</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: TRANSACTIONS HISTORY */}
      {activeProfileTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 text-center">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                Belum Ada Riwayat Transaksi Selesai
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Lakukan checkout belanja di AGROMARKET untuk melihat riwayat pesanan escrow Anda.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700 text-xs">
                  <div>
                    <span className="font-mono font-bold text-emerald-600">{ord.id}</span>
                    <span className="text-slate-400 mx-2">•</span>
                    <span className="text-slate-500">{ord.date}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 w-fit">
                    {ord.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {item.quantity} x Rp {item.product.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        Rp {(item.quantity * item.product.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Metode: {ord.paymentMethod}</span>
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] block">Total Transaksi:</span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      Rp {ord.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB: WISHLIST */}
      {activeProfileTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 text-center">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                Wishlist Kosong
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Klik ikon hati pada produk di AGROMARKET untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-xs flex flex-col justify-between"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-36 rounded-2xl object-cover mb-3"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                      Rp {p.price.toLocaleString('id-ID')} / {p.unit}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="flex-1 py-1.5 rounded-xl bg-[#14532D] text-white font-bold text-xs hover:bg-emerald-800 cursor-pointer text-center"
                    >
                      Beli
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-red-500 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: FAQ & BANTUAN */}
      {activeProfileTab === 'faq' && (
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: PENGATURAN */}
      {activeProfileTab === 'settings' && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Pengaturan Aplikasi & Tampilan
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Putar Ulang Splash Screen</p>
                <p className="text-slate-400 text-[11px]">Tampilkan animasi pembuka branding AGROVERSE</p>
              </div>
              <button
                onClick={() => setShowSplash(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
              >
                Buka Splash Screen
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Notifikasi Pesanan & Transaksi</p>
                <p className="text-slate-400 text-[11px]">Terima notifikasi real-time saat pesanan diproses</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
