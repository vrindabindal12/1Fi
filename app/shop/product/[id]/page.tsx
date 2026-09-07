'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '@/components/marketplace/ProductDetails';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="w-full px-4 pt-6 pb-6">
      <ProductDetails productId={id} />
    </div>
  );
}
