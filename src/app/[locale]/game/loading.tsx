import GameGridSkeleton from './_components/GameGridSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="h-10 w-48 bg-muted rounded animate-pulse" />
        <div className="h-8 w-32 bg-muted rounded-full animate-pulse" />
      </div>

      <div className="h-16 w-full bg-card border border-border rounded-xl animate-pulse mb-8" />

      <GameGridSkeleton />
    </div>
  );
}
