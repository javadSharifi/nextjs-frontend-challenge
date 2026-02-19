import { HStack, IconButton, Text, createListCollection } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}: PaginationProps) => {
  const t = useTranslations('Table');

  const totalPages = Math.ceil(totalItems / pageSize);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pageSizes = createListCollection({
    items: pageSizeOptions.map((size) => ({ label: size.toString(), value: size.toString() })),
  });

  return (
    <HStack
      justify="space-between"
      w="full"
      py="4"
      borderTopWidth="1px"
      borderColor="border.subtle"
      flexWrap="wrap"
      gap="4"
    >
      <HStack gap="4">
        <Text fontSize="sm" color="fg.muted">
          {t('rows_per_page')}:
        </Text>
        <Select.Root
          collection={pageSizes}
          size="sm"
          width="80px"
          value={[pageSize.toString()]}
          onValueChange={(e) => onPageSizeChange(Number(e.value[0]))}
        >
          <Select.Trigger>
            <Select.ValueText />
          </Select.Trigger>
          <Select.Content>
            {pageSizes.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Text fontSize="xs" color="fg.muted">
          {t('showing')} {start} {t('of')} {end} ({totalItems} total)
        </Text>
      </HStack>

      <HStack gap="2">
        <IconButton
          aria-label="Previous Page"
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="sm"
        >
          <ChevronRight size={18} />
        </IconButton>
        <Text fontWeight="bold" fontSize="sm">
          {currentPage}
        </Text>
        <IconButton
          aria-label="Next Page"
          variant="ghost"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          size="sm"
        >
          <ChevronLeft size={18} />
        </IconButton>
      </HStack>
    </HStack>
  );
};
