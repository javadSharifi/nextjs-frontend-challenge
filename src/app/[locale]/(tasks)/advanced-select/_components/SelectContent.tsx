'use client';

import React, { useMemo } from 'react';
import { ListboxOptions } from '@headlessui/react';
import { useSelectContext } from './AdvancedSelect';
import { cn } from '@/src/lib/utils';
import { SelectContentProps } from '../_lib/select.types';
import SelectOption from './SelectOption';
import SelectGroup from './SelectGroup';
import { isGroupHeader } from '../_lib/select.utils';

const SelectContent = ({ className, maxHeight = 400, children }: SelectContentProps) => {
  const {
    filteredOptions,
    parentRef,
    virtualItems,
    totalSize,
    isLoading
  } = useSelectContext<unknown>();

  const activeHeader = useMemo(() => {
    if (virtualItems.length === 0) return null;
    const firstItemIndex = virtualItems[0].index;
    for (let i = firstItemIndex; i >= 0; i--) {
      const item = filteredOptions[i];
      if (isGroupHeader(item)) return item.label;
    }
    return null;
  }, [virtualItems, filteredOptions]);

  return (
    <ListboxOptions
      anchor="bottom start"
      transition
      className={cn(
        'z-50 mt-2 min-w-[var(--button-width)] rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 glass-panel neon-border overflow-hidden',
        className
      )}
    >
      {children}
      <div
        ref={parentRef}
        style={{ maxHeight, overflow: 'auto' }}
        className="relative scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        {activeHeader && !isLoading && (
          <div className="sticky top-0 z-20 pointer-events-none">
            <SelectGroup label={activeHeader} />
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8 gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-xs font-medium text-muted-foreground animate-pulse">Loading data...</p>
          </div>
        ) : filteredOptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 gap-2">
            <p className="text-sm font-medium text-foreground/50">No results found</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Try a different search</p>
          </div>
        ) : (
          <div
            style={{ height: `${totalSize}px`, width: '100%' }}
            className="relative"
          >
            {virtualItems.map((virtualItem) => {
              const item = filteredOptions[virtualItem.index];
              const isGroup = isGroupHeader(item);

              return (
                <div
                  key={virtualItem.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    insetInlineStart: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {isGroup ? (
                    <SelectGroup label={item.label} />
                  ) : (
                    <SelectOption option={item} index={virtualItem.index} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ListboxOptions>
  );
};

export default SelectContent;
