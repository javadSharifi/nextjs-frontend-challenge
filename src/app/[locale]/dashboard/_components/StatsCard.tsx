import { Box, Flex, Text, Icon, Skeleton } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

export type StatsCardColorScheme = 'purple' | 'green' | 'blue' | 'orange' | 'red';

interface IStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorScheme: StatsCardColorScheme;
  isLoading?: boolean;
}

const colorMap: Record<StatsCardColorScheme, { bg: string; color: string; valueColor: string; borderColor: string }> = {
  purple: {
    bg: 'purple.50',
    color: 'purple.600',
    valueColor: 'purple.700',
    borderColor: 'purple.200',
  },
  green: {
    bg: 'green.50',
    color: 'green.600',
    valueColor: 'green.700',
    borderColor: 'green.200',
  },
  blue: {
    bg: 'blue.50',
    color: 'blue.600',
    valueColor: 'blue.700',
    borderColor: 'blue.200',
  },
  orange: {
    bg: 'orange.50',
    color: 'orange.600',
    valueColor: 'orange.700',
    borderColor: 'orange.200',
  },
  red: {
    bg: 'red.50',
    color: 'red.600',
    valueColor: 'red.700',
    borderColor: 'red.200',
  },
};

const StatsCard = ({ title, value, icon, colorScheme, isLoading }: IStatsCardProps) => {
  const colors = colorMap[colorScheme] || colorMap.blue;

  return (
    <Box
      bg="bg.panel"
      p="6"
      borderRadius="2xl"
      shadow="md"
      border="2px solid"
      borderColor={colors.borderColor}
      flex="1"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="fg.muted" fontWeight="bold" mb="1" letterSpacing="tight">
            {title}
          </Text>
          <Skeleton loading={isLoading}>
            <Text fontSize="3xl" fontWeight="800" color={colors.valueColor}>
              {value}
            </Text>
          </Skeleton>
        </Box>
        <Flex
          align="center"
          justify="center"
          bg={colors.bg}
          color={colors.color}
          p="4"
          borderRadius="2xl"
          border="1px solid"
          borderColor={colors.borderColor}
        >
          <Icon as={icon} boxSize="7" />
        </Flex>
      </Flex>
    </Box>
  );
};
export default StatsCard;
