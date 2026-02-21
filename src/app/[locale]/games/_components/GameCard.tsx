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
      ? 'text-metacritic-high border-metacritic-high'
      : game.metacritic && game.metacritic >= 50
        ? 'text-metacritic-mid border-metacritic-mid'
        : 'text-metacritic-low border-metacritic-low';

  if (view === 'list') {
    return (
      <GameCardLink href={`/games/${game.slug}`}>
        <div className="glass-card flex cursor-pointer gap-4 rounded-xl p-4">
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
            {game.background_image ? (
              <Image src={game.background_image} alt={game.name} fill className="object-cover" />
            ) : (
              <div className="bg-bg-elevated h-full w-full" />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <h3 className="font-display font-bold text-white">{game.name}</h3>
            <p className="text-text-secondary text-sm">
              {game.genres?.map((g) => g.name).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-rating-gold text-rating-gold" />
              <span className="text-sm text-white">{game.rating.toFixed(1)}</span>
            </div>
            {game.metacritic && (
              <span className={`rounded border px-2 py-0.5 text-xs font-bold ${metacriticColor}`}>
                {game.metacritic}
              </span>
            )}
          </div>
        </div>
      </GameCardLink>
    );
  }

  return (
    <GameCardLink href={`/games/${game.slug}`}>
      <div className="glass-card group cursor-pointer overflow-hidden rounded-xl">
        <div className="relative aspect-[16/9] overflow-hidden">
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="bg-bg-elevated h-full w-full" />
          )}
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
            <Star size={12} className="fill-rating-gold text-rating-gold" />
            <span className="text-xs font-bold text-white">{game.rating.toFixed(1)}</span>
          </div>
          <div className="absolute bottom-2 left-2 flex gap-1">
            {game.platforms?.slice(0, 3).map((p) => (
              <span
                key={p.platform.id}
                className="text-text-secondary rounded bg-black/60 px-1.5 py-0.5 text-xs backdrop-blur-sm"
              >
                {p.platform.name.slice(0, 2)}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-display group-hover:text-primary line-clamp-1 font-bold text-white transition-colors">
              {game.name}
            </h3>
            {game.metacritic && (
              <span
                className={`shrink-0 rounded border px-1.5 py-0.5 text-xs font-bold ${metacriticColor}`}
              >
                {game.metacritic}
              </span>
            )}
          </div>
          <p className="text-text-secondary text-sm">
            {game.genres?.map((g) => g.name).join(' · ')}
          </p>
        </div>
      </div>
    </GameCardLink>
  );
};

export default GameCard;
