import { NextRequest, NextResponse } from 'next/server';
import { MarketplaceService } from '@/lib/services/marketplaceService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;

    const products = await MarketplaceService.getProducts(category, search);

    return NextResponse.json(
      {
        products,
        total: products.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in /api/marketplace/products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marketplace products catalog.' },
      { status: 500 }
    );
  }
}
