import { Box, Heading, HStack, Text, Stack } from '@chakra-ui/react';

interface IPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader = ({ title, description, actions }: IPageHeaderProps) => {
  return (
    <Box as="header" mb="10">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', sm: 'center' }}
        gap="6"
      >
        <Box>
          <Heading size="3xl" mb="2" color="fg.default" fontWeight="900" letterSpacing="tight">
            {title}
          </Heading>
          {description && (
            <Text color="fg.muted" fontSize="md" fontWeight="medium">
              {description}
            </Text>
          )}
        </Box>
        {actions && (
          <HStack gap="3" flexWrap="wrap">
            {actions}
          </HStack>
        )}
      </Stack>
    </Box>
  );
};
export default PageHeader;
