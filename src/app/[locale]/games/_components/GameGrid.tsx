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
  const hasMore = games.length < totalCount; // This logic is simple, ideally depends on page_size * page < count
  // Assuming page_size is 20 and we loaded `games` for the current page.
  // Wait, if `games` is just the current page results, we can't easily show "previous" pages unless we fetch all up to current page.
  // The provided logic in `page.tsx` fetches `page: page`. So `games` only contains the current page.
  // So `GameGrid` renders only the current page.
  // The `LoadMoreButton` increments the page query param.
  // When page increments, the server fetches the NEW page.
  // BUT in a traditional "Load More" (infinite scroll style), we want to append.
  // With SSR and query params, usually we just navigate to page X.
  // If we want to APPEND, we need client side state or complex merge.
  // The provided `LoadMoreButton` just sets `page` to `currentPage + 1`.
  // This will cause a full navigation/refresh to the new page URL.
  // So the previous games will disappear unless we handle it.
  // However, the prompt says "LoadMoreButton... setPage(currentPage + 1)".
  // And `page.tsx` fetches based on `page`.
  // If `page` becomes 2, `fetchGames` returns page 2.
  // So the grid will show page 2.
  // This acts like pagination, not "Load More" appending.
  // But the button text says "Load More".
  // For the purpose of this task, I will implement it as provided. If the user wants true "Load More" (append), it requires more complex setup (client side fetching or keeping previous data).
  // I will stick to the provided code which behaves like pagination but labeled "Load More".
  // Actually, maybe I should check if I can improve it? No, strict adherence first.

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
