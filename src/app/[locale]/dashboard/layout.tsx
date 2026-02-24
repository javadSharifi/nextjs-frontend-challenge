import { Metadata } from 'next';
import { ChakraProviderWrapper } from '@/src/providers/ChakraProvider';
import { Box } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: 'Dashboard | %s',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProviderWrapper>
      <Box
        suppressHydrationWarning
        className="chakra dashboard-root"
        minH="100vh"
        bg="bg.canvas"
        color="fg.default"
      >
        {children}
      </Box>
    </ChakraProviderWrapper>
  );
}
