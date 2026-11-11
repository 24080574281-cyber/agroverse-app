import {
  UserProfile,
  Product,
  ByproductListing,
  IndustrialDemand,
  FeedPost,
  EduModule,
  InvestmentProject,
  BlockchainTransaction,
  NotificationItem
} from '../types';

export const MOCK_USERS: Record<string, UserProfile> = {
  Petani: {
    id: 'user-farmer-1',
    name: 'Pak Joko Subagyo',
    role: 'Petani',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    email: 'joko.tani@agroverse.id',
    phone: '+62 812-3456-7890',
    location: 'Lembang, Bandung Barat, Jawa Barat',
    bio: 'Ketua Kelompok Tani Mandiri Subur. Berpengalaman 18 tahun membudidayakan sayur organik & pemanfaatan sekam padi terpadu.',
    verified: true,
    farmOrBusinessName: 'Kebun Organik Agro Subur Makmur',
    walletBalance: 14250000,
    stats: {
      totalSales: 48500000,
      activeProducts: 9,
      byproductsSupplied: 45 // Ton
    }
  },
  Konsumen: {
    id: 'user-consumer-1',
    name: 'Siti Rahmawati',
    role: 'Konsumen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    email: 'siti.rahma@gmail.com',
    phone: '+62 821-9876-5432',
    location: 'Kebayoran Baru, Jakarta Selatan',
    bio: 'Pencinta gaya hidup sehat, pegiat zero waste, dan penikmat kopi single origin Nusantara.',
    verified: true,
    walletBalance: 2850000,
    stats: {
      totalOrders: 28
    }
  },
  'Mitra Industri': {
    id: 'user-industry-1',
    name: 'Ir. Budi Santoso, M.Sc.',
    role: 'Mitra Industri',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    email: 'budi.santoso@bioenerginusantara.co.id',
    phone: '+62 811-2345-678',
    location: 'Cikarang Industrial Estate, Jawa Barat',
    bio: 'Managing Director PT BioEnergi Nusantara. Mengolah biomassa sekam padi dan serat nanas menjadi bahan bakar hijau dan tekstil ramah lingkungan.',
    verified: true,
    farmOrBusinessName: 'PT BioEnergi Nusantara Raya',
    walletBalance: 125000000,
    stats: {
      activeProjects: 3,
      byproductsSupplied: 240 // Ton sourced
    }
  },
  Investor: {
    id: 'user-investor-1',
    name: 'Hendro Kusuma, SE, MBA',
    role: 'Investor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    email: 'hendro.kusuma@impactventure.id',
    phone: '+62 813-7788-9900',
    location: 'Sudirman Central Business District (SCBD), Jakarta',
    bio: 'Angel Investor fokus pada Green Agribusiness, Bio-Economy circularity, dan teknologi blockchain rantai pasok.',
    verified: true,
    farmOrBusinessName: 'Nusantara Agri Impact Angel',
    walletBalance: 350000000,
    stats: {
      investedAmount: 85000000,
      activeProjects: 4
    }
  }
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Tomat Cherry Organik Sweet Premium',
    category: 'Sayur Segar',
    price: 24000,
    unit: '500 gram',
    stock: 120,
    minOrder: 1,
    rating: 4.9,
    soldCount: 840,
    farmerId: 'user-farmer-1',
    farmerName: 'Pak Joko Subagyo',
    location: 'Lembang, Bandung Barat',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Tomat cherry matang pohon dengan rasa manis segar berair. Ditanam tanpa pestisida kimia sintetis mengandalkan pupuk organik ampas kelapa dan kulit kakao.',
    isOrganic: true,
    certifications: ['Organik Indonesia', 'GAP Sertifikasi', 'Bebas Pestisida'],
    harvestDate: 'Hari Ini (Dipetik Subuh)',
    shelfLife: '7 - 10 Hari'
  },
  {
    id: 'prod-2',
    name: 'Selada Butterhead Hidroponik Crisp',
    category: 'Sayur Segar',
    price: 18000,
    unit: 'pack (300g)',
    stock: 95,
    minOrder: 1,
    rating: 4.8,
    soldCount: 1120,
    farmerId: 'user-farmer-1',
    farmerName: 'Pak Joko Subagyo',
    location: 'Lembang, Bandung Barat',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80',
    description: 'Selada hidroponik berdaun renyah dengan rasa buttery yang lembut. Dipanen bersama akar basah sehingga tetap segar tahan lama saat sampai di meja makan.',
    isOrganic: true,
    certifications: ['Organik Indonesia', 'Halal MUI'],
    harvestDate: 'Kemarin Sore',
    shelfLife: '5 Hari dalam Kulkas'
  },
  {
    id: 'prod-3',
    name: 'Kopi Arabika Gayo Single Origin Grade 1',
    category: 'Kopi & Teh',
    price: 85000,
    unit: '250 gram (Biji/Bubuk)',
    stock: 65,
    minOrder: 1,
    rating: 5.0,
    soldCount: 630,
    farmerId: 'user-farmer-2',
    farmerName: 'Koperasi Kopi Rimba Gayo',
    location: 'Takengon, Aceh Tengah',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
    description: 'Kopi Arabika dataran tinggi 1.450 mdpl dengan profil rasa floral, karamel, dan body yang tebal. Kulit buah kopi (cascara) diolah menjadi teh cascara antioksidan.',
    isOrganic: true,
    certifications: ['Fair Trade', 'Rainforest Alliance', 'Geographical Indication'],
    harvestDate: 'Proses Full Washed - Minggu Lalu',
    shelfLife: '12 Bulan'
  },
  {
    id: 'prod-4',
    name: 'Beras Organik Pandan Wangi Cianjur Asli',
    category: 'Sayur Segar',
    price: 95000,
    unit: '5 kg',
    stock: 250,
    minOrder: 1,
    rating: 4.9,
    soldCount: 2450,
    farmerId: 'user-farmer-3',
    farmerName: 'Kelompok Tani Beras Makmur',
    location: 'Cianjur, Jawa Barat',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description: 'Beras pulen beraroma pandan alami khas Cianjur. Menggunakan sistem SRI (System of Rice Intensification) ramah lingkungan yang hemat air dan minim metana.',
    isOrganic: true,
    certifications: ['Organik Indonesia', 'SNI Beras'],
    harvestDate: 'Bulan Berjalan',
    shelfLife: '6 Bulan'
  },
  {
    id: 'prod-5',
    name: 'Madu Hutan Sumbawa Murni Nektar Multiflora',
    category: 'Olahan Pangan',
    price: 110000,
    unit: 'Botol 450 ml',
    stock: 40,
    minOrder: 1,
    rating: 4.9,
    soldCount: 420,
    farmerId: 'user-farmer-4',
    farmerName: 'Komunitas Madu Hutan Lestari',
    location: 'Sumbawa, Nusa Tenggara Barat',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    description: 'Madu hutan mentah (raw honey) langsung dari sarang lebah liar Apis dorsata tanpa proses pemanasan sehingga enzim alami tetap aktif dan kaya antioksidan.',
    isOrganic: true,
    certifications: ['Uji Lab Kemurnian', 'Halal MUI'],
    harvestDate: 'Musim Panen Kemarau',
    shelfLife: '24 Bulan'
  },
  {
    id: 'prod-6',
    name: 'Bio-Briket Sekam Padi Siap Pakai (Smokeless)',
    category: 'Hasil Samping',
    price: 32000,
    unit: 'Kemasan 3 kg',
    stock: 180,
    minOrder: 1,
    rating: 4.8,
    soldCount: 510,
    farmerId: 'user-farmer-1',
    farmerName: 'Agroverse Circular Lab Lembang',
    location: 'Lembang, Bandung Barat',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    description: 'Briket biomassa hasil pemadatan sekam padi dan arang tempurung. Panas tinggi tahan hingga 3 jam, tanpa asap menyengat, ideal untuk BBQ dan penghangat green house.',
    isOrganic: false,
    certifications: ['Green Eco-Fuel', 'Zero Deforestation'],
    harvestDate: 'Produksi Minggu Ini',
    shelfLife: 'Tidak Ada Kadaluarsa'
  },
  {
    id: 'prod-7',
    name: 'Cabai Rawit Merah Domba Super Pedas',
    category: 'Sayur Segar',
    price: 28000,
    unit: '500 gram',
    stock: 80,
    minOrder: 1,
    rating: 4.7,
    soldCount: 930,
    farmerId: 'user-farmer-1',
    farmerName: 'Pak Joko Subagyo',
    location: 'Lembang, Bandung Barat',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
    description: 'Cabai rawit segar dengan tingkat kepedasan Scoville tinggi. Berwarna merah menyala, padat, dan tidak mudah busuk karena dipetik tepat waktu.',
    isOrganic: false,
    certifications: ['Bebas Residu Logam Berat'],
    harvestDate: 'Hari Ini',
    shelfLife: '8 Hari'
  },
  {
    id: 'prod-8',
    name: 'Serat Daun Nanas Alami untuk Kerajinan & Tekstil',
    category: 'Hasil Samping',
    price: 45000,
    unit: '1 kg Ikat Siap Tenun',
    stock: 150,
    minOrder: 1,
    rating: 4.9,
    soldCount: 310,
    farmerId: 'user-farmer-5',
    farmerName: 'Kelompok Tani Nanas Subang Mandiri',
    location: 'Subang, Jawa Barat',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=80',
    description: 'Serat alami kuat hasil dekortikasi daun nanas varietas Smooth Cayenne. Berwarna krem alami halus, alternatif serat kapas dan poliester ramah lingkungan.',
    isOrganic: true,
    certifications: ['Circular Bio-Economy Certificate'],
    harvestDate: 'Dekortikasi Terkini',
    shelfLife: 'Tahan Sangat Lama'
  }
];

