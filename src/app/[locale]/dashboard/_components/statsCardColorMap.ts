import { BoxProps } from '@chakra-ui/react';

export type StatsCardColorScheme = 'purple' | 'green' | 'blue' | 'orange' | 'red';

export type ColorMapValue = {
  bg: BoxProps['bg'];
  color: BoxProps['color'];
  valueColor: BoxProps['color'];
  borderColor: BoxProps['borderColor'];
};

export const statsCardColorMap: Record<StatsCardColorScheme, ColorMapValue> = {
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
