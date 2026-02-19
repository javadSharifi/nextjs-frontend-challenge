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
interface ProductQueryParams {
  limit: number;
  skip: number;
  q?: string;
}

export const useProducts = (page: number, limit: number, q: string, category: string) => {
  return useQuery({
    queryKey: ['products', page, limit, q, category],
    queryFn: async () => {
      let endpoint = '/products';

      // مقداردهی اولیه با تایپ مشخص به جای any
      const params: ProductQueryParams = {
        limit,
        skip: (page - 1) * limit,
      };

      if (q) {
        endpoint = '/products/search';
        params.q = q;
      } else if (category && category !== 'all') {
        endpoint = `/products/category/${category}`;
      }

      return apiClient.get<ProductsResponse>(endpoint, {
        params: params as unknown as Record<string, string | number | boolean | undefined>,
      });
    },
    placeholderData: (previousData) => previousData,
  });
};
