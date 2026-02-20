export const TOKEN_COOKIE = 'token';
export const AUTH_COOKIE_MAX_AGE = 3600;

export function setAuthCookie(token: string) {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; Secure; SameSite=Strict`;
}

export function hasAuthCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes(`${TOKEN_COOKIE}=`);
}

export function getTokenFromCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.trim().startsWith(`${TOKEN_COOKIE}=`))
    ?.split('=')[1];
}
