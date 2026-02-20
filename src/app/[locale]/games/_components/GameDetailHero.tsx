import Image from 'next/image';
import { Star } from 'lucide-react';
import type { IGame } from '../_services/games.types';

interface IGameDetailHeroProps {
  game: IGame;
}

const GameDetailHero = ({ game }: IGameDetailHeroProps) => {
  const metacriticColor =
    game.metacritic && game.metacritic >= 75
      ? 'bg-metacritic-high text-black'
      : game.metacritic && game.metacritic >= 50
      ? 'bg-metacritic-mid text-black'
      : 'bg-metacritic-low text-white';

  return (
    <div className="relative">
      {/* Background */}
      <div className="relative h-96 overflow-hidden lg:h-[500px]">
        {game.background_image && (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover blur-sm scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/60 to-black/30" />
      </div>

      {/* Floating Card */}
      <div className="container mx-auto px-4">
        <div className="-mt-32 relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end">
          {/* Cover Image */}
          <div className="relative h-52 w-36 shrink-0 overflow-hidden rounded-xl neon-border lg:h-64 lg:w-44">
            {game.background_image && (
              <Image src={game.background_image} alt={game.name} fill className="object-cover" />
            )}
          </div>

          {/* Info */}
          <div className="pb-4 flex-1 space-y-3">
            <h1 className="font-display text-3xl font-bold text-white lg:text-5xl">{game.name}</h1>

            <div className="flex flex-wrap items-center gap-3">
              {game.metacritic && (
                <span className={`rounded px-2.5 py-1 text-sm font-bold ${metacriticColor}`}>
                  {game.metacritic}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-rating-gold text-rating-gold" />
                <span className="text-white font-bold">{game.rating.toFixed(1)}</span>
                <span className="text-text-muted text-sm">({game.ratings_count?.toLocaleString()})</span>
              </div>
              {game.released && (
                <span className="text-sm text-text-secondary">
                  {new Date(game.released).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Platforms */}
            <div className="flex flex-wrap gap-2">
              {game.platforms?.map((p) => (
                <span
                  key={p.platform.id}
                  className="rounded-full border border-border-default px-3 py-1 text-xs text-text-secondary"
                >
                  {p.platform.name}
                </span>
              ))}
            </div>

            {/* Developer / Publisher */}
            <div className="flex flex-wrap gap-4 text-sm">
              {game.developers && game.developers.length > 0 && (
                <span className="text-text-muted">
                  Dev: <span className="text-white">{game.developers.map((d) => d.name).join(', ')}</span>
                </span>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <span className="text-text-muted">
                  Pub: <span className="text-white">{game.publishers.map((p) => p.name).join(', ')}</span>
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {game.genres?.map((g) => (
                <span
                  key={g.id}
                  className="rounded bg-primary-muted px-2.5 py-1 text-xs text-primary"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailHero;
