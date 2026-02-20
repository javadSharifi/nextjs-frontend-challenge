const GameDetailSkeleton = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[60vh] w-full animate-pulse bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
           <div className="h-40 w-full animate-pulse rounded-xl bg-card" />
           <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-video animate-pulse rounded-lg bg-muted" />
              ))}
           </div>
        </div>
        <div className="lg:col-span-1">
            <div className="h-64 w-full animate-pulse rounded-xl bg-card" />
        </div>
      </div>
    </div>
  );
};

export default GameDetailSkeleton;
