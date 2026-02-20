import { useRouter } from '@/src/i18n/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginInput } from '../_lib/auth';
import { authApi } from './auth-api';
import { hasAuthCookie, setAuthCookie } from '../_lib/cookie-utils';

const AUTH_STALE_TIME = 5 * 60 * 1000;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (data) => {
      setAuthCookie(data.accessToken);
      queryClient.setQueryData(['auth-user'], data);
      router.replace('/dashboard');
    },
    onError: (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Login failed:', error);
      }
    },
  });
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: authApi.getMe,
    enabled: hasAuthCookie(),
    retry: false,
    staleTime: AUTH_STALE_TIME,
  });
};
