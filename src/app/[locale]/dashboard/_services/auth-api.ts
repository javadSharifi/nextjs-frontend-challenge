import { apiClient } from '../_lib/api-client';
import { AuthUser, LoginInput } from '../_lib/auth';

export const authApi = {
  login: (credentials: LoginInput) =>
    apiClient<AuthUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 60,
      }),
    }),

  getMe: () =>
    apiClient<AuthUser>('/auth/me', {
      method: 'GET',
    }),

  refreshToken: (token: string) =>
    apiClient<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: token }),
    }),
};
