'use client';

import React from 'react';

export default function ProductDetailSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-28 h-8 bg-slate-200 rounded-2xl" />
        <div className="w-20 h-6 bg-slate-200 rounded-full" />
      </div>

      {/* Image & Main Card Skeleton */}
      <div className="space-y-4">
        <div className="w-full aspect-square bg-slate-200 rounded-3xl" />

        <div className="bg-white rounded-3xl p-5 border border-slate-100 space-y-3">
          <div className="w-20 h-4 bg-slate-200 rounded" />
          <div className="w-3/4 h-8 bg-slate-200 rounded" />
          <div className="w-36 h-8 bg-slate-200 rounded" />
          <div className="w-full h-12 bg-slate-200 rounded-2xl" />
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 space-y-2">
          <div className="w-28 h-4 bg-slate-200 rounded" />
          <div className="space-y-2">
            <div className="h-12 bg-slate-200 rounded-2xl" />
            <div className="h-12 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
