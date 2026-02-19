// src/app/[locale]/dashboard/page.tsx
'use client';
import { Container, VStack, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { StatsGrid } from '../_components/StatsGrid';
import { useDashboardData } from '../_services/useDashboardData';
import { TopProducts } from '../_components/TopProducts';
import { RecentUsers } from '../_components/RecentUsers';
import { CategoryChart } from '../_components/CategoryChart';

export default function DashboardHome() {
  const t = useTranslations('Dashboard');
  const { stats, recentUsers, topProducts, categoryDistribution, isLoading } = useDashboardData();

  return (
    <Container maxW="full" py="6" px="8">
      <VStack align="stretch" gap="8">
        <Heading size="lg">{t('welcome_back')}</Heading>

        {/* KPI Grid */}
        <StatsGrid stats={stats} isLoading={isLoading} />

        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="8">
          {/* Chart Section */}
          <CategoryChart data={categoryDistribution} isLoading={isLoading} />

          {/* Recent Users Section */}
          <Box
            bg="bg.panel"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.subtle"
            h="400px" // Match chart height
            overflowY="auto"
          >
            <Heading size="md" mb="4">
              {t('recent_users')}
            </Heading>
            <RecentUsers users={recentUsers} isLoading={isLoading} />
          </Box>
        </SimpleGrid>

        {/* Top Products Section */}
        <Box
          bg="bg.panel"
          p="6"
          borderRadius="2xl"
          border="1px solid"
          borderColor="border.subtle"
        >
          <Heading size="md" mb="4">
            {t('top_products')}
          </Heading>
          <TopProducts products={topProducts} isLoading={isLoading} />
        </Box>
      </VStack>
    </Container>
  );
}
