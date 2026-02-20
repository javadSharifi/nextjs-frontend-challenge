import { searchParamsCache } from './_lib/games.params';
import { fetchGames, fetchGenres, fetchPlatforms } from './_services/games.service';
import FilterSidebar from './_components/FilterSidebar';
import GameGrid from './_components/GameGrid';
import HeroBanner from './_components/HeroBanner';
import SearchBar from './_components/SearchBar';
import SortDropdown from './_components/SortDropdown';
import ViewToggle from './_components/ViewToggle';
import { getTranslations } from 'next-intl/server';
import type { SearchParams } from 'nuqs/server';

interface IGamePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}

const GamePage = async ({ searchParams }: IGamePageProps) => {
  const { search, genres, platforms, ordering, metacritic_min, metacritic_max, page } =
    await searchParamsCache.parse(searchParams);

  const t = await getTranslations('game');

  const metacriticRange = metacritic_min > 0 || metacritic_max < 100
    ? `${metacritic_min},${metacritic_max}`
    : undefined;

  const [gamesData, genresData, platformsData] = await Promise.all([
    fetchGames({
      search: search || undefined,
      genres: genres || undefined,
      platforms: platforms || undefined,
      ordering,
      metacritic: metacriticRange,
      page,
      page_size: 20,
    }),
    fetchGenres(),
    fetchPlatforms(),
  ]);

  const featuredGame = gamesData.results[0];

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-[var(--color-border-subtle)]">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-white">
              NEXUS<span className="text-[var(--color-primary)]">GAMES</span>
            </span>
          </div>
          <div className="flex-1">
            <SearchBar placeholder={t('search.placeholder')} />
          </div>
        </div>
      </header>

      {/* Hero */}
      {featuredGame && <HeroBanner game={featuredGame} />}

      {/* Main Layout */}
      <div className="container mx-auto flex gap-6 px-4 py-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block">
          <FilterSidebar
            genres={genresData.results}
            platforms={platformsData.results}
          />
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                {t('list.title')}
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {t('list.count', { count: gamesData.count.toLocaleString() })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <SortDropdown />
              <ViewToggle />
            </div>
          </div>

          {/* Grid */}
          <GameGrid games={gamesData.results} totalCount={gamesData.count} currentPage={page} />
        </main>
      </div>
    </div>
  );
};

export default GamePage;
