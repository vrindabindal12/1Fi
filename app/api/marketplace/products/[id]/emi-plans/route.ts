import { NextRequest, NextResponse } from 'next/server';
import { MarketplaceService } from '@/lib/services/marketplaceService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid product ID parameter.' },
        { status: 400 }
      );
    }

    const emiPlans = await MarketplaceService.getEMIPlansByProductId(id);

    if (!emiPlans) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        productId: id,
        emiPlans,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in /api/marketplace/products/[id]/emi-plans:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching EMI plans.' },
      { status: 500 }
    );
  }
}
