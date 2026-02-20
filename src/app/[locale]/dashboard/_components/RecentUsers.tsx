import { Avatar, Text, Box, HStack, Badge } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { User } from '../(internal)/users/_services/useUsers';
import GenericTable, { ColumnDef } from './GenericTable';
import DataList from './DataList';

interface IRecentUsersProps {
  users: User[];
  isLoading: boolean;
}

const RecentUsers = ({ users, isLoading }: IRecentUsersProps) => {
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
      ),
    },
  ];

  return (
    <Box minH="200px">
      <DataList isLoading={isLoading} isEmpty={users.length === 0}>
        <GenericTable data={users} columns={columns} isLoading={isLoading} showActions={false} />
      </DataList>
    </Box>
  );
};
export default RecentUsers;
