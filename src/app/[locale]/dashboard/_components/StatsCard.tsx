import { Box, Flex, Text, Icon, Skeleton } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';
import { StatsCardColorScheme, statsCardColorMap } from './statsCardColorMap';

interface IStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorScheme: StatsCardColorScheme;
  isLoading?: boolean;
}

const StatsCard = ({ title, value, icon, colorScheme, isLoading }: IStatsCardProps) => {
  const colors = statsCardColorMap[colorScheme] || statsCardColorMap.blue;

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
