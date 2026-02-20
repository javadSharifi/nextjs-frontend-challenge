'use client';

import { Container, VStack, SimpleGrid } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useProducts, useProductsStats } from './_services/useProducts';
import { ProductTable } from './_components/ProductTable';
import { useProductFilters } from './_hooks/useProductFilters';
import { Package, Layers, type LucideIcon } from 'lucide-react';
import PageHeader from '../../_components/PageHeader';
import SearchInput from '../../_components/SearchInput';
import StatsCard, { type StatsCardColorScheme } from '../../_components/StatsCard';
import DataList from '../../_components/DataList';
import Pagination from '../../_components/Pagination';

interface ProductStat {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorScheme: StatsCardColorScheme;
}

export default function ProductsPage() {
  const t = useTranslations('Products');

  const { page, setPage, limit, setLimit, q, setSearch, category } = useProductFilters();

  const { data, isLoading } = useProducts({ page, limit, q, category });
  const { data: statsData, isLoading: isStatsLoading } = useProductsStats();

  const stats: ProductStat[] = [
    {
      title: t('stats.total_products'),
      value: statsData?.total ?? '-',
      icon: Package,
      colorScheme: 'blue',
    },
    {
      title: t('stats.categories'),
      value: statsData?.categories ?? '-',
      icon: Layers,
      colorScheme: 'purple',
    },
  ];

  return (
    <Container maxW="full" py="6" px="8" bg="bg.canvas">
      <VStack align="stretch" gap="6">
        <PageHeader
          title={t('title')}
          actions={
            <SearchInput
              placeholder={t('search_placeholder')}
              defaultValue={q || ''}
              onChange={setSearch}
            />
          }
        />

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {stats.map((stat, i) => (
            <StatsCard
              key={i}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              colorScheme={stat.colorScheme}
              isLoading={isStatsLoading}
            />
          ))}
        </SimpleGrid>

        <DataList
          isLoading={isLoading}
          isEmpty={!data?.products || data.products.length === 0}
          emptyMessage={t('no_data')}
        >
          <ProductTable products={data?.products || []} />

          <Pagination
            currentPage={page}
            pageSize={limit}
            totalItems={data?.total || 0}
            onPageChange={setPage}
            onPageSizeChange={setLimit}
          />
        </DataList>
      </VStack>
    </Container>
  );
}
