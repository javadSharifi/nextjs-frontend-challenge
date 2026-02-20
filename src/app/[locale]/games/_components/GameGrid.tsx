import GameCard from './GameCard';
import LoadMoreButton from './LoadMoreButton';
import type { IGame } from '../_services/games.types';

interface IGameGridProps {
  games: IGame[];
  totalCount: number;
  currentPage: number;
  view?: 'grid' | 'list';
}

const GameGrid = ({ games, totalCount, currentPage, view = 'grid' }: IGameGridProps) => {
  const hasMore = games.length < totalCount;

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
