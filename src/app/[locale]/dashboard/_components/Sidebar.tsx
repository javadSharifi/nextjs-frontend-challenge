'use client';
import { Button } from '@/src/components/ui/button';
import { Link } from '@/src/i18n/navigation';
import { Stack, Text, Box } from '@chakra-ui/react';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LuLayoutDashboard, LuUsers, LuPackage, LuLogOut } from 'react-icons/lu';

export default function Sidebar() {
  const tDashboard = useTranslations('Dashboard');
  const tAuth = useTranslations('Auth');
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: tDashboard('title'), href: '/dashboard', icon: LuLayoutDashboard },
    { label: tDashboard('users'), href: '/dashboard/users', icon: LuUsers },
    { label: tDashboard('products'), href: '/dashboard/products', icon: LuPackage },
  ];

  return (
    <Stack h="full" px="4" py="6" justify="space-between" gap="0">
      <Stack gap="6">
        <Text fontSize="xl" fontWeight="bold" px="2" color="colorPalette.fg">
          {tDashboard('title')}
        </Text>

        <Stack gap="1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.endsWith(item.href);
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? 'subtle' : 'ghost'}
                justifyContent="flex-start"
                gap="3"
              >
                <Link href={item.href}>
                  <item.icon size="18" />
                  <Text>{item.label}</Text>
                </Link>
              </Button>
            );
          })}
        </Stack>
      </Stack>

      <Box borderTopWidth="1px" pt="4">
        <Button variant="ghost" colorPalette="red" w="full" justifyContent="flex-start" gap="3">
          <LuLogOut size="18" />
          {tAuth('logout')}
        </Button>
      </Box>
    </Stack>
  );
}
