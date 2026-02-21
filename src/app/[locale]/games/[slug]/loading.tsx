const GameDetailLoading = () => {
  return (
    <div className="bg-bg-base min-h-screen">
      <div className="bg-bg-elevated relative h-96 w-full animate-pulse lg:h-[500px]" />

      <div className="container mx-auto px-4 py-10">
        <div className="relative z-10 -mt-32 mb-12 flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="bg-glass-card h-52 w-36 shrink-0 animate-pulse rounded-xl lg:h-64 lg:w-44" />

          <div className="flex-1 space-y-3 pb-4">
            <div className="bg-glass-card h-10 w-2/3 animate-pulse rounded-lg" />
            <div className="flex gap-2">
              <div className="bg-glass-card h-6 w-12 animate-pulse rounded" />
              <div className="bg-glass-card h-6 w-12 animate-pulse rounded" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="bg-glass-card h-64 animate-pulse rounded-xl" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-glass-card h-24 w-40 shrink-0 animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="bg-glass-card h-64 animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default GameDetailLoading;
