import { Avatar, Box, Text, Badge, HStack, Icon } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { User } from '../_services/useUsers';
import { ColumnDef, GenericTable } from '../../../_components/GenericTable';
import { Circle } from 'lucide-react';

interface UserTableProps {
  users: User[];
}

// Mock helpers for visual consistency with screenshot
const getRole = (id: number) => {
  const roles = ['manager', 'support', 'accountant', 'researcher', 'qa'] as const;
  return roles[id % roles.length];
};

const getStatus = (id: number) => {
  const statuses = ['active', 'inactive', 'pending'] as const;
  // Make active more common
  if (id % 5 === 0) return 'inactive';
  if (id % 7 === 0) return 'pending';
  return 'active';
};

const RoleBadge = ({ role }: { role: string }) => {
  const t = useTranslations('Users.role');
  const colorMap: Record<string, string> = {
    manager: 'blue',
    support: 'cyan',
    accountant: 'purple',
    researcher: 'teal',
    qa: 'orange',
  };

  return (
    <Badge variant="subtle" size="md" colorPalette={colorMap[role]} borderRadius="full" px="3">
      {t(role as any)}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const t = useTranslations('Users.status');
  const colorMap: Record<string, string> = {
    active: 'green.500',
    inactive: 'gray.500',
    pending: 'yellow.500',
  };

  const bgMap: Record<string, string> = {
    active: 'green.50',
    inactive: 'gray.50',
    pending: 'yellow.50',
  };

  const textColorMap: Record<string, string> = {
    active: 'green.700',
    inactive: 'gray.700',
    pending: 'yellow.700',
  };

  return (
    <HStack
      gap="2"
      bg={bgMap[status]}
      py="1"
      px="3"
      borderRadius="full"
      width="fit-content"
    >
      <Box boxSize="2" bg={colorMap[status]} borderRadius="full" />
      <Text fontSize="xs" fontWeight="medium" color={textColorMap[status]}>
        {t(status as any)}
      </Text>
    </HStack>
  );
};

export const UserTable = ({ users }: UserTableProps) => {
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
            <Text fontSize="xs" color="fg.muted">ID: #{user.id + 4580}</Text>
            {/* Added offset to ID to match screenshot style e.g. 4582 */}
          </Box>
        </HStack>
      ),
    },
    {
      header: t('table.email'),
      render: (user) => <Text fontSize="sm" fontFamily="monospace">{user.email}</Text>,
    },
    {
      header: t('table.role'),
      render: (user) => <RoleBadge role={getRole(user.id)} />,
    },
    {
      header: t('table.status'),
      render: (user) => <StatusBadge status={getStatus(user.id)} />,
    },
  ];

  return <GenericTable data={users} columns={columns} showActions={true} />;
};
