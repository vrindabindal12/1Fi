'use client';

import React from 'react';
import { EMIPlan } from '@/types/marketplace';
import { Sparkles, Calendar, ChevronRight, ShieldCheck } from 'lucide-react';

interface EMIPreviewProps {
  emiPlans: EMIPlan[];
  onViewAllPlans?: () => void;
}

export default function EMIPreview({ emiPlans, onViewAllPlans }: EMIPreviewProps) {
  if (!emiPlans || emiPlans.length === 0) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const lowestMonthly = Math.min(...emiPlans.map((p) => p.monthlyAmount));
  const hasNoCost = emiPlans.some((p) => p.isNoCost);
  const totalPlansCount = emiPlans.length;

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-950 text-white rounded-3xl p-5 border border-purple-500/20 shadow-xl relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/15 backdrop-blur-md rounded-xl text-yellow-300">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
              EMI Options Available
            </span>
          </div>
          {hasNoCost && (
            <span className="inline-flex items-center gap-1 bg-yellow-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              <Sparkles className="w-2.5 h-2.5 fill-current" />
              <span>0% Interest</span>
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-[11px] text-purple-200 font-medium block">Starting from</span>
            <div className="text-2xl font-black text-white tracking-tight">
              {formatCurrency(lowestMonthly)}
              <span className="text-xs font-medium text-purple-200"> / month</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-purple-200 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            {totalPlansCount} {totalPlansCount === 1 ? 'Plan' : 'Plans'} Available
          </span>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[11px] text-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant approval against Mutual Funds</span>
          </div>
          <button
            type="button"
            onClick={onViewAllPlans}
            className="inline-flex items-center gap-1 text-xs font-bold text-yellow-300 hover:text-yellow-200 transition-colors"
          >
            <span>View all EMI plans</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
