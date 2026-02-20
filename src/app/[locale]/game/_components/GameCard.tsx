import { Game } from '../_lib/types';
import Image from 'next/image';
import { Star, Calendar, Gamepad2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IGameCardProps {
  game: Game;
}

const GameCard = ({ game }: IGameCardProps) => {
  const t = useTranslations('GameCard');

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-primary/20">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur-md">
          <Star className="h-3 w-3 fill-yellow-400" />
          {game.rating}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-1 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
          {game.name}
        </h3>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {game.genres.slice(0, 3).map(g => (
                <span key={g.id} className="rounded-full bg-secondary/10 px-2 py-0.5 text-secondary">
                    {g.name}
                </span>
            ))}
        </div>

        <div className="flex items-center justify-between border-t border-border/50 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{game.released}</span>
          </div>
           <div className="flex items-center gap-1.5" title={game.platforms?.map(p => p.platform.name).join(', ')}>
             <Gamepad2 className="h-4 w-4" />
             <span>{game.platforms?.length || 0}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
