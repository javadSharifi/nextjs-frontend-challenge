'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from '@/src/i18n/navigation';
import { Center, Spinner } from '@chakra-ui/react';
import { useAuthUser } from '../_services/useLogin';

const GUEST_ONLY_ROUTES = ['/dashboard/login'];
const DEFAULT_AUTH_REDIRECT = '/dashboard';

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useAuthUser();

  useEffect(() => {
    if (isLoading) return;

    const isGuestRoute = GUEST_ONLY_ROUTES.includes(pathname);

    if (user && isGuestRoute) {
      router.replace(DEFAULT_AUTH_REDIRECT);
    } else if (!user && !isGuestRoute) {
      router.replace('/dashboard/login');
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <Center h="100vh" w="100vw" suppressHydrationWarning>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  const isGuestRoute = GUEST_ONLY_ROUTES.includes(pathname);
  if (!user && !isGuestRoute) return null;
  if (user && isGuestRoute) return null;

  return <>{children}</>;
};

export default RouteGuard;
