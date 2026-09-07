'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { Product, ProductVariant, EMIPlan } from '@/types/marketplace';
import { MarketplaceApiService } from '@/lib/services/marketplaceApi';
import ProductDetailSkeleton from '@/components/marketplace/ProductDetailSkeleton';
import MarketplaceError from '@/components/marketplace/MarketplaceError';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Receipt,
  Calendar,
  ChevronRight,
  Home,
} from 'lucide-react';

export default function ConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id as string;
  const variantId = searchParams.get('variantId');
  const planId = searchParams.get('planId');

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    async function loadConfirmationData() {
      setLoading(true);
      setError(null);

      try {
        const prodData = await MarketplaceApiService.getProductById(id);
        if (!isMounted) return;

        setProduct(prodData);

        // Resolve selected variant
        if (variantId && prodData.variants) {
          const match = prodData.variants.find((v) => v.id === variantId);
          setSelectedVariant(match || prodData.variants[0] || null);
        } else if (prodData.variants && prodData.variants.length > 0) {
          setSelectedVariant(prodData.variants[0]);
        }

        // Resolve selected EMI plan
        if (planId && prodData.emiPlans) {
          const matchPlan = prodData.emiPlans.find((p) => p.id === planId);
          setSelectedPlan(matchPlan || prodData.emiPlans[0] || null);
        } else if (prodData.emiPlans && prodData.emiPlans.length > 0) {
          setSelectedPlan(prodData.emiPlans[0]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load confirmation details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadConfirmationData();

    return () => {
      isMounted = false;
    };
  }, [id, variantId, planId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculatedPrice = product
    ? product.basePrice + (selectedVariant?.priceAdjustment || 0)
    : 0;

  if (loading) {
    return (
      <div className="w-full px-4 pt-6 pb-6">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product || !selectedPlan) {
    return (
      <div className="w-full px-4 pt-6 pb-6 space-y-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200/60 px-3 py-2 rounded-2xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <MarketplaceError
          message={error || 'Invalid product or EMI plan selection.'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Final Success View
  if (isConfirmed) {
    return (
      <div className="w-full px-4 pt-8 pb-8 text-center space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Selection Confirmed
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
              EMI Plan Selected
            </h1>
            <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto mt-1 leading-relaxed">
              Your EMI plan choice for <strong className="text-slate-900">{product.name}</strong> has been confirmed.
            </p>
          </div>

          {/* Final Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Item:</span>
              <strong className="text-slate-900 font-extrabold">{product.name}</strong>
            </div>
            {selectedVariant && (
              <div className="flex justify-between text-slate-600">
                <span>Variant:</span>
                <strong className="text-slate-900 font-bold">{selectedVariant.value}</strong>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Monthly EMI:</span>
              <strong className="text-purple-700 font-black">{formatCurrency(selectedPlan.monthlyAmount)} / mo</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Duration:</span>
              <strong className="text-slate-900 font-bold">{selectedPlan.tenureMonths} Months</strong>
            </div>
          </div>

          <Link
            href="/shop"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
          >
            <Home className="w-4 h-4" />
            <span>Return to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 pt-6 pb-6 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/shop/product/${product.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-white border border-slate-200/80 px-3.5 py-2 rounded-2xl shadow-sm hover:bg-purple-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product</span>
        </Link>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
          Order Summary
        </span>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">Confirm EMI Plan Selection</h1>
            <p className="text-xs text-slate-500 font-medium">Review purchase details before continuing</p>
          </div>
        </div>

        {/* Product Card Summary */}
        <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
          <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-200/60">
            <Image
              src={selectedVariant?.imageUrl || product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider block">
              {product.brand}
            </span>
            <h2 className="text-xs font-extrabold text-slate-900 truncate">
              {product.name}
            </h2>
            {selectedVariant && (
              <span className="text-[11px] text-slate-500 font-semibold block">
                {selectedVariant.value}
              </span>
            )}
            <span className="text-xs font-black text-slate-900 block mt-0.5">
              {formatCurrency(calculatedPrice)}
            </span>
          </div>
        </div>

        {/* Selected EMI Plan Breakdown */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-300" />
              <span className="font-extrabold text-white">
                {selectedPlan.tenureMonths} Months EMI Plan
              </span>
            </div>
            {selectedPlan.isNoCost && (
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span>0% Interest</span>
              </span>
            )}
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-slate-300">
              <span>Monthly EMI:</span>
              <strong className="text-white font-black text-sm">
                {formatCurrency(selectedPlan.monthlyAmount)} / month
              </strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Interest Rate:</span>
              <strong className="text-white font-bold">
                {selectedPlan.isNoCost ? '0%' : `${selectedPlan.interestRate}% p.a.`}
              </strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Processing Fee:</span>
              <strong className="text-white font-bold">
                {selectedPlan.processingFee > 0 ? formatCurrency(selectedPlan.processingFee) : 'FREE'}
              </strong>
            </div>
            <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800">
              <span>Total Payable Amount:</span>
              <strong className="text-purple-300 font-black">
                {formatCurrency(selectedPlan.totalAmount)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setIsConfirmed(true)}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-purple-900/25 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
        >
          <span>Confirm & Continue</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>Collateralized credit against your Mutual Fund portfolio</span>
        </div>
      </div>
    </div>
  );
}
