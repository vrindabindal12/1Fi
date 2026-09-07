'use client';

import React from 'react';
import { EMIPlan } from '@/types/marketplace';
import { Sparkles, CheckCircle2, Circle } from 'lucide-react';

interface EMIPlanSelectorProps {
  emiPlans: EMIPlan[];
  selectedPlanId: string | null;
  onSelectPlan: (plan: EMIPlan) => void;
}

export default function EMIPlanSelector({
  emiPlans,
  selectedPlanId,
  onSelectPlan,
}: EMIPlanSelectorProps) {
  if (!emiPlans || emiPlans.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
        <p className="text-xs text-slate-500 font-medium">
          No EMI plans available for this product.
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Select EMI Plan">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Select EMI Duration
        </h3>
        <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
          {emiPlans.length} {emiPlans.length === 1 ? 'Option' : 'Options'}
        </span>
      </div>

      <div className="space-y-2.5">
        {emiPlans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectPlan(plan)}
              className={`w-full p-4 min-h-[72px] rounded-2xl border text-left transition-all duration-200 relative overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                isSelected
                  ? 'bg-purple-700 text-white border-purple-700 shadow-lg shadow-purple-900/25 scale-[1.01]'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/80 shadow-sm'
              }`}
            >
              {/* Top Row: Radio + Tenure + Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`transition-colors ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 fill-white text-purple-700 stroke-[2.5]" />
                    ) : (
                      <Circle className="w-5 h-5 stroke-[1.8]" />
                    )}
                  </div>
                  <span className="text-sm font-black tracking-tight">
                    {plan.tenureMonths} Months
                  </span>
                </div>

                {plan.isNoCost ? (
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-yellow-400 text-slate-900 shadow-sm'
                        : 'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5 fill-current" />
                    <span>0% Interest</span>
                  </span>
                ) : (
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-purple-800 text-purple-100'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {plan.interestRate}% Interest p.a.
                  </span>
                )}
              </div>

              {/* Monthly Amount Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pl-7">
                <div className="shrink-0">
                  <span
                    className={`text-lg font-black tracking-tight ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {formatCurrency(plan.monthlyAmount)}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? 'text-purple-100' : 'text-slate-500'
                    }`}
                  >
                    {' '}
                    / month
                  </span>
                </div>

                {/* Details line */}
                <div
                  className={`text-[11px] font-medium text-right shrink-0 ${
                    isSelected ? 'text-purple-100' : 'text-slate-500'
                  }`}
                >
                  <div>
                    Processing Fee: {plan.processingFee > 0 ? formatCurrency(plan.processingFee) : 'Free'}
                  </div>
                  <div>Total Payable: {formatCurrency(plan.totalAmount)}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
