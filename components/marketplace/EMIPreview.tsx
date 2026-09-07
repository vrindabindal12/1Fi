'use client';

import React from 'react';
import { EMIPlan } from '@/types/marketplace';
import { Calendar, ChevronRight, ShieldCheck } from 'lucide-react';

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
    <div className="bg-purple-700 text-white rounded-2xl p-4.5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg text-white">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-100">
            EMI Options Available
          </span>
        </div>
        {hasNoCost && (
          <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <span>0% Interest</span>
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between pt-0.5">
        <div>
          <span className="text-[11px] text-purple-100 font-normal block">Starting from</span>
          <div className="text-xl font-bold text-white tracking-tight">
            {formatCurrency(lowestMonthly)}
            <span className="text-xs font-normal text-purple-100"> / month</span>
          </div>
        </div>
        <span className="text-xs font-medium text-purple-100 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
          {totalPlansCount} {totalPlansCount === 1 ? 'Plan' : 'Plans'} Available
        </span>
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-purple-600/60">
        <div className="flex items-center gap-1.5 text-[11px] text-purple-100 font-normal">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Instant approval against Mutual Funds</span>
        </div>
        <button
          type="button"
          onClick={onViewAllPlans}
          className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-purple-100 transition-colors"
        >
          <span>View all EMI plans</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
