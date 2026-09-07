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
              className={`px-3.5 py-1.5 min-h-[34px] rounded-full text-xs font-bold transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                isActive
                  ? 'bg-purple-700 text-white shadow-md shadow-purple-900/20 scale-[1.03]'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
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
