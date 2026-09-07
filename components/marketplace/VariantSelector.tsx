'use client';

import React from 'react';
import { ProductVariant } from '@/types/marketplace';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const variantName = variants[0]?.name || 'Available Variants';

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Select {variantName}
        </h3>
        {selectedVariant && (
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
            {selectedVariant.value}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelectVariant(variant)}
              className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                isSelected
                  ? 'bg-purple-700 text-white border-purple-700 shadow-md shadow-purple-900/20 scale-[1.01]'
                  : 'bg-slate-50 hover:bg-slate-100/80 text-slate-800 border-slate-200/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? 'border-white bg-white text-purple-700' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold">{variant.value}</span>
              </div>

              {variant.priceAdjustment > 0 && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-purple-800 text-purple-100'
                      : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  +{formatCurrency(variant.priceAdjustment)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
