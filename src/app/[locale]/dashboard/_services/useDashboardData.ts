import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../_services/dashboard-api';

export const useDashboardData = () => {
  const statsQuery = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardApi.getTotals,
  });

  const recentUsersQuery = useQuery({
    queryKey: ['recent-users'],
    queryFn: dashboardApi.getRecentUsers,
  });

  const topProductsQuery = useQuery({
    queryKey: ['top-products'],
    queryFn: dashboardApi.getTopProducts,
  });

  const categoryQuery = useQuery({
    queryKey: ['category-distribution'],
    queryFn: dashboardApi.getCategoriesDistribution,
  });

  return {
    stats: statsQuery.data,
    recentUsers: recentUsersQuery.data?.users || [],
    topProducts: topProductsQuery.data?.products || [],
    categoryDistribution: categoryQuery.data || [],
    isLoading:
      statsQuery.isLoading ||
      recentUsersQuery.isLoading ||
      topProductsQuery.isLoading ||
      categoryQuery.isLoading,
    isError:
      statsQuery.isError ||
      recentUsersQuery.isError ||
      topProductsQuery.isError ||
      categoryQuery.isError,
  };
};
