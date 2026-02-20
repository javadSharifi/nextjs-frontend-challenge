'use client';

import { Box, Flex, Stack, Container, Drawer } from '@chakra-ui/react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex h="100vh" overflow="hidden" bg="bg.canvas" direction="row">
      <Box display={{ base: 'none', md: 'block' }} w="280px" borderEndWidth="1px" bg="bg.panel">
        <Sidebar />
      </Box>

      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Body p="0" dir="rtl">
              <Sidebar onItemClick={() => setIsOpen(false)} />
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
};
export default DashboardLayout;
