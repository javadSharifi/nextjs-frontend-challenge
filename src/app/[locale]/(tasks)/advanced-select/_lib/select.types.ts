import { ReactNode, RefObject } from 'react';
import { VirtualItem } from '@tanstack/react-virtual';

export type Option<TValue> = {
  value: TValue;
  label: string;
  disabled?: boolean;
  group?: string;
};

export type SelectMode = 'single' | 'multi';

export interface SelectContextValue<TValue> {
  options: Option<TValue>[];
  filteredOptions: (Option<TValue> | GroupHeader)[];
  selectedValues: TValue[];
  onSelect: (value: TValue | TValue[]) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  search: string;
  setSearch: (search: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mode: SelectMode;
  isLoading?: boolean;
  placeholder?: string;
  parentRef: RefObject<HTMLDivElement | null>;
  virtualItems: VirtualItem[];
  totalSize: number;
  scrollToIndex: (index: number) => void;
}

export type GroupHeader = {
  isGroup: true;
  label: string;
};

export interface AdvancedSelectProps<TValue> {
  options: Option<TValue>[];
  value?: TValue | TValue[];
  onChange?: (value: TValue | TValue[]) => void;
  mode?: SelectMode;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
}

export interface SelectTriggerProps {
  className?: string;
  placeholder?: string;
}

export interface SelectContentProps {
  className?: string;
  maxHeight?: number | string;
  children?: ReactNode;
}

export interface SelectOptionProps<TValue> {
  option: Option<TValue>;
  index: number;
}

export interface SelectGroupProps {
  label: string;
}

export interface SelectSearchProps {
  placeholder?: string;
  className?: string;
}

export interface SelectActionsProps {
  className?: string;
  selectAllLabel?: string;
  clearAllLabel?: string;
}
