import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Bot, CornerDownLeft, RefreshCw, Lightbulb, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgroBotMascot } from './AgroBotMascot';

interface Message {
  role: 'user' | 'model';
  content: string;
  source?: string;
}

export const AgroBotAssistantModal: React.FC = () => {
  const { isAgroBotOpen, setIsAgroBotOpen, currentRole, currentUser } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `Halo ${currentUser.name}! Saya **Si Agro** 🤖🌾, asisten AI digital Anda di AGROVERSE.\n\nSaya dapat membantu konsultasi seputar:\n- 📈 Strategi pemasaran hasil panen & penetapan harga optimal\n- ♻️ Pemanfaatan hasil samping (sekam padi, ampas kopi, serat nanas)\n- 🏷️ Desain kemasan ramah lingkungan & sertifikasi organik\n- ⛓️ Analisis pendanaan proyek agroindustri di AGROINVEST\n\nAda yang ingin Anda tanyakan atau diskusikan hari ini?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Bagaimana cara mengolah sekam padi jadi bio-briket ekspor?',
    'Tips foto hasil panen agar laris di AGROFEED?',
    'Berapa potensi bagi hasil proyek biomassa di AGROINVEST?',
    'Bagaimana kemasan ramah lingkungan untuk sayur organik?'
  ];

  useEffect(() => {
    if (isAgroBotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAgroBotOpen]);

  if (!isAgroBotOpen) return null;

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const newMsgs: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs,
          userRole: currentRole,
          userName: currentUser.name
        })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: data.reply || 'Maaf, terjadi kendala saat memproses jawaban. Silakan ulangi pertanyaan Anda.',
          source: data.source
        }
      ]);
    } catch {
      // Fallback response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            content: `Terima kasih pertanyaannya! Berdasarkan basis pengetahuan cerdas AGROVERSE untuk **${currentRole}**:\n\n1. **Optimasi Rantai Pasok**: Gunakan fitur **AGROMARKET** untuk menghubungkan produk segar ke konsumen dan hasil samping ke mitra industri terdekat.\n2. **Peningkatan Nilai Tambah**: Hasil samping seperti sekam padi dan ampas kopi memiliki nilai ekonomi hingga 4x lipat jika diolah menjadi briket atau bio-kompos.\n3. **Pendanaan Terdesentralisasi**: Ajukan proposal fasilitas pengolahan Anda di **AGROINVEST** untuk mendapatkan dukungan modal dengan smart contract blockchain.`,
            source: 'simulated_ai_fallback'
          }
        ]);
        setLoading(false);
      }, 700);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          className="relative w-full max-w-xl h-[88vh] sm:h-[680px] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#14532D] via-emerald-800 to-[#14532D] p-4 text-white flex items-center justify-between border-b border-emerald-700/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AgroBotMascot pose="laptop" size="sm" animated={false} />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-lime-400 border-2 border-[#14532D] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base">Si Agro — AI Consultant</h3>
                  <span className="text-[10px] bg-lime-400/20 text-lime-300 border border-lime-400/30 px-2 py-0.5 rounded-full font-medium">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200">
                  Konsultasi Agribisnis, Bio-Economy & Blockchain
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([{
                  role: 'model',
                  content: `Halo ${currentUser.name}! Obrolan baru dimulai. Ada topik pertanian atau investasi yang ingin Anda tanyakan ke Si Agro?`
                }])}
                title="Reset Obrolan"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAgroBotOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/50 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1 shrink-0 pl-1">
              <Lightbulb className="w-3 h-3 text-amber-500" /> Tanya Cepat:
            </span>
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="text-xs bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800 whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
              const isModel = msg.role === 'model';
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${isModel ? 'justify-start' : 'justify-end'}`}
                >
                  {isModel && (
                    <div className="shrink-0 mt-1">
                      <AgroBotMascot pose="thumbs_up" size="sm" animated={false} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isModel
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700'
                        : 'bg-gradient-to-r from-[#14532D] to-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line font-normal">{msg.content}</div>

                    {isModel && msg.source && (
                      <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Bot className="w-3 h-3 text-emerald-500" />
                          {msg.source === 'gemini_2.5_flash' ? 'Powered by Gemini 2.5 AI' : 'AGROVERSE AI Engine'}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-lime-500" /> Terverifikasi Agrotech
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 items-center text-slate-500 text-xs py-2">
                <AgroBotMascot pose="thinking" size="sm" animated={false} />
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 ml-1">Si Agro sedang merumuskan solusi...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan apa saja seputar pertanian cerdas & bisnis..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-4 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">Kirim</span>
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>Konsultasi agribisnis gratis untuk seluruh ekosistem</span>
              <span>Tekan Enter ↵ untuk mengirim</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
