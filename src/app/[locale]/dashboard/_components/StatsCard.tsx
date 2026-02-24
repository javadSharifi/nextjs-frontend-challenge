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

const colorMap: Record<
  StatsCardColorScheme,
  { bg: any; color: any; valueColor: any; borderColor: any }
> = {
  purple: {
    bg: { base: 'purple.50', _dark: 'purple.900/20' },
    color: { base: 'purple.600', _dark: 'purple.300' },
    valueColor: { base: 'purple.700', _dark: 'purple.200' },
    borderColor: { base: 'purple.200', _dark: 'purple.800' },
  },
  green: {
    bg: { base: 'green.50', _dark: 'green.900/20' },
    color: { base: 'green.600', _dark: 'green.300' },
    valueColor: { base: 'green.700', _dark: 'green.200' },
    borderColor: { base: 'green.200', _dark: 'green.800' },
  },
  blue: {
    bg: { base: 'blue.50', _dark: 'blue.900/20' },
    color: { base: 'blue.600', _dark: 'blue.300' },
    valueColor: { base: 'blue.700', _dark: 'blue.200' },
    borderColor: { base: 'blue.200', _dark: 'blue.800' },
  },
  orange: {
    bg: { base: 'orange.50', _dark: 'orange.900/20' },
    color: { base: 'orange.600', _dark: 'orange.300' },
    valueColor: { base: 'orange.700', _dark: 'orange.200' },
    borderColor: { base: 'orange.200', _dark: 'orange.800' },
  },
  red: {
    bg: { base: 'red.50', _dark: 'red.900/20' },
    color: { base: 'red.600', _dark: 'red.300' },
    valueColor: { base: 'red.700', _dark: 'red.200' },
    borderColor: { base: 'red.200', _dark: 'red.800' },
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
