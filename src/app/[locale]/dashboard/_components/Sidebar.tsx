'use client';
import { Button } from '@/src/components/ui/button';
import { Link } from '@/src/i18n/navigation';
import { Stack, Text, Box, Flex, Avatar, Icon } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Package, LogOut } from 'lucide-react';

interface ISidebar {
  onItemClick?: () => void;
}

const Sidebar = ({ onItemClick }: ISidebar) => {
  const tDashboard = useTranslations('Dashboard');
  const pathname = usePathname();

  const MAIN_ITEMS = [
    { label: tDashboard('title'), href: '/dashboard', icon: LayoutDashboard, exact: true },
    { label: tDashboard('users'), href: '/dashboard/users', icon: Users },
    { label: tDashboard('products'), href: '/dashboard/products', icon: Package },
  ];

  const renderNavItem = (item: {
    label: string;
    href: string;
    icon: LucideIcon;
    exact?: boolean;
  }) => {
    const isActive = item.exact
      ? pathname.endsWith(item.href) || pathname === item.href
      : pathname.includes(item.href);

    return (
      <Button
        key={item.href}
        asChild
        variant={isActive ? 'solid' : 'ghost'}
        justifyContent="flex-start"
        colorPalette={isActive ? 'blue' : 'gray'}
        gap="3"
        w="full"
        px="4"
        h="11"
        borderRadius="xl"
        onClick={onItemClick}
        border="1px solid"
        borderColor={isActive ? 'blue.400' : 'transparent'}
        _hover={{ bg: isActive ? 'blue.600' : 'gray.100' }}
      >
        <Link href={item.href}>
          <Icon as={item.icon} boxSize="5" />
          <Text fontWeight={isActive ? 'bold' : 'medium'}>{item.label}</Text>
        </Link>
      </Button>
    );
  };

  return (
    <Stack
      h="full"
      px="4"
      py="8"
      justify="space-between"
      bg="bg.panel"
      borderLeftWidth="2px"
      borderColor="border.muted"
    >
      <Stack gap="10">
        <Flex align="center" gap="3" px="2">
          <Box bg="blue.600" p="2.5" borderRadius="xl" color="white" shadow="0 4px 12px rgba(37, 99, 235, 0.3)">
            <Icon as={LayoutDashboard} boxSize="6" />
          </Box>
          <Text fontSize="2xl" fontWeight="800" color="fg.default" letterSpacing="tight">
            {tDashboard('admin')}
          </Text>
        </Flex>

        <Stack gap="8">
          <Box>
            <Text fontSize="xs" fontWeight="800" color="fg.muted" mb="4" px="4" textTransform="uppercase" letterSpacing="widest">
              {tDashboard('menu_main')}
            </Text>
            <Stack gap="2">{MAIN_ITEMS.map(renderNavItem)}</Stack>
          </Box>
        </Stack>
      </Stack>

      <Box borderTopWidth="2px" borderColor="border.muted" pt="6">
        <Flex align="center" justify="space-between" mb="4" px="2">
          <Flex gap="3" align="center">
            <Avatar.Root size="sm" border="2px solid" borderColor="blue.500">
              <Avatar.Image src="https://dummyjson.com/icon/emilys/128" />
              <Avatar.Fallback name={tDashboard('profile_name')} />
            </Avatar.Root>
            <Box>
              <Text fontSize="sm" fontWeight="bold">
                {tDashboard('profile_name')}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {tDashboard('profile_role')}
              </Text>
            </Box>
          </Flex>
          <Button variant="ghost" size="sm" colorPalette="red" borderRadius="lg">
            <Icon as={LogOut} />
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
};
export default Sidebar;
