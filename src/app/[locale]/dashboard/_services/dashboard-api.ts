import { User } from '../(internal)/users/_services/useUsers';
import { apiClient } from '../_lib/api-client';

export interface ProductSummary {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  category: string;
}

export interface DashboardStats {
  users: number;
  products: number;
  carts: number;
  posts: number;
  comments: number;
}

export interface CategoryDistribution {
  name: string;
  count: number;
}

export const dashboardApi = {
  getTotals: async (): Promise<DashboardStats> => {
    const endpoints = ['/users', '/products', '/carts', '/posts', '/comments'];
    const results = await Promise.all(
      endpoints.map((url) => apiClient.get<{ total: number }>(url, { params: { limit: 0 } })),
    );

    return {
      users: results[0].total,
      products: results[1].total,
      carts: results[2].total,
      posts: results[3].total,
      comments: results[4].total,
    };
  },

  getRecentUsers: () => apiClient.get<{ users: User[] }>('/users', { params: { limit: 5 } }),

  getTopProducts: () =>
    apiClient.get<{ products: ProductSummary[] }>('/products', {
      params: { limit: 6, sortBy: 'rating', order: 'desc' },
    }),

  getCategoriesDistribution: async (): Promise<CategoryDistribution[]> => {
    const res = await apiClient.get<{ products: ProductSummary[] }>('/products', {
      params: { limit: 100, select: 'category' },
    });

    const counts: Record<string, number> = {};
    res.products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  },
};
