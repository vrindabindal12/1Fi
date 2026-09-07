'use client';

import React from 'react';
import { Product, ProductVariant } from '@/types/marketplace';

interface ProductInfoProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  calculatedPrice: number;
}

export default function ProductInfo({
  product,
  selectedVariant,
  calculatedPrice,
}: ProductInfoProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const hasAdjustment = selectedVariant && selectedVariant.priceAdjustment > 0;

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
      {/* Brand & Category Badges */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
          {product.brand}
        </span>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug break-words">
        {product.name}
      </h1>

      {/* Price Area */}
      <div className="flex flex-wrap items-baseline gap-2 pb-2 border-b border-slate-100">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {formatCurrency(calculatedPrice)}
        </div>
        {hasAdjustment && (
          <div className="text-xs text-slate-400 font-medium">
            (Base: {formatCurrency(product.basePrice)})
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          About this Product
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal break-words">
          {product.description}
        </p>
      </div>
    </div>
  );
}
