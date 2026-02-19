'use client';

import { Box, Flex, Stack, Container, Drawer } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Flex h="100vh" overflow="hidden" bg="bg.canvas" direction="row">
      {/* Desktop Sidebar */}
      <Box display={{ base: 'none', md: 'block' }} w="280px" borderEndWidth="1px" bg="bg.panel">
        <Sidebar />
      </Box>

      {/* Mobile Sidebar */}
      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Body p="0">
              <Sidebar />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <Stack flex="1" gap="0" overflow="hidden">
        <Header onSidebarOpen={() => setIsOpen(true)} />
        <Box as="main" py="6" flex="1" overflowY="auto">
          <Container maxW="full" px="6">
            {children}
          </Container>
        </Box>
      </Stack>
    </Flex>
  );
}
