'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from '@/src/components/ui/color-mode';
import { system } from '@/src/lib/chakra-system';

export function ChakraProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
