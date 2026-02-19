// src/app/[locale]/dashboard/products/_components/ProductTable.tsx
import { Image, Badge, Text, Group } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Product } from '../_services/useProducts';
import { ColumnDef, GenericTable } from '../../../_components/GenericTable';

export const ProductTable = ({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) => {
  const t = useTranslations('Products');

  const columns: ColumnDef<Product>[] = [
    {
      header: t('table.product'),
      render: (p) => (
        <Group gap="3">
          <Image
            src={p.thumbnail}
            alt={p.title}
            boxSize="40px"
            borderRadius="md"
            objectFit="cover"
          />
          <Text fontWeight="bold" fontSize="sm">
            {p.title}
          </Text>
        </Group>
      ),
    },
    {
      header: t('table.category'),
      render: (p) => (
        <Badge size="sm" variant="outline">
          {p.category}
        </Badge>
      ),
    },
    {
      header: t('table.price'),
      render: (p) => (
        <Text fontWeight="bold" color="green.600">
          ${p.price}
        </Text>
      ),
    },
    {
      header: t('table.stock'),
      render: (p) => (
        <Text fontSize="xs" color={p.stock < 10 ? 'red.500' : 'gray.600'}>
          {p.stock} {t('table.in_stock')}
        </Text>
      ),
    },
  ];

  return <GenericTable data={products} columns={columns} isLoading={isLoading} />;
};
