import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { Product, EMIPlan } from '@/types/marketplace';
import { seedProductsData } from '@/data/seedData';

/**
 * Service Layer for Marketplace Operations
 * Interacts with PostgreSQL via Prisma ORM with fallback handling for local development.
 */
export class MarketplaceService {
  /**
   * Fetch all marketplace products with optional category and search filtering
   */
  static async getProducts(category?: string, search?: string): Promise<Product[]> {
    try {
      const whereClause: Prisma.ProductWhereInput = {};

      if (category && category !== 'All') {
        whereClause.category = { equals: category, mode: 'insensitive' };
      }

      if (search && search.trim() !== '') {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      const products = await prisma.product.findMany({
        where: whereClause,
        include: {
          variants: true,
          emiPlans: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (products && products.length > 0) {
        return products as unknown as Product[];
      }
    } catch {
      // Fallback when PostgreSQL instance is unreachable during offline/dev mode
    }

    // Fallback dataset filter
    let filtered = [...seedProductsData] as unknown as Product[];

    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  /**
   * Fetch a single product by its unique ID
   */
  static async getProductById(id: string): Promise<Product | null> {
    if (!id || typeof id !== 'string') {
      return null;
    }

    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          variants: true,
          emiPlans: true,
        },
      });

      if (product) {
        return product as unknown as Product;
      }
    } catch {
      // Fallback when PostgreSQL instance is unreachable during offline/dev mode
    }

    const fallbackProduct = seedProductsData.find((p) => p.id === id);
    return (fallbackProduct as unknown as Product) || null;
  }

  /**
   * Fetch EMI plans for a specific product ID
   */
  static async getEMIPlansByProductId(productId: string): Promise<EMIPlan[] | null> {
    const product = await this.getProductById(productId);
    if (!product) return null;
    return product.emiPlans || [];
  }
}
