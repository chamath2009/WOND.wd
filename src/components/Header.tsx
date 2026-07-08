/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { Product } from '../types';

interface HeaderProps {
  currentRoute: string;
  navigateTo: (route: string) => void;
  products: Product[];
  cartCount: number;
  wishlistCount: number;
  userEmail: string | null;
  onLogout: () => void;
}

export function Header({
  currentRoute,
  navigateTo,
  products,
  cartCount,
  wishlistCount,
  userEmail,
  onLogout
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for premium blur transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchResultClick = (productId: string) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigateTo(`#product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo(`#shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchDropdown(false);
    }
  };

  const categories = [
    'Electronics',
    'Home & Kitchen',
    'Health',
    'Beauty',
    'Sports',
    'Fitness',
    'Travel',
    'Office',
    'Baby',
    'Pets',
    'Phone Accessories',
    'Smart Gadgets',
    'Car Accessories'
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/65 dark:bg-zinc-950/65 backdrop-blur-xl border-b border-white/60 dark:border-zinc-800/40 shadow-lg'
          : 'bg-white/35 dark:bg-zinc-950/35 backdrop-blur-md border-b border-white/30 dark:border-zinc-850/20 shadow-sm'
      }`}
    >
      {/* Top Banner: Curation Pledge */}
      <div className="bg-zinc-900 dark:bg-black text-white text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>WOND.WD Curation Guarantee: 100% Safe, Legal & High-Quality Certified</span>
          </div>
          <div className="hidden md:flex gap-4 text-zinc-300">
            <button onClick={() => navigateTo('#disclosure')} className="hover:text-white transition-colors">Affiliate Disclosure</button>
            <span>|</span>
            <button onClick={() => navigateTo('#faq')} className="hover:text-white transition-colors">Help Center</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigateTo('#home')}
              className="flex items-center gap-2 group text-left"
              id="header-logo-btn"
            >
              <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-600 text-white font-bold tracking-tighter text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                W
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                  WOND<span className="text-blue-600">.WD</span>
                </span>
                <span className="hidden sm:block text-[9px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase leading-none -mt-1">
                  Safe Products &bull; Smart Shopping
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
              <button
                onClick={() => navigateTo('#shop')}
                className={`hover:text-blue-600 dark:hover:text-sky-400 transition-colors ${
                  currentRoute === '#shop' ? 'text-blue-600 dark:text-sky-400' : ''
                }`}
              >
                Shop All
              </button>
              
              {/* Categories Hover Dropdown */}
              <div className="relative group/cat py-2">
                <button
                  onClick={() => navigateTo('#shop')}
                  className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  Categories
                </button>
                <div className="absolute left-0 top-full hidden group-hover/cat:block w-72 bg-white/70 dark:bg-zinc-900/70 border border-white/60 dark:border-zinc-800/40 rounded-2xl shadow-2xl p-4 grid grid-cols-1 gap-1 backdrop-blur-xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        navigateTo(`#shop?category=${encodeURIComponent(cat)}`);
                      }}
                      className="text-left w-full text-xs px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-sky-400 transition-all font-medium"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigateTo('#deals')}
                className={`hover:text-blue-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1 ${
                  currentRoute === '#deals' ? 'text-blue-600 dark:text-sky-400 font-semibold' : ''
                }`}
              >
                Deals
                <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-bounce">HOT</span>
              </button>

              <button
                onClick={() => navigateTo('#blog')}
                className={`hover:text-blue-600 dark:hover:text-sky-400 transition-colors ${
                  currentRoute.startsWith('#blog') ? 'text-blue-600 dark:text-sky-400' : ''
                }`}
              >
                Insights Blog
              </button>

              <button
                onClick={() => navigateTo('#about')}
                className={`hover:text-blue-600 dark:hover:text-sky-400 transition-colors ${
                  currentRoute === '#about' ? 'text-blue-600 dark:text-sky-400' : ''
                }`}
              >
                Our Quality Standards
              </button>

              <button
                onClick={() => navigateTo('#admin')}
                className={`bg-zinc-100 dark:bg-zinc-800/50 px-2.5 py-1 rounded-md text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
                  currentRoute.startsWith('#admin') ? 'text-blue-600 dark:text-sky-400' : ''
                }`}
              >
                Admin
              </button>
            </nav>
          </div>

          {/* Search, Actions & Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Live Autocomplete Search Input */}
            <div ref={searchRef} className="relative hidden md:block w-64 lg:w-80">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchDropdown(true);
                    }}
                    onFocus={() => setShowSearchDropdown(true)}
                    placeholder="Search premium products..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white/80 dark:focus:bg-zinc-900/80 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 backdrop-blur-md"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                </div>
              </form>

              {/* Live Search Autocomplete Dropdown */}
              {showSearchDropdown && searchQuery.trim() && (
                <div className="absolute left-0 right-0 mt-2 bg-white/70 dark:bg-zinc-950/70 border border-white/60 dark:border-zinc-800/40 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 backdrop-blur-xl">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5 border-b border-zinc-100 dark:border-zinc-900">
                        Products Found ({searchResults.length})
                      </div>
                      <div className="mt-1 space-y-1">
                        {searchResults.slice(0, 6).map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSearchResultClick(product.id)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl text-left transition-colors"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg bg-zinc-100"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                                {product.name}
                              </h4>
                              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                                {product.brand} &bull; {product.category}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-blue-600 dark:text-sky-400">
                              ${product.price.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                      {searchResults.length > 6 && (
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full text-center py-2 text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline border-t border-zinc-100 dark:border-zinc-900 mt-1"
                        >
                          View all results
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-zinc-500">
                      No verified products match "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Icons Container */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Mobile Search Button (Quick link to shop) */}
              <button
                onClick={() => navigateTo('#shop')}
                className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => navigateTo('#wishlist')}
                className="relative p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => navigateTo('#cart')}
                className="relative p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Dashboard/Login Icon */}
              <button
                onClick={() => navigateTo(userEmail ? '#dashboard' : '#login')}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
                aria-label="User Profile"
              >
                <User className="w-5 h-5" />
                {userEmail && (
                  <span className="hidden xl:inline text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-[100px]">
                    {userEmail.split('@')[0]}
                  </span>
                )}
              </button>

              {/* Hamburger Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[104px] md:top-[120px] bg-white dark:bg-zinc-950 z-40 overflow-y-auto border-t border-zinc-200 dark:border-zinc-900 p-6 space-y-8 animate-in fade-in slide-in-from-top-5 duration-300">
          
          {/* Quick Search */}
          <div className="relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search premium products..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400" />
            </form>
          </div>

          {/* Links List */}
          <div className="flex flex-col gap-4 text-base font-semibold text-zinc-800 dark:text-zinc-200">
            <button
              onClick={() => {
                navigateTo('#shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-blue-600 transition-colors border-b border-zinc-100 dark:border-zinc-900"
            >
              Shop All Products
            </button>
            <button
              onClick={() => {
                navigateTo('#deals');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-blue-600 transition-colors border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center"
            >
              Today's Exclusive Deals
              <span className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">HOT</span>
            </button>
            <button
              onClick={() => {
                navigateTo('#blog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-blue-600 transition-colors border-b border-zinc-100 dark:border-zinc-900"
            >
              Insights & Safety Blog
            </button>
            <button
              onClick={() => {
                navigateTo('#about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-blue-600 transition-colors border-b border-zinc-100 dark:border-zinc-900"
            >
              Our Quality Standards
            </button>
            <button
              onClick={() => {
                navigateTo('#faq');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-blue-600 transition-colors border-b border-zinc-100 dark:border-zinc-900"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => {
                navigateTo('#admin');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-zinc-500 hover:text-blue-600 transition-colors"
            >
              Administrator Area
            </button>
          </div>

          {/* Categories Quick Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Curated Categories
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    navigateTo(`#shop?category=${encodeURIComponent(cat)}`);
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 text-xs font-medium rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-zinc-800 dark:text-zinc-200 text-left transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Footer User Info */}
          {userEmail ? (
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs text-zinc-400">Logged in as</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{userEmail}</p>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigateTo('#login');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2"
            >
              Sign In to Your Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
