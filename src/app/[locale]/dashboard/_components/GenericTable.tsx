import { Table, Box, IconButton, HStack, Skeleton } from '@chakra-ui/react';
import { Edit2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

export interface ColumnDef<T> {
  header: string;
  render: (item: T) => ReactNode;
}

interface IGenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  showActions?: boolean;
}

const GenericTable = <T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  showActions = true,
}: IGenericTableProps<T>) => {
  const t = useTranslations('Common');

  return (
    <Box
      overflowX="auto"
      borderRadius="2xl"
      border="2px solid"
      borderColor="border.muted"
      bg="bg.panel"
      shadow="sm"
    >
      <Table.Root size="md" variant="line" interactive color="fg.default">
        <Table.Header bg={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}>
          <Table.Row borderBottom="2px solid" borderColor="border.muted">
            {columns.map((col) => (
              <Table.ColumnHeader key={col.header} color="fg.default" fontWeight="800" py="4">
                {col.header}
              </Table.ColumnHeader>
            ))}
            {showActions && <Table.ColumnHeader w="120px" color="fg.default" fontWeight="800" py="4">{t('actions')}</Table.ColumnHeader>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <Table.Row
                  key={`skeleton-row-${i}`}
                  borderBottom="1px solid"
                  borderColor="border.subtle"
                >
                  {columns.map((col) => (
                    <Table.Cell key={col.header} py="4">
                      <Skeleton height="20px" width="80%" />
                    </Table.Cell>
                  ))}
                  {showActions && (
                    <Table.Cell py="4">
                      <Skeleton height="20px" width="100%" />
                    </Table.Cell>
                  )}
                </Table.Row>
              ))
            : data.map((item) => (
                <Table.Row
                  key={item.id}
                  _hover={{ bg: { base: 'blue.50/40', _dark: 'whiteAlpha.50' } }}
                  borderBottom="1px solid"
                  borderColor="border.subtle"
                  transition="background 0.2s"
                >
                  {columns.map((col) => (
                    <Table.Cell key={col.header} py="4" fontWeight="medium" color="fg.default">{col.render(item)}</Table.Cell>
                  ))}

                  {showActions && (
                    <Table.Cell py="4">
                      <HStack gap="2">
                        <IconButton variant="subtle" size="sm" colorPalette="blue" borderRadius="lg" color="blue.600">
                          <Edit2 size={16} />
                        </IconButton>
                        <IconButton variant="subtle" size="sm" colorPalette="red" borderRadius="lg" color="red.600">
                          <Trash2 size={16} />
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
export default GenericTable;
