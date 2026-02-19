'use client';
import { Container, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useProducts } from './_services/useProducts';
import { ProductTable } from './_components/ProductTable';
import { useProductFilters } from './_hooks/useProductFilters';
import { PageHeader } from '../../_components/PageHeader';
import { SearchInput } from '../../_components/SearchInput';
import { DataList } from '../../_components/DataList';
import { Pagination } from '../../_components/Pagination';

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
