'use client';
import { useGames } from '../_hooks/useGames';
import GameGrid from './GameGrid';
import type { IGamesResponse } from '../_services/games.types';
import { useTranslations } from 'next-intl';
import SortDropdown from './SortDropdown';
import ViewToggle from './ViewToggle';
import { useGameParams } from '../_hooks/useGameParams';

interface IGamesClientViewProps {
  initialData: IGamesResponse;
  sidebar: React.ReactNode;
}

const GamesClientView = ({ initialData, sidebar }: IGamesClientViewProps) => {
  const t = useTranslations('game');
  const { data: gamesData, isLoading } = useGames(initialData);
  const { page } = useGameParams();

  return (
    <div className="container mx-auto flex gap-6 px-4 py-8">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden lg:block">
        {sidebar}
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              {t('list.title')}
            </h1>
            <p className="text-sm text-text-secondary">
              {t('list.count', { count: gamesData?.count?.toLocaleString() || 0 })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SortDropdown />
            <ViewToggle />
          </div>
        </div>

        {/* Grid */}
        <GameGrid
          games={gamesData?.results ?? []}
          totalCount={gamesData?.count ?? 0}
          currentPage={page ?? 1}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default GamesClientView;
