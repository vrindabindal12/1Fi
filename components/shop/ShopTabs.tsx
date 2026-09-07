'use client';

import React from 'react';

export type ShopTabType = 'brands' | 'stores' | 'marketplace';

interface ShopTabsProps {
  activeTab: ShopTabType;
  onTabChange: (tab: ShopTabType) => void;
}

export default function ShopTabs({ activeTab, onTabChange }: ShopTabsProps) {
  const tabs: { id: ShopTabType; label: string }[] = [
    { id: 'brands', label: 'Top Brands' },
    { id: 'stores', label: 'Nearby Stores' },
    { id: 'marketplace', label: '1Fi Marketplace' },
  ];

  return (
    <div
      role="tablist"
      aria-label="Shop categories"
      className="w-full bg-slate-200/70 backdrop-blur-sm p-1.5 rounded-full flex items-center gap-1 shadow-inner border border-slate-300/40"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 text-center py-2 px-3 min-h-[38px] rounded-full text-xs font-bold transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
              isActive
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40 font-medium'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
