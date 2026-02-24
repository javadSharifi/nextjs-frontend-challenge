'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Box, Button, Card, Input, Stack, Heading, Text, Center, Icon } from '@chakra-ui/react';
import { Lock, User } from 'lucide-react';
import { LoginInput, loginSchema } from '../_lib/auth';
import { useLogin } from '../_services/useLogin';

export default function LoginPage() {
  const t = useTranslations('Login');

  const { mutate: login, isPending, error: apiError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const onSubmit = (data: LoginInput) => login(data);

  return (
    <Center minH="100vh" bg="gray.100" _dark={{ bg: 'black' }} p={4}>
      <Card.Root
        maxW="sm"
        w="full"
        variant="elevated"
        shadow="2xl"
        border="2px solid"
        borderColor="border.muted"
        _dark={{ bg: 'gray.900', borderColor: 'gray.800' }}
      >
        <Card.Body gap={8} p={8}>
          <Stack textAlign="center" gap={2}>
            <Heading size="3xl" fontWeight="900" color="fg.default">
              {t('title')}
            </Heading>
            <Text color="fg.muted" fontSize="md">
              {t('subtitle')}
            </Text>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={5}>
              <Stack gap={1.5}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="fg.default"
                >
                  {t('username')}
                </Text>
                <Box position="relative">
                  <Icon
                    as={User}
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    zIndex="1"
                  />
                  <Input
                    placeholder="Enter your username"
                    {...register('username')}
                    pl={10}
                    variant="subtle"
                    size="lg"
                    color="fg.default"
                    bg="white"
                    _dark={{ bg: 'gray.800' }}
                    border="1px solid"
                    borderColor="border.muted"
                    _focus={{ borderColor: 'blue.500', ring: '2px', ringColor: 'blue.500/20' }}
                  />
                </Box>
                {errors.username && (
                  <Text color="red.500" fontSize="xs" fontWeight="bold">
                    {t(`validation.${errors.username.message}`)}
                  </Text>
                )}
              </Stack>

              <Stack gap={1.5}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="fg.default"
                >
                  {t('password')}
                </Text>
                <Box position="relative">
                  <Icon
                    as={Lock}
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    zIndex="1"
                  />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    pl={10}
                    variant="subtle"
                    size="lg"
                    color="fg.default"
                    bg="white"
                    _dark={{ bg: 'gray.800' }}
                    border="1px solid"
                    borderColor="border.muted"
                    _focus={{ borderColor: 'blue.500', ring: '2px', ringColor: 'blue.500/20' }}
                  />
                </Box>
                {errors.password && (
                  <Text color="red.500" fontSize="xs" fontWeight="bold">
                    {t(`validation.${errors.password.message}`)}
                  </Text>
                )}
              </Stack>

              {apiError && (
                <Box
                  p={3}
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.100"
                  rounded="md"
                  _dark={{ bg: 'red.900/20', borderColor: 'red.900/50' }}
                >
                  <Text
                    color="red.600"
                    _dark={{ color: 'red.200' }}
                    fontSize="sm"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    {apiError.message || 'Authentication failed. Please try again.'}
                  </Text>
                </Box>
              )}

              <Button
                type="submit"
                colorPalette="blue"
                size="xl"
                width="full"
                mt={2}
                fontWeight="900"
                loading={isPending}
                loadingText={t('loading')}
                disabled={isPending}
              >
                {t('submit')}
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}
