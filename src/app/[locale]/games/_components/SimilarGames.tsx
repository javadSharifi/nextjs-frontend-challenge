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
          <div className="card bg-base-100/50 border border-white/5 w-44 shrink-0 cursor-pointer overflow-hidden transition-all hover:border-primary/50">
            <figure className="relative aspect-video overflow-hidden">
              {game.background_image ? (
                <Image src={game.background_image} alt={game.name} fill className="object-cover" />
              ) : (
                <div className="bg-base-300 h-full w-full" />
              )}
            </figure>
            <div className="p-3">
              <p className="line-clamp-1 text-sm font-bold">{game.name}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star size={11} className="fill-warning text-warning" />
                <span className="text-xs opacity-60">{game.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SimilarGames;
