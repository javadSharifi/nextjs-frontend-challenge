import { Suspense } from 'react';
import { searchParamsCache } from './_lib/search-params-cache';
import { gameService } from './_services/game.service';
import GameGrid from './_components/GameGrid';
import GameFilters from './_components/GameFilters';
import GameSectionHeader from './_components/GameSectionHeader';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game Store | RAWG',
  description: 'Explore thousands of games powered by RAWG API',
};

interface IGamePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GamePage(props: IGamePageProps) {
  const searchParams = await props.searchParams;
  const { search, genre, platform, ordering, page } = searchParamsCache.parse(searchParams);

  const t = await getTranslations('GamePage');

  // Fetch data in parallel
  const [gamesData, genresData, platformsData] = await Promise.all([
    gameService.getGames({ search, genre, platform, ordering, page }),
    gameService.getGenres(),
    gameService.getPlatforms(),
  ]);

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen">
      <GameSectionHeader
        title={t('title')}
        totalCount={gamesData.count}
      />

      <GameFilters
        genres={genresData.results}
        platforms={platformsData.results}
      />

      <GameGrid games={gamesData.results} />
    </div>
  );
}
