import { Table, Box, IconButton, HStack } from '@chakra-ui/react';
import { Edit2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

export interface ColumnDef<T> {
  header: string;
  render: (item: T) => ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  showActions?: boolean;
}

const GenericTable = <T extends { id: string | number }>({
  data,
  columns,
  showActions = true,
}: GenericTableProps<T>) => {
  const t = useTranslations('Common');

  return (
    <Box overflowX="auto" borderRadius="xl" border="1px solid" borderColor="border.subtle">
      <Table.Root size="md" variant="line" interactive>
        <Table.Header bg={{ base: 'gray.50', _dark: 'whiteAlpha.50' }}>
          <Table.Row>
            {columns.map((col, index) => (
              <Table.ColumnHeader key={index} color="fg.muted">
                {col.header}
              </Table.ColumnHeader>
            ))}
            {showActions && <Table.ColumnHeader w="100px">{t('actions')}</Table.ColumnHeader>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row
              key={item.id}
              _hover={{ bg: { base: 'gray.50/50', _dark: 'whiteAlpha.50' } }}
              borderBottom="1px solid"
              borderColor="border.subtle"
            >
              {columns.map((col, index) => (
                <Table.Cell key={index}>{col.render(item)}</Table.Cell>
              ))}

              {showActions && (
                <Table.Cell>
                  <HStack gap="2">
                    <IconButton variant="ghost" size="sm" colorPalette="blue">
                      <Edit2 size={16} />
                    </IconButton>
                    <IconButton variant="ghost" size="sm" colorPalette="red">
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
