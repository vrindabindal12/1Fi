'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface MarketplaceErrorProps {
  message?: string;
  onRetry: () => void;
}

export default function MarketplaceError({
  message = 'Unable to load products.',
  onRetry,
}: MarketplaceErrorProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm text-center my-4">
      <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">Unable to load products</h3>
      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mb-5">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-2.5 px-5 rounded-2xl shadow-md shadow-purple-900/20 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Try again</span>
      </button>
    </div>
  );
}
