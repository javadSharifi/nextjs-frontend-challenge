// src/app/[locale]/dashboard/_components/StatsGrid.tsx
import { SimpleGrid, Box, Text, Icon, HStack, Skeleton } from '@chakra-ui/react';
import { Users, ShoppingCart, Package, FileText, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DashboardStats } from '../_services/dashboard-api';

interface StatsGridProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
  const t = useTranslations('Dashboard.kpi');

  const cards = [
    { label: t('users'), value: stats?.users, icon: Users, color: 'blue.500' },
    { label: t('products'), value: stats?.products, icon: Package, color: 'green.500' },
    { label: t('carts'), value: stats?.carts, icon: ShoppingCart, color: 'purple.500' },
    { label: t('posts'), value: stats?.posts, icon: FileText, color: 'orange.500' },
    { label: t('comments'), value: stats?.comments, icon: MessageSquare, color: 'red.500' },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} gap="4">
      {cards.map((card, i) => (
        <Box
          key={i}
          p="5"
          bg="bg.panel"
          borderRadius="xl"
          shadow="sm"
          border="1px solid"
          borderColor="border.subtle"
        >
          <HStack justify="space-between">
            <Box>
              <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                {card.label}
              </Text>
              <Skeleton loading={isLoading}>
                <Text fontSize="2xl" fontWeight="bold">
                  {card.value?.toLocaleString() || 0}
                </Text>
              </Skeleton>
            </Box>
            <Icon as={card.icon} boxSize="6" color={card.color} opacity={0.8} />
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
