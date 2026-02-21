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
          <div className="glass-card w-44 shrink-0 cursor-pointer overflow-hidden rounded-xl">
            <div className="relative aspect-video overflow-hidden">
              {game.background_image ? (
                <Image src={game.background_image} alt={game.name} fill className="object-cover" />
              ) : (
                <div className="bg-bg-elevated h-full w-full" />
              )}
            </div>
            <div className="p-3">
              <p className="font-display line-clamp-1 text-sm font-bold text-white">{game.name}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star size={11} className="fill-rating-gold text-rating-gold" />
                <span className="text-text-secondary text-xs">{game.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SimilarGames;
