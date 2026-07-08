/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  History,
  Heart,
  MapPin,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  LogOut,
  Save
} from 'lucide-react';
import { Order, Product } from '../types';

interface UserDashboardProps {
  userEmail: string | null;
  onLogout: () => void;
  orderHistory: Order[];
  wishlist: string[];
  products: Product[];
  navigateTo: (route: string) => void;
}

export function UserDashboard({
  userEmail,
  onLogout,
  orderHistory,
  wishlist,
  products,
  navigateTo
}: UserDashboardProps) {
  
  // Local profile state
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('wond-profile-name') || (userEmail ? userEmail.split('@')[0] : 'Elite Shopper');
  });
  const [profilePhone, setProfilePhone] = useState(() => {
    return localStorage.getItem('wond-profile-phone') || '+1 (555) 019-2834';
  });
  const [profileAddress, setProfileAddress] = useState(() => {
    return localStorage.getItem('wond-profile-address') || '100 Premium Plaza, Suite A, San Francisco';
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('wond-profile-name', profileName);
    localStorage.setItem('wond-profile-phone', profilePhone);
    localStorage.setItem('wond-profile-address', profileAddress);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start animate-in fade-in duration-500">
        
        {/* Sidebar Profile Summary */}
        <div className="lg:col-span-1 bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-3xl space-y-6 text-center shadow-lg">
          <div className="space-y-3">
            <div className="relative w-20 h-20 bg-blue-100 dark:bg-zinc-900 rounded-full mx-auto flex items-center justify-center font-black text-2xl text-blue-600 dark:text-sky-400">
              {profileName.charAt(0).toUpperCase()}
              <div className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full text-white" title="Secure Authenticated Client">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate">{profileName}</h3>
              <p className="text-[10px] text-zinc-400 truncate">{userEmail}</p>
            </div>

            <span className="inline-block bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100 dark:border-blue-900/40">
              WOND.WD ELITE MEMBER
            </span>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-900 pt-4 text-xs font-semibold space-y-1">
            <button
              onClick={() => navigateTo('#wishlist')}
              className="w-full text-left py-2 px-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg flex justify-between items-center text-zinc-600 dark:text-zinc-400"
            >
              <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Wishlist</span>
              <span className="font-mono text-[10px] font-bold text-zinc-400">{wishlist.length}</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                navigateTo('#home');
              }}
              className="w-full text-left py-2 px-3 hover:bg-red-50 dark:hover:bg-red-950/10 rounded-lg flex items-center gap-2 text-red-500"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Primary Content Panel (Order History and Settings) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Order History */}
          <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-3xl shadow-lg">
            <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-blue-500" />
              <span>Curation Order History</span>
            </h3>

            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900/80 space-y-3">
                    <div className="flex justify-between items-center border-b border-zinc-200/40 dark:border-zinc-800/40 pb-2.5 text-xs font-bold text-zinc-400">
                      <span>Order ID: <span className="font-mono text-zinc-900 dark:text-white">{order.id}</span></span>
                      <span>{order.date}</span>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((it, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <img src={it.image} className="w-8 h-8 rounded-md object-cover bg-zinc-100" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{it.productName}</h4>
                            <span className="text-[10px] text-zinc-400 font-medium">Qty {it.quantity} &bull; ${it.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-zinc-200/40 dark:border-zinc-800/40 pt-2.5 text-xs">
                      <div>
                        <span className="text-zinc-400 font-semibold block text-[10px] uppercase">Amount Sourced</span>
                        <span className="font-black text-zinc-900 dark:text-white">${order.totalAmount.toFixed(2)}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Tracking Redirects</span>
                        <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-sky-400">
                          <span>Sourced at {order.marketplaceRedirected}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-zinc-500 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                No active orders found. Click "Save to Local Cart" and checkout to compile orders instantly!
              </div>
            )}
          </div>

          {/* Account Profile Settings Form */}
          <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-3xl shadow-lg">
            <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Verified Delivery Coordinates</span>
            </h3>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1">Receiver Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1">Phone Coordinate</label>
                  <input
                    type="text"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 block mb-1">Home Delivery Address Coordinates</label>
                <input
                  type="text"
                  value={profileAddress}
                  onChange={(e) => setProfileAddress(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-white/40 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {saveSuccess && (
                <p className="text-[10px] font-bold text-emerald-500 animate-pulse text-center">Settings saved successfully!</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Profile Coordinates</span>
                </button>
              </div>
            </form>
          </div>

          {/* Wishlist quick shortcuts */}
          {wishlistedItems.length > 0 && (
            <div className="bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-white/60 dark:border-zinc-800/40 p-6 rounded-3xl shadow-lg">
              <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4 text-blue-500" />
                <span>Saved Wishlist Coordinates</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wishlistedItems.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo(`#product/${p.id}`)}
                    className="p-3 border border-zinc-100 dark:border-zinc-900 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer flex gap-3 items-center min-w-0"
                  >
                    <img src={p.images[0]} className="w-8 h-8 rounded-md object-cover" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{p.name}</h4>
                      <span className="text-[10px] text-blue-500 font-bold">${p.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
