'use client';

import { Box, Container, Heading, Text, SimpleGrid, Stack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { MODULES } from './_config/modules';
import ModuleCard from './_components/ModuleCard';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <Box
      as="main"
      minH="100vh"
      bg="gray.50"
      _dark={{ bg: 'black' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={20}
    >
      <Container maxW="container.lg">
        <Stack gap={12}>
          <Stack gap={4} textAlign="center" align="center">
            <Heading
              as="h1"
              size="4xl"
              fontWeight="extrabold"
              letterSpacing="tight"
              color="gray.900"
              _dark={{ color: 'white' }}
            >
              {t('title')}
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} maxW="2xl">
              {t('subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {MODULES.map((module) => {
              return <ModuleCard key={module.name} {...module} />;
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
