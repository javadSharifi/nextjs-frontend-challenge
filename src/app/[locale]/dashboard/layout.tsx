'use client';
import { Box, Flex, Stack, Container } from '@chakra-ui/react';
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import { RouteGuard } from './_components/RouteGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard>
      <Flex h="100vh" overflow="hidden" bg="bg.canvas" direction="row">
        <Box display={{ base: 'none', md: 'block' }} w="280px" borderEndWidth="1px" bg="bg.panel">
          <Sidebar />
        </Box>

        <Stack flex="1" gap="0" overflow="hidden">
          <Header />
          <Box as="main" py="6" flex="1" overflowY="auto">
            <Container maxW="full" px="6">
              {children}
            </Container>
          </Box>
        </Stack>
      </Flex>
    </RouteGuard>
  );
}
