'use client';

import { Container, VStack, SimpleGrid } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useTableParams } from '../../_hooks/useTableParams';
import { UserTable } from './_components/UserTable';
import { useUsers, useUsersStats } from './_services/useUsers';
import PageHeader from '../../_components/PageHeader';
import SearchInput from '../../_components/SearchInput';
import DataList from '../../_components/DataList';
import Pagination from '../../_components/Pagination';
import StatsCard from '../../_components/StatsCard';
import { StatsCardColorScheme } from '../../_components/statsCardColorMap';
import { Users as UsersIcon, ShieldCheck, UserCheck, type LucideIcon } from 'lucide-react';

interface UserStat {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorScheme: StatsCardColorScheme;
}

export default function UsersPage() {
  const t = useTranslations('Users');
  const { page, setPage, limit, setLimit, q, setSearch } = useTableParams();

  const { data, isLoading } = useUsers({ page, limit, q });
  const { data: statsData, isLoading: isStatsLoading } = useUsersStats();

  const stats: UserStat[] = [
    {
      title: t('stats.total_users'),
      value: statsData?.total ?? '-',
      icon: UsersIcon,
      colorScheme: 'blue',
    },
    {
      title: t('stats.admins'),
      value: statsData?.admins ?? '-',
      icon: ShieldCheck,
      colorScheme: 'purple',
    },
    {
      title: t('stats.moderators'),
      value: statsData?.moderators ?? '-',
      icon: UserCheck,
      colorScheme: 'green',
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
              colorScheme={stat.colorScheme}
              isLoading={isStatsLoading}
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
