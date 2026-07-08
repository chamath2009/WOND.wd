/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounts
  rating: number;
  reviewCount: number;
  images: string[];
  videoUrl?: string;
  category: string; // e.g. "Electronics", "Home & Kitchen", etc.
  brand: string;
  sku: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  features: string[];
  specifications: Record<string, string>;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isEditorChoice?: boolean;
  isTodayDeal?: boolean;
  discountPercentage?: number;
  dateAdded: string;
  tags: string[];

  // Affiliate Systems
  affiliateMarketplace: 'Amazon' | 'eBay' | 'Walmart' | 'BestBuy' | 'Apple' | 'Custom';
  affiliateUrl: string;
  trackingId: string;
  commissionNotes?: string;
  redirectButtonText?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown or rich HTML
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Completed' | 'Cancelled';
  marketplaceRedirected: string; // Name of marketplace user bought from
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface AffiliateConfig {
  amazonTrackingId: string;
  ebayTrackingId: string;
  walmartTrackingId: string;
  generalCommissionRate: number;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}
