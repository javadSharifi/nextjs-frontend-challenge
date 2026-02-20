import { Avatar, Box, Text, Badge, HStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { User } from '../_services/useUsers';
import GenericTable, { ColumnDef } from '../../../_components/GenericTable';

interface IUserTableProps {
  users: User[];
}

const RoleBadge = ({ role }: { role: string }) => {
  const colorMap: Record<string, string> = {
    admin: 'purple',
    moderator: 'blue',
    user: 'gray',
  };

  return (
    <Badge
      variant="subtle"
      size="md"
      colorPalette={colorMap[role] || 'gray'}
      borderRadius="full"
      px="3"
    >
      {role}
    </Badge>
  );
};

export const UserTable = ({ users }: IUserTableProps) => {
  const t = useTranslations('Users');

  const columns: ColumnDef<User>[] = [
    {
      header: t('table.name'),
      render: (user) => (
        <HStack gap="3">
          <Avatar.Root size="md">
            <Avatar.Image src={user.image} />
            <Avatar.Fallback name={`${user.firstName} ${user.lastName}`} />
          </Avatar.Root>
          <Box>
            <Text fontWeight="bold" fontSize="sm">{`${user.firstName} ${user.lastName}`}</Text>
            <Text fontSize="xs" color="fg.muted">
              @{user.username}
            </Text>
          </Box>
        </HStack>
      ),
    },
    {
      header: t('table.email'),
      render: (user) => (
        <Text fontSize="sm" fontFamily="monospace">
          {user.email}
        </Text>
      ),
    },
    {
      header: t('table.role'),
      render: (user) => (
        <Box>
          <Text fontSize="sm" fontWeight="medium">
            {user.company.title}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {user.company.department}
          </Text>
        </Box>
      ),
    },
    {
      header: t('table.status'),
      render: (user) => <RoleBadge role={user.role} />,
    },
  ];

  return <GenericTable data={users} columns={columns} showActions={true} />;
};
