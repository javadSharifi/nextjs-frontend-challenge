'use client';
import { Container, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useTableParams } from '../../_hooks/useTableParams';
import { UserTable } from './_components/UserTable';
import { useUsers } from './_services/useUsers';
import { PageHeader } from '../../_components/PageHeader';
import { SearchInput } from '../../_components/SearchInput';
import { DataList } from '../../_components/DataList';
import { Pagination } from '../../_components/Pagination';

export default function UsersPage() {
  const t = useTranslations('Users');
  const { page, setPage, limit, setLimit, q, setSearch } = useTableParams();
  const { data, isLoading } = useUsers({ page, limit, q });

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
          isEmpty={!data?.users || data.users.length === 0}
          emptyMessage={t('no_data')}
        >
          <UserTable users={data?.users || []} />

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
