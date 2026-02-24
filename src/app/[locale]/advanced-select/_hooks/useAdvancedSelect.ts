import { useState, useMemo, useCallback } from 'react';
import type { SelectData, SelectOption } from '../_types';

const isGroup = (item: SelectData): item is { title: string; options: SelectOption[] } =>
  'options' in item;

export const flattenOptions = (options: SelectData[]): SelectOption[] => {
  return options.flatMap((item) => (isGroup(item) ? item.options : item));
};

export const filterOptions = (options: SelectData[], search: string): SelectData[] => {
  if (!search) return options;

  const lowerSearch = search.toLowerCase();

  return options
    .map((item) => {
      if (isGroup(item)) {
        const filteredGroupOptions = item.options.filter((opt) =>
          opt.label.toLowerCase().includes(lowerSearch),
        );
        if (filteredGroupOptions.length > 0) {
          return { ...item, options: filteredGroupOptions };
        }
        return null;
      }
      if (item.label.toLowerCase().includes(lowerSearch)) {
        return item;
      }
      return null;
    })
    .filter((item): item is SelectData => item !== null);
};

interface UseAdvancedSelectProps {
  options: SelectData[];
  value: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
}

export function useAdvancedSelect({
  options,
  value,
  onChange,
  placeholder,
  multiple = true,
}: UseAdvancedSelectProps) {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => filterOptions(options, search), [options, search]);

  const flatFilteredOptions = useMemo(() => flattenOptions(filteredOptions), [filteredOptions]);

  const allValues = useMemo(() => flattenOptions(options).map((opt) => opt.value), [options]);

  const selectedCount = value.length;
  const isAllSelected = selectedCount === allValues.length && allValues.length > 0;
  const isIndeterminate = selectedCount > 0 && selectedCount < allValues.length;

  const displayValue = useMemo(() => {
    if (value.length === 0) return placeholder;
    if (multiple) {
      if (selectedCount === allValues.length) return 'All selected';
      if (selectedCount === 1) {
        const selectedOption = flattenOptions(options).find((opt) => opt.value === value[0]);
        return selectedOption?.label || `${selectedCount} selected`;
      }
      return `${selectedCount} selected`;
    }
    const selectedOption = flattenOptions(options).find((opt) => opt.value === value[0]);
    return selectedOption?.label || placeholder;
  }, [value, multiple, selectedCount, allValues.length, options, placeholder]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (!onChange) return;

      if (multiple) {
        const newValue = value.includes(optionValue)
          ? value.filter((v) => v !== optionValue)
          : [...value, optionValue];
        onChange(newValue);
      } else {
        onChange([optionValue]);
      }
    },
    [multiple, value, onChange],
  );

  const handleSelectAll = useCallback(() => {
    if (!onChange) return;
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange(allValues);
    }
  }, [isAllSelected, allValues, onChange]);

  const handleClear = useCallback(() => {
    onChange?.([]);
  }, [onChange]);

  const isSelected = useCallback((optionValue: string) => value.includes(optionValue), [value]);

  return {
    search,
    setSearch,
    filteredOptions,
    flatFilteredOptions,
    allValues,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    displayValue,
    handleSelect,
    handleSelectAll,
    handleClear,
    isSelected,
  };
}
