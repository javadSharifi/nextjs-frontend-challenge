'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import { AdvancedSelectProps, SelectContextValue } from '../_lib/select.types';
import { useSelectState } from '../_hooks/useSelectState';
import { useSelectFilter } from '../_hooks/useSelectFilter';
import { useSelectVirtualizer } from '../_hooks/useSelectVirtualizer';
import { cn } from '@/src/lib/utils';

const SelectContext = createContext<SelectContextValue<unknown> | undefined>(undefined);

export function useSelectContext<TValue>() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within an AdvancedSelect');
  }
  return context as SelectContextValue<TValue>;
}

const AdvancedSelect = <TValue,>({
  options,
  value: controlledValue,
  onChange,
  mode = 'single',
  placeholder = 'Select option...',
  isLoading = false,
  className,
  children,
}: AdvancedSelectProps<TValue>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedValues, onSelect, onSelectAll, onClearAll } = useSelectState(
    controlledValue,
    onChange,
    mode,
    options
  );
  const { search, setSearch, filteredOptions } = useSelectFilter(options);
  const { parentRef, virtualItems, totalSize, scrollToIndex } = useSelectVirtualizer(
    filteredOptions.length
  );

  const contextValue: SelectContextValue<TValue> = useMemo(() => ({
    options,
    filteredOptions,
    selectedValues,
    onSelect,
    onSelectAll,
    onClearAll,
    search,
    setSearch,
    isOpen,
    setIsOpen,
    mode,
    isLoading,
    placeholder,
    parentRef,
    virtualItems,
    totalSize,
    scrollToIndex,
  }), [
    options,
    filteredOptions,
    selectedValues,
    onSelect,
    onSelectAll,
    onClearAll,
    search,
    setSearch,
    isOpen,
    mode,
    isLoading,
    placeholder,
    parentRef,
    virtualItems,
    totalSize,
    scrollToIndex,
  ]);

  return (
    <SelectContext.Provider value={contextValue as SelectContextValue<unknown>}>
      <Listbox
        value={mode === 'multi' ? selectedValues : (selectedValues[0] ?? (undefined as TValue))}
        onChange={onSelect}
        multiple={mode === 'multi'}
      >
        <div className={cn('relative w-full', className)}>
          {children}
        </div>
      </Listbox>
    </SelectContext.Provider>
  );
};

export default AdvancedSelect;
