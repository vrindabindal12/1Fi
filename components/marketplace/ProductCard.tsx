'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/marketplace';
import { formatCurrency } from '@/lib/formatters';
import { ChevronRight, ImageOff } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const lowestEmi = product.emiPlans && product.emiPlans.length > 0
    ? Math.min(...product.emiPlans.map((e) => e.monthlyAmount))
    : null;

  const hasNoCostEmi = product.emiPlans?.some((e) => e.isNoCost) ?? false;

  return (
    <Link
      href={`/shop/product/${product.id}`}
      aria-label={`View details for ${product.name}`}
      className="group bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-purple-300 transition-colors flex flex-col justify-between relative overflow-hidden h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
    >
      {/* Badges Container */}
      {hasNoCostEmi && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1 bg-purple-700 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md">
            <span>No Cost EMI</span>
          </span>
        </div>
      )}

      {/* Product Image Area */}
      <div className="relative w-full aspect-square mb-2.5 rounded-xl bg-slate-50 overflow-hidden">
        {!imageError ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 object-center"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 p-2">
            <ImageOff className="w-8 h-8 mb-1" />
            <span className="text-[10px] text-slate-400 font-medium">Image unavailable</span>
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider block mb-0.5">
            {product.brand}
          </span>
          <h3 className="text-xs font-semibold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug mb-1.5">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Price */}
          <div className="text-sm font-bold text-slate-900 tracking-tight mb-1">
            {formatCurrency(product.basePrice)}
          </div>

          {/* EMI Preview Badge */}
          {lowestEmi ? (
            <div className="bg-purple-50 border border-purple-100/80 rounded-lg px-2 py-0.5 mb-2.5">
              <span className="text-[10px] font-semibold text-purple-700 block">
                From {formatCurrency(lowestEmi)}/mo
              </span>
            </div>
          ) : (
            <div className="h-[22px] mb-2.5" />
          )}

          {/* CTA Link / Button */}
          <div className="w-full bg-slate-100 group-hover:bg-purple-700 text-slate-700 group-hover:text-white text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 transition-colors">
            <span>View details</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
