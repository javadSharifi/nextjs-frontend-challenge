// src/app/[locale]/dashboard/_components/RecentUsers.tsx
import { Avatar, Text, Box, HStack, Badge } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { ColumnDef, GenericTable } from './GenericTable';
import { User } from '../(internal)/users/_services/useUsers';

interface RecentUsersProps {
  users: User[];
  isLoading: boolean;
}

export const RecentUsers = ({ users, isLoading }: RecentUsersProps) => {
  const t = useTranslations('Users');

  const columns: ColumnDef<User>[] = [
    {
      header: t('table.name'),
      render: (user) => (
        <HStack gap="3">
          <Avatar.Root size="xs">
            <Avatar.Image src={user.image} />
            <Avatar.Fallback name={user.firstName} />
          </Avatar.Root>
          <Box>
            <Text fontWeight="medium" fontSize="sm" color="fg.default">
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {user.email}
            </Text>
          </Box>
        </HStack>
      ),
    },
    {
      header: t('table.role'),
      render: (user) => (
        <Badge size="xs" variant="subtle" colorPalette={user.role === 'admin' ? 'purple' : 'gray'}>
          {user.role}
        </Badge>
      )
    }
  ];

  return (
    <Box minH="200px">
      <GenericTable data={users} columns={columns} isLoading={isLoading} showActions={false} />
    </Box>
  );
};
