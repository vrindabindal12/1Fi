'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useMarketplaceProduct } from '@/hooks/useMarketplaceProduct';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import VariantSelector from './VariantSelector';
import EMIPreview from './EMIPreview';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import MarketplaceError from './MarketplaceError';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
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

  const emiSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToEMI = () => {
    emiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="w-full space-y-4 pb-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-white border border-slate-200/80 px-3.5 py-2 rounded-2xl shadow-sm hover:bg-purple-50 hover:border-purple-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
          Product Details
        </span>
      </div>

      {/* Main Content Layout (Mobile single column, Desktop 2-column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Left Column: Product Image */}
        <div className="w-full">
          <ProductImage
            imageUrl={selectedVariant?.imageUrl || product.imageUrl}
            name={product.name}
            hasNoCostEmi={hasNoCostEmi}
          />
        </div>

        {/* Right Column: Info, Variants & EMI Preview */}
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

          {/* EMI Preview Card */}
          <div ref={emiSectionRef}>
            <EMIPreview emiPlans={emiPlans} onViewAllPlans={handleScrollToEMI} />
          </div>
        </div>
      </div>

      {/* Sticky/Fixed Primary Action CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleScrollToEMI}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-purple-900/25 flex items-center justify-center gap-2 text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Choose EMI Plan</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>Zero-Cost EMI Selection unlocked in Stage 5</span>
        </div>
      </div>
    </div>
  );
}
