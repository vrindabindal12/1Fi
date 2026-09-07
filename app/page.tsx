import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full px-4 pt-6 pb-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Welcome back</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Home</h1>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shadow-sm border border-purple-200">
          1Fi
        </div>
      </header>

      {/* Credit Overview Card Placeholder */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-300">Available Mutual Fund Limit</span>
          <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
            Active
          </span>
        </div>
        <div className="text-2xl font-bold text-white mb-1.5 tracking-tight">₹ 2,50,000</div>
        <p className="text-xs text-slate-400 font-normal">Collateralized against your investment portfolio</p>
      </div>

      {/* Quick Action Card to Shop */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm mb-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
            <Zap className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Start Shopping</h2>
            <p className="text-xs text-slate-500 font-normal">Explore products on 1Fi Marketplace</p>
          </div>
        </div>
        <Link
          href="/shop"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <span>Go to Shop Page</span>
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </Link>
      </div>

      <div className="bg-slate-100/80 rounded-2xl p-4 text-center border border-slate-200/60">
        <p className="text-xs text-slate-500">
          Welcome to 1Fi. Manage credit limits and shop with Mutual Fund collateral.
        </p>
      </div>
    </div>
  );
}
