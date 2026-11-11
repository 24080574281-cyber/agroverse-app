export type UserRole = 'Petani' | 'Konsumen' | 'Mitra Industri' | 'Investor';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  verified: boolean;
  farmOrBusinessName?: string;
  walletBalance: number; // in IDR
  stats: {
    totalSales?: number;
    activeProducts?: number;
    totalOrders?: number;
    investedAmount?: number;
    activeProjects?: number;
    byproductsSupplied?: number;
  };
}

export interface Product {
  id: string;
  name: string;
  category: 'Sayur Segar' | 'Buah Organik' | 'Rempah & Herbal' | 'Kopi & Teh' | 'Olahan Pangan' | 'Hasil Samping';
  price: number;
  unit: string;
  stock: number;
  minOrder: number;
  rating: number;
  soldCount: number;
  farmerId: string;
  farmerName: string;
  location: string;
  image: string;
  description: string;
  isOrganic: boolean;
  certifications: string[];
  harvestDate?: string;
  shelfLife?: string;
}

export interface ByproductListing {
  id: string;
  name: string; // e.g. "Sekam Padi Kering", "Ampas Kopi Robusta"
  rawMaterialType: string;
  monthlyCapacity: string; // e.g. "25 Ton / Bulan"
  availableStock: number; // in kg or ton
  unit: 'kg' | 'ton';
  pricePerUnit: number;
  location: string;
  producerName: string;
  producerRole: string;
  moistureContent: string; // e.g. "< 12%"
  purity: string; // e.g. "98% Murni"
  image: string;
  potentialProducts: string[]; // e.g. ["Bio-Briket", "Silika", "Biochar"]
  minOrder: string;
}

export interface IndustrialDemand {
  id: string;
  companyName: string;
  materialNeeded: string;
  quantityNeeded: string;
  offeringPrice: string;
  location: string;
  deadline: string;
  specs: string;
  status: 'Open' | 'Negotiating' | 'Fulfilled';
}

export interface FeedComment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  location: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: FeedComment[];
  shares: number;
  isLiked?: boolean;
  linkedProduct?: {
    id: string;
    name: string;
    price: number;
    unit: string;
    image: string;
  };
  createdAt: string;
}

export interface EduModule {
  id: string;
  title: string;
  category: 'Pemasaran & Branding' | 'Pengolahan Hasil Samping' | 'Manajemen Finansial' | 'Teknologi Cerdas';
  duration: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  rating: number;
  enrolledCount: number;
  summary: string;
  keyTakeaways: string[];
  thumbnail: string;
  isCompleted?: boolean;
  chapters: {
    title: string;
    duration: string;
    content: string;
  }[];
}

export interface InvestmentProject {
  id: string;
  title: string;
  tagline: string;
  category: 'Fasilitas Bio-Briket' | 'Pabrik Ekstraksi Serat' | 'Pupuk Organik Cair' | 'Kosmetik Biomassa';
  managerName: string;
  managerCompany: string;
  managerAvatar: string;
  location: string;
  targetFunding: number;
  collectedFunding: number;
  minInvestment: number;
  estimatedRoi: string; // e.g. "15% - 18% p.a."
  projectDuration: string; // e.g. "18 Bulan"
  payoutFrequency: string; // e.g. "Tiap 3 Bulan (Kuartalan)"
  riskLevel: 'Rendah' | 'Moderat' | 'Tinggi';
  riskMitigation: string;
  fundAllocation: {
    category: string;
    percentage: number;
  }[];
  blockchainAddress: string;
  smartContractStatus: 'Verified' | 'Audited';
  image: string;
  description: string;
  milestones: {
    title: string;
    targetDate: string;
    completed: boolean;
  }[];
  investorsCount: number;
}

export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  type: 'PENDANAAN_PROYEK' | 'DIVIDEN_PAYOUT' | 'KONTRAK_SUPPLY_INDUSTRI' | 'ESCROW_SETTLEMENT';
  from: string;
  to: string;
  amount: number;
  currency: string;
  smartContract: string;
  status: 'SUCCESS' | 'CONFIRMED';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderTransaction {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Menunggu Pembayaran' | 'Diproses Petani' | 'Dalam Pengiriman' | 'Selesai';
  paymentMethod: string;
  trackingNumber: string;
  shippingAddress: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  attachedProduct?: {
    name: string;
    price: number;
    image: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'feed' | 'investment' | 'byproduct' | 'system';
  linkTo?: string;
}
