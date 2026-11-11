import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Recycle,
  Building2,
  Filter,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  Plus,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Info,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, ByproductListing, IndustrialDemand } from '../../types';

export const AgroMarketView: React.FC = () => {
  const {
    products,
    byproducts,
    industrialDemands,
    addToCart,
    searchQuery,
    setSearchQuery,
    currentUser,
    currentRole,
    setIsChatOpen,
    setActiveChatRecipient,
    sendChatMessage,
    addProduct,
    addByproduct
  } = useApp();

  const [activeMarketTab, setActiveMarketTab] = useState<'produce' | 'byproducts' | 'demands'>('produce');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedLocation, setSelectedLocation] = useState<string>('Semua');
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(150000);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedByproduct, setSelectedByproduct] = useState<ByproductListing | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddByproductModalOpen, setIsAddByproductModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [activeDemandForProposal, setActiveDemandForProposal] = useState<IndustrialDemand | null>(null);

  // New product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<any>('Sayur Segar');
  const [newProdPrice, setNewProdPrice] = useState(25000);
  const [newProdUnit, setNewProdUnit] = useState('1 kg');
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdOrganic, setNewProdOrganic] = useState(true);

  // New byproduct form
  const [newBpName, setNewBpName] = useState('');
  const [newBpRaw, setNewBpRaw] = useState('');
  const [newBpCapacity, setNewBpCapacity] = useState('20 Ton / Bulan');
  const [newBpStock, setNewBpStock] = useState(10);
  const [newBpPrice, setNewBpPrice] = useState(650000);
  const [newBpMoisture, setNewBpMoisture] = useState('< 12%');
  const [newBpPurity, setNewBpPurity] = useState('98% Bersih');
  const [newBpImage, setNewBpImage] = useState('');

  // Sourcing Proposal form
  const [proposalQuantity, setProposalQuantity] = useState('10 Ton / Bulan');
  const [proposalPrice, setProposalPrice] = useState('Rp 720.000 / Ton');
  const [proposalNote, setProposalNote] = useState('');
  const [proposalSuccess, setProposalSuccess] = useState(false);

  // Filter produce
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesLocation = selectedLocation === 'Semua' || p.location.includes(selectedLocation);
    const matchesOrganic = !onlyOrganic || p.isOrganic;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesLocation && matchesOrganic && matchesPrice;
  });

  // Filter byproducts
  const filteredByproducts = byproducts.filter((bp) => {
    const matchesSearch =
      bp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bp.rawMaterialType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleStartChatWithFarmer = (farmerName: string, product: Product) => {
    setActiveChatRecipient(farmerName);
    setIsChatOpen(true);
    sendChatMessage(`Halo ${farmerName}, saya tertarik menanyakan ketersediaan ${product.name}.`, {
      name: product.name,
      price: product.price,
      image: product.image
    });
    setSelectedProduct(null);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      unit: newProdUnit,
      stock: Number(newProdStock),
      minOrder: 1,
      location: currentUser.location,
      image: newProdImage || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      description: newProdDesc,
      isOrganic: newProdOrganic,
      certifications: newProdOrganic ? ['Organik Indonesia'] : ['Mutu Segar SNI'],
      shelfLife: '7 Hari'
    });
    setIsAddProductModalOpen(false);
  };

  const handleAddByproductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addByproduct({
      name: newBpName,
      rawMaterialType: newBpRaw,
      monthlyCapacity: newBpCapacity,
      availableStock: Number(newBpStock),
      unit: 'ton',
      pricePerUnit: Number(newBpPrice),
      location: currentUser.location,
      producerRole: currentUser.farmOrBusinessName || 'Kelompok Tani',
      moistureContent: newBpMoisture,
      purity: newBpPurity,
      image: newBpImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      potentialProducts: ['Bio-Briket', 'Biochar Organik'],
      minOrder: '1 Ton'
    });
    setIsAddByproductModalOpen(false);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSuccess(true);
    setTimeout(() => {
      setProposalSuccess(false);
      setIsProposalModalOpen(false);
      alert('Penawaran pasokan Anda berhasil dikirimkan ke Mitra Industri dengan pencatatan smart contract proposal!');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>AGROMARKET</span>
            <span className="text-xs bg-emerald-100 text-[#14532D] dark:bg-emerald-950 dark:text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              Digital Marketplace
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Perdagangan langsung Produk Pangan Segar & Hasil Samping Biomassa Pertanian
          </p>
        </div>

        {/* Action Button depending on active tab or role */}
        <div className="flex items-center gap-2">
          {activeMarketTab === 'produce' && currentRole === 'Petani' && (
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="px-3.5 py-2 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Panen</span>
            </button>
          )}

          {activeMarketTab === 'byproducts' && (
            <button
              onClick={() => setIsAddByproductModalOpen(true)}
              className="px-3.5 py-2 bg-lime-600 hover:bg-lime-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Listing Pasokan Biomassa</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Market Mode Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700">
        <button
          onClick={() => setActiveMarketTab('produce')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMarketTab === 'produce'
              ? 'bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>A. Produk Pertanian Segar ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveMarketTab('byproducts')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMarketTab === 'byproducts'
              ? 'bg-white dark:bg-slate-900 text-lime-700 dark:text-lime-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Recycle className="w-4 h-4" />
          <span>B. Hasil Samping Biomassa ({byproducts.length})</span>
        </button>

        <button
          onClick={() => setActiveMarketTab('demands')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMarketTab === 'demands'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>C. Permintaan Sourcing Industri ({industrialDemands.length})</span>
        </button>
      </div>

      {/* TAB A: PRODUK PERTANIAN */}
      {activeMarketTab === 'produce' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-1">
                {['Semua', 'Sayur Segar', 'Buah Organik', 'Kopi & Teh', 'Olahan Pangan', 'Hasil Samping'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#14532D] text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Organic only toggle */}
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyOrganic}
                  onChange={(e) => setOnlyOrganic(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Hanya Organik Bersertifikat</span>
              </label>
            </div>

            {/* Price & Location Secondary Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold shrink-0">Lokasi:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                >
                  <option value="Semua">Semua Wilayah Indonesia</option>
                  <option value="Lembang">Lembang / Bandung</option>
                  <option value="Cianjur">Cianjur</option>
                  <option value="Aceh">Aceh / Takengon</option>
                  <option value="Subang">Subang</option>
                  <option value="Sumbawa">Sumbawa NTB</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold shrink-0">Harga Maks:</span>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="flex-1 accent-emerald-600"
                />
                <span className="font-bold text-emerald-600 whitespace-nowrap">
                  Rp {maxPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex items-center justify-end text-slate-400">
                <span>Ditemukan: <b>{filteredProducts.length}</b> Produk</span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  {product.isOrganic && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                      100% Organik
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {product.rating} ({product.soldCount})
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-bold text-sm text-slate-900 dark:text-white mt-0.5 line-clamp-2 cursor-pointer hover:text-emerald-600 transition-colors"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate">{product.farmerName} • {product.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400">Harga per {product.unit}:</span>
                      <p className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStartChatWithFarmer(product.farmerName, product)}
                        title="Chat Petani"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        title="Beli / Tambah Keranjang"
                        className="p-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs"
                      >
                        <ShoppingBag className="w-4 h-4 text-lime-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB B: HASIL SAMPING PERTANIAN (BIOMASSA) */}
      {activeMarketTab === 'byproducts' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-lime-950 to-emerald-950 text-white rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-lime-400 text-xs font-bold mb-1">
                <Recycle className="w-4 h-4" />
                <span>Bursa Sourcing Bio-Biomassa Terpadu</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Pasokan Hasil Samping Pertanian Skala Industri
              </h3>
              <p className="text-xs text-emerald-200">
                Sekam padi, ampas kopi, serat nanas, dan kulit kakao dengan spesifikasi kadar air dan kapasitas terjamin.
              </p>
            </div>

            <button
              onClick={() => setIsAddByproductModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-500 text-[#14532D] font-extrabold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              + Pasang Listing Biomassa Tani
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredByproducts.map((bp) => (
              <div
                key={bp.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={bp.image}
                      alt={bp.name}
                      className="w-28 h-28 rounded-2xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-lime-700 dark:text-lime-300 bg-lime-100 dark:bg-lime-950/80 px-2 py-0.5 rounded-full">
                          Kapasitas: {bp.monthlyCapacity}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          Min: {bp.minOrder}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">
                        {bp.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {bp.producerName} ({bp.producerRole})
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{bp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specs Pill Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Kadar Air:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{bp.moistureContent}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Tingkat Kemurnian:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{bp.purity}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Potensi Nilai Tambah:</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {bp.potentialProducts.map((p, i) => (
                          <span key={i} className="text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-medium">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400">Harga Pasokan:</span>
                    <p className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                      Rp {bp.pricePerUnit.toLocaleString('id-ID')} / {bp.unit}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveChatRecipient(bp.producerName);
                      setIsChatOpen(true);
                      sendChatMessage(`Halo ${bp.producerName}, kami dari pihak industri ingin membahas kontrak pasokan rutin untuk ${bp.name}.`);
                    }}
                    className="px-4 py-2 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Hubungi & Buat Kontrak Pasokan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB C: PERMINTAAN SOURCING INDUSTRI (B2B DEMAND BOARD) */}
      {activeMarketTab === 'demands' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-950 to-indigo-950 text-white rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-300 text-xs font-bold mb-1">
                <Building2 className="w-4 h-4" />
                <span>Papan Pengadaan Bahan Baku Pabrik</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Kebutuhan Pasokan Rutin Mitra Industri
              </h3>
              <p className="text-xs text-purple-200">
                Pabrik mencari petani & penggilingan untuk pasokan berkala dengan garansi pembayaran tepat waktu.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {industrialDemands.map((demand) => (
              <div
                key={demand.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full">
                      {demand.companyName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Batas Pengajuan: {demand.deadline}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Dibutuhkan: {demand.materialNeeded}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400 text-[11px]">Jumlah:</span>{' '}
                      <b>{demand.quantityNeeded}</b>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Kisaran Harga:</span>{' '}
                      <b className="text-emerald-600">{demand.offeringPrice}</b>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Lokasi Gudang:</span>{' '}
                      <b>{demand.location}</b>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Spesifikasi: {demand.specs}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveDemandForProposal(demand);
                    setIsProposalModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap self-stretch md:self-auto text-center"
                >
                  Ajukan Penawaran Pasokan →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                {selectedProduct.category}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-56 rounded-2xl object-cover mb-4"
            />

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {selectedProduct.name}
            </h2>

            <div className="flex items-center justify-between my-2">
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                Rp {selectedProduct.price.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-normal text-slate-400">/ {selectedProduct.unit}</span>
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{selectedProduct.rating}</span>
                <span className="text-slate-400 font-normal">({selectedProduct.soldCount} Terjual)</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed my-3">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl mb-4 border border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-slate-400 text-[10px]">Petani / Kebun:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{selectedProduct.farmerName}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Lokasi Panen:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{selectedProduct.location}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Waktu Petik:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{selectedProduct.harvestDate || 'Hari Ini'}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Daya Simpan:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{selectedProduct.shelfLife || '7 Hari'}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStartChatWithFarmer(selectedProduct.farmerName, selectedProduct)}
                className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Penjual</span>
              </button>

              <button
                onClick={() => {
                  addToCart(selectedProduct, 1);
                  setSelectedProduct(null);
                }}
                className="flex-1 py-3 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-lime-400" />
                <span>Beli & Tambah Keranjang</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sourcing Proposal Modal (Petani -> Industri) */}
      {isProposalModalOpen && activeDemandForProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Ajukan Penawaran Pasokan Bahan Baku
              </h3>
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="p-1 rounded-full text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-100 dark:border-purple-800 mb-4 text-xs">
              <p className="font-bold text-purple-900 dark:text-purple-300">
                Penerima: {activeDemandForProposal.companyName}
              </p>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                Kebutuhan: {activeDemandForProposal.materialNeeded} ({activeDemandForProposal.quantityNeeded})
              </p>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kapasitas Pasokan yang Anda Tawarkan
                </label>
                <input
                  type="text"
                  required
                  value={proposalQuantity}
                  onChange={(e) => setProposalQuantity(e.target.value)}
                  placeholder="Contoh: 15 Ton / Bulan"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Harga Penawaran per Ton / Satuan
                </label>
                <input
                  type="text"
                  required
                  value={proposalPrice}
                  onChange={(e) => setProposalPrice(e.target.value)}
                  placeholder="Contoh: Rp 720.000 / Ton"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Kualitas & Waktu Pengiriman
                </label>
                <textarea
                  rows={3}
                  value={proposalNote}
                  onChange={(e) => setProposalNote(e.target.value)}
                  placeholder="Jelaskan kadar air, lokasi gudang, dan kesiapan armada truk..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#14532D] hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Kirim Penawaran Pasokan Resmi
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Product Modal (For Farmer) */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Tambah Produk Panen Baru
              </h3>
              <button onClick={() => setIsAddProductModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Contoh: Selada Keriting Hidroponik"
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Kategori</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="Sayur Segar">Sayur Segar</option>
                    <option value="Buah Organik">Buah Organik</option>
                    <option value="Rempah & Herbal">Rempah & Herbal</option>
                    <option value="Kopi & Teh">Kopi & Teh</option>
                    <option value="Olahan Pangan">Olahan Pangan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Satuan</label>
                  <input
                    type="text"
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    placeholder="1 kg / 500g"
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Stok Tersedia</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Keterangan mutu panen dan kesegaran..."
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#14532D] text-white font-bold rounded-xl mt-2 cursor-pointer"
              >
                Simpan & Tayangkan Produk
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Byproduct Listing Modal */}
      {isAddByproductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Pasang Listing Pasokan Biomassa / Hasil Samping
              </h3>
              <button onClick={() => setIsAddByproductModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddByproductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Nama Komoditas Biomassa</label>
                <input
                  type="text"
                  required
                  value={newBpName}
                  onChange={(e) => setNewBpName(e.target.value)}
                  placeholder="Contoh: Sekam Padi Kering Gilingan"
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Kapasitas Bulanan</label>
                  <input
                    type="text"
                    value={newBpCapacity}
                    onChange={(e) => setNewBpCapacity(e.target.value)}
                    placeholder="30 Ton / Bulan"
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Harga per Ton (Rp)</label>
                  <input
                    type="number"
                    value={newBpPrice}
                    onChange={(e) => setNewBpPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-xl mt-2 cursor-pointer"
              >
                Publikasikan ke Bursa Biomassa
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
