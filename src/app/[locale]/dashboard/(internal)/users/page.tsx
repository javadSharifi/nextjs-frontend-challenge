// src/app/[locale]/dashboard/users/page.tsx
'use client';
import { Container, Heading, VStack, HStack, Input, Box, Skeleton } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useUserFilters } from './_hooks/useUserFilters';
import { UserTable } from './_components/UserTable';
import { Pagination } from './_components/Pagination';
import { useUsers } from './_services/useUsers';

export default function UsersPage() {
  const t = useTranslations('Users');
  const { page, setPage, limit, handleLimitChange, q, handleSearch } = useUserFilters();
  const { data, isLoading } = useUsers(page, limit, q);

  return (
    <Container maxW="full" py="6">
      <VStack align="stretch" gap="6">
        <HStack justify="space-between">
          <Heading size="md">{t('title')}</Heading>
          <Input
            maxW="320px"
            placeholder={t('search_placeholder')}
            defaultValue={q}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </HStack>

        <Box minH="400px">
          {isLoading ? (
            <VStack gap="2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} h="50px" w="full" />
              ))}
            </VStack>
          ) : (
            <>
              <UserTable users={data?.users || []} isLoading={isLoading} />
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalItems={data?.total || 0}
                onPageChange={setPage}
                onPageSizeChange={handleLimitChange}
              />
            </>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
