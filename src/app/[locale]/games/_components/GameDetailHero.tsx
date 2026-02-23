import Image from 'next/image';
import { Star } from 'lucide-react';
import type { IGame } from '../_services/games.types';

interface IGameDetailHeroProps {
  game: IGame;
}

const GameDetailHero = ({ game }: IGameDetailHeroProps) => {
  const metacriticColor =
    game.metacritic && game.metacritic >= 75
      ? 'badge-success'
      : game.metacritic && game.metacritic >= 50
        ? 'badge-warning text-warning-content'
        : 'badge-error';

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
        <div className="from-base-200 via-base-200/60 absolute inset-0 bg-gradient-to-t to-black/30" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative z-10 -mt-32 flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="relative h-52 w-36 shrink-0 overflow-hidden rounded-xl lg:h-64 lg:w-44 shadow-2xl shadow-black/50 ring-1 ring-white/10">
            {game.background_image && (
              <Image src={game.background_image} alt={game.name} fill className="object-cover" />
            )}
          </div>

          <div className="flex-1 space-y-3 pb-4">
            <h1 className="text-3xl font-bold text-white lg:text-5xl drop-shadow-lg">{game.name}</h1>

            <div className="flex flex-wrap items-center gap-3">
              {game.metacritic && (
                <span className={`badge badge-md font-bold ${metacriticColor}`}>
                  {game.metacritic}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-warning text-warning" />
                <span className="font-bold text-white">{game.rating.toFixed(1)}</span>
                <span className="opacity-50 text-sm text-white">
                  ({game.ratings_count?.toLocaleString()})
                </span>
              </div>
              {game.released && (
                <span className="opacity-70 text-sm text-white">
                  {new Date(game.released).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {game.platforms?.map((p) => (
                <span
                  key={p.platform.id}
                  className="badge badge-outline border-white/20 text-white/70"
                >
                  {p.platform.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {game.developers && game.developers.length > 0 && (
                <span className="opacity-50 text-white">
                  Dev:{' '}
                  <span className="opacity-100">
                    {game.developers.map((d) => d.name).join(', ')}
                  </span>
                </span>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <span className="opacity-50 text-white">
                  Pub:{' '}
                  <span className="opacity-100">
                    {game.publishers.map((p) => p.name).join(', ')}
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {game.genres?.map((g) => (
                <span
                  key={g.id}
                  className="badge badge-primary"
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
