/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck, Github, Instagram, Twitter, ExternalLink } from 'lucide-react';

interface FooterProps {
  navigateTo: (route: string) => void;
}

export function Footer({ navigateTo }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    // Store email in local storage mock list
    const subscribers = JSON.parse(localStorage.getItem('wond-newsletter') || '[]');
    subscribers.push({ email, date: new Date().toISOString() });
    localStorage.setItem('wond-newsletter', JSON.stringify(subscribers));
  };

  const categories = [
    { name: 'Electronics', route: '#shop?category=Electronics' },
    { name: 'Home & Kitchen', route: '#shop?category=Home%20%26%20Kitchen' },
    { name: 'Health & Bio', route: '#shop?category=Health' },
    { name: 'Beauty & Skincare', route: '#shop?category=Beauty' },
    { name: 'Sports & Gear', route: '#shop?category=Sports' },
    { name: 'Fitness & Yoga', route: '#shop?category=Fitness' },
    { name: 'Travel Essentials', route: '#shop?category=Travel' },
    { name: 'Smart Gadgets', route: '#shop?category=Smart%20Gadgets' }
  ];

  const legalLinks = [
    { name: 'Affiliate Disclosure', route: '#disclosure' },
    { name: 'Privacy Policy', route: '#privacy' },
    { name: 'Cookie Policy', route: '#cookies' },
    { name: 'Terms of Service', route: '#terms' }
  ];

  const infoLinks = [
    { name: 'About WOND.WD', route: '#about' },
    { name: 'Contact Curation Team', route: '#contact' },
    { name: 'Frequently Asked Questions', route: '#faq' },
    { name: 'Insights Blog', route: '#blog' }
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 transition-colors">
      
      {/* Newsletter Block & Guarantee Section */}
      <div className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Curation Pledge */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-950/40 border border-blue-900/50 px-3.5 py-1.5 rounded-full text-blue-400 text-xs font-bold mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>THE WOND.WD PLEDGE</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
              Curated for Safety. Verified for Legality.
            </h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-lg leading-relaxed">
              We stand apart from direct marketplaces. Every item featured is researched by our laboratory of specialists, guaranteeing it is completely non-hazardous, 100% legal, and carries real, certified materials. No counterfeit duplicates. No toxic chemical substitutes.
            </p>
          </div>

          {/* Interactive Newsletter */}
          <div className="bg-zinc-900/40 border border-zinc-900/80 p-6 md:p-8 rounded-3xl backdrop-blur-md">
            <h4 className="text-base font-bold text-white mb-2">Subscribe to Curation Bulletins</h4>
            <p className="text-xs text-zinc-400 mb-6">
              Get notified of newly researched, legal, high-quality products and deep-dive health insights. No spam. Unsubscribe at any time.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-3 bg-blue-950/20 border border-blue-900/40 p-4 rounded-xl text-blue-400 text-xs animate-in zoom-in-95">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Subscription confirmed!</p>
                  <p className="text-zinc-400 mt-0.5">Welcome to the WOND.WD Elite shopping community.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-600 transition-colors"
                    />
                    <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-zinc-600" />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors whitespace-nowrap"
                  >
                    Subscribe Now
                  </button>
                </div>
                {error && <p className="text-red-400 text-[11px] font-medium">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="col-span-2 space-y-6">
            <div>
              <button
                onClick={() => navigateTo('#home')}
                className="flex items-center gap-2 text-left"
              >
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold tracking-tighter text-sm">
                  W
                </div>
                <span className="text-lg font-black tracking-tight text-white">
                  WOND<span className="text-blue-600">.WD</span>
                </span>
              </button>
              <p className="mt-3 text-xs text-zinc-500 max-w-sm leading-relaxed">
                The global elite standard for smart, secure, and fully verified affiliate product curation. Connecting discerning shoppers with safe products from trusted marketplaces.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Curated Directories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Directories</h4>
            <ul className="space-y-2 text-xs">
              {categories.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateTo(item.route)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information & Help */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">WOND.WD</h4>
            <ul className="space-y-2 text-xs">
              {infoLinks.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateTo(item.route)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Compliance</h4>
            <ul className="space-y-2 text-xs">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateTo(item.route)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Disclosures & Copyright Panel */}
      <div className="bg-black py-8 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[11px] text-zinc-600 space-y-4">
          <p className="leading-relaxed">
            <span className="font-semibold text-zinc-500">Affiliate Advertising Disclosure:</span> WOND.WD is a participant in several affiliate advertising structures, including the Amazon Services LLC Associates Program, Best Buy Affiliate Program, eBay Partner Network, and Walmart Affiliate Linkages. These structures are legally engineered to allow verified curations to earn tracking referral commission fees. Clicking any "Buy Now" or "Check Price" link redirects the user to official secure merchant destinations. Purchases completed at those destinations reward WOND.WD with secondary fees at absolutely zero added expense to the buyer.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-zinc-900 gap-4 text-zinc-500">
            <p>&copy; 2026 WOND.WD. Safe Products. Smart Shopping. All Rights Reserved.</p>
            <div className="flex items-center gap-1">
              <span>Security Audited & Protected</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
