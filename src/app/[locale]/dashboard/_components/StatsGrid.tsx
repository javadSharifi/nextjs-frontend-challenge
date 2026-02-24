import { SimpleGrid } from '@chakra-ui/react';
import {
  Users,
  ShoppingCart,
  Package,
  FileText,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DashboardStats } from '../_services/dashboard-api';
import StatsCard, { StatsCardColorScheme } from './StatsCard';

interface IStatsGridProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

const StatsGrid = ({ stats, isLoading }: IStatsGridProps) => {
  const t = useTranslations('Dashboard.kpi');

  const cards: { label: string; value?: number; icon: LucideIcon; color: StatsCardColorScheme }[] =
    [
      { label: t('users'), value: stats?.users, icon: Users, color: 'blue' },
      { label: t('products'), value: stats?.products, icon: Package, color: 'green' },
      { label: t('carts'), value: stats?.carts, icon: ShoppingCart, color: 'purple' },
      { label: t('posts'), value: stats?.posts, icon: FileText, color: 'orange' },
      { label: t('comments'), value: stats?.comments, icon: MessageSquare, color: 'red' },
    ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3, xl: 5 }} gap="6">
      {cards.map((card, i) => (
        <StatsCard
          key={i}
          title={card.label}
          value={card.value?.toLocaleString() || 0}
          icon={card.icon}
          colorScheme={card.color}
          isLoading={isLoading}
        />
      ))}
    </SimpleGrid>
  );
};
export default StatsGrid;
