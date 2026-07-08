/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Heart, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  navigateTo: (route: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onTrackAffiliateClick: (product: Product) => void;
  key?: React.Key;
}

export function ProductCard({
  product,
  navigateTo,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onTrackAffiliateClick
}: ProductCardProps) {
  
  // Custom badges for premium touch
  const getBadge = () => {
    if (product.isTodayDeal) return { text: "TODAY'S DEAL", bg: "bg-red-500" };
    if (product.isEditorChoice) return { text: "EDITOR'S CHOICE", bg: "bg-amber-500" };
    if (product.isBestSeller) return { text: "BEST SELLER", bg: "bg-zinc-900 dark:bg-zinc-800" };
    if (product.isTrending) return { text: "TRENDING", bg: "bg-blue-600" };
    return null;
  };

  const badge = getBadge();

  const handleProductPageRedirect = () => {
    navigateTo(`#product/${product.id}`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrackAffiliateClick(product);
  };

  return (
    <div
      onClick={handleProductPageRedirect}
      className="group relative cursor-pointer bg-white/40 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500"
    >
      
      {/* Product Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Curation Guarantee Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <div className="flex items-center gap-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[9px] font-bold text-zinc-900 dark:text-white tracking-wider uppercase">
              Curated Safe Product
            </span>
          </div>
        </div>

        {/* Dynamic Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {badge && (
            <span className={`${badge.bg} text-[9px] font-black text-white px-2.5 py-1 rounded-md tracking-wider shadow-sm`}>
              {badge.text}
            </span>
          )}
          {product.discountPercentage && (
            <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md tracking-wider">
              SAVE {product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Save to Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`absolute top-3 right-3 p-2 rounded-full border shadow-sm backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-red-500 border-red-500 text-white hover:scale-110'
              : 'bg-white/85 dark:bg-zinc-950/85 border-zinc-200/50 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-900 hover:scale-105'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Category & Brand */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>
          
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
            {product.name}
          </h3>
          
          {product.tagline && (
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic truncate font-light">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Ratings, Price & Core Action buttons */}
        <div className="space-y-3 pt-2">
          {/* Ratings & SKU details */}
          <div className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-2 py-0.5 rounded-lg text-zinc-700 dark:text-zinc-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-extrabold">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-zinc-400">({product.reviewCount})</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[100px]">
              {product.sku}
            </span>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-zinc-950 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-extrabold tracking-wider uppercase ${
              product.availability === 'In Stock'
                ? 'text-emerald-500'
                : product.availability === 'Low Stock'
                ? 'text-amber-500 animate-pulse'
                : 'text-red-500'
            }`}>
              {product.availability}
            </span>
          </div>

          {/* Interactive Button Grid */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {/* Quick Add to Cart */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="col-span-1.5 flex items-center justify-center p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors"
              title="Add to Local Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            {/* Direct Affiliate Outbound */}
            <button
              onClick={handleBuyNow}
              className="col-span-3.5 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:scale-102 transition-all shadow-sm"
            >
              <span>{product.redirectButtonText || 'Buy Now'}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
