'use client';

import React from 'react';
import { CheckSquare, Trash2 } from 'lucide-react';
import { useSelectContext } from './AdvancedSelect';
import { cn } from '@/src/lib/utils';
import { SelectActionsProps } from '../_lib/select.types';

const SelectActions = ({
  className,
  selectAllLabel = 'Select All',
  clearAllLabel = 'Clear All'
}: SelectActionsProps) => {
  const { onSelectAll, onClearAll, mode } = useSelectContext();

  if (mode !== 'multi') return null;

  return (
    <div className={cn('sticky top-[53px] z-10 flex items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 border-b border-border/50', className)}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSelectAll();
        }}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-background/50 py-1.5 text-[11px] font-semibold text-foreground transition-all hover:bg-primary/10 hover:border-primary/50 hover:text-primary active:scale-95"
      >
        <CheckSquare className="h-3.5 w-3.5" />
        {selectAllLabel}
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClearAll();
        }}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-background/50 py-1.5 text-[11px] font-semibold text-muted-foreground transition-all hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive active:scale-95"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {clearAllLabel}
      </button>
    </div>
  );
};

export default SelectActions;
