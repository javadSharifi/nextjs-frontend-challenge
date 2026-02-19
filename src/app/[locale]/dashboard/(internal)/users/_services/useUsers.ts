'use client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../_lib/api-client';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  age: number;
  gender: string;
  company: {
    name: string;
    title: string;
    department: string;
  };
  role: 'admin' | 'moderator' | 'user';
}

interface UsersResponse {
  users: User[];
  total: number;
}

interface UseUsersParams {
  page: number;
  limit: number;
  q?: string;
}

interface UsersStats {
  total: number;
  admins: number;
  moderators: number;
}

export const useUsers = ({ page, limit, q }: UseUsersParams) => {
  return useQuery({
    queryKey: ['users', page, limit, q],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = {
        limit,
        skip: (page - 1) * limit,
      };

      let endpoint = '/users';
      if (q) {
        endpoint = '/users/search';
        params.q = q;
      }

      return apiClient.get<UsersResponse>(endpoint, {
        params,
      });
    },
    placeholderData: (prev) => prev,
    staleTime: 5000,
  });
};

export const useUsersStats = () => {
  return useQuery({
    queryKey: ['users-stats'],
    queryFn: async () => {
      const [totalRes, adminsRes, moderatorsRes] = await Promise.all([
        apiClient.get<UsersResponse>('/users', { params: { limit: 0, select: 'id' } }), // Just to get total count efficiently
        apiClient.get<UsersResponse>('/users/filter', { params: { key: 'role', value: 'admin', limit: 0 } }),
        apiClient.get<UsersResponse>('/users/filter', { params: { key: 'role', value: 'moderator', limit: 0 } }),
      ]);

      return {
        total: totalRes.total,
        admins: adminsRes.total,
        moderators: moderatorsRes.total,
      } as UsersStats;
    },
    staleTime: 60000, // Cache for 1 minute
  });
};
