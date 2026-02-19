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

export const useUsers = (page: number, limit: number, query: string) => {
  return useQuery({
    queryKey: ['users', page, limit, query],
    queryFn: async () => {
      const endpoint = query ? '/users/search' : '/users';
      return apiClient.get<UsersResponse>(endpoint, {
        params: {
          limit,
          skip: (page - 1) * limit,
          q: query || undefined,
        },
      });
    },
    placeholderData: (prev) => prev,
    staleTime: 5000,
  });
};
