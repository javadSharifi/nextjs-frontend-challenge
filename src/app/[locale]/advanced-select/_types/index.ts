export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectGroup {
  title: string;
  options: SelectOption[];
}

export type SelectData = SelectOption | SelectGroup;

export interface AdvancedSelectProps {
  options: SelectData[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  selectAll?: boolean;
  virtualized?: boolean;
  virtualHeight?: number;
  className?: string;
  label?: string;
  error?: string;
}
