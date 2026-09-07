export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  value: string;
  priceAdjustment: number; // Integer amount in INR
  imageUrl?: string | null;
  createdAt?: Date | string;
}

export interface EMIPlan {
  id: string;
  productId: string;
  tenureMonths: number;
  monthlyAmount: number; // Integer amount in INR
  interestRate: number; // Percentage (e.g., 0 for No Cost)
  processingFee: number; // Integer amount in INR
  totalAmount: number; // Integer amount in INR
  isNoCost: boolean;
  createdAt?: Date | string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  basePrice: number; // Integer amount in INR
  imageUrl: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  variants?: ProductVariant[];
  emiPlans?: EMIPlan[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}

export interface ApiErrorResponse {
  error: string;
  statusCode?: number;
}
