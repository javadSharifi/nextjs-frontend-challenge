'use client';

import React, { forwardRef, useMemo } from 'react';
import { ListboxButton } from '@headlessui/react';
import { ChevronDown, X } from 'lucide-react';
import { useSelectContext } from './AdvancedSelect';
import { cn } from '@/src/lib/utils';
import { SelectTriggerProps } from '../_lib/select.types';
import { isEqual } from '../_lib/select.utils';

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder }, ref) => {
    const {
      selectedValues,
      options,
      onClearAll,
      placeholder: contextPlaceholder
    } = useSelectContext<any>();

    const displayPlaceholder = placeholder || contextPlaceholder || 'Select...';

    const firstSelectedLabel = useMemo(() => {
      if (selectedValues.length === 0) return null;
      const firstValue = selectedValues[0];
      return options.find((o) => isEqual(o.value, firstValue))?.label || null;
    }, [selectedValues, options]);

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClearAll();
    };

    return (
      <ListboxButton
        ref={ref}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass-panel neon-border hover:border-primary/40',
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedValues.length > 0 ? (
            <>
              <span className="truncate text-foreground font-medium">
                {firstSelectedLabel}
              </span>
              {selectedValues.length > 1 && (
                <span className="ms-1 rounded-sm bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                  +{selectedValues.length - 1}
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground">{displayPlaceholder}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedValues.length > 0 && (
            <div
              role="button"
              tabIndex={0}
              className="rounded-full p-1 hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={handleClear}
            >
              <X className="h-3.5 w-3.5" />
            </div>
          )}
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
        </div>
      </ListboxButton>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export default SelectTrigger;
