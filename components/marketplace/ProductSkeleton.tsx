'use client';

import React from 'react';

export default function ProductSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-3xl p-3.5 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between">
          <div>
            <div className="w-full aspect-square bg-slate-200 rounded-2xl mb-3" />
            <div className="w-12 h-3 bg-slate-200 rounded mb-1.5" />
            <div className="w-full h-4 bg-slate-200 rounded mb-1" />
            <div className="w-2/3 h-4 bg-slate-200 rounded mb-3" />
          </div>
          <div>
            <div className="w-20 h-5 bg-slate-200 rounded mb-2" />
            <div className="w-full h-6 bg-slate-200 rounded-xl mb-3" />
            <div className="w-full h-8 bg-slate-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
