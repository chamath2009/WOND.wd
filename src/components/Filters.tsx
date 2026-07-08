/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw, SlidersHorizontal, Check } from 'lucide-react';

interface FiltersProps {
  categories: string[];
  brands: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showOnlyDiscounted: boolean;
  setShowOnlyDiscounted: (val: boolean) => void;
  onReset: () => void;
}

export function Filters({
  categories,
  brands,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  showOnlyDiscounted,
  setShowOnlyDiscounted,
  onReset
}: FiltersProps) {
  
  const sortOptions = [
    { value: 'popularity', label: 'Popularity & Reviews' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Recently Added' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'discount', label: 'Biggest Discount' }
  ];

  return (
    <aside className="space-y-6 w-full lg:w-64 bg-white/45 dark:bg-zinc-950/45 backdrop-blur-xl border border-white/60 dark:border-zinc-800/40 p-5 rounded-2xl md:rounded-3xl shadow-lg">
      
      {/* Header: Action Row */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white text-sm">
          <SlidersHorizontal className="w-4 h-4 text-blue-500" />
          <span>Advanced Filter</span>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Sorting Parameter */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
          Sort Results By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Categories Selection */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
          Curation Directory
        </label>
        <div className="max-h-48 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all flex items-center justify-between font-semibold ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === '' && <Check className="w-3.5 h-3.5" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all flex items-center justify-between font-medium ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <span className="truncate">{cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Price Cap Range */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
            Max Price
          </label>
          <span className="text-xs font-black text-blue-600 dark:text-sky-400">
            ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1500}
          step={20}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
          <span>Min: $0</span>
          <span>Max: $1500</span>
        </div>
      </div>

      {/* 4. Brand Filter */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
          Certified Brands
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full p-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Star Ratings Filter */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
          Minimum Rating
        </label>
        <div className="flex gap-1">
          {[4, 4.5, 4.7, 4.9].map((star) => (
            <button
              key={star}
              onClick={() => setMinRating(minRating === star ? 0 : star)}
              className={`flex-1 py-1 px-1.5 text-[10px] font-black rounded-lg border text-center transition-all ${
                minRating === star
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {star}+ ★
            </button>
          ))}
        </div>
      </div>

      {/* 6. Special Offers (Discounts Only) */}
      <div className="pt-2">
        <button
          onClick={() => setShowOnlyDiscounted(!showOnlyDiscounted)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
            showOnlyDiscounted
              ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400'
              : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <span className="text-xs font-bold">Exclusive Deals Only</span>
          <div
            className={`w-4 h-4 rounded-md border flex items-center justify-center ${
              showOnlyDiscounted
                ? 'bg-red-500 border-red-500 text-white'
                : 'border-zinc-300 dark:border-zinc-700'
            }`}
          >
            {showOnlyDiscounted && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </button>
      </div>

    </aside>
  );
}
