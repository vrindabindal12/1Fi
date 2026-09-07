import React from 'react';
import { CreditCard } from 'lucide-react';

export default function LimitPage() {
  return (
    <div className="w-full px-4 pt-6 pb-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Credit Portfolio</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Credit Limit</h1>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shadow-sm border border-purple-200">
          1Fi
        </div>
      </header>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Mutual Fund Limit</h2>
            <p className="text-xs text-slate-500">Approved loan limit against MF portfolio</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500 font-medium">Total Approved Limit</span>
            <span className="text-sm font-extrabold text-slate-900">₹ 2,50,000</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div className="bg-purple-700 h-full w-[0%]" />
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400">
            <span>Used: ₹ 0</span>
            <span>Available: ₹ 2,50,000</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-100/80 rounded-2xl p-4 text-center border border-slate-200/60">
        <p className="text-xs text-slate-500">
          Credit Limit screen placeholder for Stage 1 application shell.
        </p>
      </div>
    </div>
  );
}
