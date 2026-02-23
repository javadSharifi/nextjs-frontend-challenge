import Image from 'next/image';
import { Star } from 'lucide-react';
import type { IGame } from '../_services/games.types';
import GameCardLink from './GameCardLink';

interface IGameCardProps {
  game: IGame;
  view?: 'grid' | 'list';
}

const GameCard = ({ game, view = 'grid' }: IGameCardProps) => {
  const metacriticColor =
    game.metacritic && game.metacritic >= 75
      ? 'text-success border-success'
      : game.metacritic && game.metacritic >= 50
        ? 'text-warning border-warning'
        : 'text-error border-error';

  if (view === 'list') {
    return (
      <GameCardLink href={`/games/${game.slug}`}>
        <div className="card card-side bg-base-100/50 shadow-xl border border-white/5 cursor-pointer gap-4 p-4 hover:bg-base-100/80 transition-all">
          <figure className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
            {game.background_image ? (
              <Image src={game.background_image} alt={game.name} fill className="object-cover" />
            ) : (
              <div className="bg-base-300 h-full w-full" />
            )}
          </figure>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <h3 className="card-title text-sm font-bold text-white">{game.name}</h3>
            <p className="text-xs opacity-70">
              {game.genres?.map((g) => g.name).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="badge badge-ghost gap-1 border-none bg-black/20">
              <Star size={12} className="fill-warning text-warning" />
              <span className="text-xs text-white">{game.rating.toFixed(1)}</span>
            </div>
            {game.metacritic && (
              <div className={`badge badge-outline font-bold ${metacriticColor}`}>
                {game.metacritic}
              </div>
            )}
          </div>
        </div>
      </GameCardLink>
    );
  }

  return (
    <GameCardLink href={`/games/${game.slug}`}>
      <div className="card bg-base-100/50 group cursor-pointer overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300">
        <figure className="relative aspect-[16/9] overflow-hidden">
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="bg-base-300 h-full w-full" />
          )}
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
            <Star size={12} className="fill-warning text-warning" />
            <span className="text-xs font-bold text-white">{game.rating.toFixed(1)}</span>
          </div>
          <div className="absolute bottom-2 left-2 flex gap-1">
            {game.platforms?.slice(0, 3).map((p) => (
              <span
                key={p.platform.id}
                className="badge badge-ghost badge-xs bg-black/60 text-white/70 backdrop-blur-sm border-none"
              >
                {p.platform.name.slice(0, 2)}
              </span>
            ))}
          </div>
        </figure>

        <div className="card-body p-4 gap-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="card-title text-base group-hover:text-primary line-clamp-1 transition-colors">
              {game.name}
            </h3>
            {game.metacritic && (
              <div className={`badge badge-outline badge-sm font-bold ${metacriticColor}`}>
                {game.metacritic}
              </div>
            )}
          </div>
          <p className="text-sm opacity-60">
            {game.genres?.map((g) => g.name).join(' · ')}
          </p>
        </div>
      </div>
    </GameCardLink>
  );
};

export default GameCard;
