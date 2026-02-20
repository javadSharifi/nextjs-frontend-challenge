import { Suspense } from 'react';
import { gameDetailService } from '../../_services/game-detail.service';
import GameDescription from './_components/GameDescription';
import ScreenshotGallery from './_components/ScreenshotGallery';
import GameInfoSidebar from './_components/GameInfoSidebar';
import GameGrid from '../../_components/GameGrid';
import { Metadata } from 'next';

interface IGameDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: IGameDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const game = await gameDetailService.getGameDetails(params.slug);
  return {
    title: `${game.name} - Game Store`,
    description: `Details for ${game.name}`,
  };
}

export default async function GameDetailPage(props: IGameDetailPageProps) {
  const params = await props.params;
  const slug = params.slug;

  // Fetch data
  const game = await gameDetailService.getGameDetails(slug);
  const screenshots = await gameDetailService.getScreenshots(slug);
  const similar = await gameDetailService.getSuggestedGames(slug);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Cinematic Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {game.background_image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${game.background_image})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="container relative mx-auto flex h-full items-end p-6 pb-12">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-6xl">
              {game.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-primary px-3 py-1 font-bold text-primary-foreground shadow-lg shadow-primary/20">
                ★ {game.rating}
              </span>
              <div className="flex flex-wrap gap-2">
                {game.genres.map((g) => (
                  <span key={g.id} className="rounded-full bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary backdrop-blur-md">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-12 lg:col-span-2">
          <GameDescription description={game.description_raw || 'No description available.'} />

          <ScreenshotGallery screenshots={screenshots.results} />

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground border-b border-border pb-2">Similar Games</h3>
            <GameGrid games={similar.results} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <GameInfoSidebar game={game} />
        </div>
      </div>
    </div>
  );
}
