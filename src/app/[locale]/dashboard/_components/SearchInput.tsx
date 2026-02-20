'use client';
import { Input, Box } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ISearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  debounceTime?: number;
}

const SearchInputInner = ({
  placeholder,
  defaultValue = '',
  onChange,
  debounceTime = 300,
}: ISearchInputProps) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(value);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [value, debounceTime, onChange]);

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

const SearchInput = (props: ISearchInputProps) => {
  return <SearchInputInner key={props.defaultValue} {...props} />;
};

export default SearchInput;
