'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from '../_lib/chakra-system';
import { ColorModeProvider } from './color-mode';

export function ChakraProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
