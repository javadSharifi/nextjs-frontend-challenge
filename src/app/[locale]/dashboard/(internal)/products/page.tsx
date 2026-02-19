'use client';
import { Container, VStack, SimpleGrid } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useProducts, useProductsStats } from './_services/useProducts';
import { ProductTable } from './_components/ProductTable';
import { useProductFilters } from './_hooks/useProductFilters';
import { PageHeader } from '../../_components/PageHeader';
import { SearchInput } from '../../_components/SearchInput';
import { DataList } from '../../_components/DataList';
import { Pagination } from '../../_components/Pagination';
import { StatsCard } from '../../_components/StatsCard';
import { Package, Layers, AlertTriangle } from 'lucide-react';

export default function ProductsPage() {
  const t = useTranslations('Products');

  const {
    page,
    setPage,
    limit,
    setLimit,
    q,
    setSearch,
    category
  } = useProductFilters();

  const { data, isLoading } = useProducts({ page, limit, q, category });
  const { data: statsData, isLoading: isStatsLoading } = useProductsStats();

  const stats = [
    {
      title: t('stats.total_products'),
      value: statsData?.total || '-',
      icon: Package,
      colorScheme: 'blue',
    },
    {
      title: t('stats.categories'),
      value: statsData?.categories || '-',
      icon: Layers,
      colorScheme: 'purple',
    },
    // We don't have real "Low Stock" stats yet, so I'll omit it or put a placeholder if I must fill 3.
    // The previous plan mentioned 2 stats for products. I'll stick to 2 or duplicate one for design balance if needed.
    // Actually, I can just leave it as 2 or put "Total Stock" if I can calculate it? No.
    // Let's just use 2 columns or full width for these cards.
    // The design on Users page used 3 columns.
    // Let's try to add one more relevant stat if possible?
    // Maybe just "Average Rating" if I had it.
    // I'll stick to 2 for now, SimpleGrid will handle it.
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
              colorScheme={stat.colorScheme as any}
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
