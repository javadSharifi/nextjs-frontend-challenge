'use client';

import React, { memo } from 'react';
import { ListboxOption } from '@headlessui/react';
import { Check } from 'lucide-react';
import { useSelectContext } from './AdvancedSelect';
import { cn } from '@/src/lib/utils';
import { SelectOptionProps } from '../_lib/select.types';
import { isEqual } from '../_lib/select.utils';

const SelectOption = <TValue,>({ option }: SelectOptionProps<TValue>) => {
  const { selectedValues } = useSelectContext<TValue>();
  const isSelected = selectedValues.some((v) => isEqual(v, option.value));

  return (
    <ListboxOption
      value={option.value}
      disabled={option.disabled}
      className={({ focus, disabled }) => cn(
        'group relative flex w-full cursor-pointer select-none items-center rounded-md py-2.5 ps-10 pe-3 text-sm transition-all duration-200 outline-none',
        focus && 'bg-primary/10 text-primary',
        disabled && 'pointer-events-none opacity-40 grayscale',
        isSelected && 'text-primary font-semibold'
      )}
    >
      <span className="absolute start-3 flex h-4 w-4 items-center justify-center">
        <div className={cn(
          "h-4 w-4 rounded-sm border border-border transition-all duration-200 flex items-center justify-center",
          isSelected && "bg-primary border-primary shadow-[0_0_10px_var(--color-primary-glow)]",
          !isSelected && "group-hover:border-primary/50"
        )}>
          {isSelected && (
            <Check className="h-3 w-3 text-white" strokeWidth={4} />
          )}
        </div>
      </span>
      <span className="truncate">{option.label}</span>

      {isSelected && (
        <div className="absolute inset-y-1 end-1 w-1 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary-glow)]" />
      )}
    </ListboxOption>
  );
};

SelectOption.displayName = 'SelectOption';

export default memo(SelectOption) as unknown as typeof SelectOption;
