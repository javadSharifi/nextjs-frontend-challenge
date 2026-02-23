import GameCard from './GameCard';
import LoadMoreButton from './LoadMoreButton';
import type { IGame } from '../_services/games.types';

interface IGameGridProps {
  games: IGame[];
  totalCount: number;
  currentPage: number;
  view?: 'grid' | 'list';
  isLoading?: boolean;
}

const GameGrid = ({ games, totalCount, currentPage, view = 'grid', isLoading }: IGameGridProps) => {
  const hasMore = games.length < totalCount;

  if (isLoading) {
    return (
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
            : 'flex flex-col gap-3'
        }
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card bg-base-100/50 overflow-hidden border border-white/5">
            <div className="skeleton aspect-[16/9] rounded-none" />
            <div className="card-body gap-2 p-4">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
            : 'flex flex-col gap-3'
        }
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} view={view} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <LoadMoreButton currentPage={currentPage} />
        </div>
      )}
    </div>
  );
};

export default GameGrid;
