import { Box, Heading, HStack, Text, Stack } from '@chakra-ui/react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  return (
    <Box as="header" mb="6">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', sm: 'center' }}
        gap="4"
      >
        <Box>
          <Heading size="2xl" mb="1" color="fg.default">
            {title}
          </Heading>
          {description && (
            <Text color="fg.muted" fontSize="sm">
              {description}
            </Text>
          )}
        </Box>
        {actions && (
          <HStack gap="2" flexWrap="wrap">
            {actions}
          </HStack>
        )}
      </Stack>
    </Box>
  );
};
export default PageHeader;
