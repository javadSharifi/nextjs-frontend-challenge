import { Stack, Box, Text, Center, Skeleton } from '@chakra-ui/react';
import { PackageOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DataListProps {
  isLoading: boolean;
  isEmpty: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  children: React.ReactNode;
}

const DataList = ({ isLoading, isEmpty, emptyTitle, emptyMessage, children }: DataListProps) => {
  const t = useTranslations('Table');

  if (isLoading) {
    return (
      <Stack gap="4" w="full">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height="50px" width="full" borderRadius="md" />
        ))}
      </Stack>
    );
  }

  if (isEmpty) {
    return (
      <Center
        p="12"
        borderWidth="1px"
        borderColor="border.dashed"
        borderRadius="xl"
        bg="bg.subtle"
        flexDirection="column"
        gap="4"
        color="fg.muted"
      >
        <PackageOpen size={48} strokeWidth={1.5} />
        <Box textAlign="center">
          <Text fontWeight="medium" fontSize="lg" color="fg.default">
            {emptyTitle || t('empty')}
          </Text>
          {emptyMessage && <Text fontSize="sm">{emptyMessage}</Text>}
        </Box>
      </Center>
    );
  }

  return <>{children}</>;
};
export default DataList;
