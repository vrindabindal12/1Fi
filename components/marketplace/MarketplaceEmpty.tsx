'use client';

import React from 'react';
import { SearchX, FilterX } from 'lucide-react';

interface MarketplaceEmptyProps {
  category?: string;
  query?: string;
  onClearFilters: () => void;
}

export default function MarketplaceEmpty({
  category,
  query,
  onClearFilters,
}: MarketplaceEmptyProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center my-4">
      <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-100">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">No products found</h3>
      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mb-5">
        {query
          ? `No matches found for "${query}". Try checking for spelling errors or searching another term.`
          : `No products available in the "${category}" category.`}
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-2xl transition-all"
      >
        <FilterX className="w-4 h-4" />
        <span>Clear search & filters</span>
      </button>
    </div>
  );
}
