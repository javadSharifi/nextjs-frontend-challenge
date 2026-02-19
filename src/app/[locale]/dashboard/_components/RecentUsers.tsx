// src/app/[locale]/dashboard/_components/RecentUsers.tsx
import { Avatar, Group, Text, Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { ColumnDef, GenericTable } from './GenericTable';

interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export const RecentUsers = ({ users, isLoading }: { users: UserSummary[]; isLoading: boolean }) => {
  const t = useTranslations();

  const columns: ColumnDef<UserSummary>[] = [
    {
      header: t('Users.table.name'),
      render: (user) => (
        <Group gap="3">
          <Avatar.Root size="xs">
            <Avatar.Image src={user.image} />
            <Avatar.Fallback name={user.firstName} />
          </Avatar.Root>
          <Box>
            <Text fontWeight="medium" fontSize="xs" color="fg.default">
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <Text fontSize="10px" color="fg.muted">
              {user.email}
            </Text>
          </Box>
        </Group>
      ),
    },
  ];

  return (
    <Box minH="200px">
      <GenericTable data={users} columns={columns} isLoading={isLoading} showActions={false} />
    </Box>
  );
};
