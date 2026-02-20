'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { gameService } from '../_services/game.service';
import { FetchResponse, Game, GameSearchParams } from '../_lib/types';
import GameGrid from './GameGrid';
import GameGridSkeleton from './GameGridSkeleton';
import GameSectionHeader from './GameSectionHeader';
import Pagination from './Pagination';
import { useTranslations } from 'next-intl';
import { searchParamsParsers } from '../_lib/search-params';

interface IGamesClientViewProps {
  initialData: FetchResponse<Game>;
}

const GamesClientView = ({ initialData }: IGamesClientViewProps) => {
  const t = useTranslations('GamePage');

  // Read params from URL (client-side)
  const [search] = useQueryState('search', searchParamsParsers.search);
  const [genre] = useQueryState('genre', searchParamsParsers.genre);
  const [platform] = useQueryState('platform', searchParamsParsers.platform);
  const [ordering] = useQueryState('ordering', searchParamsParsers.ordering);
  const [page] = useQueryState('page', searchParamsParsers.page);

  // Use React Query for client-side filtering/refetching
  const { data, isLoading, isError } = useQuery({
    queryKey: ['games', { search, genre, platform, ordering, page }],
    queryFn: async () => {
      const params: GameSearchParams = {
        search: search || undefined,
        genre: genre || undefined,
        platform: platform || undefined,
        ordering: ordering || undefined,
        page: page || undefined
      };
      // We need to call the service.
      // Note: Since gameService uses 'fetch', it works on client too,
      // but we need to ensure the API Key is available or proxy the request.
      // The service uses process.env.NEXT_PUBLIC_RAWG_API_KEY which is available on client.
      return gameService.getGames(params);
    },
    initialData: initialData, // Use SSR data for first render
    placeholderData: (previousData) => previousData, // Keep showing previous data while fetching new
  });

  if (isError) {
    return <div className="py-10 text-center text-destructive">Error loading games.</div>;
  }

  return (
    <div className="space-y-8">
      <GameSectionHeader
        title={t('title')}
        totalCount={data?.count || 0}
      />

      {isLoading ? <GameGridSkeleton /> : <GameGrid games={data?.results || []} />}

      {!isLoading && !isError && data && (
        <Pagination currentPage={page || 1} count={data.count} />
      )}
    </div>
  );
};

export default GamesClientView;