export const MOCK_BYPRODUCTS: ByproductListing[] = [
  {
    id: 'byprod-1',
    name: 'Sekam Padi Kering Kualitas Grade A (Rice Husk)',
    rawMaterialType: 'Limbah Penggilingan Padi (Oryza sativa)',
    monthlyCapacity: '35 Ton / Bulan',
    availableStock: 25,
    unit: 'ton',
    pricePerUnit: 650000, // Rp 650.000 per ton (Rp 650/kg)
    location: 'Cianjur & Subang, Jawa Barat',
    producerName: 'Gabungan Kelompok Tani Lumbung Padi',
    producerRole: 'Kelompok Penggilingan Tani',
    moistureContent: '< 11.5% (Kering Pengeringan Matahari/Oven)',
    purity: '98% Bersih Tanpa Kerikil/Debu Berat',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    potentialProducts: ['Bio-Briket Bakar', 'Silika Presipitat untuk Ban', 'Biochar Pembenah Hara Tanah', 'Isolator Suhu'],
    minOrder: '2 Ton'
  },
  {
    id: 'byprod-2',
    name: 'Ampas Kopi Kering (Spent Coffee Grounds - SCG)',
    rawMaterialType: 'Hasil Samping Ekstraksi Biji Kopi',
    monthlyCapacity: '12 Ton / Bulan',
    availableStock: 8,
    unit: 'ton',
    pricePerUnit: 1200000, // Rp 1.200.000 per ton
    location: 'Bandung & Garut, Jawa Barat',
    producerName: 'Konsorsium Roastery & Petani Priangan',
    producerRole: 'Pusat Pengolahan Kopi',
    moistureContent: '< 9% (Sudah dikeringkan higienis)',
    purity: '100% Bubuk Kopi Tanpa Gula / Susu',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    potentialProducts: ['Minyak Atsiri Kopi', 'Scrub & Kosmetik Alami', 'Pelet Pemanas Ruang', 'Pupuk Organik Padat'],
    minOrder: '500 kg'
  },
  {
    id: 'byprod-3',
    name: 'Serat Daun Nanas Kasar (Decorticated Pineapple Leaf Fiber)',
    rawMaterialType: 'Biomassa Daun Tanaman Nanas Pasca Panen',
    monthlyCapacity: '18 Ton / Bulan',
    availableStock: 14,
    unit: 'ton',
    pricePerUnit: 7500000, // Rp 7.500.000 per ton
    location: 'Subang, Jawa Barat',
    producerName: 'Sentra Nanas Agro Subang',
    producerRole: 'Koperasi Tani Agro Industri',
    moistureContent: '< 13%',
    purity: '95% Bebas Getah Basah',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&auto=format&fit=crop&q=80',
    potentialProducts: ['Benang Tekstil Berkelanjutan', 'Komposit Otomotif', 'Kertas Seni Mewah', 'Bahan Sepatu Kulit Nabati'],
    minOrder: '1 Ton'
  },
  {
    id: 'byprod-4',
    name: 'Kulit Buah Kakao Kering Cacah (Cocoa Pod Husk)',
    rawMaterialType: 'Kulit Luar Buah Kakao Fermentasi',
    monthlyCapacity: '20 Ton / Bulan',
    availableStock: 15,
    unit: 'ton',
    pricePerUnit: 900000,
    location: 'Tabanan, Bali & Kolaka, Sultra',
    producerName: 'Asosiasi Petani Kakao Berkelanjutan',
    producerRole: 'Kelompok Perkebunan',
    moistureContent: '< 14%',
    purity: '96% Cacahan Bersih 1-2 cm',
    image: 'https://images.unsplash.com/photo-1575385642474-c23e4456a621?w=600&auto=format&fit=crop&q=80',
    potentialProducts: ['Pakan Ternak Ruminansia Protein Tinggi', 'Pestisida Hayati Alami', 'Pupuk Kalium Cair', 'Bahan Pewarna Alami'],
    minOrder: '2 Ton'
  }
];

