'use client';

import React from 'react';
import { useMarketplaceProducts } from '@/hooks/useMarketplaceProducts';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import ProductSkeleton from './ProductSkeleton';
import MarketplaceError from './MarketplaceError';
import MarketplaceEmpty from './MarketplaceEmpty';
import { ShoppingBag } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Smartphones',
  'Laptops',
  'Headphones',
  'Smartwatches',
  'Tablets',
  'Televisions',
];

export default function Marketplace() {
  const {
    products,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    refetch,
    clearFilters,
  } = useMarketplaceProducts();

  return (
    <div className="w-full space-y-4">
      {/* Marketplace Section Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">1Fi Marketplace</h2>
            <p className="text-xs text-slate-500 font-normal">Shop products with flexible EMI options</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search smartphones, laptops, audio..."
          />
        </div>

        {/* Category Filters */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Content Render Flow */}
      {loading ? (
        <ProductSkeleton count={6} />
      ) : error ? (
        <MarketplaceError message={error} onRetry={refetch} />
      ) : products.length === 0 ? (
        <MarketplaceEmpty
          category={selectedCategory}
          query={searchQuery}
          onClearFilters={clearFilters}
        />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-500">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
              >
                Reset filters
              </button>
            )}
          </div>
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}
