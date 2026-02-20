import Image from 'next/image';
import { Link } from '@/src/i18n/routing';
import { Star } from 'lucide-react';
import type { IGame } from '../_services/games.types';

interface ISimilarGamesProps {
  games: IGame[];
}

const SimilarGames = ({ games }: ISimilarGamesProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {games.map((game) => (
        <Link key={game.id} href={`/games/${game.slug}`}>
          <div className="glass-card w-44 shrink-0 overflow-hidden rounded-xl cursor-pointer">
            <div className="relative aspect-video overflow-hidden">
              {game.background_image ? (
                <Image src={game.background_image} alt={game.name} fill className="object-cover" />
              ) : (
                <div className="h-full w-full bg-bg-elevated" />
              )}
            </div>
            <div className="p-3">
              <p className="font-display text-sm font-bold text-white line-clamp-1">{game.name}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star size={11} className="fill-rating-gold text-rating-gold" />
                <span className="text-xs text-text-secondary">{game.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SimilarGames;
