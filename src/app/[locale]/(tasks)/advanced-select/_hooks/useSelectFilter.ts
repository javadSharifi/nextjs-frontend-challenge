import { useState, useMemo } from 'react';
import { Option } from '../_lib/select.types';
import { filterOptions, flattenOptions } from '../_lib/select.utils';

export function useSelectFilter<TValue>(options: Option<TValue>[]) {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    const filtered = filterOptions(options, search);
    return flattenOptions(filtered);
  }, [options, search]);

  return {
    search,
    setSearch,
    filteredOptions,
  };
}
