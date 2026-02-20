const GameDetailLoading = () => {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero Skeleton */}
      <div className="relative h-96 w-full animate-pulse bg-bg-elevated lg:h-[500px]" />

      <div className="container mx-auto px-4 py-10">
        <div className="-mt-32 relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end mb-12">
          {/* Cover Skeleton */}
          <div className="h-52 w-36 shrink-0 rounded-xl bg-glass-card animate-pulse lg:h-64 lg:w-44" />

          {/* Info Skeleton */}
          <div className="flex-1 space-y-3 pb-4">
            <div className="h-10 w-2/3 rounded-lg bg-glass-card animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 w-12 rounded bg-glass-card animate-pulse" />
              <div className="h-6 w-12 rounded bg-glass-card animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 rounded-xl bg-glass-card animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 w-40 shrink-0 rounded-lg bg-glass-card animate-pulse" />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-64 rounded-xl bg-glass-card animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default GameDetailLoading;
