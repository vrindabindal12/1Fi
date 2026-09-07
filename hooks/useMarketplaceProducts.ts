'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/marketplace';
import { MarketplaceApiService } from '@/lib/services/marketplaceApi';

export function useMarketplaceProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MarketplaceApiService.getProducts(selectedCategory, searchQuery);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await MarketplaceApiService.getProducts(selectedCategory, searchQuery);
        if (!isCancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load products. Please check your connection.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [selectedCategory, searchQuery]);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory('All');
    setSearchQuery('');
  }, []);

  return {
    products,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    refetch: fetchProducts,
    clearFilters: handleClearFilters,
  };
}
