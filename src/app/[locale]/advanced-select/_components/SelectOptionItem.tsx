import { ListboxOption } from '@headlessui/react';
import { Check } from 'lucide-react';

import type { SelectOption } from '../_types';
import { cn } from '@/src/lib/utils';

interface SelectOptionItemProps {
  option: SelectOption;
  isSelected: boolean;
}

export function SelectOptionItem({ option, isSelected }: SelectOptionItemProps) {
  return (
    <ListboxOption
      value={option.value}
      disabled={option.disabled}
      className={cn(
        'relative flex cursor-pointer items-center gap-3 px-4 py-3 select-none',
        'transition-colors duration-150',
        option.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-base-200 focus:bg-base-200',
        isSelected && 'bg-primary/10',
      )}
    >
      {({ focus }) => (
        <>
          <span
            className={cn(
              'rounded-box flex h-5 w-5 items-center justify-center border-2 transition-all duration-200',
              isSelected ? 'border-primary bg-primary text-primary-content' : 'border-base-300',
              focus && 'ring-primary/30 ring-2 ring-offset-1',
              option.disabled && 'cursor-not-allowed',
            )}
          >
            {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          </span>
          {option.icon && <span className="shrink-0">{option.icon}</span>}
          <span className={cn('flex-1 truncate', isSelected && 'font-medium')}>{option.label}</span>
          {isSelected && <Check className="text-primary h-4 w-4 shrink-0" />}
        </>
      )}
    </ListboxOption>
  );
}
