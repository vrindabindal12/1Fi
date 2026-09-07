import { Product, ProductListResponse } from '@/types/marketplace';

/**
 * Client-side API Service for Marketplace Endpoints
 */
export class MarketplaceApiService {
  /**
   * Fetch marketplace products with optional category and search filters
   */
  static async getProducts(category?: string, search?: string): Promise<Product[]> {
    const params = new URLSearchParams();

    if (category && category !== 'All') {
      params.append('category', category);
    }

    if (search && search.trim() !== '') {
      params.append('search', search.trim());
    }

    const queryString = params.toString();
    const url = `/api/marketplace/products${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.statusText}`);
    }

    const data: ProductListResponse = await response.json();
    return data.products || [];
  }

  /**
   * Fetch a single product detail by ID
   */
  static async getProductById(id: string): Promise<Product> {
    const response = await fetch(`/api/marketplace/products/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`Failed to load product: ${response.statusText}`);
    }

    const product: Product = await response.json();
    return product;
  }
}
