/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Users,
  Plus,
  Edit3,
  Trash2,
  Settings,
  FileText,
  Mail,
  Check,
  ShieldAlert,
  Star,
  Layers,
  Sparkles,
  Link,
  Tag,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Product, BlogArticle, Review } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onEditProduct: (prod: Product) => void;
  onDeleteProduct: (id: string) => void;
  articles: BlogArticle[];
  onAddArticle: (art: BlogArticle) => void;
  onDeleteArticle: (id: string) => void;
  reviews: Review[];
  onDeleteReview: (id: string) => void;
  navigateTo: (route: string) => void;
}

export function AdminPanel({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  articles,
  onAddArticle,
  onDeleteArticle,
  reviews,
  onDeleteReview,
  navigateTo
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'blogs' | 'reviews' | 'subscribers' | 'settings'>('dashboard');

  // Form states for Product Add/Edit
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('100');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formCategory, setFormCategory] = useState('Electronics');
  const [formBrand, setFormBrand] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formAvailability, setFormAvailability] = useState<'In Stock' | 'Low Stock' | 'Out of Stock'>('In Stock');
  const [formFeatures, setFormFeatures] = useState('');
  const [formSpecs, setFormSpecs] = useState('Weight: 1.2kg\nColor: Premium Slate');
  const [formImages, setFormImages] = useState('');
  const [formAffMarketplace, setFormAffMarketplace] = useState<'Amazon' | 'eBay' | 'Walmart' | 'BestBuy' | 'Apple' | 'Custom'>('Amazon');
  const [formAffUrl, setFormAffUrl] = useState('');
  const [formTrackingId, setFormTrackingId] = useState('wondwd-20');
  const [formCommNotes, setFormCommNotes] = useState('');
  const [formRedirectText, setFormRedirectText] = useState('');
  const [formTags, setFormTags] = useState('');

  // Toggles
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsTrending, setFormIsTrending] = useState(false);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [formIsEditor, setFormIsEditor] = useState(false);
  const [formIsDeal, setFormIsDeal] = useState(false);

  // Form show toggle
  const [showProductForm, setShowProductForm] = useState(false);

  // Blog Form State
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Lifestyle');
  const [blogAuthor, setBlogAuthor] = useState('Admin Editor');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800');

  // Newsletter Subscribers list
  const [subscribers, setSubscribers] = useState<{ email: string; date: string }[]>(() => {
    return JSON.parse(localStorage.getItem('wond-newsletter') || '[]');
  });

  // Global Affiliate Config State
  const [amazonTracking, setAmazonTracking] = useState('wondwd-20');
  const [ebayTracking, setEbayTracking] = useState('wond-ebay-20');
  const [walmartTracking, setWalmartTracking] = useState('wond-wal-20');
  const [commissionRate, setCommissionRate] = useState('5');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const resetProductForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormName('');
    setFormTagline('');
    setFormDescription('');
    setFormPrice('100');
    setFormOriginalPrice('');
    setFormCategory('Electronics');
    setFormBrand('');
    setFormSku('');
    setFormAvailability('In Stock');
    setFormFeatures('');
    setFormSpecs('Weight: 1.2kg\nColor: Premium Slate');
    setFormImages('');
    setFormAffMarketplace('Amazon');
    setFormAffUrl('');
    setFormTrackingId('wondwd-20');
    setFormCommNotes('');
    setFormRedirectText('');
    setFormTags('');
    setFormIsFeatured(false);
    setFormIsTrending(false);
    setFormIsBestSeller(false);
    setFormIsEditor(false);
    setFormIsDeal(false);
  };

  const handleOpenEdit = (p: Product) => {
    setIsEditing(true);
    setEditingId(p.id);
    setFormName(p.name);
    setFormTagline(p.tagline || '');
    setFormDescription(p.description);
    setFormPrice(p.price.toString());
    setFormOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setFormCategory(p.category);
    setFormBrand(p.brand);
    setFormSku(p.sku);
    setFormAvailability(p.availability);
    setFormFeatures(p.features.join('\n'));
    
    const specStr = Object.entries(p.specifications)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    setFormSpecs(specStr);
    
    setFormImages(p.images.join('\n'));
    setFormAffMarketplace(p.affiliateMarketplace);
    setFormAffUrl(p.affiliateUrl);
    setFormTrackingId(p.trackingId);
    setFormCommNotes(p.commissionNotes || '');
    setFormRedirectText(p.redirectButtonText || '');
    setFormTags(p.tags.join(', '));
    setFormIsFeatured(!!p.isFeatured);
    setFormIsTrending(!!p.isTrending);
    setFormIsBestSeller(!!p.isBestSeller);
    setFormIsEditor(!!p.isEditorChoice);
    setFormIsDeal(!!p.isTodayDeal);
    setShowProductForm(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formDescription || !formBrand || !formSku) {
      alert('Please fill out essential fields: Name, Brand, SKU, and Description.');
      return;
    }

    // Parse specifications from lines
    const parsedSpecs: Record<string, string> = {};
    formSpecs.split('\n').forEach((line) => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const k = line.substring(0, idx).trim();
        const v = line.substring(idx + 1).trim();
        if (k && v) parsedSpecs[k] = v;
      }
    });

    const featuresArray = formFeatures.split('\n').map((f) => f.trim()).filter(Boolean);
    const imagesArray = formImages.split('\n').map((i) => i.trim()).filter(Boolean);
    if (imagesArray.length === 0) {
      imagesArray.push('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800');
    }

    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);

    const priceNum = parseFloat(formPrice) || 0;
    const origPriceNum = parseFloat(formOriginalPrice) || undefined;
    const discountPct = origPriceNum && origPriceNum > priceNum
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)
      : undefined;

    const prodData: Product = {
      id: isEditing && editingId ? editingId : `prod-${Date.now()}`,
      name: formName,
      slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      tagline: formTagline || undefined,
      description: formDescription,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercentage: discountPct,
      rating: isEditing && editingId ? products.find(p => p.id === editingId)?.rating || 4.8 : 5.0,
      reviewCount: isEditing && editingId ? products.find(p => p.id === editingId)?.reviewCount || 1 : 1,
      images: imagesArray,
      category: formCategory,
      brand: formBrand,
      sku: formSku,
      availability: formAvailability,
      features: featuresArray,
      specifications: parsedSpecs,
      isFeatured: formIsFeatured,
      isTrending: formIsTrending,
      isBestSeller: formIsBestSeller,
      isEditorChoice: formIsEditor,
      isTodayDeal: formIsDeal,
      dateAdded: new Date().toISOString().split('T')[0],
      tags: tagsArray,
      affiliateMarketplace: formAffMarketplace,
      affiliateUrl: formAffUrl,
      trackingId: formTrackingId,
      commissionNotes: formCommNotes || undefined,
      redirectButtonText: formRedirectText || undefined
    };

    if (isEditing) {
      onEditProduct(prodData);
      triggerToast('Product successfully updated in directory.');
    } else {
      onAddProduct(prodData);
      triggerToast('New verified product successfully added.');
    }

    setShowProductForm(false);
    resetProductForm();
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogSummary || !blogContent) {
      alert('Please fill out all required blog fields.');
      return;
    }

    const articleData: BlogArticle = {
      id: `art-${Date.now()}`,
      title: blogTitle,
      slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      summary: blogSummary,
      content: blogContent,
      image: blogImage,
      category: blogCategory,
      author: blogAuthor,
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.max(2, Math.round(blogContent.split(' ').length / 200))} min read`,
      tags: [blogCategory.toLowerCase(), 'wellness', 'curation']
    };

    onAddArticle(articleData);
    triggerToast('Blog article published successfully.');
    setShowBlogForm(false);
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
  };

  const handleSaveAffConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('amazonTrackingId', amazonTracking);
    localStorage.setItem('ebayTrackingId', ebayTracking);
    localStorage.setItem('walmartTrackingId', walmartTracking);
    localStorage.setItem('generalCommissionRate', commissionRate);
    triggerToast('Global affiliate credentials saved.');
  };

  const handleDeleteProductClick = (id: string) => {
    if (confirm('Are you absolutely sure you want to delete this product? This is irreversible.')) {
      onDeleteProduct(id);
      triggerToast('Product removed.');
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.availability === 'In Stock').length;
  const outOfStockCount = products.filter(p => p.availability === 'Out of Stock').length;
  const mockClicks = products.reduce((acc, p) => acc + (p.reviewCount * 3), 1420);
  const mockEarnings = mockClicks * 1.85;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Panel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-sky-400 tracking-wider uppercase mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Secure Administrator workspace</span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            WOND.WD Command Panel
          </h1>
        </div>

        {/* Global actions */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              resetProductForm();
              setShowProductForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Curation</span>
          </button>
          <button
            onClick={() => navigateTo('#home')}
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs px-4 py-3 rounded-xl transition-all"
          >
            Go to Live Store
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto gap-2 mb-8 no-scrollbar">
        {[
          { id: 'dashboard', label: 'Overview', icon: TrendingUp },
          { id: 'products', label: 'Manage Products', icon: Layers },
          { id: 'blogs', label: 'Blogs & Articles', icon: FileText },
          { id: 'reviews', label: 'User Reviews', icon: Star },
          { id: 'subscribers', label: 'Bulletins Subscriptions', icon: Mail },
          { id: 'settings', label: 'Affiliate Configurations', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setShowProductForm(false);
                setShowBlogForm(false);
              }}
              className={`py-3.5 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-sky-400 dark:border-sky-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CORE ADMIN CONTENT SWITCH */}

      {/* A. PRODUCT FORM OVERLAY */}
      {showProductForm && (
        <div className="bg-white/45 dark:bg-zinc-900/40 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 md:p-8 rounded-3xl mb-8 shadow-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              {isEditing ? 'Modify Verified Product Curation' : 'Publish New Verified Curation'}
            </h3>
            <button
              onClick={() => {
                setShowProductForm(false);
                resetProductForm();
              }}
              className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveProduct} className="space-y-6">
            
            {/* 1. Core Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Product Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Somnia Silk Sleep Mask"
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. Absolute Dark. Premium Rest."
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">SKU Identification *</label>
                <input
                  type="text"
                  value={formSku}
                  onChange={(e) => setFormSku(e.target.value)}
                  placeholder="e.g. SM-SILK-LAV-15"
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* 2. Categorization & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Brand Name *</label>
                <input
                  type="text"
                  value={formBrand}
                  onChange={(e) => setFormBrand(e.target.value)}
                  placeholder="e.g. Somnia Wellness"
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Curation Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Health">Health</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Travel">Travel</option>
                  <option value="Office">Office</option>
                  <option value="Baby">Baby</option>
                  <option value="Pets">Pets</option>
                  <option value="Phone Accessories">Phone Accessories</option>
                  <option value="Smart Gadgets">Smart Gadgets</option>
                  <option value="Car Accessories">Car Accessories</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Curation Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Original Price ($) (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formOriginalPrice}
                  onChange={(e) => setFormOriginalPrice(e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* 3. Description & features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Product Description *</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={4}
                  placeholder="Deep details about certified composition, testing, and luxury value..."
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Key Features (one per line)</label>
                <textarea
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  rows={4}
                  placeholder="100% GOTS Organic Silk&#10;Contoured zero sleep pressure&#10;Adjustable soft headband"
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* 4. Specifications & Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Technical Specifications (Key: Value - one per line)</label>
                <textarea
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  rows={4}
                  placeholder="Material: 22 Momme Silk&#10;Weight: 65 grams&#10;Country of Origin: France"
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 block mb-1">Product Image URLs (one per line)</label>
                <textarea
                  value={formImages}
                  onChange={(e) => setFormImages(e.target.value)}
                  rows={4}
                  placeholder="https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800"
                  className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* 5. Affiliate Integration Configs */}
            <div className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md p-5 rounded-2xl border border-white/60 dark:border-zinc-800/40 space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                <Link className="w-4 h-4 text-blue-500" />
                <span>Affiliate System Integration Parameters</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Target Marketplace</label>
                  <select
                    value={formAffMarketplace}
                    onChange={(e) => setFormAffMarketplace(e.target.value as any)}
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  >
                    <option value="Amazon">Amazon Associates</option>
                    <option value="eBay">eBay Partner Network</option>
                    <option value="Walmart">Walmart Affiliates</option>
                    <option value="BestBuy">Best Buy Partner</option>
                    <option value="Apple">Apple Partner Link</option>
                    <option value="Custom">Custom Brand Partner</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Tracking Referral URL *</label>
                  <input
                    type="url"
                    value={formAffUrl}
                    onChange={(e) => setFormAffUrl(e.target.value)}
                    placeholder="https://www.amazon.com/dp/B08HMWZ2K3"
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Tracking ID Code (SubID)</label>
                  <input
                    type="text"
                    value={formTrackingId}
                    onChange={(e) => setFormTrackingId(e.target.value)}
                    placeholder="wondwd-20"
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Commission Notes</label>
                  <input
                    type="text"
                    value={formCommNotes}
                    onChange={(e) => setFormCommNotes(e.target.value)}
                    placeholder="e.g. Standard 6% commission rate"
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Buy Button Text Overwrite</label>
                  <input
                    type="text"
                    value={formRedirectText}
                    onChange={(e) => setFormRedirectText(e.target.value)}
                    placeholder="e.g. Check Price on Amazon"
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="premium, wellness, silk"
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 6. Availability & Classification Toggles */}
            <div className="bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md p-5 rounded-2xl border border-white/60 dark:border-zinc-800/40 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Stock Status Selection</label>
                  <div className="flex gap-2">
                    {['In Stock', 'Low Stock', 'Out of Stock'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFormAvailability(st as any)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                          formAvailability === st
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 block">Classifications</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { state: formIsFeatured, setter: setFormIsFeatured, label: 'Featured' },
                      { state: formIsTrending, setter: setFormIsTrending, label: 'Trending' },
                      { state: formIsBestSeller, setter: setFormIsBestSeller, label: 'Best Seller' },
                      { state: formIsEditor, setter: setFormIsEditor, label: 'Editor Choice' },
                      { state: formIsDeal, setter: setFormIsDeal, label: 'Today Deal' }
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => item.setter(!item.state)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          item.state
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {item.state && <Check className="w-3 h-3" />}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <button
                type="button"
                onClick={() => {
                  setShowProductForm(false);
                  resetProductForm();
                }}
                className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-750 rounded-xl text-zinc-700 dark:text-zinc-300 font-bold text-xs"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs"
              >
                {isEditing ? 'Update Directory Item' : 'Add to Curation Inventory'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ACTIVE VIEW CORNER */}

      {/* 1. DASHBOARD VIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Active Curations', value: totalProducts, change: `${inStockCount} in stock`, icon: Layers, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Hypothetical Commission', value: `$${mockEarnings.toFixed(2)}`, change: 'Based on 4% avg rate', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Outbound Partner Clicks', value: mockClicks, change: '100% organic interest', icon: MousePointerClick, color: 'text-sky-500 bg-sky-500/10' },
              { label: 'Newsletter Subscribers', value: subscribers.length + 32, change: 'Double compared to last month', icon: Users, color: 'text-purple-500 bg-purple-500/10' }
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-2xl md:rounded-3xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{metric.label}</span>
                    <div className={`p-2.5 rounded-xl ${metric.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-zinc-950 dark:text-white leading-none">{metric.value}</h4>
                  <p className="text-[11px] text-zinc-400 mt-2 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{metric.change}</span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Help Guide */}
          <div className="bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-2xl md:rounded-3xl">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Affiliate Integration Architecture Manual</span>
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
              Every item stored in the inventory utilizes clean affiliate parameters. In this admin panel, you can configure precise tracking links. In the next structural version, these fields will hook directly to global marketplace APIs (Amazon PA-API, eBay Partner REST, and Walmart Marketplace APIs) using the credentials defined under the 'Affiliate Configurations' settings tab.
            </p>
          </div>

          {/* Low Stock Warning Panel */}
          <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-2xl md:rounded-3xl shadow-lg">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">Low Stock Curation Warning (Requires Refresh Verification)</h4>
            <div className="space-y-3">
              {products.filter(p => p.availability !== 'In Stock').map(p => (
                <div key={p.id} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-900">
                  <div className="min-w-0 flex items-center gap-3">
                    <img src={p.images[0]} className="w-8 h-8 rounded-md object-cover" />
                    <div>
                      <h5 className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[200px]">{p.name}</h5>
                      <span className="text-[10px] font-mono text-zinc-400">{p.sku}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                    p.availability === 'Low Stock' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400'
                  }`}>
                    {p.availability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS DIRECTORY TABLE */}
      {activeTab === 'products' && (
        <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 rounded-2xl md:rounded-3xl shadow-lg overflow-hidden animate-in fade-in duration-500">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Active Product Curation Directory ({products.length} Products)</h3>
            <button
              onClick={() => {
                resetProductForm();
                setShowProductForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg flex items-center gap-1 uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Entry</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Product Details</th>
                  <th className="p-4">SKU Code</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Marketplace</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Commission</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-zinc-100" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-zinc-900 dark:text-white truncate max-w-[220px]">{p.name}</h4>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{p.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-semibold text-zinc-600 dark:text-zinc-400">{p.sku}</td>
                    <td className="p-4 font-medium text-zinc-800 dark:text-zinc-200">{p.category}</td>
                    <td className="p-4">
                      <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40">
                        {p.affiliateMarketplace}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">${p.price.toFixed(2)}</td>
                    <td className="p-4 text-[11px] text-zinc-400">{p.commissionNotes || 'Standard Referrals'}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all"
                          title="Edit Details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProductClick(p.id)}
                          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. BLOG MANAGER VIEW */}
      {activeTab === 'blogs' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Scientific Curation & Insights Articles ({articles.length} Published)</h3>
            <button
              onClick={() => {
                setShowBlogForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg flex items-center gap-1 uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Compose Article</span>
            </button>
          </div>

          {showBlogForm && (
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in zoom-in-95">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Compose Curation Insights Post</h4>
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400">Article Title *</label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. Cleansing the Bedroom Air Safely"
                      className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400">Visual Header Image URL</label>
                    <input
                      type="text"
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400">Category Tag</label>
                    <input
                      type="text"
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      placeholder="e.g. Skincare Science"
                      className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400">Author Name</label>
                    <input
                      type="text"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      placeholder="e.g. Dr. Jane Doe"
                      className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs"
                    >
                      Publish Post Now
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400">Short Summary *</label>
                  <input
                    type="text"
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    placeholder="Brief description for blog previews..."
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400">Rich Body Content (Markdown supported) *</label>
                  <textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    rows={6}
                    placeholder="Write detailed advice and product linkages..."
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-white font-mono"
                    required
                  />
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div key={art.id} className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 p-5 rounded-2xl flex gap-4">
                <img src={art.image} alt={art.title} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold text-blue-600 dark:text-sky-400 uppercase tracking-widest">{art.category}</span>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate mt-1">{art.title}</h4>
                    <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1">{art.summary}</p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                    <span>By {art.author}</span>
                    <button
                      onClick={() => onDeleteArticle(art.id)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. REVIEWS MODERATION VIEW */}
      {activeTab === 'reviews' && (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl md:rounded-3xl p-6 animate-in fade-in duration-500">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-6">User Reviews Moderation Center</h3>
          
          <div className="space-y-4">
            {reviews.map((rev) => {
              const matchingProd = products.find(p => p.id === rev.productId);
              return (
                <div key={rev.id} className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 flex justify-between items-start gap-4 flex-wrap">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 font-black text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
                      {rev.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">{rev.userName}</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">{rev.comment}</p>
                      
                      {matchingProd && (
                        <div className="mt-2 text-[10px] font-semibold text-zinc-400">
                          Reviewed on product: <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigateTo(`#product/${matchingProd.id}`)}>{matchingProd.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 font-mono block mb-2">{rev.date}</span>
                    <button
                      onClick={() => onDeleteReview(rev.id)}
                      className="text-red-500 font-semibold text-[11px] hover:underline"
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. NEWSLETTER SUBSCRIBERS LIST */}
      {activeTab === 'subscribers' && (
        <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 rounded-2xl md:rounded-3xl p-6 shadow-lg animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Newsletter Bulletin Registrations</h3>
              <p className="text-[11px] text-zinc-400">Subscribed users receiving weekly curation alerts</p>
            </div>
            <span className="bg-blue-600 text-white font-bold text-[10px] px-3 py-1 rounded-full">{subscribers.length} Emails</span>
          </div>

          {subscribers.length > 0 ? (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {subscribers.map((sub, index) => (
                <div key={index} className="py-3 flex justify-between items-center font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs text-zinc-800 dark:text-zinc-200">{sub.email}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {sub.date ? new Date(sub.date).toLocaleDateString() : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-zinc-500">
              No direct local registrations recorded yet. Submit the footer newsletter form to see entries accumulate here instantly.
            </div>
          )}
        </div>
      )}

      {/* 6. GLOBAL SETTINGS & AFFILIATE CONFS */}
      {activeTab === 'settings' && (
        <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg animate-in fade-in duration-500">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">Global Marketplace API Configs</h3>
          <p className="text-xs text-zinc-400 mb-6">Provide API tracking keys and default fallback identifiers applied automatically to newly generated items.</p>
          
          <form onSubmit={handleSaveAffConfig} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 block">Amazon Associate Tracking ID</label>
                <input
                  type="text"
                  value={amazonTracking}
                  onChange={(e) => setAmazonTracking(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-[10px] text-zinc-400 block">Appends automatically as ?tag=ID to Amazon URLs</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 block">eBay Partner SubID Identifier</label>
                <input
                  type="text"
                  value={ebayTracking}
                  onChange={(e) => setEbayTracking(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-[10px] text-zinc-400 block">Appends as &customid=ID to eBay links</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 block">Walmart Affiliate Tracking ID</label>
                <input
                  type="text"
                  value={walmartTracking}
                  onChange={(e) => setWalmartTracking(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 block">Default Curation Commission Rate (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-[10px] text-zinc-400 block">Used for calculating command dashboard analytics</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all"
              >
                Save Global Configs
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
