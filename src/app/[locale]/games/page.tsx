import { searchParamsCache } from './_lib/games.params';
import { fetchGames, fetchGenres, fetchPlatforms } from './_services/games.service';
import GamesClientView from './_components/GamesClientView';
import HeroBanner from './_components/HeroBanner';
import SearchBar from './_components/SearchBar';
import FilterSidebar from './_components/FilterSidebar';
import { getTranslations } from 'next-intl/server';
import type { SearchParams } from 'nuqs/server';

interface IGamePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata() {
  return {
    title: 'کتابخانه بازی‌ها | NexusGames',
    description: 'مرور و فیلتر هزاران بازی ویدیویی با امتیازات و اطلاعات کامل',
    openGraph: {
      title: 'کتابخانه بازی‌ها | NexusGames',
      description: 'مرور و فیلتر هزاران بازی ویدیویی',
      type: 'website',
    },
  };
}

const GamePage = async ({ searchParams }: IGamePageProps) => {
  const { search, genres, platforms, ordering, metacritic_min, metacritic_max, page } =
    await searchParamsCache.parse(searchParams);

  const t = await getTranslations('game');

  const metacriticRange =
    metacritic_min > 0 || metacritic_max < 100 ? `${metacritic_min},${metacritic_max}` : undefined;

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
    <div className="bg-bg-base min-h-screen">
      <header className="glass-panel border-border-subtle sticky top-0 z-50 border-b">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-white">
              NEXUS<span className="text-primary">GAMES</span>
            </span>
          </div>
          <div className="flex-1">
            <SearchBar placeholder={t('search.placeholder')} />
          </div>
        </div>
      </header>

      {featuredGame && <HeroBanner game={featuredGame} />}
      <GamesClientView
        initialData={gamesData}
        sidebar={<FilterSidebar genres={genresData.results} platforms={platformsData.results} />}
      />
    </div>
  );
};

export default GamePage;
