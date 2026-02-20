import { HStack, IconButton, Text, createListCollection } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const pageSizes = createListCollection({
  items: [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
  ],
});

export const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: IPaginationProps) => {
  const t = useTranslations('Users.pagination');
  const totalPages = Math.ceil(totalItems / pageSize);

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <HStack justify="space-between" w="full" py="4" borderTop="1px solid" borderColor="gray.100">
      <HStack gap="4">
        <Text fontSize="sm" color="gray.600">
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
        <Text fontSize="xs" color="gray.500">
          {t('showing', { start, end, total: totalItems })}
        </Text>
      </HStack>

      <HStack gap="2">
        <IconButton
          aria-label="Previous"
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronRight size={18} />
        </IconButton>
        <Text fontWeight="bold" fontSize="sm">
          {currentPage}
        </Text>
        <IconButton
          aria-label="Next"
          variant="ghost"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronLeft size={18} />
        </IconButton>
      </HStack>
    </HStack>
  );
};
