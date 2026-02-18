import { Link } from '@/src/i18n/navigation';
import { Card, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ModuleItem } from '../_config/modules';

const ModuleCard = ({ name, href, icon, color, bgColor }: ModuleItem) => {
  const t = useTranslations('Home');

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Card.Root
        height="full"
        variant="outline"
        bg="white"
        _dark={{ bg: 'gray.900', borderColor: 'gray.800' }}
        transition="all 0.3s"
        _hover={{
          borderColor: color,
          transform: 'translateY(-4px)',
          shadow: 'lg',
        }}
      >
        <Card.Body gap={4} p={6}>
          <Flex
            w={12}
            h={12}
            align="center"
            justify="center"
            rounded="lg"
            bg={bgColor}
            color={color}
            mb={2}
          >
            <Icon as={icon} boxSize={6} />
          </Flex>

          <Stack gap={2}>
            <Heading size="md" color="gray.900" _dark={{ color: 'white' }}>
              {t(`modules.${name}.title`)}
            </Heading>
            <Text color="gray.500" _dark={{ color: 'gray.400' }} fontSize="sm" lineHeight="tall">
              {t(`modules.${name}.description`)}
            </Text>
          </Stack>

          <Flex mt={4} align="center" color={color} fontSize="sm" fontWeight="semibold">
            {t('action')}
            <Icon as={ArrowRight} ml={2} boxSize={4} />
          </Flex>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default ModuleCard;
