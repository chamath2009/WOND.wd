/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Share2,
  CheckCircle,
  Play,
  X,
  FileCheck,
  Award,
  Calendar
} from 'lucide-react';
import { Product, Review } from '../types';

interface ProductPageProps {
  product: Product;
  navigateTo: (route: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onTrackAffiliateClick: (p: Product) => void;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  allProducts: Product[];
}

export function ProductPage({
  product,
  navigateTo,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onTrackAffiliateClick,
  reviews,
  onAddReview,
  allProducts
}: ProductPageProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<{ backgroundPosition: string; display: string }>({
    backgroundPosition: '0% 0%',
    display: 'none'
  });
  
  // Interactive Review States
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Video modal toggle
  const [videoOpen, setVideoOpen] = useState(false);

  // Social share popup alert
  const [shareFeedback, setShareFeedback] = useState(false);

  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Dynamic Rating distribution
  const totalRev = productReviews.length || 1;
  const ratingDistribution = {
    5: Math.round((productReviews.filter((r) => r.rating === 5).length / totalRev) * 100) || 85,
    4: Math.round((productReviews.filter((r) => r.rating === 4).length / totalRev) * 100) || 12,
    3: Math.round((productReviews.filter((r) => r.rating === 3).length / totalRev) * 100) || 3,
    2: Math.round((productReviews.filter((r) => r.rating === 2).length / totalRev) * 100) || 0,
    1: Math.round((productReviews.filter((r) => r.rating === 1).length / totalRev) * 100) || 0
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      display: 'block'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle((prev) => ({ ...prev, display: 'none' }));
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      alert('Please fill out both Name and Comment fields.');
      return;
    }

    const reviewObj: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    onAddReview(reviewObj);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const handleShareClick = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2500);
  };

  // Get related products (same category)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      
      {/* 1. SEO Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-semibold mb-6 overflow-x-auto whitespace-nowrap py-1">
        <button onClick={() => navigateTo('#home')} className="hover:text-blue-600 transition-colors">Home</button>
        <ChevronRight className="w-3 h-3 flex-shrink-0 text-zinc-400" />
        <button onClick={() => navigateTo('#shop')} className="hover:text-blue-600 transition-colors">Shop</button>
        <ChevronRight className="w-3 h-3 flex-shrink-0 text-zinc-400" />
        <button
          onClick={() => navigateTo(`#shop?category=${encodeURIComponent(product.category)}`)}
          className="hover:text-blue-600 transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3 flex-shrink-0 text-zinc-400" />
        <span className="text-zinc-900 dark:text-white truncate font-black max-w-[200px]">{product.name}</span>
      </nav>

      {/* 2. Main Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
        
        {/* Left Column: Image Galleries & Video Loops */}
        <div className="space-y-4">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail Gallery List */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl border overflow-hidden flex-shrink-0 transition-all ${
                    activeImageIdx === idx
                      ? 'border-blue-600 ring-2 ring-blue-500/20'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Video thumbnail trigger */}
              {product.videoUrl && (
                <button
                  onClick={() => setVideoOpen(true)}
                  className="w-16 h-16 rounded-xl border border-dashed border-blue-500 bg-blue-500/10 hover:bg-blue-500/15 flex flex-col items-center justify-center text-blue-600 dark:text-sky-400 transition-all flex-shrink-0"
                >
                  <Play className="w-5 h-5 animate-pulse" />
                  <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">Video</span>
                </button>
              )}
            </div>

            {/* Active Main Zoom Image Canvas */}
            <div className="flex-1">
              <div
                onMouseMove={handleImageZoom}
                onMouseLeave={handleMouseLeave}
                className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 cursor-zoom-in"
                style={{
                  backgroundImage: `url(${product.images[activeImageIdx]})`,
                  backgroundSize: '200%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: zoomStyle.backgroundPosition
                }}
              >
                {/* Standard Preview Image */}
                <img
                  src={product.images[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: zoomStyle.display === 'none' ? 1 : 0 }}
                />

                {/* Micro safety shield overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800 flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Verified Legal Curation</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Buying parameters, Ratings & Badges */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">{product.brand} &bull; {product.category}</span>
              <span className="text-[10px] font-mono font-semibold text-zinc-400">SKU: {product.sku}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm text-zinc-500 italic font-light">{product.tagline}</p>
            )}
          </div>

          {/* Curation validation banner */}
          <div className="bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md p-4 rounded-2xl border border-white/60 dark:border-zinc-800/40 flex gap-3.5">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl flex-shrink-0 self-start">
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">WOND.WD Integrity Guarantee</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                Featured products are guaranteed toxic-free, legal, and carry legitimate material certifications. Verified by active lab compliance checks.
              </p>
            </div>
          </div>

          {/* Ratings & Price Breakdown */}
          <div className="flex items-center gap-6 border-y border-zinc-100 dark:border-zinc-900 py-4">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Average Score</p>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < Math.round(product.rating) ? 'fill-current' : 'text-zinc-200 dark:text-zinc-800'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-zinc-900 dark:text-white">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-zinc-400">({productReviews.length} reviews)</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Affiliate Valuation</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-zinc-950 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Availability Block */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Merchant Availability Index:</span>
            <span className={`text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-md ${
              product.availability === 'In Stock'
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-amber-500/10 text-amber-600 animate-pulse'
            }`}>
              {product.availability}
            </span>
          </div>

          {/* CORE ACQUISITION BUTTONS */}
          <div className="space-y-3">
            
            {/* Primary Buy Button with outward tracking */}
            <button
              onClick={() => onTrackAffiliateClick(product)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/10 hover:scale-102 transition-all group"
            >
              <span>{product.redirectButtonText || 'Redirect to Original Marketplace'}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Cart, Wishlist secondary row */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onAddToCart}
                className="py-3.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Save to Local Cart</span>
              </button>

              <button
                onClick={onToggleWishlist}
                className={`py-3.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isWishlisted
                    ? 'bg-red-50 dark:bg-red-950/20 border-red-200 text-red-500'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted' : 'Save to Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Commissions & Platform Notice */}
          {product.commissionNotes && (
            <p className="text-[10px] text-zinc-400 font-medium italic text-center">
              &bull; Affiliate Notice: {product.commissionNotes}
            </p>
          )}

          {/* Social Share Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900">
            <span className="text-xs font-semibold text-zinc-500">Spread smart curations:</span>
            <div className="relative">
              <button
                onClick={handleShareClick}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl text-zinc-500 hover:text-blue-500 transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Curation Link</span>
              </button>
              {shareFeedback && (
                <span className="absolute -top-8 right-0 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap animate-in fade-in duration-200">
                  Link copied to clipboard!
                </span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Specifications, Features & Descriptions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 border-t border-zinc-100 dark:border-zinc-900 pt-12">
        
        {/* Features Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Key Certified Features</span>
          </h3>
          <ul className="space-y-2.5 text-xs">
            {product.features.map((feat, idx) => (
              <li key={idx} className="flex gap-2 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                <span className="text-blue-500 flex-shrink-0">&bull;</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specs Column */}
        <div className="space-y-4 lg:col-span-2">
          <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-500" />
            <span>Verified Technical Specifications</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md p-5 rounded-2xl border border-white/60 dark:border-zinc-800/40">
            {Object.entries(product.specifications).map(([k, v]) => (
              <div key={k} className="flex justify-between items-baseline border-b border-zinc-200/40 dark:border-zinc-800/40 pb-2 text-xs">
                <span className="text-zinc-400 dark:text-zinc-500 font-semibold">{k}</span>
                <span className="text-zinc-900 dark:text-white font-bold">{v}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-2">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Curation Overview</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {product.description}
            </p>
          </div>
        </div>

      </div>

      {/* 4. Active Reviews / Comment Formulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 border-t border-zinc-100 dark:border-zinc-900 pt-12">
        
        {/* Review distributions */}
        <div>
          <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">Reviews Matrix</h3>
          <div className="bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md p-5 rounded-2xl border border-white/60 dark:border-zinc-800/40 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-zinc-500 w-3">{star}</span>
                <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${ratingDistribution[star as 5 | 4 | 3 | 2 | 1]}%` }}
                  ></div>
                </div>
                <span className="text-zinc-400 font-mono font-bold w-8 text-right">
                  {ratingDistribution[star as 5 | 4 | 3 | 2 | 1]}%
                </span>
              </div>
            ))}
          </div>

          {/* Curation Safety Badge */}
          <div className="mt-4 p-4 border border-zinc-100 dark:border-zinc-900 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-blue-500 flex-shrink-0" />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-zinc-900 dark:text-white">Moderated Community</h5>
              <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                Reviews are linked to verified purchases on external portals to eliminate bots or biased comments.
              </p>
            </div>
          </div>
        </div>

        {/* Formulated Comment List & Create Review Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Create Review Form */}
          <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-2xl md:rounded-3xl shadow-lg">
            <h4 className="text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest mb-4">Add Your Verified Review</h4>
            
            {reviewSuccess ? (
              <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs animate-in zoom-in-95">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Review submitted successfully!</p>
                  <p className="text-zinc-400 mt-0.5">Your input was compiled and added to our local score indexes.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">Assigned Star Score</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                      className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold"
                    >
                      <option value="5">5 Stars (Excellent Curation)</option>
                      <option value="4">4 Stars (Great Quality)</option>
                      <option value="3">3 Stars (Acceptable)</option>
                      <option value="2">2 Stars (Lacks Premium Feel)</option>
                      <option value="1">1 Star (Not Recommended)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1">Curation Comments</label>
                  <textarea
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    rows={3}
                    placeholder="Provide your transparent experience of the build, material, or delivery quality..."
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-zinc-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-colors"
                  >
                    Submit Verified Comments
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* List of comments */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Community Comments ({productReviews.length})</h4>
            {productReviews.length > 0 ? (
              <div className="space-y-3">
                {productReviews.map((rev) => (
                  <div key={rev.id} className="bg-zinc-50 dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900/60">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                            {rev.userName}
                            {rev.verified && (
                              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-1 rounded">
                                Verified Buyer
                              </span>
                            )}
                          </h5>
                          <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {rev.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-zinc-500">
                No local reviews recorded. Be the first to add your verified score above!
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 5. Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-zinc-100 dark:border-zinc-900 pt-12">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight mb-6">
            Recommended Related Curations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => {
              // Quick mockup props
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    navigateTo(`#product/${p.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between text-[9px] text-zinc-400 uppercase font-bold tracking-wider">
                      <span>{p.brand}</span>
                      <span>{p.category}</span>
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">{p.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-zinc-950 dark:text-white">${p.price.toFixed(2)}</span>
                      <span className="text-[10px] font-extrabold text-blue-500 uppercase flex items-center gap-0.5">
                        <span>Check Price</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* VIDEO MODAL WINDOW */}
      {videoOpen && product.videoUrl && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="relative bg-zinc-950 max-w-3xl w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              <video src={product.videoUrl} controls autoPlay className="w-full h-full object-contain"></video>
            </div>
            <div className="p-4 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-400">
              <span className="font-bold text-white block mb-1">Curation Video Showcase</span>
              Streaming verified visual loop of the {product.name}.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
