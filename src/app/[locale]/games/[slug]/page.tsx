import { Suspense } from 'react';
import {
  fetchGameBySlug,
  fetchGameScreenshots,
  fetchSimilarGames,
} from '../_services/games.service';
import GameDetailHero from '../_components/GameDetailHero';
import GameScreenshots from '../_components/GameScreenshots';
import GameInfoCard from '../_components/GameInfoCard';
import SimilarGames from '../_components/SimilarGames';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface IGameDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await fetchGameBySlug(slug).catch(() => null);
  if (!game) return { title: 'بازی یافت نشد | NexusGames' };

  return {
    title: `${game.name} | NexusGames`,
    description: game.description_raw?.slice(0, 155) || `اطلاعات کامل بازی ${game.name}`,
    openGraph: {
      title: `${game.name} | NexusGames`,
      description: game.description_raw?.slice(0, 155),
      images: game.background_image ? [{ url: game.background_image }] : [],
      type: 'website',
    },
  };
}

async function ScreenshotsSection({ slug, gameName }: { slug: string; gameName: string }) {
  const screenshots = await fetchGameScreenshots(slug).catch(() => ({ results: [] }));
  if (!screenshots.results.length) return null;
  return <GameScreenshots screenshots={screenshots.results} gameName={gameName} />;
}

async function SimilarGamesSection({ gameId, label }: { gameId: number; label: string }) {
  const similar = await fetchSimilarGames(gameId).catch(() => ({ results: [] }));
  if (!similar.results.length) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">{label}</h2>
      <SimilarGames games={similar.results} />
    </section>
  );
}

const ScreenshotsSkeleton = () => (
  <div className="card bg-base-100/50 p-6">
    <div className="skeleton mb-4 h-6 w-40" />
    <div className="flex gap-3 overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton h-24 w-40 shrink-0" />
      ))}
    </div>
  </div>
);

const SimilarGamesSkeleton = () => (
  <section className="mt-12">
    <div className="skeleton mb-6 h-8 w-48" />
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton h-52 w-44 shrink-0" />
      ))}
    </div>
  </section>
);

const GameDetailPage = async ({ params }: IGameDetailPageProps) => {
  const { slug } = await params;
  const t = await getTranslations('game');

  const game = await fetchGameBySlug(slug).catch(() => null);
  if (!game) notFound();

  return (
    <div className="bg-base-200 min-h-screen">
      <GameDetailHero game={game} />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {game.description_raw && (
              <div className="card bg-base-100/50 border border-white/5 p-6 shadow-xl">
                <h2 className="card-title mb-4 text-xl font-bold">{t('detail.about')}</h2>
                <p className="line-clamp-6 leading-relaxed opacity-70">{game.description_raw}</p>
              </div>
            )}

            <Suspense fallback={<ScreenshotsSkeleton />}>
              <ScreenshotsSection slug={slug} gameName={game.name} />
            </Suspense>
          </div>

          <div className="space-y-4">
            <GameInfoCard game={game} />
          </div>
        </div>

        <Suspense fallback={<SimilarGamesSkeleton />}>
          <SimilarGamesSection gameId={game.id} label={t('detail.similar')} />
        </Suspense>
      </div>
    </div>
  );
};

export default GameDetailPage;
