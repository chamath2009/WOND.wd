/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { AdminPanel } from './components/AdminPanel';
import { ProductPage } from './components/ProductPage';
import { UserDashboard } from './components/UserDashboard';
import { Pages } from './components/Pages';
import { ThemeProvider } from './components/ThemeContext';
import { Product, BlogArticle, FAQItem, Review, CartItem, Order } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_BLOG_ARTICLES,
  INITIAL_FAQS,
  INITIAL_REVIEWS
} from './data';
import {
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Gift,
  Tag,
  Bookmark,
  CheckCircle,
  Truck,
  Heart,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}

function MainAppContent() {
  // ----------------------------------------------------
  // PERSISTED STATES (Synced to LocalStorage for full CRUD/mock database action)
  // ----------------------------------------------------
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wond-products');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('wond-products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wond-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('wond-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('wond-reviews');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('wond-reviews', JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  });

  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>(() => {
    const saved = localStorage.getItem('wond-blog-articles');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('wond-blog-articles', JSON.stringify(INITIAL_BLOG_ARTICLES));
    return INITIAL_BLOG_ARTICLES;
  });

  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    const saved = localStorage.getItem('wond-orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('wond-user-email');
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    return INITIAL_FAQS;
  });

  // ----------------------------------------------------
  // HASH-BASED CLIENT-SIDE ROUTER STATE
  // ----------------------------------------------------
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash || '#home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    window.location.hash = route;
  };

  // ----------------------------------------------------
  // SHOP FILTERS & ADVANCED SEARCH STATES
  // ----------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);
  const [searchQueryParam, setSearchQueryParam] = useState('');

  // Synchronize category or search query triggers from URLs/Headers
  useEffect(() => {
    if (currentRoute.startsWith('#shop')) {
      const hash = currentRoute;
      const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
      
      const cat = params.get('category');
      if (cat) setSelectedCategory(decodeURIComponent(cat));
      
      const search = params.get('search');
      if (search) setSearchQueryParam(decodeURIComponent(search));
    }
  }, [currentRoute]);

  // Sync state changes to storage
  const syncProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('wond-products', JSON.stringify(newProds));
  };

  const syncWishlist = (newWish: string[]) => {
    setWishlist(newWish);
    localStorage.setItem('wond-wishlist', JSON.stringify(newWish));
  };

  const syncCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('wond-cart', JSON.stringify(newCart));
  };

  const syncReviews = (newRevs: Review[]) => {
    setReviews(newRevs);
    localStorage.setItem('wond-reviews', JSON.stringify(newRevs));
  };

  const syncBlogs = (newBlogs: BlogArticle[]) => {
    setBlogArticles(newBlogs);
    localStorage.setItem('wond-blog-articles', JSON.stringify(newBlogs));
  };

  const syncOrders = (newOrders: Order[]) => {
    setOrderHistory(newOrders);
    localStorage.setItem('wond-orders', JSON.stringify(newOrders));
  };

  // ----------------------------------------------------
  // GLOBAL PERSISTENCE UTILITIES
  // ----------------------------------------------------
  const handleToggleWishlist = (id: string) => {
    const isWish = wishlist.includes(id);
    const newWish = isWish ? wishlist.filter((item) => item !== id) : [...wishlist, id];
    syncWishlist(newWish);
  };

  const handleAddToCart = (product: Product) => {
    const existing = cart.find((i) => i.product.id === product.id);
    let newCart: CartItem[];
    if (existing) {
      newCart = cart.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newCart = [...cart, { product, quantity: 1 }];
    }
    syncCart(newCart);
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    const newCart = cart.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i));
    syncCart(newCart);
  };

  const handleRemoveFromCart = (id: string) => {
    const newCart = cart.filter((i) => i.product.id !== id);
    syncCart(newCart);
  };

  const handleClearCart = () => {
    syncCart([]);
  };

  const handleCheckoutComplete = (order: Order) => {
    const newHistory = [order, ...orderHistory];
    syncOrders(newHistory);
  };

  const handleAddProduct = (prod: Product) => {
    const updated = [prod, ...products];
    syncProducts(updated);
  };

  const handleEditProduct = (prod: Product) => {
    const updated = products.map((p) => (p.id === prod.id ? prod : p));
    syncProducts(updated);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    syncProducts(updated);
    // Remove from wishlist/cart too
    syncWishlist(wishlist.filter((w) => w !== id));
    syncCart(cart.filter((c) => c.product.id !== id));
  };

  const handleAddBlogArticle = (art: BlogArticle) => {
    const updated = [art, ...blogArticles];
    syncBlogs(updated);
  };

  const handleDeleteBlogArticle = (id: string) => {
    const updated = blogArticles.filter((a) => a.id !== id);
    syncBlogs(updated);
  };

  const handleAddReview = (rev: Review) => {
    const updated = [rev, ...reviews];
    syncReviews(updated);

    // Dynamic product rating aggregation!
    const productRevs = updated.filter((r) => r.productId === rev.productId);
    const sumRating = productRevs.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = sumRating / productRevs.length;

    const updatedProds = products.map((p) => {
      if (p.id === rev.productId) {
        return {
          ...p,
          rating: parseFloat(avgRating.toFixed(1)),
          reviewCount: productRevs.length
        };
      }
      return p;
    });
    syncProducts(updatedProds);
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    syncReviews(updated);
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('wond-user-email', email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('wond-user-email');
  };

  // ----------------------------------------------------
  // OUTBOUND REDIRECTION SYSTEM (Affiliate Redirect Drawer)
  // ----------------------------------------------------
  const [redirectingProduct, setRedirectingProduct] = useState<Product | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const handleTrackAffiliateClick = (prod: Product) => {
    setRedirectingProduct(prod);
    setRedirectCountdown(3);
  };

  // Manage countdown and actual redirection
  useEffect(() => {
    if (!redirectingProduct) return;
    
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => setRedirectCountdown(redirectCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Completed, redirect now safely in new tab
      window.open(redirectingProduct.affiliateUrl, '_blank', 'noopener,noreferrer');
      setRedirectingProduct(null);
    }
  }, [redirectingProduct, redirectCountdown]);

  // ----------------------------------------------------
  // SHOPPING DIR DATA PRESETS
  // ----------------------------------------------------
  const allCategories = Array.from(new Set(products.map((p) => p.category))) as string[];
  const allBrands = Array.from(new Set(products.map((p) => p.brand))) as string[];

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 1500]);
    setMinRating(0);
    setSortBy('popularity');
    setShowOnlyDiscounted(false);
    setSearchQueryParam('');
    navigateTo('#shop');
  };

  // Apply filters
  let filteredProducts = products.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedBrand && p.brand !== selectedBrand) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (minRating && p.rating < minRating) return false;
    if (showOnlyDiscounted && !p.discountPercentage) return false;
    
    if (searchQueryParam) {
      const q = searchQueryParam.toLowerCase();
      const matchesName = p.name.toLowerCase().includes(q);
      const matchesBrand = p.brand.toLowerCase().includes(q);
      const matchesCat = p.category.toLowerCase().includes(q);
      if (!matchesName && !matchesBrand && !matchesCat) return false;
    }
    return true;
  });

  // Sort
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popularity') return b.reviewCount - a.reviewCount;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.dateAdded.localeCompare(a.dateAdded);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
    return 0;
  });

  // ----------------------------------------------------
  // RENDER SECTIONS
  // ----------------------------------------------------
  const renderRouteContent = () => {
    const hash = currentRoute.split('?')[0];
    const routeParts = hash.split('/');
    const baseRoute = routeParts[0];
    const routeParam = routeParts[1];

    // Home Page
    if (baseRoute === '#home' || baseRoute === '' || baseRoute === '#' || baseRoute === '#/') {
      const featured = products.filter((p) => p.isFeatured).slice(0, 4);
      const trending = products.filter((p) => p.isTrending).slice(0, 4);
      const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
      const editorChoice = products.filter((p) => p.isEditorChoice).slice(0, 4);
      const todayDeals = products.filter((p) => p.isTodayDeal).slice(0, 4);
      const recentlyAdded = [...products].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded)).slice(0, 4);

      return (
        <div className="space-y-16 animate-in fade-in duration-500">
          {/* Dynamic Hero Carousel */}
          <HeroSlider navigateTo={navigateTo} />

          {/* Core Trust Indicators (Grid of 4) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900/80 p-8 rounded-3xl backdrop-blur-md">
              {[
                { label: 'Curation Compliance Check', desc: '100% materials certified non-toxic', icon: ShieldCheck },
                { label: 'Fast Redirect Router', desc: 'Zero redirection premiums or fees', icon: Truck },
                { label: 'Discerning Collections', desc: 'Pre-populated with legal goods only', icon: Sparkles },
                { label: 'Trusted Partners Only', desc: 'Linked directly with secure merchants', icon: CheckCircle }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 dark:text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{item.label}</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Special Deals */}
          {todayDeals.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                    <Gift className="w-4 h-4 animate-bounce" /> Today's Exclusive Deals
                  </span>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Hot Promoted Offers</h2>
                </div>
                <button onClick={() => navigateTo('#deals')} className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                  <span>View All Offers</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {todayDeals.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    navigateTo={navigateTo}
                    isWishlisted={wishlist.includes(prod.id)}
                    onToggleWishlist={() => handleToggleWishlist(prod.id)}
                    onAddToCart={() => handleAddToCart(prod)}
                    onTrackAffiliateClick={handleTrackAffiliateClick}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Curated Category Shortcuts */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Curated Collections</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Electronics', count: products.filter(p=>p.category==='Electronics').length, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=300' },
                { name: 'Home & Kitchen', count: products.filter(p=>p.category==='Home & Kitchen').length, img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=300' },
                { name: 'Health & Bio', count: products.filter(p=>p.category==='Health').length, img: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=300' },
                { name: 'Beauty', count: products.filter(p=>p.category==='Beauty').length, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300' },
                { name: 'Smart Gadgets', count: products.filter(p=>p.category==='Smart Gadgets').length, img: 'https://images.unsplash.com/photo-1598681422277-49f242784012?auto=format&fit=crop&q=80&w=300' },
                { name: 'Office', count: products.filter(p=>p.category==='Office').length, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=300' }
              ].map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => navigateTo(`#shop?category=${encodeURIComponent(cat.name === 'Health & Bio' ? 'Health' : cat.name)}`)}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-zinc-200/40 dark:border-zinc-900"
                >
                  <img src={cat.img} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-4">
                    <h4 className="text-xs sm:text-sm font-black text-white tracking-tight">{cat.name}</h4>
                    <span className="text-[10px] text-zinc-400 font-semibold">{cat.count} Curated Products</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Curations Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest flex items-center gap-1">
                  <Bookmark className="w-4 h-4" /> RECOMMENDED FOR YOU
                </span>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Our Premium Featured Choices</h2>
              </div>
              <button onClick={() => navigateTo('#shop')} className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                <span>View Full Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  navigateTo={navigateTo}
                  isWishlisted={wishlist.includes(prod.id)}
                  onToggleWishlist={() => handleToggleWishlist(prod.id)}
                  onAddToCart={() => handleAddToCart(prod)}
                  onTrackAffiliateClick={handleTrackAffiliateClick}
                />
              ))}
            </div>
          </section>

          {/* Trending & Bestsellers Split Banner */}
          <section className="bg-zinc-50 dark:bg-zinc-900/20 border-y border-zinc-200/50 dark:border-zinc-900/60 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Trending */}
              <div>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">ON THE RISE</span>
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Trending Collections</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trending.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      navigateTo={navigateTo}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={() => handleToggleWishlist(prod.id)}
                      onAddToCart={() => handleAddToCart(prod)}
                      onTrackAffiliateClick={handleTrackAffiliateClick}
                    />
                  ))}
                </div>
              </div>

              {/* Editor Choice */}
              <div>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">SELECTED FOR EXCELLENCE</span>
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Editor's Choice Curation</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {editorChoice.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      navigateTo={navigateTo}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={() => handleToggleWishlist(prod.id)}
                      onAddToCart={() => handleAddToCart(prod)}
                      onTrackAffiliateClick={handleTrackAffiliateClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Static Platform Stats Dashboard */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Our Global Reach</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 p-8 rounded-3xl">
              <div>
                <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">14K+</h4>
                <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">Discerning Shoppers</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">120</h4>
                <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">Audited Manufacturers</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">100%</h4>
                <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">Hazard Free Audit</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">3.5 Sec</h4>
                <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">Fast Outbound Dispatch</p>
              </div>
            </div>
          </section>

          {/* Latest Articles Preview (Split Layout) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">WELLNESS STUDIES</span>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight animate-pulse">From Curation Bulletins</h2>
              </div>
              <button onClick={() => navigateTo('#blog')} className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline">
                View All Bulletins
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles.slice(0, 3).map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigateTo(`#blog-details/${art.slug}`)}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900/80 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={art.image} alt="" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[9px] font-bold text-blue-500 uppercase">{art.category}</span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">{art.title}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 font-light">{art.summary}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 text-[10px] text-zinc-400 flex justify-between font-semibold border-t border-zinc-50 dark:border-zinc-900/60 mt-2">
                    <span>By {art.author}</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }

    // Shop Catalog View
    if (baseRoute === '#shop') {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-8">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
                {selectedCategory ? `CURATED DIRECTORY / ${selectedCategory.toUpperCase()}` : 'FULL CURATED DIRECTORY'}
              </span>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                {selectedCategory ? `${selectedCategory} Curation` : 'Discover Smart Shopping'}
              </h1>
            </div>

            <div className="text-xs text-zinc-400 font-mono font-bold">
              Displaying {filteredProducts.length} Verified Products
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar Filters */}
            <Filters
              categories={allCategories}
              brands={allBrands}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showOnlyDiscounted={showOnlyDiscounted}
              setShowOnlyDiscounted={setShowOnlyDiscounted}
              onReset={handleResetFilters}
            />

            {/* Grid display */}
            <div className="flex-1 w-full space-y-6">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      navigateTo={navigateTo}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={() => handleToggleWishlist(prod.id)}
                      onAddToCart={() => handleAddToCart(prod)}
                      onTrackAffiliateClick={handleTrackAffiliateClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-950 border border-dashed border-zinc-200 dark:border-zinc-900 rounded-3xl p-8 space-y-4">
                  <RefreshCw className="w-12 h-12 text-zinc-300 mx-auto animate-spin" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">No Matching Curations Found</h4>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">Try resetting or widening price constraints to match legal, safe offerings.</p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="bg-blue-600 text-white font-bold text-xs py-2 px-6 rounded-xl shadow-md"
                  >
                    Reset Filter Parameters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      );
    }

    // Dynamic Single Product Page
    if (baseRoute === '#product' && routeParam) {
      const activeProd = products.find((p) => p.id === routeParam);

      if (activeProd) {
        return (
          <ProductPage
            product={activeProd}
            navigateTo={navigateTo}
            isWishlisted={wishlist.includes(activeProd.id)}
            onToggleWishlist={() => handleToggleWishlist(activeProd.id)}
            onAddToCart={() => handleAddToCart(activeProd)}
            onTrackAffiliateClick={handleTrackAffiliateClick}
            reviews={reviews}
            onAddReview={handleAddReview}
            allProducts={products}
          />
        );
      }
    }

    // Secure Admin Control Panel Workspace
    if (baseRoute === '#admin') {
      return (
        <AdminPanel
          products={products}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          articles={blogArticles}
          onAddArticle={handleAddBlogArticle}
          onDeleteArticle={handleDeleteBlogArticle}
          reviews={reviews}
          onDeleteReview={handleDeleteReview}
          navigateTo={navigateTo}
        />
      );
    }

    // Customer Session Profile Dashboard
    if (baseRoute === '#dashboard' && userEmail) {
      return (
        <UserDashboard
          userEmail={userEmail}
          onLogout={handleLogout}
          orderHistory={orderHistory}
          wishlist={wishlist}
          products={products}
          navigateTo={navigateTo}
        />
      );
    }

    // Secondary modular page renders
    return (
      <Pages
        currentRoute={currentRoute}
        navigateTo={navigateTo}
        products={products}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutComplete={handleCheckoutComplete}
        blogArticles={blogArticles}
        faqs={faqs}
        userEmail={userEmail}
        onLogin={handleLogin}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] dark:bg-[#09090b] text-[#111827] dark:text-zinc-100 transition-colors duration-300 selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Background Mesh Gradients for Frosted Glass design theme */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#2563EB]/8 dark:bg-[#2563EB]/4 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#38BDF8]/8 dark:bg-[#38BDF8]/4 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* 1. Global Navigation Bar */}
      <Header
        currentRoute={currentRoute}
        navigateTo={navigateTo}
        products={products}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      {/* 2. Core Active Page Viewport (Centered) */}
      <main className="flex-grow">
        {renderRouteContent()}
      </main>

      {/* 3. Global Information Footer */}
      <Footer navigateTo={navigateTo} />

      {/* ======================================================== */}
      {/* 4. PREMIUM AFFILIATE OUTBOUND REDIRECTION DRAWER */}
      {/* ======================================================== */}
      {redirectingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 max-w-md w-full p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 text-center text-zinc-900 dark:text-zinc-100 relative overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Sparkles backdrop */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-3">
              <div className="relative w-16 h-16 bg-blue-500/10 rounded-2xl mx-auto flex items-center justify-center text-blue-600 dark:text-sky-400">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span className="absolute text-xs font-black">{redirectCountdown}</span>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Secure Affiliate redirection
                </span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Securing outward route to {redirectingProduct.affiliateMarketplace}...
                </h3>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-2 text-left leading-normal font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Injecting Partner Tracking ID: <span className="font-mono font-bold text-zinc-900 dark:text-white">{redirectingProduct.trackingId}</span></span>
              </div>
              <p className="text-zinc-400 font-light leading-relaxed">
                We are routing your request through official securely verified linkages. This ensures complete buyer safety and lets us earn standard commission referral fees directly from {redirectingProduct.affiliateMarketplace} at absolutely zero extra expense to your account.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  window.open(redirectingProduct.affiliateUrl, '_blank', 'noopener,noreferrer');
                  setRedirectingProduct(null);
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <span>Redirect Immediately</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={() => setRedirectingProduct(null)}
                className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl text-xs"
              >
                Cancel Redirection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
