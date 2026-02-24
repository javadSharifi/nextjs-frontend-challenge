import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import type { SelectOption } from '../_types';
import { SelectOptionItem } from './SelectOptionItem';

interface VirtualizedListProps {
  options: SelectOption[];
  height: number;
  isSelected: (value: string) => boolean;
}

export function VirtualizedList({ options, height, isSelected }: VirtualizedListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  return (
    <div ref={listRef} className="overflow-auto" style={{ height, contain: 'strict' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const option = options[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <SelectOptionItem option={option} isSelected={isSelected(option.value)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
