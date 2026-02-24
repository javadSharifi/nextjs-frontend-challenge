import { cn } from '@/src/lib/utils';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SelectAllButtonProps {
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: () => void;
}

export function SelectAllButton({
  isAllSelected,
  isIndeterminate,
  onSelectAll,
}: SelectAllButtonProps) {
  const t = useTranslations('AdvancedSelect');

  return (
    <div className="border-base-200 border-b p-2">
      <button
        onClick={onSelectAll}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5',
          'text-sm font-medium transition-colors',
          'hover:bg-base-200',
        )}
      >
        <span
          className={cn(
            'rounded-box flex h-5 w-5 items-center justify-center border-2 transition-all duration-200',
            isAllSelected
              ? 'border-primary bg-primary text-primary-content'
              : isIndeterminate
                ? 'border-primary bg-primary/20'
                : 'border-base-300',
          )}
        >
          {isAllSelected ? (
            <Check className="h-3 w-3" strokeWidth={3} />
          ) : isIndeterminate ? (
            <div className="bg-primary h-0.5 w-2.5" />
          ) : null}
        </span>
        <span>{isAllSelected ? t('deselectAll') : t('selectAll')}</span>
      </button>
    </div>
  );
}
