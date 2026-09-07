'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/marketplace';
import { Sparkles, ChevronRight, ImageOff } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const lowestEmi = product.emiPlans && product.emiPlans.length > 0
    ? Math.min(...product.emiPlans.map((e) => e.monthlyAmount))
    : null;

  const hasNoCostEmi = product.emiPlans?.some((e) => e.isNoCost) ?? false;

  return (
    <div className="group bg-white rounded-3xl p-3.5 border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200/80 transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Badges Container */}
      {hasNoCostEmi && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 bg-purple-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
            <span>No Cost EMI</span>
          </span>
        </div>
      )}

      {/* Product Image Area */}
      <Link
        href={`/shop/product/${product.id}`}
        aria-label={`View details for ${product.name}`}
        className="block relative w-full aspect-square mb-3 rounded-2xl bg-slate-50 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
      >
        {!imageError ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 p-2">
            <ImageOff className="w-8 h-8 mb-1" />
            <span className="text-[10px] text-slate-400 font-medium">Image unavailable</span>
          </div>
        )}
      </Link>

      {/* Product Details Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider block mb-0.5">
            {product.brand}
          </span>
          <Link href={`/shop/product/${product.id}`} className="block">
            <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug mb-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div>
          {/* Price */}
          <div className="text-sm font-black text-slate-900 tracking-tight mb-1">
            {formatCurrency(product.basePrice)}
          </div>

          {/* EMI Preview Badge */}
          {lowestEmi ? (
            <div className="bg-purple-50 border border-purple-100 rounded-xl px-2.5 py-1 mb-3">
              <span className="text-[10px] font-bold text-purple-700 block">
                From {formatCurrency(lowestEmi)}/mo
              </span>
            </div>
          ) : (
            <div className="h-[26px] mb-3" />
          )}

          {/* CTA Link / Button */}
          <Link
            href={`/shop/product/${product.id}`}
            className="w-full bg-slate-100 group-hover:bg-purple-700 text-slate-700 group-hover:text-white text-xs font-bold py-2.5 px-3 min-h-[38px] rounded-xl flex items-center justify-center gap-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
          >
            <span>View details</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
