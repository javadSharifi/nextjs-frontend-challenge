'use client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../_lib/api-client';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  gender: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const useUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () =>
      apiClient.get<UsersResponse>('/users', {
        params: {
          limit: limit,
          skip: (page - 1) * limit,
        },
      }),
    placeholderData: (previousData) => previousData,
  });
};
