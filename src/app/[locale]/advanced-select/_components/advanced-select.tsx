'use client';

import { useState, useRef, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOptions, Transition } from '@headlessui/react';
import { ChevronDown, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAdvancedSelect } from '../_hooks/useAdvancedSelect';
import { SelectSearch, SelectAllButton, VirtualizedList, RegularList } from '.';
import type { AdvancedSelectProps } from '../_types';
import { cn } from '@/src/lib/utils';

export function AdvancedSelect({
  options,
  value = [],
  onChange,
  placeholder,
  disabled = false,
  searchable = true,
  multiple = true,
  selectAll = true,
  virtualized = true,
  virtualHeight = 300,
  className,
  label,
  error,
}: AdvancedSelectProps) {
  const t = useTranslations('AdvancedSelect');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [flipPosition, setFlipPosition] = useState<'bottom' | 'top'>('bottom');

  const {
    search,
    setSearch,
    filteredOptions,
    flatFilteredOptions,
    isAllSelected,
    isIndeterminate,
    displayValue,
    handleSelect,
    handleSelectAll,
    handleClear,
    isSelected,
  } = useAdvancedSelect({
    options,
    value,
    onChange,
    placeholder: placeholder ?? t('placeholder'),
    multiple,
  });

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < virtualHeight + 100 && spaceAbove > spaceBelow) {
          setFlipPosition('top');
        } else {
          setFlipPosition('bottom');
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [virtualHeight]);

  return (
    <div className={cn('relative w-full', className)}>
      {label && <label className="text-base-content mb-2 block text-sm font-medium">{label}</label>}

      <Listbox
        value={value}
        onChange={(newValue) => onChange?.(newValue as string[])}
        multiple={multiple}
        disabled={disabled}
      >
        {({ open }) => (
          <>
            <div className="relative">
              <ListboxButton
                ref={buttonRef}
                className={cn(
                  'border-base-300 bg-base-100 relative w-full cursor-pointer rounded-lg border px-4 py-3 text-left',
                  'transition-all duration-200',
                  'focus:border-primary focus:ring-primary/30 focus:ring-2 focus:ring-offset-1 focus:outline-none',
                  disabled && 'bg-base-200 cursor-not-allowed opacity-50',
                  error && 'border-error focus:border-error focus:ring-error/30',
                  open && 'border-primary ring-primary/30 ring-2 ring-offset-1',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn('block truncate', value.length === 0 && 'text-base-content/40')}
                  >
                    {displayValue}
                  </span>
                  <div className="flex items-center gap-1">
                    {value.length > 0 && multiple && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClear();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            handleClear();
                          }
                        }}
                        className="btn btn-ghost btn-xs cursor-pointer rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </span>
                    )}
                    <ChevronDown
                      className={cn(
                        'text-base-content/40 h-5 w-5 transition-transform duration-200',
                        open && 'rotate-180',
                      )}
                    />
                  </div>
                </div>
              </ListboxButton>

              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  className={cn(
                    'border-base-300 bg-base-100 absolute z-50 w-full rounded-xl border p-0 shadow-xl',
                    'overflow-hidden',
                    flipPosition === 'bottom' ? 'mt-2' : 'mb-2',
                  )}
                  style={{
                    [flipPosition === 'bottom' ? 'top' : 'bottom']: '100%',
                  }}
                >
                  {searchable && (
                    <SelectSearch value={search} onChange={setSearch} placeholder={t('search')} />
                  )}

                  {selectAll && multiple && flatFilteredOptions.length > 0 && (
                    <SelectAllButton
                      isAllSelected={isAllSelected}
                      isIndeterminate={isIndeterminate}
                      onSelectAll={handleSelectAll}
                    />
                  )}

                  {flatFilteredOptions.length === 0 ? (
                    <div className="text-base-content/60 px-4 py-8 text-center">
                      {t('noOptions')}
                    </div>
                  ) : virtualized ? (
                    <VirtualizedList
                      options={flatFilteredOptions}
                      height={virtualHeight}
                      isSelected={isSelected}
                    />
                  ) : (
                    <RegularList
                      options={filteredOptions}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                    />
                  )}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      {error && <p className="text-error mt-1.5 text-sm">{error}</p>}
    </div>
  );
}
