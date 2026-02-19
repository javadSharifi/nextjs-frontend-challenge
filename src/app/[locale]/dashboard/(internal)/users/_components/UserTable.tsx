import { Avatar, Group, Text, Badge } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { User } from '../_services/useUsers';
import { ColumnDef, GenericTable } from '../../../_components/GenericTable';

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const t = useTranslations('Users');

  const columns: ColumnDef<User>[] = [
    {
      header: t('table.name'),
      render: (user) => (
        <Group gap="3">
          <Avatar.Root size="xs">
            <Avatar.Image src={user.image} />
          </Avatar.Root>
          <Text fontWeight="medium" fontSize="sm">{`${user.firstName} ${user.lastName}`}</Text>
        </Group>
      ),
    },
    {
      header: t('table.email'),
      render: (user) => <Text fontSize="xs">{user.email}</Text>,
    },
    {
      header: t('table.role'),
      render: (user) => (
        <Badge variant="subtle" size="sm" colorPalette="blue">
          {user.company?.title}
        </Badge>
      ),
    },
  ];

  return <GenericTable data={users} columns={columns} showActions={true} />;
};
