import { Game } from '../_lib/types';
import GameCard from './GameCard';

interface IGameGridProps {
  games: Game[];
}

const GameGrid = ({ games }: IGameGridProps) => {
    if (!games || games.length === 0) {
        return <div className="p-10 text-center text-muted-foreground">No games found.</div>
    }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;
