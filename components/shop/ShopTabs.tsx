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
    <div className="w-full bg-slate-200/70 backdrop-blur-sm p-1.5 rounded-full flex items-center gap-1 shadow-inner border border-slate-300/40">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 text-center py-2.5 px-3 rounded-full text-xs font-semibold transition-all duration-200 select-none ${
              isActive
                ? 'bg-purple-700 text-white shadow-md shadow-purple-900/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
