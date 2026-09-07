'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, ProductVariant, EMIPlan } from '@/types/marketplace';
import { MarketplaceApiService } from '@/lib/services/marketplaceApi';

export function useMarketplaceProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [emiPlans, setEmiPlans] = useState<EMIPlan[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const data = await MarketplaceApiService.getProductById(id);
      setProduct(data);

      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }

      try {
        const emiData = await MarketplaceApiService.getEMIPlansByProductId(id);
        setEmiPlans(emiData);
      } catch {
        setEmiPlans(data.emiPlans || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const calculatedPrice = product
    ? product.basePrice + (selectedVariant?.priceAdjustment || 0)
    : 0;

  return {
    product,
    emiPlans,
    selectedVariant,
    setSelectedVariant,
    calculatedPrice,
    loading,
    error,
    refetch: fetchProductDetails,
  };
}

