'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useSelectContext } from './AdvancedSelect';
import { cn } from '@/src/lib/utils';
import { SelectSearchProps } from '../_lib/select.types';

const SelectSearch = ({ placeholder = 'Search items...', className }: SelectSearchProps) => {
  const { search, setSearch } = useSelectContext();

  return (
    <div className={cn('sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 border-b border-border/50', className)}>
      <div className="relative">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-input bg-background/50 py-2 ps-9 pe-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default SelectSearch;
