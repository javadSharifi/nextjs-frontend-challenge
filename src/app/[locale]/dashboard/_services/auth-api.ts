import { apiClient } from '../_lib/api-client';
import { AuthUser, LoginInput } from '../_lib/auth';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: (credentials: LoginInput) =>
    apiClient.post<AuthUser>('/auth/login', {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60,
    }),
  getMe: () => apiClient.get<AuthUser>('/auth/me'),
  refreshToken: (token: string) =>
    apiClient.post<RefreshResponse>('/auth/refresh', {
      refreshToken: token,
    }),
};
