// src/app/[locale]/dashboard/_hooks/useDashboardData.ts
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

  return {
    stats: statsQuery.data,
    recentUsers: recentUsersQuery.data?.users || [],
    topProducts: topProductsQuery.data?.products || [],
    isLoading: statsQuery.isLoading || recentUsersQuery.isLoading || topProductsQuery.isLoading,
    isError: statsQuery.isError || recentUsersQuery.isError,
  };
};
