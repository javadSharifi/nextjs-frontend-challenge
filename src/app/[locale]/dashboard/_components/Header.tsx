'use client';
import { Button } from '@/src/components/ui/button';
import { ColorModeButton } from '@/src/components/ui/color-mode';
import { Flex, Text, HStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { LuMenu, LuBell } from 'react-icons/lu';

interface HeaderProps {
  onSidebarOpen?: () => void;
}

export default function Header({ onSidebarOpen }: HeaderProps) {
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
        >
          <LuMenu />
        </Button>
        <Text fontWeight="bold" fontSize="lg">
          {t('title')}
        </Text>
      </HStack>

      <HStack gap="3">
        <Button variant="ghost" size="sm" rounded="full">
          <LuBell />
        </Button>
        <ColorModeButton />
      </HStack>
    </Flex>
  );
}
