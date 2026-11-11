import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Award,
  Sparkles,
  Bot,
  Play,
  CheckCircle2,
  Clock,
  ChevronRight,
  Download,
  Share2,
  X,
  ShieldCheck,
  Lightbulb,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EduModule } from '../../types';
import { AgroBotMascot } from '../common/AgroBotMascot';

export const AgroEduView: React.FC = () => {
  const {
    eduModules,
    toggleCompleteModule,
    claimCertificate,
    certificateModalModule,
    setCertificateModalModule,
    setIsAgroBotOpen,
    currentUser
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeReadingModule, setActiveReadingModule] = useState<EduModule | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const categories = [
    'Semua',
    'Pemasaran & Branding',
    'Pengolahan Hasil Samping',
    'Manajemen Finansial'
  ];

  const filteredModules = eduModules.filter((m) => {
    if (selectedCategory === 'Semua') return true;
    return m.category === selectedCategory;
  });

  const completedCount = eduModules.filter(m => m.isCompleted).length;
  const progressPercent = Math.round((completedCount / eduModules.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#14532D] via-emerald-800 to-[#0e3b20] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-lime-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AGROEDU • AI Farmer Academy</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Pusat Edukasi & Asisten AI Agribisnis
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-4">
            Tingkatkan kapasitas digital usaha tani Anda: dari strategi kemasan ramah lingkungan, pengolahan sekam menjadi briket ekspor, hingga manajemen keuangan tangguh.
          </p>

          {/* Progress Tracker Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 max-w-sm">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span>Progres Belajar Anda:</span>
              <span className="text-lime-300">{completedCount} dari {eduModules.length} Modul Selesai ({progressPercent}%)</span>
            </div>
            <div className="h-2 bg-emerald-950/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-lime-400 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mascot AI Consultation Card */}
        <div
          onClick={() => setIsAgroBotOpen(true)}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col items-center text-center cursor-pointer transition-all hover:scale-105 shadow-md shrink-0 w-full md:w-56"
        >
          <AgroBotMascot pose="laptop" size="md" speechBubble="Tanya Konsultasi!" animated={false} />
          <h4 className="font-extrabold text-xs text-lime-300 mt-2">
            Konsultasi AI Si Agro
          </h4>
          <p className="text-[11px] text-emerald-200 mt-0.5">
            Tanya strategi bisnis tani Anda 24/7
          </p>
          <span className="mt-2 text-[10px] bg-lime-400 text-[#14532D] font-bold px-3 py-1 rounded-full">
            Mulai Tanya AI 🤖
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#14532D] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative">
                <img
                  src={module.thumbnail}
                  alt={module.title}
                  className="w-full h-44 object-cover"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-lime-400" />
                  {module.duration}
                </span>

                {module.isCompleted && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Selesai
                  </span>
                )}
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {module.category} • Tingkat {module.difficulty}
                </span>

                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-1 leading-snug">
                  {module.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {module.summary}
                </p>

                {/* Key Takeaways */}
                <div className="mt-3 space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs">
                  <span className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
                    Poin Kunci Pembelajaran:
                  </span>
                  {module.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-200 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveReadingModule(module);
                  setActiveChapterIndex(0);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Pelajari Modul</span>
              </button>

              {module.isCompleted ? (
                <button
                  onClick={() => claimCertificate(module.id)}
                  className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Unduh Sertifikat Digital"
                >
                  <Award className="w-4 h-4" />
                  <span>Sertifikat</span>
                </button>
              ) : (
                <button
                  onClick={() => toggleCompleteModule(module.id)}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                  title="Tandai Selesai"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reading Module Drawer / Reader Modal */}
      {activeReadingModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">
                  {activeReadingModule.category}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {activeReadingModule.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveReadingModule(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapter Tabs */}
            <div className="flex gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-slate-100 dark:border-slate-800">
              {activeReadingModule.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    activeChapterIndex === idx
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  Bab {idx + 1}
                </button>
              ))}
            </div>

            {/* Chapter Reading Content */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                {activeReadingModule.chapters[activeChapterIndex]?.title}
              </h4>
              <p className="whitespace-pre-line">
                {activeReadingModule.chapters[activeChapterIndex]?.content}
              </p>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                <AgroBotMascot pose="thinking" size="sm" animated={false} />
                <div className="text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">
                    Diskusi bersama Si Agro:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Punya pertanyaan mengenai bab ini? Buka asisten AI untuk konsultasi penerapan di kebun Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
              >
                ← Bab Sebelumnya
              </button>

              {activeChapterIndex < activeReadingModule.chapters.length - 1 ? (
                <button
                  onClick={() => setActiveChapterIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-[#14532D] text-white text-xs font-bold hover:bg-emerald-800 cursor-pointer"
                >
                  Bab Selanjutnya →
                </button>
              ) : (
                <button
                  onClick={() => {
                    toggleCompleteModule(activeReadingModule.id);
                    claimCertificate(activeReadingModule.id);
                    setActiveReadingModule(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Award className="w-4 h-4" />
                  <span>Selesaikan & Klaim Sertifikat</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Digital Certificate Modal */}
      {certificateModalModule && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center relative overflow-hidden"
          >
            <button
              onClick={() => setCertificateModalModule(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <img
                src="/assets/aistudio/Agroverse_Leaf_Logo_5c2e4682.png"
                alt="Agroverse"
                className="w-10 h-10 object-contain"
              />
              <span className="font-extrabold text-xl tracking-tight text-[#14532D] dark:text-emerald-400">
                AGROVERSE ACADEMY
              </span>
            </div>

            <p className="text-[10px] uppercase tracking-widest font-extrabold text-amber-600 mb-4">
              SERTIFIKAT KELULUSAN KOMPETENSI DIGITAL AGRIBISNIS
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">Diberikan secara resmi kepada:</p>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white my-1 border-b pb-2 inline-block border-slate-200 dark:border-slate-700 min-w-[240px]">
              {currentUser.name}
            </h2>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-4">
              {currentUser.role} ({currentUser.farmOrBusinessName || currentUser.location})
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
              Atas keberhasilan menyelesaikan seluruh modul pelatihan praktis dan uji pemahaman pada topik:
              <br />
              <b className="text-slate-900 dark:text-white text-sm">
                "{certificateModalModule.title}"
              </b>
            </p>

            {/* Certificate Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
              <div className="text-left">
                <span className="text-slate-400 text-[10px] block">Kode Verifikasi Blockchain:</span>
                <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  0xAGRO-CERT-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Tanggal Penerbitan:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('Sertifikat digital berhasil diunduh dalam format PDF resmi ber-barcode verifikasi!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Sertifikat PDF</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(window.location.href);
                  alert('Tautan kredensial sertifikat berhasil disalin ke clipboard!');
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
