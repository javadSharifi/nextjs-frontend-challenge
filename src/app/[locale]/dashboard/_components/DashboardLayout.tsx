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
    <Flex h="100vh" overflow="hidden" bg="gray.50" direction="row">
      <Box display={{ base: 'none', md: 'block' }} w="300px" bg="bg.panel" shadow="xl" zIndex="10">
        <Sidebar />
      </Box>

      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="bottom">
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
        <Box as="main" py="8" flex="1" overflowY="auto" bg="gray.50">
          <Container maxW="8xl" px="8">
            {children}
          </Container>
        </Box>
      </Stack>
    </Flex>
  );
};
export default DashboardLayout;
