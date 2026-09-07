'use client';

import React, { useState } from 'react';
import ShopTabs, { ShopTabType } from '@/components/shop/ShopTabs';
import { ShoppingBag, Sparkles, Store, Building2, PackageCheck } from 'lucide-react';

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
              No implementation required for this assignment. Brand partner integrations will appear here.
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
              No implementation required for this assignment. Physical retail merchant outlets will appear here.
            </p>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="bg-white rounded-3xl p-7 border border-purple-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">1Fi Marketplace</h3>
              </div>
              <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/60 px-2.5 py-1 rounded-full">
                Stage 1 Shell
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 text-center border border-dashed border-slate-200">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Marketplace products coming soon
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Product catalog grid, variants, price breakdowns, and interactive EMI selection flows will be built in Stage 2 and beyond.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
