const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiClientOptions = Omit<RequestInit, 'headers'> & {
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | undefined>;
};

function getTokenFromCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.trim().startsWith('token='))
    ?.split('=')[1];
}

async function request<T>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getTokenFromCookie();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = new URL(`${BASE_URL}${endpoint}`);

  // مدیریت هوشمند Query Parameters
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, options?: ApiClientOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T, B = unknown>(endpoint: string, data?: B, options?: ApiClientOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T, B = unknown>(endpoint: string, data?: B, options?: ApiClientOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: ApiClientOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
