import type { SelectData, SelectOption } from '../_types';
import { SelectOptionItem } from './SelectOptionItem';

const isGroup = (item: SelectData): item is { title: string; options: SelectOption[] } =>
  'options' in item;

interface RegularListProps {
  options: SelectData[];
  isSelected: (value: string) => boolean;
  onSelect: (value: string) => void;
}

export function RegularList({ options, isSelected }: RegularListProps) {
  return (
    <div className="max-h-[300px] overflow-auto py-2">
      {options.map((item) => {
        if (isGroup(item)) {
          return (
            <div key={item.title} className="mb-2">
              <div className="bg-base-200/50 text-base-content/60 px-4 py-2 text-xs font-semibold tracking-wider uppercase">
                {item.title}
              </div>
              {item.options.map((option) => (
                <SelectOptionItem
                  key={option.value}
                  option={option}
                  isSelected={isSelected(option.value)}
                />
              ))}
            </div>
          );
        }
        return (
          <SelectOptionItem key={item.value} option={item} isSelected={isSelected(item.value)} />
        );
      })}
    </div>
  );
}
