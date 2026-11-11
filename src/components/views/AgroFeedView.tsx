import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ShoppingBag,
  Plus,
  Sparkles,
  Send,
  X,
  Check,
  UserPlus,
  UserCheck,
  Video,
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FeedPost } from '../../types';

export const AgroFeedView: React.FC = () => {
  const {
    feedPosts,
    toggleLikePost,
    addCommentToPost,
    createFeedPost,
    addToCart,
    products,
    currentUser
  } = useApp();

  const [activeHashtag, setActiveHashtag] = useState('Semua');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [followedAuthors, setFollowedAuthors] = useState<Record<string, boolean>>({});
  const [shareToastPostId, setShareToastPostId] = useState<string | null>(null);

  // New post form state
  const [newCaption, setNewCaption] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newHashtagStr, setNewHashtagStr] = useState('#PanenRaya #OrganikIndonesia');
  const [newLinkedProdId, setNewLinkedProdId] = useState('');

  const stories = [
    { title: 'Panen Subuh', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80', active: true },
    { title: 'Zero Waste Sekam', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80', active: true },
    { title: 'Kopi Arabika Gayo', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&auto=format&fit=crop&q=80', active: true },
    { title: 'Serat Nanas', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=200&auto=format&fit=crop&q=80', active: false },
    { title: 'Tips Pupuk Kompos', image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=200&auto=format&fit=crop&q=80', active: false }
  ];

  const hashtags = ['Semua', '#PanenRaya', '#ZeroWasteAgri', '#OrganikIndonesia', '#KopiGayo', '#BioCircularEconomy'];

  const filteredPosts = feedPosts.filter((post) => {
    if (activeHashtag === 'Semua') return true;
    return post.hashtags.includes(activeHashtag);
  });

  const toggleFollow = (authorId: string) => {
    setFollowedAuthors(prev => ({ ...prev, [authorId]: !prev[authorId] }));
  };

  const handleShare = (postId: string) => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShareToastPostId(postId);
    setTimeout(() => setShareToastPostId(null), 2000);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const tags = newHashtagStr
      .split(' ')
      .map(t => t.trim())
      .filter(t => t.startsWith('#'));

    createFeedPost({
      caption: newCaption,
      mediaUrl: newMediaUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
      hashtags: tags.length > 0 ? tags : ['#Agroverse'],
      linkedProductId: newLinkedProdId || undefined
    });

    setNewCaption('');
    setNewMediaUrl('');
    setNewLinkedProdId('');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Header & Upload Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>AGROFEED</span>
            <span className="text-xs bg-lime-400 text-[#14532D] font-extrabold px-2 py-0.5 rounded-full uppercase">
              Social Commerce
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kombinasi konten edukasi tani, live panen, dan belanja langsung dari petani
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-[#14532D] to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Konten</span>
        </button>
      </div>

      {/* Stories / Reels Bubbles Carousel */}
      <div className="p-3 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-x-auto flex items-center gap-4 no-scrollbar shadow-xs">
        {/* User's story / add story */}
        <div
          onClick={() => setIsUploadModalOpen(true)}
          className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
        >
          <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-emerald-500 p-0.5 flex items-center justify-center">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white dark:border-slate-800">
              <Plus className="w-3 h-3" />
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
            Cerita Saya
          </span>
        </div>

        {stories.map((story, idx) => (
          <div
            key={idx}
            onClick={() => alert(`Menonton Cerita Tani: ${story.title}`)}
            className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
          >
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-lime-400 via-emerald-500 to-[#F5A623] group-hover:scale-105 transition-transform">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900"
              />
            </div>
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 max-w-[65px] truncate text-center">
              {story.title}
            </span>
          </div>
        ))}
      </div>

      {/* Hashtag Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {hashtags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveHashtag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeHashtag === tag
                ? 'bg-[#14532D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const isFollowed = followedAuthors[post.authorId];
          return (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              {/* Post Author Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                        {post.authorName}
                      </h3>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-slate-400">{post.createdAt}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {post.authorRole} • {post.location}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(post.authorId)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    isFollowed
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                  }`}
                >
                  {isFollowed ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Mengikuti</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Ikuti</span>
                    </>
                  )}
                </button>
              </div>

              {/* Post Media (Image/Reels) */}
              <div className="relative bg-slate-950">
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-full max-h-[480px] object-cover"
                />

                {/* Floating Product Badge & Direct Buy CTA */}
                {post.linkedProduct && (
                  <div className="absolute bottom-3 inset-x-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-emerald-500/40 shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={post.linkedProduct.image}
                        alt={post.linkedProduct.name}
                        className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                          Produk di Konten Ini
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {post.linkedProduct.name}
                        </h4>
                        <p className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                          Rp {post.linkedProduct.price.toLocaleString('id-ID')} / {post.linkedProduct.unit}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const target = products.find(p => p.id === post.linkedProduct?.id);
                        if (target) addToCart(target, 1);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#14532D] hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-lime-400" />
                      <span>Beli Langsung</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons: Like, Comment, Share */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Like button */}
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-5 h-5 transition-transform active:scale-125 ${
                          post.isLiked
                            ? 'fill-red-500 text-red-500 scale-110'
                            : 'text-slate-600 dark:text-slate-300'
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment button */}
                    <button
                      onClick={() =>
                        setActiveCommentPostId(
                          activeCommentPostId === post.id ? null : post.id
                        )
                      }
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments.length}</span>
                    </button>

                    {/* Share button */}
                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer relative"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>{post.shares}</span>
                      {shareToastPostId === post.id && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-md whitespace-nowrap">
                          Link Disalin!
                        </span>
                      )}
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Rekomendasi Agrofeed
                  </span>
                </div>

                {/* Caption & Hashtags */}
                <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                  <span className="font-bold mr-1.5">{post.authorName}:</span>
                  {post.caption}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {post.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      onClick={() => setActiveHashtag(tag)}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Comment Section Expansion */}
                {activeCommentPostId === post.id && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {post.comments.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">
                          Belum ada komentar. Jadilah yang pertama berkomentar!
                        </p>
                      ) : (
                        post.comments.map((c) => (
                          <div key={c.id} className="flex gap-2 text-xs">
                            <img
                              src={c.userAvatar}
                              alt={c.userName}
                              className="w-6 h-6 rounded-full object-cover shrink-0"
                            />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                                {c.userName}
                              </span>
                              <span className="text-slate-600 dark:text-slate-300">
                                {c.text}
                              </span>
                              <span className="block text-[10px] text-slate-400 mt-0.5">
                                {c.timestamp}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Comment Input */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Tulis tanggapan atau tanya seputar panen..."
                        className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addCommentToPost(post.id, commentInput);
                            setCommentInput('');
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          addCommentToPost(post.id, commentInput);
                          setCommentInput('');
                        }}
                        className="p-2 bg-[#14532D] text-white rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Post Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-600" />
                Upload Konten Panen & Cerita Tani
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Caption & Cerita Produk
                </label>
                <textarea
                  required
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Ceritakan proses panen segar hari ini, cara budidaya ramah lingkungan, atau penawaran hasil samping..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  URL Foto / Video Panen
                </label>
                <input
                  type="url"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Biarkan kosong untuk menggunakan foto default kebun organik segar.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hubungkan dengan Produk AGROMARKET (Opsional)
                </label>
                <select
                  value={newLinkedProdId}
                  onChange={(e) => setNewLinkedProdId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="">-- Pilih Produk untuk Pembelian Instan --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — Rp {p.price.toLocaleString('id-ID')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hashtag Kategori
                </label>
                <input
                  type="text"
                  value={newHashtagStr}
                  onChange={(e) => setNewHashtagStr(e.target.value)}
                  placeholder="#PanenRaya #OrganikIndonesia #ZeroWasteAgri"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#14532D] hover:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publikasikan ke AGROFEED</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