export const MOCK_INDUSTRIAL_DEMANDS: IndustrialDemand[] = [
  {
    id: 'demand-1',
    companyName: 'PT BioEnergi Nusantara Raya',
    materialNeeded: 'Sekam Padi Kering (Kadar Air < 12%)',
    quantityNeeded: '50 Ton / Bulan (Kontrak 12 Bulan)',
    offeringPrice: 'Rp 700.000 - Rp 750.000 / Ton',
    location: 'Gudang Cikarang, Jawa Barat',
    deadline: '30 Hari Kedepan',
    specs: 'Bersih dari plastik, tanah, dan kerikil. Dikemas dalam karung sak atau curah truk dump.',
    status: 'Open'
  },
  {
    id: 'demand-2',
    companyName: 'PT EcoTextile Asia Mandiri',
    materialNeeded: 'Serat Daun Nanas Grade A (Panjang serat > 40cm)',
    quantityNeeded: '15 Ton / Bulan',
    offeringPrice: 'Rp 8.000.000 / Ton',
    location: 'Bandung Industrial Park',
    deadline: '14 Hari Kedepan',
    specs: 'Warna krem cerah, kadar air di bawah 12%, serat lurus dan tidak menggumpal.',
    status: 'Open'
  },
  {
    id: 'demand-3',
    companyName: 'CV Organik BioHayati Prima',
    materialNeeded: 'Ampas Kopi Murni Tanpa Campuran',
    quantityNeeded: '10 Ton / Bulan',
    offeringPrice: 'Rp 1.350.000 / Ton',
    location: 'Semarang, Jawa Tengah',
    deadline: '45 Hari Kedepan',
    specs: 'Tidak berjamur, pengeringan higienis, ph stabil 5.0 - 6.5.',
    status: 'Open'
  }
];

