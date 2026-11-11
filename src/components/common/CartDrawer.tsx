import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderTransaction } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    checkoutCart,
    currentUser
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'AgroPay' | 'QRIS' | 'VA_BCA' | 'Transfer'>('AgroPay');
  const [shippingAddress, setShippingAddress] = useState(currentUser.location || 'Jl. Pertanian Modern No. 45, Jakarta Selatan');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderTransaction | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const shippingFee = cart.length > 0 ? 15000 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyVoucher = () => {
    if (discountCode.trim().toUpperCase() === 'PANENRAYA' || discountCode.trim().toUpperCase() === 'AGROVERSE') {
      setAppliedDiscount(10);
      alert('Voucher berhasil digunakan! Diskon 10% diterapkan.');
    } else {
      alert('Kode voucher tidak valid. Coba kode: PANENRAYA atau AGROVERSE');
    }
  };

  const handleProcessCheckout = () => {
    if (cart.length === 0) return;
    const order = checkoutCart(paymentMethod, shippingAddress);
    setLastOrder(order);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

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
                  <ShoppingBag className="w-5 h-5 text-lime-400" />
                  <h2 className="font-bold text-base">Keranjang Belanja Agroverse</h2>
                  <span className="text-xs bg-lime-400 text-[#14532D] font-extrabold px-2 py-0.5 rounded-full">
                    {cart.reduce((total, i) => total + i.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="font-semibold text-slate-600 dark:text-slate-300 text-base">
                      Keranjang Anda Masih Kosong
                    </p>
                    <p className="text-xs mt-1 text-slate-400 max-w-xs">
                      Temukan produk segar dan hasil panen terbaik langsung dari kebun petani di AGROMARKET.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-4 py-2 bg-[#14532D] text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      Mulai Belanja Produk Segar
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-18 h-18 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {item.product.farmerName} • {item.product.unit}
                            </p>
                            <p className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                              Rp {item.product.price.toLocaleString('id-ID')}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 bg-white dark:bg-slate-800">
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                  className="text-slate-500 hover:text-slate-700 p-0.5 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                  className="text-slate-500 hover:text-slate-700 p-0.5 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        Alamat Pengiriman
                      </div>
                      <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        placeholder="Masukkan alamat pengiriman..."
                      />
                    </div>

                    {/* Voucher Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Kode Voucher (PANENRAYA)"
                        className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase"
                      />
                      <button
                        onClick={handleApplyVoucher}
                        className="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Terapkan
                      </button>
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Metode Pembayaran (Escrow Terlindungi):
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'AgroPay', label: 'AgroPay Escrow', tag: 'Cepat & Bebas Biaya' },
                          { id: 'QRIS', label: 'QRIS Standar', tag: 'Semua Bank/E-Wallet' },
                          { id: 'VA_BCA', label: 'Virtual Account', tag: 'BCA / Mandiri / BRI' },
                          { id: 'Transfer', label: 'Bank Transfer', tag: 'Konfirmasi Manual' }
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setPaymentMethod(m.id as any)}
                            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                              paymentMethod === m.id
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 font-semibold'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                            }`}
                          >
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {m.label}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {m.tag}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal Produk</span>
                      <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>Diskon ({appliedDiscount}%)</span>
                        <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Ongkos Kirim Kurir Tani Dingin</span>
                      <span>Rp {shippingFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-1.5 border-t border-slate-200 dark:border-slate-800">
                      <span>Total Pembayaran</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Rp {grandTotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Dana disimpan aman di Smart Escrow hingga barang diterima segar.</span>
                  </div>

                  <button
                    onClick={handleProcessCheckout}
                    className="w-full py-3 bg-gradient-to-r from-[#14532D] to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Bayar Sekarang (Rp {grandTotal.toLocaleString('id-ID')})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Checkout Success Receipt Modal */}
      {isSuccessModalOpen && lastOrder && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Pesanan Berhasil Dibuat!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Nomor Pesanan: <span className="font-mono font-bold text-emerald-600">{lastOrder.id}</span>
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 my-4 text-left text-xs space-y-2 border border-slate-200/60 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Dibayar:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  Rp {lastOrder.totalAmount.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Metode:</span>
                <span className="font-bold text-emerald-600">{lastOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Resi Pengiriman:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{lastOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Escrow:</span>
                <span className="text-emerald-600 font-bold">Tercatat di Blockchain</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                setIsCartOpen(false);
              }}
              className="w-full py-2.5 bg-[#14532D] text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer text-xs"
            >
              Tutup & Lacak Pesanan
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};
