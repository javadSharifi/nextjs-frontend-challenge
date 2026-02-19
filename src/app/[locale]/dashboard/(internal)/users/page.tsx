'use client';
import { Container, VStack, SimpleGrid } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useTableParams } from '../../_hooks/useTableParams';
import { UserTable } from './_components/UserTable';
import { useUsers } from './_services/useUsers';
import { PageHeader } from '../../_components/PageHeader';
import { SearchInput } from '../../_components/SearchInput';
import { DataList } from '../../_components/DataList';
import { Pagination } from '../../_components/Pagination';
import { StatsCard } from '../../_components/StatsCard';
import { Users as UsersIcon, CheckCircle, TrendingUp } from 'lucide-react';

export default function UsersPage() {
  const t = useTranslations('Users');
  const { page, setPage, limit, setLimit, q, setSearch } = useTableParams();
  const { data, isLoading } = useUsers({ page, limit, q });

  const stats = [
    {
      title: t('stats.new_users'),
      value: '+۴۵',
      icon: TrendingUp,
      colorScheme: 'purple',
    },
    {
      title: t('stats.active_users'),
      value: '۹۸۵',
      icon: CheckCircle,
      colorScheme: 'green',
    },
    {
      title: t('stats.total_users'),
      value: '۱,۲۴۰',
      icon: UsersIcon,
      colorScheme: 'blue',
    },
  ];

  return (
    <Container maxW="full" py="6" px="8" bg="bg.canvas">
      <VStack align="stretch" gap="8">
        <PageHeader
          title={t('title')}
          description={t('subtitle')}
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
              isLoading={isLoading}
            />
          ))}
        </SimpleGrid>

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
