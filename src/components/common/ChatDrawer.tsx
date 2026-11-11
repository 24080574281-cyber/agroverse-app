import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageCircle, UserCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatDrawer: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    activeChatRecipient,
    currentUser
  } = useApp();

  const [input, setInput] = useState('');

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input);
    setInput('');
  };

  const quickReplies = [
    'Apakah stok ready untuk pengiriman besok pagi?',
    'Bisa nego harga untuk pembelian grosir 20kg?',
    'Apakah tomat cherrynya 100% bebas pestisida?'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={() => setIsChatOpen(false)} />

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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700/80 border border-emerald-400 flex items-center justify-center font-bold text-sm">
                  🌾
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm">{activeChatRecipient}</h3>
                    <UserCheck className="w-3.5 h-3.5 text-lime-400" />
                  </div>
                  <p className="text-[11px] text-emerald-200">
                    Petani Terverifikasi • Membalas &lt; 5 menit
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trust disclaimer */}
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/50 flex items-center gap-2 text-[10px] text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Gunakan chat untuk konfirmasi spesifikasi panen dan penawaran bahan baku.</span>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-slate-400 mb-1 px-1">
                      {isUser ? 'Anda' : msg.senderName} • {msg.timestamp}
                    </span>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#14532D] text-white rounded-br-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/60 dark:border-slate-700'
                      }`}
                    >
                      {msg.attachedProduct && (
                        <div className="mb-2 p-2 bg-white/10 rounded-xl flex items-center gap-2 border border-white/20">
                          <img
                            src={msg.attachedProduct.image}
                            alt={msg.attachedProduct.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="text-left text-[11px]">
                            <p className="font-bold">{msg.attachedProduct.name}</p>
                            <p className="text-emerald-300 font-semibold">
                              Rp {msg.attachedProduct.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      )}
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick replies */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => sendChatMessage(qr)}
                  className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pesan ke petani..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 disabled:opacity-50 text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
