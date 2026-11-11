import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  UserProfile,
  Product,
  ByproductListing,
  IndustrialDemand,
  FeedPost,
  EduModule,
  InvestmentProject,
  BlockchainTransaction,
  CartItem,
  OrderTransaction,
  ChatMessage,
  NotificationItem
} from '../types';
import {
  MOCK_USERS,
  MOCK_PRODUCTS,
  MOCK_BYPRODUCTS,
  MOCK_INDUSTRIAL_DEMANDS,
  MOCK_FEED_POSTS,
  MOCK_EDU_MODULES,
  MOCK_INVESTMENT_PROJECTS,
  MOCK_BLOCKCHAIN_RECORDS,
  MOCK_NOTIFICATIONS
} from '../data/mockData';

export type AppView = 'dashboard' | 'feed' | 'market' | 'edu' | 'invest' | 'ai-hub' | 'profile';

interface AppContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Role & Authentication
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  currentUser: UserProfile;
  updateCurrentUser: (updated: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;

  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Marketplace & Byproducts
  products: Product[];
  byproducts: ByproductListing[];
  industrialDemands: IndustrialDemand[];
  addProduct: (product: Omit<Product, 'id' | 'farmerId' | 'farmerName' | 'rating' | 'soldCount'>) => void;
  addByproduct: (byproduct: Omit<ByproductListing, 'id' | 'producerName'>) => void;
  addIndustrialDemand: (demand: Omit<IndustrialDemand, 'id'>) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (p: Product | null) => void;

  // Cart & Orders
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orders: OrderTransaction[];
  checkoutCart: (paymentMethod: string, address: string) => OrderTransaction;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Social Feed (AGROFEED)
  feedPosts: FeedPost[];
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;
  createFeedPost: (newPost: {
    caption: string;
    mediaUrl: string;
    hashtags: string[];
    linkedProductId?: string;
  }) => void;

  // Education (AGROEDU)
  eduModules: EduModule[];
  toggleCompleteModule: (moduleId: string) => void;
  claimCertificate: (moduleId: string) => void;
  certificateModalModule: EduModule | null;
  setCertificateModalModule: (mod: EduModule | null) => void;

  // Investment (AGROINVEST) & Blockchain
  investmentProjects: InvestmentProject[];
  blockchainRecords: BlockchainTransaction[];
  fundProject: (projectId: string, amount: number) => boolean;
  selectedProjectForDetail: InvestmentProject | null;
  setSelectedProjectForDetail: (proj: InvestmentProject | null) => void;

  // Chat & Communication
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  activeChatRecipient: string;
  setActiveChatRecipient: (name: string) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, attachedProduct?: { name: string; price: number; image: string }) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;

  // AgroBot AI Assistant Drawer
  isAgroBotOpen: boolean;
  setIsAgroBotOpen: (open: boolean) => void;

  // Ecosystem Flow Modal
  isEcosystemModalOpen: boolean;
  setIsEcosystemModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Splash screen state (runs on first mount, can be dismissed or skipped)
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    const seen = sessionStorage.getItem('agroverse_splash_seen');
    return !seen;
  });

  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRole, setCurrentRole] = useState<UserRole>('Petani');
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS['Petani']);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('agroverse_dark_mode') === 'true';
  });

  // Data collections with local state
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [byproducts, setByproducts] = useState<ByproductListing[]>(MOCK_BYPRODUCTS);
  const [industrialDemands, setIndustrialDemands] = useState<IndustrialDemand[]>(MOCK_INDUSTRIAL_DEMANDS);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [eduModules, setEduModules] = useState<EduModule[]>(MOCK_EDU_MODULES);
  const [investmentProjects, setInvestmentProjects] = useState<InvestmentProject[]>(MOCK_INVESTMENT_PROJECTS);
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainTransaction[]>(MOCK_BLOCKCHAIN_RECORDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Cart & UI Modals
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<OrderTransaction[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<InvestmentProject | null>(null);
  const [certificateModalModule, setCertificateModalModule] = useState<EduModule | null>(null);

  // Communication & Assistant
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatRecipient, setActiveChatRecipient] = useState('Pak Joko Subagyo (Petani)');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'other',
      senderName: 'Pak Joko Subagyo',
      text: 'Halo! Selamat datang di Kebun Organik Agro Subur Makmur. Tomat cherry manis dan selada butterhead segar baru saja dipetik pagi ini. Ada yang bisa kami bantu?',
      timestamp: '10:15 WIB'
    }
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAgroBotOpen, setIsAgroBotOpen] = useState(false);
  const [isEcosystemModalOpen, setIsEcosystemModalOpen] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('agroverse_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('agroverse_dark_mode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Switch role handler
  const switchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setCurrentUser(MOCK_USERS[newRole] || MOCK_USERS['Petani']);
  };

  const updateCurrentUser = (updated: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updated }));
  };

  // Product management
  const addProduct = (newProd: Omit<Product, 'id' | 'farmerId' | 'farmerName' | 'rating' | 'soldCount'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      rating: 5.0,
      soldCount: 0
    };
    setProducts(prev => [product, ...prev]);
    confetti({ particleCount: 50, spread: 60 });
  };

  const addByproduct = (newByprod: Omit<ByproductListing, 'id' | 'producerName'>) => {
    const byproduct: ByproductListing = {
      ...newByprod,
      id: `byprod-${Date.now()}`,
      producerName: currentUser.farmOrBusinessName || currentUser.name
    };
    setByproducts(prev => [byproduct, ...prev]);
    confetti({ particleCount: 50, spread: 60 });
  };

  const addIndustrialDemand = (newDemand: Omit<IndustrialDemand, 'id'>) => {
    const demand: IndustrialDemand = {
      ...newDemand,
      id: `demand-${Date.now()}`
    };
    setIndustrialDemands(prev => [demand, ...prev]);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const checkoutCart = (paymentMethod: string, address: string): OrderTransaction => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newOrder: OrderTransaction = {
      id: `AGRO-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      totalAmount,
      status: 'Diproses Petani',
      paymentMethod,
      trackingNumber: `EXP-ID-${Math.floor(10000000 + Math.random() * 90000000)}`,
      shippingAddress: address || 'Alamat Penerima Default'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Pesanan Berhasil Dibuat! 🎉',
        description: `Order ${newOrder.id} senilai Rp ${totalAmount.toLocaleString('id-ID')} sedang disiapkan petani.`,
        timestamp: 'Baru Saja',
        read: false,
        type: 'order',
        linkTo: 'profile'
      },
      ...prev
    ]);

    // Blockchain settlement log
    const bcRecord: BlockchainTransaction = {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      blockNumber: 19482100 + orders.length,
      timestamp: 'Baru Saja',
      type: 'ESCROW_SETTLEMENT',
      from: `0x${currentUser.id.substring(0, 8)}... (${currentUser.name})`,
      to: '0xAgroMarket_Escrow_Pool',
      amount: totalAmount,
      currency: 'IDR AgroPay Escrow',
      smartContract: 'AGROMARKET_PAYMENT_ESCROW',
      status: 'CONFIRMED'
    };
    setBlockchainRecords(prev => [bcRecord, ...prev]);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    return newOrder;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Feed interactions
  const toggleLikePost = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: text.trim(),
      timestamp: 'Baru Saja'
    };
    setFeedPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const createFeedPost = (newPostData: {
    caption: string;
    mediaUrl: string;
    hashtags: string[];
    linkedProductId?: string;
  }) => {
    const linkedProd = products.find(p => p.id === newPostData.linkedProductId);

    const post: FeedPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.farmOrBusinessName || currentUser.role,
      location: currentUser.location,
      mediaType: 'image',
      mediaUrl: newPostData.mediaUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
      caption: newPostData.caption,
      hashtags: newPostData.hashtags.length > 0 ? newPostData.hashtags : ['#Agroverse', '#PetaniMaju'],
      likes: 1,
      shares: 0,
      comments: [],
      linkedProduct: linkedProd
        ? {
            id: linkedProd.id,
            name: linkedProd.name,
            price: linkedProd.price,
            unit: linkedProd.unit,
            image: linkedProd.image
          }
        : undefined,
      createdAt: 'Baru Saja'
    };

    setFeedPosts(prev => [post, ...prev]);
    confetti({ particleCount: 50, spread: 60 });
  };

  // Education interactions
  const toggleCompleteModule = (moduleId: string) => {
    setEduModules(prev =>
      prev.map(mod =>
        mod.id === moduleId ? { ...mod, isCompleted: !mod.isCompleted } : mod
      )
    );
  };

  const claimCertificate = (moduleId: string) => {
    const mod = eduModules.find(m => m.id === moduleId);
    if (mod) {
      setCertificateModalModule(mod);
      confetti({ particleCount: 90, spread: 80 });
    }
  };

  // Investment interactions
  const fundProject = (projectId: string, amount: number): boolean => {
    if (currentUser.walletBalance < amount) {
      alert('Saldo dompet tidak mencukupi untuk melakukan pendanaan. Silakan top up saldo Anda terlebih dahulu.');
      return false;
    }

    // Deduct user balance and add to project
    setCurrentUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
      stats: {
        ...prev.stats,
        investedAmount: (prev.stats?.investedAmount || 0) + amount,
        activeProjects: (prev.stats?.activeProjects || 0) + 1
      }
    }));

    setInvestmentProjects(prev =>
      prev.map(proj => {
        if (proj.id === projectId) {
          return {
            ...proj,
            collectedFunding: proj.collectedFunding + amount,
            investorsCount: proj.investorsCount + 1
          };
        }
        return proj;
      })
    );

    // Create immutable simulated blockchain record
    const targetProject = investmentProjects.find(p => p.id === projectId);
    const newTx: BlockchainTransaction = {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      blockNumber: 19482150 + blockchainRecords.length,
      timestamp: 'Baru Saja',
      type: 'PENDANAAN_PROYEK',
      from: `0x${currentUser.id.substring(0, 6)}... (${currentUser.name})`,
      to: targetProject ? `${targetProject.blockchainAddress.substring(0, 10)}...` : '0xPool_AgroInvest',
      amount,
      currency: 'IDR Tokenized',
      smartContract: 'AGRO_SMART_CROWDFUND_v3',
      status: 'CONFIRMED'
    };

    setBlockchainRecords(prev => [newTx, ...prev]);

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Investasi Berhasil Tercatat di Blockchain! ⛓️',
        description: `Anda telah mendanai Rp ${amount.toLocaleString('id-ID')} pada "${targetProject?.title}". Hash: ${newTx.hash.substring(0, 14)}...`,
        timestamp: 'Baru Saja',
        read: false,
        type: 'investment',
        linkTo: 'invest'
      },
      ...prev
    ]);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    return true;
  };

  // Chat direct messages
  const sendChatMessage = (
    text: string,
    attachedProduct?: { name: string; price: number; image: string }
  ) => {
    if (!text.trim() && !attachedProduct) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      attachedProduct
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Simulated quick response from farmer/seller after short delay
    setTimeout(() => {
      const replies = [
        'Terima kasih atas pesannya! Stok produk panen hari ini tersedia dan siap kami kemas dengan pendingin aman.',
        'Baik kak! Untuk pengiriman ke alamat kakak estimasi sampai besok siang ya.',
        'Siap kak! Kami sediakan bonus sample ampas kopi kering untuk pupuk tanaman pot kakak ya.'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'other',
          senderName: activeChatRecipient,
          text: randomReply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
        }
      ]);
    }, 1200);
  };

  // Notification management
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        searchQuery,
        setSearchQuery,
        currentRole,
        switchRole,
        currentUser,
        updateCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        showSplash,
        setShowSplash,
        darkMode,
        toggleDarkMode,
        products,
        byproducts,
        industrialDemands,
        addProduct,
        addByproduct,
        addIndustrialDemand,
        selectedProductForDetail,
        setSelectedProductForDetail,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orders,
        checkoutCart,
        wishlist,
        toggleWishlist,
        feedPosts,
        toggleLikePost,
        addCommentToPost,
        createFeedPost,
        eduModules,
        toggleCompleteModule,
        claimCertificate,
        certificateModalModule,
        setCertificateModalModule,
        investmentProjects,
        blockchainRecords,
        fundProject,
        selectedProjectForDetail,
        setSelectedProjectForDetail,
        isChatOpen,
        setIsChatOpen,
        activeChatRecipient,
        setActiveChatRecipient,
        chatMessages,
        sendChatMessage,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotificationOpen,
        setIsNotificationOpen,
        isAgroBotOpen,
        setIsAgroBotOpen,
        isEcosystemModalOpen,
        setIsEcosystemModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
