'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useGameParams } from '../_hooks/useGameParams';

interface ILoadMoreButtonProps {
  currentPage: number;
}

const LoadMoreButton = ({ currentPage }: ILoadMoreButtonProps) => {
  const t = useTranslations('game');
  const [isPending, startTransition] = useTransition();
  const { setPage } = useGameParams();

  const handleLoadMore = () => {
    startTransition(() => {
      setPage(currentPage + 1);
    });
  };

  return (
    <button
      onClick={handleLoadMore}
      disabled={isPending}
      className="glass-card border-border-default font-display hover:border-border-accent hover:text-primary flex items-center gap-2 rounded-xl border px-8 py-3 font-bold text-white transition-all disabled:opacity-50"
    >
      {isPending ? (
        <span className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
      ) : (
        <ChevronDown size={16} />
      )}
      {isPending ? t('list.loading') : t('list.loadMore')}
    </button>
  );
};

export default LoadMoreButton;
