'use client';

import { Button } from '@/src/components/ui/button';
import { ColorModeButton } from '@/src/components/ui/color-mode';
import { Flex, Text, HStack } from '@chakra-ui/react';
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
      px="6"
      py="4"
      bg="bg.panel"
      borderBottomWidth="1px"
    >
      <HStack gap="4">
        <Button
          variant="ghost"
          size="sm"
          display={{ base: 'flex', md: 'none' }}
          onClick={onSidebarOpen}
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </Button>

        <Text fontWeight="bold" fontSize="lg">
          {t('title')}
        </Text>
      </HStack>

      <HStack gap="3">
        <Button variant="ghost" size="sm" rounded="full" aria-label="Notifications">
          <Bell size={20} />
        </Button>
        <ColorModeButton />
      </HStack>
    </Flex>
  );
};
export default Header;
