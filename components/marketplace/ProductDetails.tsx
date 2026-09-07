'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMarketplaceProduct } from '@/hooks/useMarketplaceProduct';
import { EMIPlan } from '@/types/marketplace';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import VariantSelector from './VariantSelector';
import EMIPlanSelector from './EMIPlanSelector';
import EMISummary from './EMISummary';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import MarketplaceError from './MarketplaceError';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter();
  const {
    product,
    emiPlans,
    selectedVariant,
    setSelectedVariant,
    calculatedPrice,
    loading,
    error,
    refetch,
  } = useMarketplaceProduct(productId);

  const [customPlanId, setCustomPlanId] = useState<string | null>(null);
  const emiSectionRef = useRef<HTMLDivElement>(null);

  // Derive active selected plan deterministically (custom user pick or lowest monthly plan)
  const defaultPlanId = emiPlans && emiPlans.length > 0
    ? [...emiPlans].sort((a, b) => a.monthlyAmount - b.monthlyAmount)[0].id
    : null;

  const activePlanId = customPlanId || defaultPlanId;

  const handleSelectPlan = (plan: EMIPlan) => {
    setCustomPlanId(plan.id);
  };

  const selectedPlan = emiPlans.find((p) => p.id === activePlanId) || null;

  const handleProceed = () => {
    if (!product || !activePlanId) return;

    const queryParams = new URLSearchParams();
    if (selectedVariant) {
      queryParams.append('variantId', selectedVariant.id);
    }
    queryParams.append('planId', activePlanId);

    router.push(`/shop/product/${product.id}/confirm?${queryParams.toString()}`);
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200/60 px-3 py-2 rounded-2xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <MarketplaceError
          message={error || 'The requested product could not be found.'}
          onRetry={refetch}
        />
      </div>
    );
  }

  const hasNoCostEmi = emiPlans.some((e) => e.isNoCost);

  return (
    <div className="w-full space-y-5 pb-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-white border border-slate-200/80 px-3.5 py-2 rounded-2xl shadow-sm hover:bg-purple-50 hover:border-purple-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
          Step 1: Product & EMI Selection
        </span>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Left Column: Product Image */}
        <div className="w-full">
          <ProductImage
            imageUrl={selectedVariant?.imageUrl || product.imageUrl}
            name={product.name}
            hasNoCostEmi={hasNoCostEmi}
          />
        </div>

        {/* Right Column: Info & Variants */}
        <div className="space-y-4">
          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            calculatedPrice={calculatedPrice}
          />

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
          )}
        </div>
      </div>

      {/* EMI Selection Section */}
      <div ref={emiSectionRef} className="space-y-4 pt-2">
        <EMIPlanSelector
          emiPlans={emiPlans}
          selectedPlanId={activePlanId}
          onSelectPlan={handleSelectPlan}
        />

        {/* Selected Plan Summary Card */}
        {selectedPlan && <EMISummary selectedPlan={selectedPlan} />}
      </div>

      {/* Primary Proceed CTA Button */}
      <div className="pt-2 sticky bottom-4 z-40 bg-slate-50/90 backdrop-blur-md p-2 rounded-3xl border border-slate-200/80 shadow-lg">
        <button
          type="button"
          disabled={!activePlanId}
          onClick={handleProceed}
          className={`w-full font-extrabold py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all duration-200 ${
            activePlanId
              ? 'bg-purple-700 hover:bg-purple-800 text-white shadow-purple-900/25 active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Proceed with EMI Plan</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>Collateralized loan approval via Mutual Funds</span>
        </div>
      </div>
    </div>
  );
}
