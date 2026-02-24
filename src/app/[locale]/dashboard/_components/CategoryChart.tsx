'use client';

import { Box, Heading, Skeleton } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CategoryDistribution } from '../_services/dashboard-api';

interface ICategoryChartProps {
  data: CategoryDistribution[];
  isLoading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const GRID_COLOR = '#E2E8F0';
const TICK_COLOR = '#4A5568';

const CategoryChart = ({ data, isLoading }: ICategoryChartProps) => {
  const t = useTranslations('Dashboard.charts');

  if (isLoading) {
    return (
      <Box
        h="400px"
        bg="bg.panel"
        borderRadius="2xl"
        border="2px solid"
        borderColor="border.muted"
        p="6"
        shadow="md"
      >
        <Heading size="md" mb="6" color="fg.default">
          {t('categories_distribution')}
        </Heading>
        <Skeleton height="300px" width="100%" borderRadius="md" />
      </Box>
    );
  }

  return (
    <Box
      bg="bg.panel"
      p="6"
      borderRadius="2xl"
      border="2px solid"
      borderColor="border.muted"
      h="400px"
      shadow="md"
      color="fg.default"
    >
      <Heading size="md" mb="6" color="fg.default">
        {t('categories_distribution')}
      </Heading>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={GRID_COLOR} />
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            width={150}
            tick={{ fontSize: 12, fill: TICK_COLOR }}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              borderRadius: '12px',
              border: '2px solid var(--chakra-colors-border-muted)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'var(--chakra-colors-bg-panel)',
              color: 'var(--chakra-colors-fg-default)',
              fontWeight: 'bold',
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1000}>
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryChart;
