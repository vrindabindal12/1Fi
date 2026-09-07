'use client';

import React, { useState } from 'react';
import ShopTabs, { ShopTabType } from '@/components/shop/ShopTabs';
import Marketplace from '@/components/marketplace/Marketplace';
import { Sparkles, Store, Building2 } from 'lucide-react';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTabType>('marketplace');

  return (
    <div className="w-full px-4 pt-6 pb-6">
      {/* Top App Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              1Fi App
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Shop</h1>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shadow-sm border border-purple-200">
          1Fi
        </div>
      </header>

      {/* Purple Hero / Banner Area */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-950 text-white p-6 mb-6 shadow-xl shadow-purple-900/20 border border-purple-500/20">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-purple-100 mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Credit on Mutual Funds</span>
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-tight mb-2">
            Shop today,<br />Pay later using Mutual funds.
          </h2>
          <p className="text-xs text-purple-100/90 font-medium leading-relaxed max-w-[260px]">
            Convert purchases into easy 0% interest EMI plans instantly without liquidating your investments.
          </p>
        </div>
      </section>

      {/* Reusable Segmented Shop Tabs */}
      <div className="mb-6">
        <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content Display Area */}
      <section className="transition-all duration-300">
        {activeTab === 'brands' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Top Brands</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Partner brand offers and integrations will appear here.
            </p>
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Nearby Stores</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Physical retail merchant outlets will appear here.
            </p>
          </div>
        )}

        {activeTab === 'marketplace' && <Marketplace />}
      </section>
    </div>
  );
}
