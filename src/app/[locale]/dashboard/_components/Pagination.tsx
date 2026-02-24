import { HStack, IconButton, Text, createListCollection, Box } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}: IPaginationProps) => {
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
      py="6"
      borderTopWidth="2px"
      borderColor="border.muted"
      flexWrap="wrap"
      gap="4"
    >
      <HStack gap="4">
        <Text fontSize="sm" color="fg.muted" fontWeight="bold">
          {t('rows_per_page')}:
        </Text>
        <Select.Root
          collection={pageSizes}
          size="sm"
          width="100px"
          value={[pageSize.toString()]}
          onValueChange={(e) => onPageSizeChange(Number(e.value[0]))}
        >
          <Select.Trigger bg="bg.panel" border="1px solid" borderColor="border.muted" borderRadius="md" px="3">
            <Select.ValueText color="fg.default" fontWeight="bold" />
          </Select.Trigger>
          <Select.Content borderRadius="lg" shadow="xl">
            {pageSizes.items.map((item) => (
              <Select.Item item={item} key={item.value} _hover={{ bg: 'blue.50' }}>
                <Text fontWeight="medium">{item.label}</Text>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Text fontSize="sm" color="fg.muted" fontWeight="medium">
          {t('showing')} <Box as="span" color="fg.default" fontWeight="bold">{start}</Box> {t('of')} <Box as="span" color="fg.default" fontWeight="bold">{end}</Box> ({totalItems} {t('total')})
        </Text>
      </HStack>

      <HStack gap="3">
        <IconButton
          aria-label="Previous Page"
          variant="subtle"
          colorPalette="gray"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="sm"
          borderRadius="lg"
          border="1px solid"
          borderColor="border.muted"
        >
          <ChevronLeft size={18} />
        </IconButton>
        <Box px="3" py="1" borderRadius="md" bg="blue.600" color="white" fontWeight="900" fontSize="sm">
          {currentPage}
        </Box>
        <IconButton
          aria-label="Next Page"
          variant="subtle"
          colorPalette="gray"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          size="sm"
          borderRadius="lg"
          border="1px solid"
          borderColor="border.muted"
        >
          <ChevronRight size={18} />
        </IconButton>
      </HStack>
    </HStack>
  );
};

export default Pagination;
