// src/app/[locale]/dashboard/page.tsx
'use client';
import { Container, VStack, Heading, SimpleGrid, Box, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { StatsGrid } from '../_components/StatsGrid';
import { useDashboardData } from '../_services/useDashboardData';
import { TopProducts } from '../_components/TopProducts';
import { RecentUsers } from '../_components/RecentUsers';

export default function DashboardHome() {
  const t = useTranslations('Dashboard');
  const { stats, recentUsers, topProducts, isLoading } = useDashboardData();

  return (
    <Container maxW="full" py="6" px="8">
      <VStack align="stretch" gap="8">
        <Heading size="lg">{t('welcome_back')}</Heading>

        {/* لایه KPI ها */}
        <StatsGrid stats={stats} isLoading={isLoading} />

        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="8">
          {/* کاربران اخیر */}
          <Box
            bg="bg.panel"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.subtle"
          >
            <Heading size="md" mb="4">
              Recent Users
            </Heading>
            <RecentUsers users={recentUsers} isLoading={isLoading} />
          </Box>

          {/* محصولات برتر */}
          <Box
            bg="bg.panel"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.subtle"
          >
            <Heading size="md" mb="4">
              Top Rated Products
            </Heading>
            <TopProducts products={topProducts} isLoading={isLoading} />
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
