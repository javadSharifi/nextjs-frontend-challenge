import { useRouter } from '@/src/i18n/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginInput } from '../_lib/auth';
import { authApi } from './auth-api';

const TOKEN_COOKIE = 'token';

function setAuthCookie(token: string) {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=3600; Secure; SameSite=Strict`;
}

function hasAuthCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes(`${TOKEN_COOKIE}=`);
}

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
      console.error('Login failed:', error);
    },
  });
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: authApi.getMe,
    enabled: hasAuthCookie,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
