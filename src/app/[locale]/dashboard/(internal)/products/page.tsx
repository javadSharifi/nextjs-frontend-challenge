// src/app/[locale]/dashboard/products/page.tsx
'use client';
import { Container, VStack, HStack, Heading, Input, Box, Spinner } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useProducts } from './_services/useProducts';
import { ProductTable } from './_components/ProductTable';
import { Pagination } from '../users/_components/Pagination';
import { useProductFilters } from './_hooks/useProductFilters';

export default function ProductsPage() {
  const t = useTranslations('Products');
  const { page, setPage, limit, setLimit, q, updateSearch, category } = useProductFilters();
  const { data, isLoading } = useProducts(page, limit, q, category);

  return (
    <Container maxW="full" py="6" px="8" bg="bg.canvas">
      <VStack align="stretch" gap="6">
        <HStack justify="space-between">
          <Heading size="lg" color="fg.default">
            {t('title')}
          </Heading>
          <Input
            maxW="320px"
            placeholder={t('search_placeholder')}
            defaultValue={q}
            onChange={(e) => updateSearch(e.target.value)}
            bg="bg.panel"
            borderColor="border.default"
            _focus={{ borderColor: 'blue.500' }}
          />
        </HStack>

        <Box
          bg="bg.panel"
          borderRadius="2xl"
          p="4"
          shadow="sm"
          border="1px solid"
          borderColor="border.subtle"
        >
          {isLoading && !data ? (
            <HStack justify="center" h="400px">
              <Spinner color="blue.500" />
            </HStack>
          ) : (
            <>
              <ProductTable products={data?.products || []} isLoading={isLoading} />
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalItems={data?.total || 0}
                onPageChange={setPage}
                onPageSizeChange={setLimit}
              />
            </>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
