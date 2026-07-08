/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Calendar,
  User,
  Clock3,
  Heart,
  ShoppingBag,
  Trash2,
  Lock,
  ArrowRight,
  Sparkles,
  CreditCard,
  Percent,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { Product, BlogArticle, FAQItem, CartItem, Order } from '../types';

interface PagesProps {
  currentRoute: string;
  navigateTo: (route: string) => void;
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  cart: CartItem[];
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onCheckoutComplete: (order: Order) => void;
  blogArticles: BlogArticle[];
  faqs: FAQItem[];
  userEmail: string | null;
  onLogin: (email: string) => void;
}

export function Pages({
  currentRoute,
  navigateTo,
  products,
  wishlist,
  onToggleWishlist,
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  onCheckoutComplete,
  blogArticles,
  faqs,
  userEmail,
  onLogin
}: PagesProps) {
  
  // Extract route path & params (e.g., #blog/art-1)
  const routeParts = currentRoute.split('/');
  const baseRoute = routeParts[0];
  const routeParam = routeParts[1];

  // 1. CONTACT FORM STATE
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMsg) {
      setContactSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }
  };

  // 2. FAQ ACCORDION STATE
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');

  // 3. LOGIN / REGISTRATION STATES
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authFeedback, setAuthFeedback] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authEmail.includes('@')) {
      setAuthFeedback('Please provide a legitimate email address.');
      return;
    }
    if (authMode === 'login') {
      onLogin(authEmail);
      navigateTo('#dashboard');
    } else if (authMode === 'register') {
      onLogin(authEmail);
      setAuthFeedback('Account successfully registered under WOND.WD security layers!');
      setTimeout(() => navigateTo('#dashboard'), 1500);
    } else {
      setAuthFeedback('Verification link sent to your inbox. Check spam if not arrived.');
    }
  };

  // 4. CHECKOUT STATES
  const [chkName, setChkName] = useState('');
  const [chkEmail, setChkEmail] = useState(userEmail || '');
  const [chkAddress, setChkAddress] = useState('');
  const [chkCity, setChkCity] = useState('');
  const [chkZip, setChkZip] = useState('');
  const [chkCountry, setChkCountry] = useState('United States');
  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'paypal' | 'transfer'>('stripe');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WOND2026' || promoCode.toUpperCase() === 'WELCOME') {
      setPromoDiscount(15);
      setPromoFeedback('Promo code applied: 15% discount!');
    } else {
      setPromoFeedback('Invalid or expired coupon code.');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chkName || !chkEmail || !chkAddress || !chkCity || !chkZip) {
      alert('Please fill out all essential shipping parameters.');
      return;
    }

    // Compile order
    const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discountVal = (cartTotal * promoDiscount) / 100;
    const finalTotal = cartTotal - discountVal;

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0]
      })),
      totalAmount: finalTotal,
      status: 'Completed',
      marketplaceRedirected: cart[0]?.product.affiliateMarketplace || 'Amazon'
    };

    onCheckoutComplete(newOrder);
    onClearCart();
    
    // Success flow - redirect to dashboard with order history loaded
    alert(`Curation order simulation successfully compiled!\n\nOrder ID: ${newOrder.id}\nTotal: $${finalTotal.toFixed(2)}\nGateway: ${paymentGateway.toUpperCase()}\n\nAs an affiliate e-commerce model, you are redirected to the merchant to conclude official delivery. We have logged this simulation in your order history!`);
    navigateTo('#dashboard');
  };

  // 5. BLOG SEARCH STATE
  const [blogSearch, setBlogSearch] = useState('');
  const filteredArticles = blogArticles.filter(art => 
    art.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
    art.summary.toLowerCase().includes(blogSearch.toLowerCase()) ||
    art.category.toLowerCase().includes(blogSearch.toLowerCase())
  );


  // CORE VIEWS RENDER SWITCH
  
  // =============================================
  // ABOUT PAGE
  // =============================================
  if (baseRoute === '#about') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500">
          <div className="space-y-4 text-center">
            <span className="bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-sky-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              ESTABLISHED 2026 &bull; QUALITY ASSURED
            </span>
            <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              Our Curation Directives
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xl mx-auto">
              WOND.WD stands at the pinnacle of smart affiliate shopping. We do not manufacture; we analyze, verify, and represent safe legal products.
            </p>
          </div>

          <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-100 border dark:border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200"
              alt="Quality Lab"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">The Zero-Hazard Pledge</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Most global marketplaces are flooded with unverified sellers, leading to lead-contaminated toys, hazardous electrical wiring, and fake cosmetic chemicals that harm your skin. WOND.WD filters the clutter, keeping your household completely safe.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Smart Scientific Curation</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Our team audits certified material declarations, structural load tests, and user satisfaction logs before recommending. If any brand compromises their build standards, we prune them instantly from our directory.
              </p>
            </div>
          </div>

          {/* Curation Stats */}
          <div className="bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-8 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">100%</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Verified Legal</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">4.8★</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Avg Product Rating</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">0%</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Hazardous Materials</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-blue-600 dark:text-sky-400">20+</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Curated Markets</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =============================================
  // CONTACT PAGE
  // =============================================
  if (baseRoute === '#contact') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-in fade-in duration-500">
          
          {/* Contact Details & Maps placeholder */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">Connect with our team</span>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">WOND.WD Curation Bureau</h1>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Have questions regarding material certifications or want to propose a product for safe listing? Contact our laboratory division directly.
              </p>
            </div>

            {/* Quick stats details */}
            <div className="space-y-4 text-xs font-medium">
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>650 Silicon Boulevard, Suite 100, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+1 (800) 555-WOND (9663)</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>curator@wond.wd</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Monday - Friday: 09:00 - 18:00 PST</span>
              </div>
            </div>

            {/* Google Maps Premium Placeholder with styling */}
            <div className="relative w-full h-64 rounded-2xl md:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              {/* Grid abstract patterns */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              
              <div className="relative z-10 space-y-3">
                <div className="inline-flex p-3 bg-blue-500/10 rounded-full text-blue-600 dark:text-sky-400">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Google Maps Interactive Area</h4>
                <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed">
                  [650 Silicon Boulevard, San Francisco] Map interface integration disabled for local frame security. Open in new tab to unlock live tracking.
                </p>
                <span className="text-[9px] font-mono font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 py-1 px-2.5 rounded-md inline-block uppercase">37.7749° N, 122.4194° W</span>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 md:p-8 rounded-3xl shadow-lg">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">Dispatch Inquiries</h3>
            <p className="text-xs text-zinc-400 mb-6">Our average response latency is under 12 hours.</p>

            {contactSubmitted ? (
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 p-5 rounded-2xl text-blue-600 dark:text-blue-400 text-xs animate-in zoom-in-95">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm">Inquiry received!</p>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-1">Our certified curator will analyze your message and reply back promptly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-3 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full p-3 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1">Message Detail *</label>
                  <textarea
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    rows={4}
                    placeholder="Provide details of your safety certificate inquiry..."
                    className="w-full p-3 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    );
  }

  // =============================================
  // FAQ PAGE
  // =============================================
  if (baseRoute === '#faq') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">Help Center</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Frequently Asked Questions</h1>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">Get transparent answers regarding our affiliate system parameters and safety guidelines.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 rounded-xl overflow-hidden shadow-md"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 flex justify-between items-center text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/30 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =============================================
  // WISHLIST VIEW
  // =============================================
  if (baseRoute === '#wishlist') {
    const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">SAVED ITEMS</span>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Your Wishlist</h1>
            </div>
            <span className="text-xs font-mono font-bold text-zinc-400">{wishlistedProducts.length} Items</span>
          </div>

          {wishlistedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl overflow-hidden group shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-50">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => onToggleWishlist(p.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-red-500 text-white shadow"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase block">{p.brand}</span>
                      <h4
                        className="text-xs font-bold text-zinc-900 dark:text-white truncate cursor-pointer hover:text-blue-500 mt-0.5"
                        onClick={() => navigateTo(`#product/${p.id}`)}
                      >
                        {p.name}
                      </h4>
                      <p className="text-xs font-black text-zinc-950 dark:text-white mt-1">${p.price.toFixed(2)}</p>
                    </div>

                    <button
                      onClick={() => {
                        navigateTo(`#product/${p.id}`);
                      }}
                      className="w-full bg-zinc-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-[10px] py-2 rounded-xl transition-colors uppercase tracking-wider flex items-center justify-center gap-1"
                    >
                      <span>Checkout Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 space-y-4">
              <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Your Wishlist is Empty</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">Click the heart button on any curation to collect items here securely.</p>
              </div>
              <button
                onClick={() => navigateTo('#shop')}
                className="bg-blue-600 text-white font-bold text-xs py-2 px-6 rounded-xl"
              >
                Go to Shop Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =============================================
  // CART VIEW
  // =============================================
  if (baseRoute === '#cart') {
    const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">LOCAL PERSISTENCE</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Your Cart</h1>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Cart List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-4 rounded-xl md:rounded-2xl flex gap-4 items-center shadow-md"
                  >
                    <img src={item.product.images[0]} className="w-16 h-16 object-cover rounded-xl" />
                    
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-xs font-bold text-zinc-900 dark:text-white truncate cursor-pointer hover:text-blue-500"
                        onClick={() => navigateTo(`#product/${item.product.id}`)}
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{item.product.brand}</p>
                      <p className="text-xs font-black text-zinc-950 dark:text-white mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center rounded-lg font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center rounded-lg font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveFromCart(item.product.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary Checkout Card */}
              <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-3xl space-y-4 shadow-lg">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest pb-3 border-b border-zinc-100 dark:border-zinc-900">
                  Cart Order Summary
                </h3>
                
                <div className="space-y-2.5 text-xs text-zinc-500 font-medium">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="text-zinc-900 dark:text-white font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Curation Surcharges</span>
                    <span className="text-emerald-500 font-bold">$0.00 (FREE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Surcharge</span>
                    <span className="text-emerald-500 font-bold">$0.00 (FREE)</span>
                  </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex justify-between items-baseline font-bold text-sm">
                  <span className="text-zinc-900 dark:text-white">Estimated Total</span>
                  <span className="text-lg font-black text-zinc-950 dark:text-white">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigateTo('#checkout')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-1 shadow-md uppercase tracking-wider"
                >
                  <span>Proceed to Safe Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 space-y-4">
              <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto animate-pulse" />
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Your Cart is Empty</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">Items added in local cart will be saved in memory for smooth processing.</p>
              </div>
              <button
                onClick={() => navigateTo('#shop')}
                className="bg-blue-600 text-white font-bold text-xs py-2 px-6 rounded-xl"
              >
                Go to Shop Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =============================================
  // CHECKOUT PAGE
  // =============================================
  if (baseRoute === '#checkout') {
    const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discountVal = (cartTotal * promoDiscount) / 100;
    const finalTotal = cartTotal - discountVal;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 animate-in fade-in duration-500">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">SECURE PAYMENT ROUTER</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-3 bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-3xl space-y-6 shadow-lg">
              <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">Shipping Details</h3>
              
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">Receiver Name *</label>
                    <input
                      type="text"
                      value={chkName}
                      onChange={(e) => setChkName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">Email Coordinates *</label>
                    <input
                      type="email"
                      value={chkEmail}
                      onChange={(e) => setChkEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    value={chkAddress}
                    onChange={(e) => setChkAddress(e.target.value)}
                    placeholder="Suite, Street No, Landmark..."
                    className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">City *</label>
                    <input
                      type="text"
                      value={chkCity}
                      onChange={(e) => setChkCity(e.target.value)}
                      placeholder="e.g. San Jose"
                      className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={chkZip}
                      onChange={(e) => setChkZip(e.target.value)}
                      placeholder="e.g. 95112"
                      className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">Country</label>
                    <input
                      type="text"
                      value={chkCountry}
                      onChange={(e) => setChkCountry(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/20 dark:bg-zinc-900/20 text-zinc-400 dark:text-zinc-500 backdrop-blur-md"
                      disabled
                    />
                  </div>
                </div>

                {/* Gateway Integration Presets */}
                <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span>Select Payment Gateway Protocol</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'stripe', label: 'Stripe Sandbox' },
                      { id: 'paypal', label: 'PayPal Portal' },
                      { id: 'transfer', label: 'Bank Transfer' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setPaymentGateway(g.id as any)}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          paymentGateway === g.id
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal italic">
                    Note: WOND.WD acts as a premium affiliate catalog. Submitting checkout logs the order in your client profile and links tracking IDs seamlessly during direct outbound redirection to complete payments.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs uppercase tracking-wider"
                >
                  Conclude Certified Checkout
                </button>
              </form>
            </div>

            {/* Order summary column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-5 rounded-3xl space-y-4 shadow-lg">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-3">Your Curation Order</h4>
                
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cart.map((i) => (
                    <div key={i.product.id} className="flex gap-2.5 items-center">
                      <img src={i.product.images[0]} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">{i.product.name}</h5>
                        <p className="text-[10px] text-zinc-400 font-semibold">Qty {i.quantity} &bull; ${i.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code area */}
                <div className="border-t border-zinc-150 dark:border-zinc-800 pt-4 space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Have Partner Coupon?</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="e.g. WOND2026"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold uppercase text-zinc-900 dark:text-white"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-zinc-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-[10px] px-3 rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                  {promoFeedback && (
                    <p className="text-[10px] font-bold text-emerald-500 animate-pulse">{promoFeedback}</p>
                  )}
                </div>

                <div className="space-y-2 text-xs border-t border-zinc-200 dark:border-zinc-800 pt-4 text-zinc-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>Promo Discount ({promoDiscount}%)</span>
                      <span className="font-bold">-${discountVal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                    <span>Estimate Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =============================================
  // LOGIN / REGISTRATION PAGE
  // =============================================
  if (baseRoute === '#login' || baseRoute === '#register' || baseRoute === '#forgot-password') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full bg-white/45 dark:bg-zinc-950/45 backdrop-blur-xl border border-white/60 dark:border-zinc-800/40 p-8 rounded-3xl shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              {authMode === 'login' ? 'Welcome Back' : authMode === 'register' ? 'Create Secure Profile' : 'Reset Coordinates'}
            </h1>
            <p className="text-xs text-zinc-400">Secure credentials and localized session storage</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-400 block mb-1">Email coordinates *</label>
              <input
                type="email"
                placeholder="you@domain.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            {authMode !== 'forgot' && (
              <div>
                <label className="text-[10px] font-bold text-zinc-400 block mb-1">Password Credentials *</label>
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            )}

            {authFeedback && (
              <p className="text-[10px] font-bold text-amber-500 text-center animate-pulse">{authFeedback}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md uppercase tracking-wider"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{authMode === 'login' ? 'Authenticate' : authMode === 'register' ? 'Register' : 'Transmit Reset Link'}</span>
            </button>
          </form>

          {/* Switch togglers */}
          <div className="flex justify-between text-xs font-semibold text-zinc-500 pt-4 border-t border-zinc-100 dark:border-zinc-900">
            {authMode === 'login' ? (
              <>
                <button onClick={() => setAuthMode('register')} className="hover:text-blue-500">Sign Up</button>
                <button onClick={() => setAuthMode('forgot')} className="hover:text-blue-500">Forgot Pass?</button>
              </>
            ) : (
              <button onClick={() => setAuthMode('login')} className="w-full text-center hover:text-blue-500">Already have account? Sign In</button>
            )}
          </div>

        </div>
      </div>
    );
  }

  // =============================================
  // INSIGHTS BLOG LIST
  // =============================================
  if (baseRoute === '#blog') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="space-y-8 animate-in fade-in duration-500">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">CURATOR BULLETINS</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Curation Insights & Safety News</h1>
            <p className="text-xs text-zinc-500">Scientific studies on home safety, product compliance, sleep physiology, and pure organic materials.</p>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search health and safety studies..."
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              className="w-full px-4 py-3 text-xs border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-white rounded-xl focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigateTo(`#blog-details/${art.slug}`)}
                className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-blue-500 uppercase">{art.category}</span>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed font-light">{art.summary}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-400">
                  <span className="font-semibold text-zinc-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    {art.author}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock3 className="w-3.5 h-3.5 text-zinc-400" />
                    {art.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // =============================================
  // BLOG DETAIL VIEW
  // =============================================
  if (baseRoute === '#blog-details' && routeParam) {
    const article = blogArticles.find(a => a.slug === routeParam);

    if (!article) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-zinc-500">
          Article parameters not found. Return back to index.
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <article className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
          
          <button
            onClick={() => navigateTo('#blog')}
            className="text-xs font-bold text-zinc-500 hover:text-blue-500 flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to bulletins list</span>
          </button>

          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">{article.category}</span>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs text-zinc-400 border-y border-zinc-100 dark:border-zinc-900 py-3 font-semibold">
              <span className="flex items-center gap-1"><User className="w-4 h-4 text-zinc-400" /> By {article.author}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-zinc-400" /> {article.date}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 font-mono"><Clock3 className="w-4 h-4 text-zinc-400" /> {article.readTime}</span>
            </div>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50">
            <img src={article.image} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Simple markdown rendering */}
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-6 font-light">
            {article.content.split('\n\n').map((para, index) => {
              if (para.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-bold text-zinc-900 dark:text-white pt-4">{para.replace('### ', '')}</h3>;
              }
              if (para.startsWith('* ')) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1">
                    {para.split('\n').map((item, idx) => (
                      <li key={idx}>{item.replace('* ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{para}</p>;
            })}
          </div>

        </article>
      </div>
    );
  }

  // =============================================
  // TODAY'S HOT DEALS PAGE
  // =============================================
  if (baseRoute === '#deals') {
    const dealProducts = products.filter(p => p.isTodayDeal || p.discountPercentage);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="space-y-8 animate-in fade-in duration-500">
          
          <div className="text-center bg-gradient-to-r from-red-600/10 via-amber-600/10 to-red-600/10 border border-red-500/20 p-8 rounded-3xl space-y-3">
            <span className="bg-red-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">EXCLUSIVE OPPORTUNITY</span>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">Today's Promoted Deals</h1>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">High-quality, legal curations currently featured with exclusive partner-link discount coordinates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigateTo(`#product/${p.id}`)}
                className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900/80 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between transition-all"
              >
                <div className="relative aspect-[4/3] bg-zinc-50">
                  <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 bg-red-500 text-white font-bold text-[9px] px-2 py-0.5 rounded">
                    SAVE {p.discountPercentage || 15}%
                  </span>
                </div>
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-zinc-400 block uppercase">{p.brand}</span>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate mt-0.5">{p.name}</h4>
                    <div className="flex gap-2 items-baseline mt-1">
                      <span className="text-xs font-black text-zinc-950 dark:text-white">${p.price.toFixed(2)}</span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-zinc-400 line-through">${p.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  <button className="w-full bg-red-500 text-white text-[10px] font-bold uppercase py-2 rounded-xl">
                    Check Promoted Offer
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // =============================================
  // LEGAL DISCLOSURES & COMPLIANCES PAGES
  // =============================================
  if (baseRoute === '#disclosure' || baseRoute === '#privacy' || baseRoute === '#cookies' || baseRoute === '#terms') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 text-zinc-700 dark:text-zinc-300 font-light leading-relaxed text-xs">
          
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">
            {baseRoute === '#disclosure' && 'Affiliate Advertising & Curation Disclosure'}
            {baseRoute === '#privacy' && 'Curation Network Privacy Policy'}
            {baseRoute === '#cookies' && 'Cookie Tracking Technologies'}
            {baseRoute === '#terms' && 'Curation Platform Terms of Service'}
          </h1>

          {baseRoute === '#disclosure' && (
            <div className="space-y-4">
              <p>WOND.WD is a privately operated premium catalog and consumer review service. We believe in complete transparency under Federal Trade Commission compliance parameters.</p>
              <p className="font-bold">1. Referral Commissions Policy</p>
              <p>When you browse WOND.WD, you will see prominent "Buy Now" or "Check Price" buttons on products. Clicking these buttons redirects you securely to official merchants (e.g. Amazon.com, Walmart, Best Buy) via highly secure encoded tracking links. If you complete a purchase, WOND.WD may receive a minor referral fee directly from the merchant as a gratitude payment for our scientific curation. This occurs at absolutely zero added expense to you.</p>
              <p className="font-bold">2. Our Editorial Neutrality</p>
              <p>Merchants never compensate us to write artificially positive comments. If an item fails our material structure checks, we do not showcase it. Our curations are dictated solely by structural parameters, GOTS/OEKO certified purity, and community satisfaction rankings.</p>
            </div>
          )}

          {baseRoute === '#privacy' && (
            <div className="space-y-4">
              <p>WOND.WD respects your physical and digital privacy coordinates. This policy breaks down what parameters are stored when navigating our network.</p>
              <p className="font-bold">1. Stored Coordinates</p>
              <p>We do not collect banking details, credit card numbers, or physical home security pins. The email coordinates submitted to the newsletter and checkout modules are stored locally inside sandboxed browser parameters to facilitate order simulation and tracking verification.</p>
              <p className="font-bold">2. Outbound Destination Policy</p>
              <p>Clicking outbound partner links transports you to secure marketplaces carrying independent encryption structures. Please consult merchant privacy schedules to verify their data collection parameters.</p>
            </div>
          )}

          {baseRoute === '#cookies' && (
            <div className="space-y-4">
              <p>WOND.WD utilizes minor tracking cookie structures to maintain cart states, wishlist lists, and affiliate sub-ID coordinates.</p>
              <p className="font-bold">1. Functional Storage</p>
              <p>These temporary files store items added to the Cart and Wishlist to avoid data losses when closing or refreshing tabs. They do not trace your external browsing coordinates or compromise computer security.</p>
            </div>
          )}

          {baseRoute === '#terms' && (
            <div className="space-y-4">
              <p>By entering the WOND.WD platform, you agree to respect our quality parameters and curation intellectual properties.</p>
              <p className="font-bold">1. Commercial Liability</p>
              <p>WOND.WD represents but does not directly sell the featured curations. Any product defects, shipping delays, or return processes are handled exclusively by the corresponding merchant (Amazon, Best Buy, etc.). WOND.WD holds no commercial or physical liability for operations on those external portals.</p>
            </div>
          )}

        </div>
      </div>
    );
  }

  // =============================================
  // DEFAULT 404 PAGE
  // =============================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Compass className="w-16 h-16 text-blue-500 animate-spin" />
      <h1 className="text-4xl font-black text-zinc-900 dark:text-white">Coordinate Lost (404)</h1>
      <p className="text-xs text-zinc-400 max-w-xs leading-normal">The requested page slug does not exist inside our certified directory.</p>
      <button
        onClick={() => navigateTo('#home')}
        className="bg-blue-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl"
      >
        Return to Home Coordinates
      </button>
    </div>
  );
}
