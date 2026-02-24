import { Stack, Box, Text, Center, Skeleton } from '@chakra-ui/react';
import { PackageOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IDataListProps {
  isLoading: boolean;
  isEmpty: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  children: React.ReactNode;
}

const DataList = ({ isLoading, isEmpty, emptyTitle, emptyMessage, children }: IDataListProps) => {
  const t = useTranslations('Table');

  if (isLoading) {
    return (
      <Stack gap="4" w="full">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={`skeleton-${i}`} height="50px" width="full" borderRadius="md" />
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
          <Text fontWeight="medium" fontSize="lg" color="fg">
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
