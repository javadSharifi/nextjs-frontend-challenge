import GameCardSkeleton from './GameCardSkeleton';

const GameGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default GameGridSkeleton;
