'use client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../_lib/api-client';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
  rating: number;
  availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock'; // Added based on documentation
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

interface UseProductsParams {
  page: number;
  limit: number;
  q?: string;
  category?: string;
}

export const useProducts = ({ page, limit, q, category }: UseProductsParams) => {
  return useQuery({
    queryKey: ['products', page, limit, q, category],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = {
        limit,
        skip: (page - 1) * limit,
      };

      let endpoint = '/products';
      if (q) {
        endpoint = '/products/search';
        params.q = q;
      } else if (category && category !== 'all') {
        endpoint = `/products/category/${category}`;
      }

      return apiClient.get<ProductsResponse>(endpoint, {
        params,
      });
    },
    placeholderData: (prev) => prev,
    staleTime: 5000,
  });
};

export const useProductsStats = () => {
  return useQuery({
    queryKey: ['products-stats'],
    queryFn: async () => {
      const [totalRes, categoriesRes] = await Promise.all([
        apiClient.get<ProductsResponse>('/products', { params: { limit: 0, select: 'id' } }), // Only total needed
        apiClient.get<string[]>('/products/categories'),
      ]);

      return {
        total: totalRes.total,
        categories: categoriesRes.length,
      };
    },
    staleTime: 60000,
  });
};
