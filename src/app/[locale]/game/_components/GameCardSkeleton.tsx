const GameCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-video w-full animate-pulse bg-muted/50 rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-6 w-3/4 animate-pulse bg-muted rounded" />
        <div className="flex gap-2">
            <div className="h-4 w-12 animate-pulse bg-muted rounded-full" />
            <div className="h-4 w-16 animate-pulse bg-muted rounded-full" />
            <div className="h-4 w-10 animate-pulse bg-muted rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
           <div className="h-4 w-20 animate-pulse bg-muted rounded" />
           <div className="h-4 w-8 animate-pulse bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
