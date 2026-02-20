'use client';

import { useQueryState, parseAsInteger } from 'nuqs';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

interface ILoadMoreButtonProps {
  currentPage: number;
}

const LoadMoreButton = ({ currentPage }: ILoadMoreButtonProps) => {
  const t = useTranslations('game');
  const [isPending, startTransition] = useTransition();
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handleLoadMore = () => {
    startTransition(() => {
      setPage(currentPage + 1);
    });
  };

  return (
    <button
      onClick={handleLoadMore}
      disabled={isPending}
      className="flex items-center gap-2 rounded-xl glass-card border border-[var(--color-border-default)] px-8 py-3 font-display font-bold text-white hover:border-[var(--color-border-accent)] hover:text-[var(--color-primary)] transition-all disabled:opacity-50"
    >
      {isPending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      ) : (
        <ChevronDown size={16} />
      )}
      {isPending ? t('list.loading') : t('list.loadMore')}
    </button>
  );
};

export default LoadMoreButton;
