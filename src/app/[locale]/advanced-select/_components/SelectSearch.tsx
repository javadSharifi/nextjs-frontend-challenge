import { cn } from '@/src/lib/utils';
import { Search, X } from 'lucide-react';

interface SelectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SelectSearch({ value, onChange, placeholder }: SelectSearchProps) {
  return (
    <div className="border-base-200 border-b p-3">
      <div className="relative">
        <Search className="text-base-content/40 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'input input-bordered input-sm w-full pr-10 pl-10',
            'bg-base-200 focus:border-primary focus:outline-none',
          )}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="text-base-content/40 hover:text-base-content absolute top-1/2 right-3 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
