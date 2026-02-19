// src/app/[locale]/dashboard/_components/TopProducts.tsx
import { SimpleGrid, Box, Image, Text, VStack, Badge, HStack, Icon, Skeleton } from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProductSummary } from '../_services/dashboard-api';

interface TopProductsProps {
  products: ProductSummary[];
  isLoading: boolean;
}

export const TopProducts = ({ products, isLoading }: TopProductsProps) => {
  const t = useTranslations('Products');

  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 6 }} gap="4">
        {[...Array(6)].map((_, i) => (
          <Box key={i} h="200px" bg="bg.panel" borderRadius="lg" p="4">
            <Skeleton h="100px" w="full" mb="4" />
            <Skeleton h="4" w="60%" mb="2" />
            <Skeleton h="4" w="40%" />
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 6 }} gap="4">
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
          position="relative"
          overflow="hidden"
        >
          <VStack align="stretch" gap="3">
            <Box position="relative" h="120px" w="full" bg="white" borderRadius="md" overflow="hidden">
               <Image
                src={product.thumbnail}
                alt={product.title}
                h="full"
                w="full"
                objectFit="contain"
              />
              <Badge
                position="absolute"
                top="2"
                right="2"
                size="xs"
                colorPalette="orange"
                variant="solid"
                display="flex"
                alignItems="center"
                gap="1"
              >
                <Icon as={Star} boxSize="3" fill="currentColor" />
                {product.rating}
              </Badge>
            </Box>

            <VStack align="stretch" gap="1">
              <Badge size="xs" variant="outline" colorPalette="blue" w="fit-content">
                {product.category}
              </Badge>

              <Text fontSize="xs" fontWeight="semibold" truncate color="fg.default" title={product.title}>
                {product.title}
              </Text>

              <Text fontSize="md" fontWeight="bold" color="green.600">
                ${product.price}
              </Text>
            </VStack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
