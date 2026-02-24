'use client';

import { Button } from '@/src/components/ui/button';
import { ColorModeButton } from '@/src/components/ui/color-mode';
import { Flex, Text, HStack, Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Menu, Bell } from 'lucide-react';

interface IHeaderProps {
  onSidebarOpen?: () => void;
}

const Header = ({ onSidebarOpen }: IHeaderProps) => {
  const t = useTranslations('Dashboard');

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px="8"
      py="4"
      bg="bg.panel"
      borderBottomWidth="2px"
      borderColor="border.muted"
      shadow="sm"
      zIndex="5"
      color="fg"
    >
      <HStack gap="4">
        <Button
          variant="subtle"
          size="sm"
          display={{ base: 'flex', md: 'none' }}
          onClick={onSidebarOpen}
          aria-label="Open Menu"
          colorPalette="blue"
        >
          <Menu size={20} />
        </Button>

        <Text fontWeight="800" fontSize="xl" letterSpacing="tight" color="fg">
          {t('title')}
        </Text>
      </HStack>

      <HStack gap="3">
        <Box pos="relative">
          <Button
            variant="ghost"
            size="sm"
            rounded="full"
            aria-label="Notifications"
            h="10"
            w="10"
            color="fg"
          >
            <Bell size={20} />
          </Button>
          <Box
            pos="absolute"
            top="2"
            right="2"
            bg="red.500"
            w="2"
            h="2"
            borderRadius="full"
            border="2px solid"
            borderColor="bg.panel"
          />
        </Box>
        <ColorModeButton />
      </HStack>
    </Flex>
  );
};
export default Header;
