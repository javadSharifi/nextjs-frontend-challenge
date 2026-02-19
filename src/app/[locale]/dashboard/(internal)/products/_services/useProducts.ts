'use client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../_lib/api-client';

export interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
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
      let endpoint = '/products';
      const params: Record<string, string | number | undefined> = {
        limit,
        skip: (page - 1) * limit,
      };

      if (q) {
        endpoint = '/products/search';
        params.q = q;
      } else if (category && category !== 'all') {
        endpoint = `/products/category/${category}`;
        // Category endpoint doesn't support search, but we handle it via if/else
      }

      return apiClient.get<ProductsResponse>(endpoint, {
        params,
      });
    },
    placeholderData: (prev) => prev,
    staleTime: 5000,
  });
};
