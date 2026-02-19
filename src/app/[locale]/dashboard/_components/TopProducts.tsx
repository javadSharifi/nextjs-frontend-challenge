// src/app/[locale]/dashboard/_components/TopProducts.tsx
import { SimpleGrid, Box, Image, Text, VStack, Badge, HStack, Icon } from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProductSummary {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  category: string;
}

export const TopProducts = ({ products }: { products: ProductSummary[]; isLoading: boolean }) => {
  const t = useTranslations('Products.table');

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
      {products.map((product) => (
        <Box
          key={product.id}
          bg="bg.panel"
          p="3"
          borderRadius="lg"
          border="1px solid"
          borderColor="border.subtle"
          _hover={{ shadow: 'md', borderColor: 'blue.500/50' }}
          transition="all 0.2s"
        >
          <VStack align="stretch" gap="3">
            <Image
              src={product.thumbnail}
              alt={product.title}
              h="100px"
              w="full"
              objectFit="cover"
              borderRadius="md"
            />
            <VStack align="stretch" gap="1">
              <HStack justify="space-between">
                <Badge size="xs" variant="subtle" colorPalette="blue">
                  {product.category}
                </Badge>
                <HStack gap="1">
                  <Icon as={Star} color="orange.400" boxSize="3" fill="orange.400" />
                  <Text fontSize="xs" fontWeight="bold">
                    {product.rating}
                  </Text>
                </HStack>
              </HStack>
              <Text fontSize="sm" fontWeight="semibold" truncate color="fg.default">
                {product.title}
              </Text>
              <Text fontSize="md" fontWeight="bold" color="green.500">
                ${product.price}
              </Text>
            </VStack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
