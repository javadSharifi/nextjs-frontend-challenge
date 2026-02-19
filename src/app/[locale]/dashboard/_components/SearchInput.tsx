'use client';
import { Input, Box } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  debounceTime?: number;
}

export const SearchInput = ({
  placeholder = 'Search...',
  defaultValue = '',
  onChange,
  debounceTime = 300,
}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(value);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceTime, onChange]);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Box position="relative" flex="1" maxW="320px">
      <Box
        position="absolute"
        left="3"
        top="50%"
        transform="translateY(-50%)"
        pointerEvents="none"
        color="fg.muted"
        zIndex="1"
      >
        <Search size={18} />
      </Box>
      <Input
        bg="bg.panel"
        borderColor="border.default"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        pl="10"
        _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
      />
    </Box>
  );
};
