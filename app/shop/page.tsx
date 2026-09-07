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
      <section className="rounded-2xl bg-purple-700 text-white p-4.5 mb-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white mb-2">
              <Sparkles className="w-3 h-3 text-yellow-300 fill-current" />
              <span>Credit on Mutual Funds</span>
            </div>
            <h2 className="text-base font-bold leading-snug tracking-tight mb-1">
              Shop today, pay later using Mutual Funds
            </h2>
            <p className="text-xs text-purple-100 font-normal leading-relaxed max-w-[280px]">
              Easy 0% interest EMI plans instantly without liquidating investments.
            </p>
          </div>
        </div>
      </section>

      {/* Reusable Segmented Shop Tabs */}
      <div className="mb-6">
        <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content Display Area */}
      <section className="transition-all duration-300">
        {activeTab === 'brands' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Top Brands</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-normal">
              Partner brand offers and integrations will appear here.
            </p>
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Store className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Nearby Stores</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-normal">
              Physical retail merchant outlets will appear here.
            </p>
          </div>
        )}

        {activeTab === 'marketplace' && <Marketplace />}
      </section>
    </div>
  );
}
