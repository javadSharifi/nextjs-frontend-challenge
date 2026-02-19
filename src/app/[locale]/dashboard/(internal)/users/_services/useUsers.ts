'use client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../_lib/api-client';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  gender: string;
  company: { name: string; title: string };
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
