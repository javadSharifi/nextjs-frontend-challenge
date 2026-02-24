'use client';
import { Container, VStack, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useDashboardData } from '../_services/useDashboardData';
import StatsGrid from '../_components/StatsGrid';
import CategoryChart from '../_components/CategoryChart';
import RecentUsers from '../_components/RecentUsers';
import TopProducts from '../_components/TopProducts';

export default function DashboardHome() {
  const t = useTranslations('Dashboard');
  const { stats, recentUsers, topProducts, categoryDistribution, isLoading } = useDashboardData();

  return (
    <Container maxW="full" bg="bg.canvas" color="fg" py="6" px="8">
      <VStack align="stretch" gap="8">
        <Heading color="fg" size="lg">
          {t('welcome_back')}
        </Heading>

        <StatsGrid stats={stats} isLoading={isLoading} />

        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="8">
          <CategoryChart data={categoryDistribution} isLoading={isLoading} />

          <Box
            bg="bg.panel"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="border.subtle"
            h="400px"
            overflowY="auto"
          >
            <Heading size="md" mb="4" color="fg">
              {t('recent_users')}
            </Heading>
            <RecentUsers users={recentUsers} isLoading={isLoading} />
          </Box>
        </SimpleGrid>

        <Box bg="bg.panel" p="6" borderRadius="2xl" border="1px solid" borderColor="border.subtle">
          <Heading size="md" mb="4" color="fg">
            {t('top_products')}
          </Heading>
          <TopProducts products={topProducts} isLoading={isLoading} />
        </Box>
      </VStack>
    </Container>
  );
}
