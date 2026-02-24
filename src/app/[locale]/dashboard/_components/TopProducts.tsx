import { SimpleGrid, Box, Image, Text, VStack, Badge, Icon, Skeleton } from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { ProductSummary } from '../_services/dashboard-api';

interface ITopProductsProps {
  products: ProductSummary[];
  isLoading: boolean;
}

const TopProducts = ({ products, isLoading }: ITopProductsProps) => {
  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 6 }} gap="6">
        {[...Array(6)].map((_, i) => (
          <Box key={i} h="240px" bg="bg.panel" borderRadius="2xl" p="4" border="2px solid" borderColor="border.muted">
            <Skeleton h="120px" w="full" mb="4" borderRadius="xl" />
            <Skeleton h="4" w="60%" mb="2" />
            <Skeleton h="4" w="40%" />
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 6 }} gap="6">
      {products.map((product) => (
        <Box
          key={product.id}
          bg="bg.panel"
          p="4"
          borderRadius="2xl"
          border="2px solid"
          borderColor="border.muted"
          _hover={{ shadow: '2xl', borderColor: 'blue.400', transform: 'translateY(-4px)' }}
          transition="all 0.3s cubic-bezier(.4,0,.2,1)"
          position="relative"
          overflow="hidden"
          shadow="md"
        >
          <VStack align="stretch" gap="4">
            <Box
              position="relative"
              h="140px"
              w="full"
              bg="white"
              borderRadius="xl"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.100"
            >
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
                size="sm"
                colorPalette="orange"
                variant="solid"
                display="flex"
                alignItems="center"
                gap="1"
                borderRadius="lg"
                px="2"
              >
                <Icon as={Star} boxSize="3" fill="currentColor" />
                {product.rating}
              </Badge>
            </Box>

            <VStack align="stretch" gap="2">
              <Badge size="xs" variant="subtle" colorPalette="blue" w="fit-content" borderRadius="md" px="2">
                {product.category}
              </Badge>

              <Text
                fontSize="sm"
                fontWeight="800"
                truncate
                color="fg.default"
                title={product.title}
                lineHeight="short"
              >
                {product.title}
              </Text>

              <Text fontSize="lg" fontWeight="900" color="blue.600">
                ${product.price}
              </Text>
            </VStack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
export default TopProducts;