export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    authorId: 'user-farmer-1',
    authorName: 'Pak Joko Subagyo',
    authorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Petani Organik Lembang',
    location: 'Lembang, Bandung Barat',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
    caption: 'Alhamdulillah, panen tomat cherry manis pagi ini tembus 180 kg dengan tingkat kemanisan brix 9.2! Dipupuk dengan kompos ampas kopi dan bio-char sekam padi. Langsung siap kirim ke Jakarta & sekitarnya. Yang mau pesan yuk klik tombol beli di bawah!',
    hashtags: ['#PanenRaya', '#TomatCherryOrganik', '#ZeroWasteAgri', '#PetaniMaju', '#AgroverseDirect'],
    likes: 412,
    shares: 48,
    isLiked: false,
    comments: [
      {
        id: 'c-1',
        userName: 'Siti Rahmawati',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        text: 'Pak Joko, tomat cherrynya manis banget! Langsung aku checkout 2 kg ya buat salad keluarga.',
        timestamp: '2 jam lalu'
      },
      {
        id: 'c-2',
        userName: 'Rian Resto Healthy',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        text: 'Bisa suplai rutin tiap hari Rabu ke resto kami di Tebet pak?',
        timestamp: '1 jam lalu'
      }
    ],
    linkedProduct: {
      id: 'prod-1',
      name: 'Tomat Cherry Organik Sweet Premium',
      price: 24000,
      unit: '500g',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80'
    },
    createdAt: '3 jam lalu'
  },
  {
    id: 'post-2',
    authorId: 'user-industry-1',
    authorName: 'Ir. Budi Santoso',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Mitra Industri BioEnergi',
    location: 'Pabrik Cikarang',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    caption: 'Transformasi sekam padi menjadi Bio-Briket kalori tinggi! Dulu petani membakar sekam dan mencemari udara, kini setiap kilogram sekam dihargai layak dan diekspor ke pabrik ramah lingkungan. Inilah bukti nyata ekonomi sirkular Indonesia bersama ekosistem AGROVERSE!',
    hashtags: ['#BioCircularEconomy', '#SekamPadi', '#GreenEnergy', '#SmartAgri', '#AgroInvest'],
    likes: 856,
    shares: 124,
    isLiked: true,
    comments: [
      {
        id: 'c-3',
        userName: 'Hendro Kusuma',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        text: 'Luar biasa! Proyek batch 2 di AgroInvest sudah terdanai 78%. Audit smart contractnya transparan sekali.',
        timestamp: '4 jam lalu'
      }
    ],
    linkedProduct: {
      id: 'prod-6',
      name: 'Bio-Briket Sekam Padi Siap Pakai',
      price: 32000,
      unit: '3 kg',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80'
    },
    createdAt: '6 jam lalu'
  },
  {
    id: 'post-3',
    authorId: 'user-farmer-2',
    authorName: 'Koperasi Kopi Rimba Gayo',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Petani Kopi Aceh Tengah',
    location: 'Takengon, Aceh',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
    caption: 'Proses cuci biji kopi Arabika Gayo petik merah 100%. Biji diproses jadi green bean specialty, sedangkan kulit buah merahnya (cascara) kami keringkan jadi teh herbal beraroma manis buah. Tidak ada yang terbuang sia-sia!',
    hashtags: ['#KopiGayo', '#SpecialtyCoffee', '#CascaraTea', '#SustainableFarming'],
    likes: 624,
    shares: 73,
    isLiked: false,
    comments: [
      {
        id: 'c-4',
        userName: 'Barista Ken',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
        text: 'Beans Gayo Rimba ini cupping notesnya peach dan brown sugar banget. Best seller di coffee shop saya!',
        timestamp: '1 hari lalu'
      }
    ],
    linkedProduct: {
      id: 'prod-3',
      name: 'Kopi Arabika Gayo Single Origin Grade 1',
      price: 85000,
      unit: '250g',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop&q=80'
    },
    createdAt: '1 hari lalu'
  }
];

