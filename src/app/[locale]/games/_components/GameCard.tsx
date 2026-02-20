import Image from 'next/image';
import { Link } from '@/src/i18n/routing';
import { Star } from 'lucide-react';
import type { IGame } from '../_services/games.types';

interface IGameCardProps {
  game: IGame;
  view?: 'grid' | 'list';
}

const GameCard = ({ game, view = 'grid' }: IGameCardProps) => {
  const metacriticColor =
    game.metacritic && game.metacritic >= 75
      ? 'text-[var(--color-metacritic-high)] border-[var(--color-metacritic-high)]'
      : game.metacritic && game.metacritic >= 50
      ? 'text-[var(--color-metacritic-mid)] border-[var(--color-metacritic-mid)]'
      : 'text-[var(--color-metacritic-low)] border-[var(--color-metacritic-low)]';

  if (view === 'list') {
    return (
      <Link href={`/games/${game.slug}`}>
        <div className="glass-card rounded-xl p-4 flex gap-4 cursor-pointer">
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
            {game.background_image ? (
              <Image src={game.background_image} alt={game.name} fill className="object-cover" />
            ) : (
              <div className="h-full w-full bg-[var(--color-bg-elevated)]" />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <h3 className="font-display font-bold text-white">{game.name}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {game.genres?.map((g) => g.name).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-[var(--color-rating-gold)] text-[var(--color-rating-gold)]" />
              <span className="text-sm text-white">{game.rating.toFixed(1)}</span>
            </div>
            {game.metacritic && (
              <span className={`rounded border px-2 py-0.5 text-xs font-bold ${metacriticColor}`}>
                {game.metacritic}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/games/${game.slug}`}>
      <div className="glass-card group cursor-pointer overflow-hidden rounded-xl">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-[var(--color-bg-elevated)]" />
          )}
          {/* Rating badge */}
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
            <Star size={12} className="fill-[var(--color-rating-gold)] text-[var(--color-rating-gold)]" />
            <span className="text-xs font-bold text-white">{game.rating.toFixed(1)}</span>
          </div>
          {/* Platform icons */}
          <div className="absolute bottom-2 left-2 flex gap-1">
            {game.platforms?.slice(0, 3).map((p) => (
              <span
                key={p.platform.id}
                className="rounded bg-black/60 px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)] backdrop-blur-sm"
              >
                {p.platform.name.slice(0, 2)}
              </span>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-white line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
              {game.name}
            </h3>
            {game.metacritic && (
              <span className={`shrink-0 rounded border px-1.5 py-0.5 text-xs font-bold ${metacriticColor}`}>
                {game.metacritic}
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {game.genres?.map((g) => g.name).join(' · ')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
