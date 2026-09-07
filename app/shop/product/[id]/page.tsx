'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Product } from '@/types/marketplace';
import { MarketplaceApiService } from '@/lib/services/marketplaceApi';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await MarketplaceApiService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Product not found');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full px-4 pt-6 pb-6">
      {/* Back Button Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200/60 px-3 py-2 rounded-2xl hover:bg-purple-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>
        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
          Stage 3 Placeholder
        </span>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center animate-pulse">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl mx-auto mb-4" />
          <div className="w-48 h-6 bg-slate-200 rounded mx-auto mb-2" />
          <div className="w-32 h-4 bg-slate-200 rounded mx-auto" />
        </div>
      ) : error || !product ? (
        <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm text-center">
          <h2 className="text-base font-bold text-slate-900 mb-1">Product Not Found</h2>
          <p className="text-xs text-slate-500 mb-4">{error || 'The requested product ID does not exist.'}</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-purple-700 text-white text-xs font-bold py-2.5 px-4 rounded-2xl"
          >
            Return to Marketplace
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Product Overview Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
              {product.brand} • {product.category}
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">
              {product.name}
            </h1>
            <div className="text-2xl font-black text-slate-900 tracking-tight mb-3">
              {formatCurrency(product.basePrice)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {product.description}
            </p>
          </div>

          {/* Stage 4 Roadmap Card */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-purple-500/20 text-center">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-yellow-300" />
            </div>
            <h2 className="text-base font-extrabold mb-1">Product Details & EMI Calculator</h2>
            <p className="text-xs text-purple-200/90 leading-relaxed max-w-xs mx-auto mb-4">
              Full product specifications, variant picker (color/storage), interactive EMI plan selection, and proceed CTA will be implemented in Stage 4 & Stage 5.
            </p>
            <div className="inline-flex items-center gap-1.5 bg-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Next Stage Target</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
