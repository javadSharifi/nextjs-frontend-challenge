import { Box, Flex, Text, Icon, Skeleton } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

export type StatsCardColorScheme = 'purple' | 'green' | 'blue' | 'orange' | 'red';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorScheme: StatsCardColorScheme;
  isLoading?: boolean;
}

const colorMap: Record<StatsCardColorScheme, { bg: string; color: string; valueColor: string }> = {
  purple: {
    bg: 'purple.100',
    color: 'purple.600',
    valueColor: 'purple.600',
  },
  green: {
    bg: 'green.100',
    color: 'green.600',
    valueColor: 'green.600',
  },
  blue: {
    bg: 'blue.100',
    color: 'blue.600',
    valueColor: 'gray.800',
  },
  orange: {
    bg: 'orange.100',
    color: 'orange.600',
    valueColor: 'orange.600',
  },
  red: {
    bg: 'red.100',
    color: 'red.600',
    valueColor: 'red.600',
  },
};

export const StatsCard = ({ title, value, icon, colorScheme, isLoading }: StatsCardProps) => {
  const colors = colorMap[colorScheme] || colorMap.blue;

  return (
    <Box
      bg="bg.panel"
      p="6"
      borderRadius="2xl"
      shadow="sm"
      border="1px solid"
      borderColor="border.subtle"
      flex="1"
    >
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text fontSize="sm" color="fg.muted" fontWeight="medium" mb="2">
            {title}
          </Text>
          <Skeleton loading={isLoading}>
            <Text fontSize="3xl" fontWeight="bold" color={colors.valueColor}>
              {value}
            </Text>
          </Skeleton>
        </Box>
        <Flex
          align="center"
          justify="center"
          bg={colors.bg}
          color={colors.color}
          p="3"
          borderRadius="xl"
        >
          <Icon as={icon} boxSize="6" />
        </Flex>
      </Flex>
    </Box>
  );
};
