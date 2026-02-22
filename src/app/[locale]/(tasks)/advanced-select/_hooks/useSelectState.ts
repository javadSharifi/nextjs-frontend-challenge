import { useState, useCallback, useMemo } from 'react';
import { Option, SelectMode } from '../_lib/select.types';

export function useSelectState<TValue>(
  initialValue: TValue | TValue[] | undefined,
  onChange: ((value: TValue | TValue[]) => void) | undefined,
  mode: SelectMode,
  options: Option<TValue>[]
) {
  const [internalValue, setInternalValue] = useState<TValue | TValue[]>(
    initialValue ?? (mode === 'multi' ? [] : (undefined as unknown as TValue))
  );

  const value = initialValue !== undefined ? initialValue : internalValue;

  const selectedValues = useMemo(() => {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null) return [];
    return [value] as TValue[];
  }, [value]);

  const onSelect = useCallback(
    (val: TValue | TValue[]) => {
      if (onChange) {
        onChange(val);
      } else {
        setInternalValue(val);
      }
    },
    [onChange]
  );

  const onSelectAll = useCallback(() => {
    if (mode !== 'multi') return;
    const allValues = options.filter((o) => !o.disabled).map((o) => o.value);
    onSelect(allValues);
  }, [mode, options, onSelect]);

  const onClearAll = useCallback(() => {
    const newValue = (mode === 'multi' ? [] : (undefined as unknown as TValue)) as TValue | TValue[];
    onSelect(newValue);
  }, [mode, onSelect]);

  return {
    selectedValues,
    onSelect,
    onSelectAll,
    onClearAll,
  };
}
