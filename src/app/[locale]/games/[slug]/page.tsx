import { fetchGameBySlug, fetchGameScreenshots, fetchSimilarGames } from '../_services/games.service';
import GameDetailHero from '../_components/GameDetailHero';
import GameScreenshots from '../_components/GameScreenshots';
import GameInfoCard from '../_components/GameInfoCard';
import SimilarGames from '../_components/SimilarGames';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface IGameDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const GameDetailPage = async ({ params }: IGameDetailPageProps) => {
  const { slug } = await params;
  const t = await getTranslations('game');

  const [game, screenshots, similar] = await Promise.all([
    fetchGameBySlug(slug).catch(() => null),
    fetchGameScreenshots(slug).catch(() => ({ results: [] })),
    fetchGameBySlug(slug)
      .then((g) => fetchSimilarGames(g.id))
      .catch(() => ({ results: [], count: 0, next: null, previous: null })),
  ]);

  if (!game) notFound();

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Cinematic Hero */}
      <GameDetailHero game={game} />

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {game.description_raw && (
              <div className="glass-card rounded-xl p-6">
                <h2 className="font-display mb-4 text-xl font-bold text-white">
                  {t('detail.about')}
                </h2>
                <p className="text-text-secondary leading-relaxed line-clamp-6">
                  {game.description_raw}
                </p>
              </div>
            )}

            {/* Screenshots */}
            {screenshots.results.length > 0 && (
              <GameScreenshots screenshots={screenshots.results} gameName={game.name} />
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <GameInfoCard game={game} />
          </div>
        </div>

        {/* Similar Games */}
        {similar.results.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display mb-6 text-2xl font-bold text-white">
              {t('detail.similar')}
            </h2>
            <SimilarGames games={similar.results} />
          </section>
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;
