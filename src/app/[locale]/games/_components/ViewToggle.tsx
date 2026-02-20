'use client';

import { useQueryState, parseAsStringEnum } from 'nuqs';
import { Grid3X3, List } from 'lucide-react';

const ViewToggle = () => {
  const [view, setView] = useQueryState('view', parseAsStringEnum(['grid', 'list']).withDefault('grid'));

  return (
    <div className="flex overflow-hidden rounded-lg border border-[var(--color-border-subtle)]">
      {(['grid', 'list'] as const).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`p-2 transition-colors ${
            view === v
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--color-text-muted)] hover:text-white'
          }`}
        >
          {v === 'grid' ? <Grid3X3 size={16} /> : <List size={16} />}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
