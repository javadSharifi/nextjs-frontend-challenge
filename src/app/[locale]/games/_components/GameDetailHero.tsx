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
      <div className="relative h-96 overflow-hidden lg:h-[500px]">
        {game.background_image && (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="scale-105 object-cover blur-sm"
            priority
          />
        )}
        <div className="from-bg-base via-bg-base/60 absolute inset-0 bg-gradient-to-t to-black/30" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative z-10 -mt-32 flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="neon-border relative h-52 w-36 shrink-0 overflow-hidden rounded-xl lg:h-64 lg:w-44">
            {game.background_image && (
              <Image src={game.background_image} alt={game.name} fill className="object-cover" />
            )}
          </div>

          <div className="flex-1 space-y-3 pb-4">
            <h1 className="font-display text-3xl font-bold text-white lg:text-5xl">{game.name}</h1>

            <div className="flex flex-wrap items-center gap-3">
              {game.metacritic && (
                <span className={`rounded px-2.5 py-1 text-sm font-bold ${metacriticColor}`}>
                  {game.metacritic}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-rating-gold text-rating-gold" />
                <span className="font-bold text-white">{game.rating.toFixed(1)}</span>
                <span className="text-text-muted text-sm">
                  ({game.ratings_count?.toLocaleString()})
                </span>
              </div>
              {game.released && (
                <span className="text-text-secondary text-sm">
                  {new Date(game.released).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {game.platforms?.map((p) => (
                <span
                  key={p.platform.id}
                  className="border-border-default text-text-secondary rounded-full border px-3 py-1 text-xs"
                >
                  {p.platform.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {game.developers && game.developers.length > 0 && (
                <span className="text-text-muted">
                  Dev:{' '}
                  <span className="text-white">
                    {game.developers.map((d) => d.name).join(', ')}
                  </span>
                </span>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <span className="text-text-muted">
                  Pub:{' '}
                  <span className="text-white">
                    {game.publishers.map((p) => p.name).join(', ')}
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {game.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-primary-muted text-primary rounded px-2.5 py-1 text-xs"
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