export const MOCK_EDU_MODULES: EduModule[] = [
  {
    id: 'edu-1',
    title: 'Strategi Pemasaran Digital & Social Selling untuk Petani Modern',
    category: 'Pemasaran & Branding',
    duration: '45 Menit (4 Bab)',
    difficulty: 'Pemula',
    rating: 4.9,
    enrolledCount: 1420,
    summary: 'Pelajari cara membuat konten panen yang viral di AGROFEED, memotong tengkulak, dan menjual hasil tani langsung ke konsumen urban dengan margin laba 30% lebih tinggi.',
    keyTakeaways: [
      'Menentukan unique selling point hasil panen Anda',
      'Teknik foto & video panen subuh yang menggugah selera',
      'Memanfaatkan fitur live shopping dan story di media sosial',
      'Mengelola ulasan pelanggan agar menjadi pelanggan loyal bulanan'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80',
    isCompleted: false,
    chapters: [
      {
        title: 'Bab 1: Menemukan Cerita Unik di Balik Kebun Anda',
        duration: '10 min',
        content: 'Konsumen masa kini tidak sekadar membeli wortel atau cabai; mereka membeli kepercayaan, kesehatan, dan cerita di balik keringat petani. Ceritakan bagaimana Anda tidak menggunakan pestisida berbahaya, air pegunungan yang digunakan, dan dedikasi panen segar setiap pagi.'
      },
      {
        title: 'Bab 2: Panduan Memotret Produk dengan Smartphone Sederhana',
        duration: '12 min',
        content: 'Manfaatkan cahaya alami matahari pagi (golden hour) antara pukul 06.30 - 08.00 WIB. Tampilkan tetesan embun segar di atas daun sayur atau potongan tomat yang berair. Hindari filter berlebihan yang mengubah warna asli produk.'
      },
      {
        title: 'Bab 3: Pricing Strategy & Menghitung Margin D2C',
        duration: '11 min',
        content: 'Cara menghitung Harga Pokok Penjualan (HPP), biaya kemasan vakum, ongkir kurir berpendingin, dan margin keuntungan 25-40% yang tetap terjangkau bagi konsumen perkotaan.'
      },
      {
        title: 'Bab 4: Eksekusi Direct Order di AGROFEED & AGROMARKET',
        duration: '12 min',
        content: 'Cara menghubungkan postingan feed dengan keranjang belanja otomatis sehingga calon pembeli bisa langsung checkout dalam 3 kali klik.'
      }
    ]
  },
  {
    id: 'edu-2',
    title: 'Pengolahan Hasil Samping: Mengubah Sekam Menjadi Bio-Briket Ekspor',
    category: 'Pengolahan Hasil Samping',
    duration: '60 Menit (5 Bab)',
    difficulty: 'Menengah',
    rating: 5.0,
    enrolledCount: 980,
    summary: 'Panduan teknis dan analisis ekonomi mengubah limbah sekam padi dan ampas biomassa menjadi briket arang bebas asap dengan permintaan industri yang tinggi.',
    keyTakeaways: [
      'Proses karbonisasi sekam dengan drum pirolisis hemat energi',
      'Formulasi perekat tepung tapioka yang ramah lingkungan',
      'Pencetakan & pengeringan standar kalori ekspor (4.000 kcal/kg)',
      'Akses pasar B2B lewat fitur sourcing industri AGROVERSE'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    isCompleted: true,
    chapters: [
      {
        title: 'Bab 1: Potensi Nilai Tambah Sekam Padi Indonesia',
        duration: '10 min',
        content: 'Setiap 100 kg gabah menghasilkan sekitar 20-25 kg sekam padi. Jika dibakar sia-sia, menimbulkan polusi udara. Jika diolah menjadi bio-briket, nilainya naik 8 kali lipat!'
      },
      {
        title: 'Bab 2: Teknologi Pirolisis Ramah Lingkungan',
        duration: '15 min',
        content: 'Metode pembakaran dengan oksigen terbatas menggunakan tungku pembakaran drum tertutup untuk menghasilkan arang sekam murni dengan kadar karbon tinggi tanpa asap tebal.'
      },
      {
        title: 'Bab 3: Pencampuran, Perekat Tapioka, dan Pemadatan',
        duration: '15 min',
        content: 'Campurkan arang sekam dengan perekat pati kanji/tapioka 3-5% dari bobot. Cetak menggunakan mesin press hidrolik atau ulir sederhana hingga kepadatan optimal tercapai.'
      },
      {
        title: 'Bab 4: Pengeringan dan Pengujian Standar Kalor',
        duration: '10 min',
        content: 'Keringkan briket di bawah rumah kaca (solar dryer) selama 2-3 hari hingga kadar air di bawah 10% agar briket tidak berjamur dan menyala stabil tanpa asap beracun.'
      },
      {
        title: 'Bab 5: Kerjasama Sourcing dengan Industri di AGROMARKET',
        duration: '10 min',
        content: 'Gunakan fitur B2B AGROMARKET untuk menawarkan suplai briket ke pabrik keramik, UMKM kuliner, atau eksportir batubara nabati.'
      }
    ]
  },
  {
    id: 'edu-3',
    title: 'Desain Branding & Kemasan Ramah Lingkungan untuk Produk Tani',
    category: 'Pemasaran & Branding',
    duration: '35 Menit (3 Bab)',
    difficulty: 'Pemula',
    rating: 4.8,
    enrolledCount: 1150,
    summary: 'Ketahui standar kemasan makanan, pemilihan label bersertifikasi, serta cara mencantumkan QR Code transparansi kebun yang memikat konsumen.',
    keyTakeaways: [
      'Pilihan kemasan compostable berbahan singkong & kraft paper',
      'Elemen penting label kemasan sesuai aturan BPOM & sertifikasi Halal',
      'Membuat barcode ketertelusuran (traceability) panen'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    isCompleted: false,
    chapters: [
      {
        title: 'Bab 1: Psikologi Kemasan di Mata Pembeli Supermarket & Online',
        duration: '10 min',
        content: 'Warna hijau daun, cokelat kraft alami, dan jendela transparan memberi kesan segar dan jujur. Konsumen bersedia membayar premium untuk kemasan rapi dan aman.'
      },
      {
        title: 'Bab 2: Legalitas & Label Informasi Nilai Gizi',
        duration: '12 min',
        content: 'Komponen wajib pada stiker: nama produk, berat bersih, nama produsen, nomor P-IRT atau sertifikat organik, tanggal panen, serta saran penyimpanan.'
      },
      {
        title: 'Bab 3: Menghubungkan QR Code Kemasan ke Profil AGROVERSE',
        duration: '13 min',
        content: 'Pasang QR Code unik di kemasan yang ketika discan oleh konsumen akan menampilkan video kebun Anda, tanggal petik, dan profil petani di AGROVERSE.'
      }
    ]
  },
  {
    id: 'edu-4',
    title: 'Manajemen Keuangan & Arus Kas (Cash Flow) Usaha Tani Tangguh',
    category: 'Manajemen Finansial',
    duration: '50 Menit (4 Bab)',
    difficulty: 'Menengah',
    rating: 4.9,
    enrolledCount: 820,
    summary: 'Pisahkan keuangan pribadi dan usaha kebun. Pelajari cara menghitung laba bersih, dana darurat musim paceklik, dan persiapan mengajukan pendanaan di AGROINVEST.',
    keyTakeaways: [
      'Pemisahan rekening rumah tangga vs kebun',
      'Pencatatan bibit, pupuk, upah tenaga kerja, dan biaya listrik',
      'Simulasi kelayakan investasi mesin pasca panen'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    isCompleted: false,
    chapters: [
      {
        title: 'Bab 1: Menghitung Biaya Operasional Riil Per Musim Tanam',
        duration: '12 min',
        content: 'Identifikasi biaya tetap (sewa lahan, depresiasi alat cangkul/traktor) dan biaya variabel (benih, pupuk kompos, mulsa, upah buruh panen).'
      },
      {
        title: 'Bab 2: Mengelola Gap Siklus Tanam dan Penjualan',
        duration: '13 min',
        content: 'Mengatasi masa tunggu 60-90 hari sebelum panen dengan diversifikasi tanaman berumur pendek (kangkung, bayam) atau penjualan hasil samping sekam.'
      },
      {
        title: 'Bab 3: Menyiapkan Pembukuan untuk Penilaian Kelayakan Investor',
        duration: '15 min',
        content: 'Investor di AGROINVEST mencari proyek dengan catatan laba rugi yang jujur dan dapat diverifikasi. Gunakan format laporan standar sederhana.'
      },
      {
        title: 'Bab 4: Menggunakan Dompet Digital AGROVERSE Escrow',
        duration: '10 min',
        content: 'Dana hasil penjualan disimpan aman di sistem escrow dan cair otomatis saat kurir menyelesaikan pengiriman pesanan.'
      }
    ]
  }
];

export const MOCK_INVESTMENT_PROJECTS: InvestmentProject[] = [
  {
    id: 'proj-1',
    title: 'Pabrik Bio-Briket & Karbon Aktif Sekam Padi Modern',
    tagline: 'Mengubah 150 Ton/bulan limbah sekam padi menjadi energi biomassa ramah lingkungan siap ekspor ke Jepang & Korea.',
    category: 'Fasilitas Bio-Briket',
    managerName: 'Ir. Budi Santoso, M.Sc.',
    managerCompany: 'PT BioEnergi Nusantara Raya',
    managerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    location: 'Kawasan Sentra Padi Subang, Jawa Barat',
    targetFunding: 650000000, // Rp 650 Juta
    collectedFunding: 532000000, // ~81.8%
    minInvestment: 1000000, // Rp 1.000.000 / Lot
    estimatedRoi: '15.5% - 18.2% p.a.',
    projectDuration: '24 Bulan',
    payoutFrequency: 'Kuartalan (Tiap 3 Bulan)',
    riskLevel: 'Rendah',
    riskMitigation: 'Offtaker ekspor sudah menandatangani kontrak pembelian berjangka 2 tahun. Pasokan sekam terjamin dari 12 kelompok tani binaan.',
    fundAllocation: [
      { category: 'Mesin Karbonisasi & Press Hidrolik', percentage: 45 },
      { category: 'Pembangunan Solar Dryer Tunnel', percentage: 25 },
      { category: 'Modal Kerja Pasokan Bahan Baku Petani', percentage: 20 },
      { category: 'Sertifikasi ISO & Uji Emisi Bakar', percentage: 10 }
    ],
    blockchainAddress: '0x7F9a4C231498b5840dAEf828a2b53f47eD0aE98b',
    smartContractStatus: 'Audited',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    description: 'Proyek hilirisasi sekam padi yang terintegrasi langsung dengan para petani di Subang dan Karawang. Menggunakan teknologi pirolisis tertutup minim asap yang menghasilkan arang sekam kualitas ekspor dan asap cair sebagai pestisida alami bernilai tinggi.',
    milestones: [
      { title: 'Pembebasan & Penyiapan Lahan Pabrik', targetDate: 'Q1 2026', completed: true },
      { title: 'Instalasi Mesin Pirolisis & Press', targetDate: 'Q2 2026', completed: true },
      { title: 'Uji Coba Produksi Batch Pertama', targetDate: 'Q3 2026', completed: false },
      { title: 'Distribusi Ekspor Perdana & Dividen 1', targetDate: 'Q4 2026', completed: false }
    ],
    investorsCount: 142
  },
  {
    id: 'proj-2',
    title: 'Sentra Ekstraksi Serat Tekstil Alami Daun Nanas Subang',
    tagline: 'Fasilitas dekortikasi mekanis daun nanas pasca panen menjadi serat tekstil pengganti sintetis untuk industri mode berkelanjutan.',
    category: 'Pabrik Ekstraksi Serat',
    managerName: 'Kusnadi Permana, S.T.',
    managerCompany: 'CV Nusantara Green Fiber',
    managerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    location: 'Jalan Cagak, Subang, Jawa Barat',
    targetFunding: 450000000,
    collectedFunding: 315000000, // 70%
    minInvestment: 500000,
    estimatedRoi: '14.0% - 16.5% p.a.',
    projectDuration: '18 Bulan',
    payoutFrequency: 'Kuartalan (Tiap 3 Bulan)',
    riskLevel: 'Moderat',
    riskMitigation: 'Kerjasama pasokan eksklusif dengan asosiasi petani nanas seluas 80 hektar. Mesin dirancang lokal dengan suku cadang berlimpah.',
    fundAllocation: [
      { category: 'Pengadaan 4 Unit Mesin Dekortikator', percentage: 40 },
      { category: 'Peralatan Degumming Ramah Lingkungan', percentage: 25 },
      { category: 'Inventori & Gudang Bahan Baku', percentage: 25 },
      { category: 'Sertifikasi OEKO-TEX', percentage: 10 }
    ],
    blockchainAddress: '0x3D88a4B8194cfA1175C0139bc6B4E5d09B8c61a5',
    smartContractStatus: 'Audited',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80',
    description: 'Selama ini daun nanas hanya ditinggalkan membusuk atau dibakar di kebun setelah buah dipanen. Melalui fasilitas ini, daun nanas diolah menjadi serat berkekuatan tinggi yang diminati oleh brand fashion ramah lingkungan dunia.',
    milestones: [
      { title: 'Pembangunan Workshop & Gudang', targetDate: 'Jan 2026', completed: true },
      { title: 'Fabrikasi Mesin Dekortikator Lokal', targetDate: 'Mar 2026', completed: true },
      { title: 'Training 30 Operator Petani Lokal', targetDate: 'Mei 2026', completed: false },
      { title: 'Peluncuran Serat & Pembagian Hasil', targetDate: 'Jul 2026', completed: false }
    ],
    investorsCount: 98
  },
  {
    id: 'proj-3',
    title: 'Unit Produksi Pupuk Organik Cair & Bio-Pestisida Kulit Kakao',
    tagline: 'Fasilitas bio-fermentasi kulit kakao Tabanan menjadi pupuk tinggi Kalium dan pestisida nabati pengusir hama buah.',
    category: 'Pupuk Organik Cair',
    managerName: 'I Made Sudirta',
    managerCompany: 'Koperasi Tani Kakao Amerta Bali',
    managerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    location: 'Selemadeg Barat, Tabanan, Bali',
    targetFunding: 300000000,
    collectedFunding: 285000000, // 95%
    minInvestment: 500000,
    estimatedRoi: '16.0% - 19.0% p.a.',
    projectDuration: '12 Bulan',
    payoutFrequency: 'Tiap 2 Bulan',
    riskLevel: 'Rendah',
    riskMitigation: 'Hasil pupuk langsung diserap oleh 400 petani kakao dan hortikultura anggota koperasi dengan jaminan pembelian.',
    fundAllocation: [
      { category: 'Tangki Bio-Fermentor Stainless 5.000L', percentage: 50 },
      { category: 'Laboratorium Uji Mikroba Hayati', percentage: 20 },
      { category: 'Mesin Botoling & Sealer Otomatis', percentage: 20 },
      { category: 'Izin Edar Kementan', percentage: 10 }
    ],
    blockchainAddress: '0x992Bcd48e42F56C72b0Aa54199C3b1A76327E740',
    smartContractStatus: 'Verified',
    image: 'https://images.unsplash.com/photo-1575385642474-c23e4456a621?w=800&auto=format&fit=crop&q=80',
    description: 'Kulit kakao memiliki kandungan kalium alami tertinggi di antara biomassa pertanian tropis. Formula mikrobial lokal kami mampu mengekstraksi kalium murni dan senyawa fenolik menjadi pupuk cair pemacu pembungaan yang sangat ampuh.',
    milestones: [
      { title: 'Instalasi Tangki Bioreaktor Utama', targetDate: 'Feb 2026', completed: true },
      { title: 'Uji Efektivitas Lapangan pada 5 Hektar', targetDate: 'Apr 2026', completed: true },
      { title: 'Izin Pendaftaran Pupuk Organik', targetDate: 'Jun 2026', completed: true },
      { title: 'Distribusi Komersial Pulau Jawa & Bali', targetDate: 'Agu 2026', completed: false }
    ],
    investorsCount: 165
  }
];

export const MOCK_BLOCKCHAIN_RECORDS: BlockchainTransaction[] = [
  {
    hash: '0x8f4d92a17c6e0b82f1439ea451299dfa718c35b8e907a123f890bcf4821a99d4',
    blockNumber: 19482012,
    timestamp: 'Baru Saja',
    type: 'PENDANAAN_PROYEK',
    from: '0xHendro...9900 (Investor Hendro)',
    to: '0x7F9a...E98b (SmartContract: Pabrik Bio-Briket)',
    amount: 15000000,
    currency: 'IDR Tokenized',
    smartContract: 'AGRO_INVEST_POOL_v2',
    status: 'CONFIRMED'
  },
  {
    hash: '0x3a7719f20c4e8812bca04271890cfb1964177d612479e0aa790c5bf18392110c',
    blockNumber: 19481995,
    timestamp: '18 Menit Lalu',
    type: 'KONTRAK_SUPPLY_INDUSTRI',
    from: '0xBioEnergi...678 (PT BioEnergi)',
    to: '0xJoko...7890 (Petani Joko)',
    amount: 32500000,
    currency: 'Escrow Guarantee',
    smartContract: 'BYPRODUCT_SOURCING_ESCROW',
    status: 'CONFIRMED'
  },
  {
    hash: '0xbc91a4512e09477aa2379109bc4755102a9b4077c981270ae513470982c7a912',
    blockNumber: 19481840,
    timestamp: '1 Jam Lalu',
    type: 'DIVIDEN_PAYOUT',
    from: '0x992B...E740 (Proyek Pupuk Kakao Bali)',
    to: '165 Multi-Investor Wallets',
    amount: 48200000,
    currency: 'Quarterly Dividends',
    smartContract: 'AUTOMATED_PROFIT_SHARING',
    status: 'SUCCESS'
  },
  {
    hash: '0x4f1289ae659b8120ccb5120938914ba47e912384759012384910cf9042b38190',
    blockNumber: 19481710,
    timestamp: '3 Jam Lalu',
    type: 'ESCROW_SETTLEMENT',
    from: '0xSiti...5432 (Konsumen Siti)',
    to: '0xJoko...7890 (Petani Joko)',
    amount: 88000,
    currency: 'IDR Settlement',
    smartContract: 'AGROMARKET_D2C_SETTLEMENT',
    status: 'SUCCESS'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pesanan Baru Diterima! 🛒',
    description: 'Siti Rahmawati memesan 2x Tomat Cherry Organik. Silakan siapkan paket panen.',
    timestamp: '15 Menit lalu',
    read: false,
    type: 'order',
    linkTo: 'market'
  },
  {
    id: 'notif-2',
    title: 'Penawaran Bahan Baku Diterima! 🌿',
    description: 'PT BioEnergi Nusantara menyetujui pasokan 10 Ton Sekam Padi Anda dengan jaminan escrow.',
    timestamp: '1 Jam lalu',
    read: false,
    type: 'byproduct',
    linkTo: 'market'
  },
  {
    id: 'notif-3',
    title: 'Dividen Proyek Cair ke Dompet! 💰',
    description: 'Dividen Kuartal 1 Proyek Pupuk Kulit Kakao Tabanan sebesar Rp 1.450.000 telah masuk ke saldo AgroPay.',
    timestamp: '4 Jam lalu',
    read: false,
    type: 'investment',
    linkTo: 'invest'
  },
  {
    id: 'notif-4',
    title: 'Video Anda Disukai & Dibagikan! 🌟',
    description: '85 orang menyukai reels panen tomat cherry Anda di AGROFEED.',
    timestamp: 'Kemarin',
    read: true,
    type: 'feed',
    linkTo: 'feed'
  }
];
