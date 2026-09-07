'use client';

import React from 'react';
import { EMIPlan } from '@/types/marketplace';
import { Receipt } from 'lucide-react';

interface EMISummaryProps {
  selectedPlan: EMIPlan;
}

export default function EMISummary({ selectedPlan }: EMISummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-600/30 text-purple-300 rounded-lg">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
              Selected EMI Summary
            </h4>
            <span className="text-xs sm:text-sm font-bold text-white">
              {formatCurrency(selectedPlan.monthlyAmount)} × {selectedPlan.tenureMonths} Months
            </span>
          </div>
        </div>

        {selectedPlan.isNoCost && (
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
            <span>0% Interest</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
        <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50 min-w-0">
          <span className="text-[10px] text-slate-400 block mb-0.5 font-medium truncate">Interest Rate</span>
          <span className="font-bold text-xs text-white block truncate">
            {selectedPlan.isNoCost ? '0%' : `${selectedPlan.interestRate}%`}
          </span>
        </div>
        <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50 min-w-0">
          <span className="text-[10px] text-slate-400 block mb-0.5 font-medium truncate">Processing Fee</span>
          <span className="font-bold text-xs text-white block truncate">
            {selectedPlan.processingFee > 0 ? formatCurrency(selectedPlan.processingFee) : 'FREE'}
          </span>
        </div>
        <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/50 min-w-0">
          <span className="text-[10px] text-slate-400 block mb-0.5 font-medium truncate">Total Payable</span>
          <span className="font-bold text-xs text-purple-300 block truncate">
            {formatCurrency(selectedPlan.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
