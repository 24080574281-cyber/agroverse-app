import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  ShieldCheck,
  Coins,
  Cpu,
  Layers,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building,
  DollarSign,
  PieChart,
  X,
  ExternalLink,
  Lock,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InvestmentProject, BlockchainTransaction } from '../../types';

export const AgroInvestView: React.FC = () => {
  const {
    investmentProjects,
    blockchainRecords,
    fundProject,
    currentUser,
    currentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'blockchain_ledger' | 'my_investments'>('projects');
  const [selectedProject, setSelectedProject] = useState<InvestmentProject | null>(null);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [targetProjectToFund, setTargetProjectToFund] = useState<InvestmentProject | null>(null);
  const [fundingNominal, setFundingNominal] = useState<number>(2000000); // 2 Juta default
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isTxExecuting, setIsTxExecuting] = useState(false);

  const handleOpenFundingModal = (proj: InvestmentProject) => {
    setTargetProjectToFund(proj);
    setFundingNominal(proj.minInvestment);
    setIsFundingModalOpen(true);
  };

  const handleExecuteFunding = () => {
    if (!targetProjectToFund) return;
    if (!agreeTerms) {
      alert('Mohon setujui lembar analisis risiko dan kepatuhan smart contract terlebih dahulu.');
      return;
    }

    setIsTxExecuting(true);
    setTimeout(() => {
      const success = fundProject(targetProjectToFund.id, fundingNominal);
      setIsTxExecuting(false);
      if (success) {
        setIsFundingModalOpen(false);
      }
    }, 1200);
  };

  // ROI Calculator estimates
  const calculateEstimatedReturn = (nominal: number) => {
    const rate = 0.165; // ~16.5% p.a.
    const annual = Math.round(nominal * rate);
    const quarterly = Math.round(annual / 4);
    return { annual, quarterly };
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#14532D] to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AGROINVEST • Blockchain Bio-Economy Crowdfunding</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Pendanaan Proyek Hilirisasi & Nilai Tambah Pertanian
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-4">
            Danai fasilitas pabrik bio-briket, ekstraksi serat tekstil daun nanas, dan pengolahan limbah biomassa. Seluruh aliran dana terekam transparan dalam smart contract terverifikasi.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-lime-300">
              <Lock className="w-3.5 h-3.5" />
              <span>Smart Contract Audited</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>Zero Gas Fee Layer-2</span>
            </div>
          </div>
        </div>

        {/* User Balance Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 w-full md:w-64 shrink-0 shadow-md">
          <span className="text-[11px] text-emerald-200">Saldo AgroPay Anda:</span>
          <p className="text-xl font-extrabold text-lime-300 my-1">
            Rp {currentUser.walletBalance.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-slate-300 block">
            Peran: <b className="text-white">{currentRole}</b>
          </span>
          <button
            onClick={() => setActiveTab('my_investments')}
            className="mt-3 w-full py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer text-center"
          >
            Lihat Portofolio Saya
          </button>
        </div>
      </div>

      {/* Risk & Compliance Disclaimer Banner (Crucial Requirement) */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Peringatan Risiko & Kepatuhan Regulasi:</span> Seluruh proyek pendanaan adalah untuk pengembangan fasilitas dan pabrik pengolahan bernilai tambah (bukan instrumen spekulasi komoditas mentah). Imbal hasil didasarkan pada skema bagi hasil keuntungan riil (revenue sharing) sesuai perjanjian smart contract dan bukan bunga tetap yang dijamin. Seluruh proyek telah lolos verifikasi legalitas dan analisis kelayakan teknis.
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('projects')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Daftar Proyek Pengolahan ({investmentProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('blockchain_ledger')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'blockchain_ledger'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Blockchain Explorer & Ledger On-Chain</span>
        </button>

        <button
          onClick={() => setActiveTab('my_investments')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'my_investments'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Dashboard Investor Saya</span>
        </button>
      </div>

      {/* TAB 1: DAFTAR PROYEK */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {investmentProjects.map((proj) => {
              const fundingPercent = Math.min(
                100,
                Math.round((proj.collectedFunding / proj.targetFunding) * 100)
              );
              return (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                        {proj.category}
                      </span>
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-3 h-3" /> {proj.smartContractStatus}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {proj.tagline}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 my-3">
                        <img
                          src={proj.managerAvatar}
                          alt={proj.managerName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="truncate">{proj.managerCompany}</span>
                      </div>

                      {/* Funding Progress Bar */}
                      <div className="space-y-1.5 my-3">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-700 dark:text-slate-300">
                            Rp {proj.collectedFunding.toLocaleString('id-ID')}
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400">{fundingPercent}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-lime-500 to-emerald-600 rounded-full"
                            style={{ width: `${fundingPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Target: Rp {proj.targetFunding.toLocaleString('id-ID')}</span>
                          <span>{proj.investorsCount} Investor</span>
                        </div>
                      </div>

                      {/* ROI & Key Terms Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Estimasi Bagi Hasil:</span>
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                            {proj.estimatedRoi}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Periode Proyek:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {proj.projectDuration}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Pembayaran Dividen:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {proj.payoutFrequency}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Tingkat Risiko:</span>
                          <span className={`font-bold ${
                            proj.riskLevel === 'Rendah' ? 'text-emerald-600' : 'text-amber-500'
                          }`}>
                            {proj.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="p-5 pt-0 flex gap-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer text-center"
                    >
                      Lihat Detail Proyek
                    </button>

                    <button
                      onClick={() => handleOpenFundingModal(proj)}
                      className="flex-1 py-2.5 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer text-center shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Coins className="w-3.5 h-3.5 text-lime-400" />
                      <span>Danai Proyek</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BLOCKCHAIN EXPLORER */}
      {activeTab === 'blockchain_ledger' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 text-white rounded-3xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-lime-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base">
                  Agroverse Smart Contract Ledger (Immutable Explorer)
                </h3>
                <p className="text-xs text-slate-400">
                  Transparansi audit on-chain untuk pendanaan fasilitas pengolahan, escrow supply, dan pembayaran dividen
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800 hidden sm:inline">
              Mainnet Height: #19482150
            </span>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4 font-bold">Transaction Hash</th>
                    <th className="py-3 px-4 font-bold">Tipe Operasi</th>
                    <th className="py-3 px-4 font-bold">Dari (From)</th>
                    <th className="py-3 px-4 font-bold">Smart Contract Tujuan</th>
                    <th className="py-3 px-4 font-bold">Nominal (IDR)</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono">
                  {blockchainRecords.map((record, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[140px]">
                        {record.hash.substring(0, 16)}...
                      </td>
                      <td className="py-3 px-4 font-sans font-bold text-slate-800 dark:text-slate-200">
                        {record.type}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 truncate max-w-[120px]">
                        {record.from}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 truncate max-w-[140px]">
                        {record.smartContract}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-sans">
                        Rp {record.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DASHBOARD INVESTOR SAYA */}
      {activeTab === 'my_investments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <span className="text-xs text-slate-400">Total Nilai Investasi Aktif</span>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Rp {(currentUser.stats?.investedAmount || 85000000).toLocaleString('id-ID')}
              </p>
              <span className="text-[11px] text-emerald-600 font-bold">Terdiversifikasi di 4 Proyek</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <span className="text-xs text-slate-400">Total Dividen Diterima</span>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                Rp 14.850.000
              </p>
              <span className="text-[11px] text-slate-400">Otomatis cair ke saldo AgroPay</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <span className="text-xs text-slate-400">Jadwal Dividen Berikutnya</span>
              <p className="text-2xl font-extrabold text-amber-500 mt-1">
                15 Hari Lagi
              </p>
              <span className="text-[11px] text-slate-400">Pabrik Bio-Briket Sekam Padi</span>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mb-3">
              Kepemilikan Tokenized Shares Proyek Anda
            </h3>

            <div className="space-y-3">
              {investmentProjects.slice(0, 2).map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {proj.title}
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Smart Contract: {proj.blockchainAddress.substring(0, 16)}...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Nilai Kepemilikan:</span>
                      <span className="font-extrabold text-emerald-600">
                        Rp {(idx === 0 ? 50000000 : 35000000).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Imbal Hasil Est:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {proj.estimatedRoi}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">
                  {selectedProject.category} • {selectedProject.location}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-52 object-cover rounded-2xl mb-4"
            />

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            {/* Fund Allocation Pie Breakdown */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 mb-4 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-100 block mb-2">
                Alokasi Penggunaan Dana Smart Contract:
              </span>
              <div className="space-y-1.5">
                {selectedProject.fundAllocation.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-600 dark:text-slate-300">{item.category}</span>
                    <span className="font-bold text-emerald-600">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-4 text-xs space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-100 block">
                Target Perkembangan Proyek (Milestones):
              </span>
              {selectedProject.milestones.map((ms, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-700 dark:text-slate-200">{ms.title}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[10px]">{ms.targetDate}</span>
                    {ms.completed ? (
                      <span className="text-emerald-600 text-[10px] font-bold">✓ Selesai</span>
                    ) : (
                      <span className="text-amber-500 text-[10px]">On Progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Mitigation */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/60 text-xs mb-4">
              <span className="font-bold text-amber-900 dark:text-amber-200 block mb-0.5">
                Analisis Risiko & Mitigasi:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                {selectedProject.riskMitigation}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  handleOpenFundingModal(selectedProject);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#14532D] text-white text-xs font-bold hover:bg-emerald-800 shadow-md flex items-center justify-center gap-1.5"
              >
                <Coins className="w-4 h-4 text-lime-400" />
                <span>Danai Proyek Ini</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Funding Modal (Smart Contract Execution) */}
      {isFundingModalOpen && targetProjectToFund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Simulasi Pendanaan Proyek On-Chain
              </h3>
              <button onClick={() => setIsFundingModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 mb-4 text-xs">
              <p className="font-bold text-emerald-900 dark:text-emerald-300">{targetProjectToFund.title}</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                Minimal Pendanaan: Rp {targetProjectToFund.minInvestment.toLocaleString('id-ID')}
              </p>
            </div>

            {/* Nominal input */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nominal Pendanaan (IDR)
                </label>
                <input
                  type="number"
                  min={targetProjectToFund.minInvestment}
                  step="500000"
                  value={fundingNominal}
                  onChange={(e) => setFundingNominal(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-extrabold text-slate-900 dark:text-white"
                />
              </div>

              {/* Quick Nominal Presets */}
              <div className="flex gap-2">
                {[1000000, 2000000, 5000000, 10000000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setFundingNominal(preset)}
                    className="flex-1 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/60"
                  >
                    {preset / 1000000} Jt
                  </button>
                ))}
              </div>

              {/* ROI Estimation Card */}
              {(() => {
                const est = calculateEstimatedReturn(fundingNominal);
                return (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">
                      Estimasi Potensi Bagi Hasil (Berdasarkan {targetProjectToFund.estimatedRoi}):
                    </span>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimasi Dividen Kuartalan:</span>
                      <span className="font-bold text-emerald-600">Rp {est.quarterly.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimasi Dividen Per Tahun:</span>
                      <span className="font-extrabold text-emerald-600">Rp {est.annual.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Checkbox agreement */}
              <label className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4 mt-0.5"
                />
                <span>
                  Saya memahami bahwa investasi proyek pengolahan memiliki risiko usaha dan setuju dengan syarat pembagian bagi hasil smart contract tanpa penjaminan keuntungan tetap.
                </span>
              </label>

              <button
                type="button"
                disabled={isTxExecuting || !agreeTerms}
                onClick={handleExecuteFunding}
                className="w-full py-3 bg-[#14532D] hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isTxExecuting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Mencatat Transaksi ke Smart Contract...</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4 text-lime-400" />
                    <span>Konfirmasi Pendanaan (Rp {fundingNominal.toLocaleString('id-ID')})</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
