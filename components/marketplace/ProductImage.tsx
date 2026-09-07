'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

interface ProductImageProps {
  imageUrl: string;
  name: string;
  hasNoCostEmi?: boolean;
}

export default function ProductImage({ imageUrl, name, hasNoCostEmi = false }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full aspect-square bg-white rounded-3xl p-4 border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center">
      {hasNoCostEmi && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1 bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-purple-900/20">
            <span>No Cost EMI</span>
          </span>
        </div>
      )}

      {!imageError ? (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 450px"
            className="object-contain object-center hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
          <ImageOff className="w-12 h-12 mb-2 text-slate-300" />
          <span className="text-xs font-medium text-slate-500">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
