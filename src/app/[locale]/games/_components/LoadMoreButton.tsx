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
      className="btn btn-outline btn-primary px-8"
    >
      {isPending ? (
        <span className="loading loading-spinner loading-xs" />
      ) : (
        <ChevronDown size={16} />
      )}
      {isPending ? t('list.loading') : t('list.loadMore')}
    </button>
  );
};

export default LoadMoreButton;
