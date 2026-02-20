import { Image, Badge, Text, Group } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Product } from '../_services/useProducts';
import GenericTable, { ColumnDef } from '../../../_components/GenericTable';

interface ProductTableProps {
  products: Product[];
}

const StatusBadge = ({ status }: { status: Product['availabilityStatus'] }) => {
  const t = useTranslations('Products.status');

  const colorMap: Record<Product['availabilityStatus'], string> = {
    'In Stock': 'green',
    'Low Stock': 'orange',
    'Out of Stock': 'red',
  };

  const labelMap: Record<Product['availabilityStatus'], string> = {
    'In Stock': t('In Stock'),
    'Low Stock': t('Low Stock'),
    'Out of Stock': t('Out of Stock'),
  };

  return (
    <Badge
      variant="subtle"
      size="md"
      colorPalette={colorMap[status] || 'gray'}
      borderRadius="full"
      px="3"
    >
      {labelMap[status]}
    </Badge>
  );
};

export const ProductTable = ({ products }: ProductTableProps) => {
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
      header: t('table.status'),
      render: (p) => <StatusBadge status={p.availabilityStatus} />,
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

  return <GenericTable data={products} columns={columns} showActions={true} />;
};
