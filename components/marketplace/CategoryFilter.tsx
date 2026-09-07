'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter products by category"
      className="w-full overflow-x-auto no-scrollbar py-1 scroll-smooth"
    >
      <div className="flex items-center gap-1.5 min-w-max pr-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              aria-pressed={isActive}
              className={`px-3 py-1.5 min-h-[32px] rounded-full text-xs font-semibold transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                isActive
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
