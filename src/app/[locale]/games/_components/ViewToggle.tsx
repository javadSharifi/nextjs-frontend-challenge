'use client';

import { Grid3X3, List } from 'lucide-react';
import { useGameParams } from '../_hooks/useGameParams';

const ViewToggle = () => {
  const { view, setView } = useGameParams();

  return (
    <div className="border-border-subtle flex overflow-hidden rounded-lg border">
      {(['grid', 'list'] as const).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`p-2 transition-colors ${
            view === v ? 'bg-primary text-white' : 'text-text-muted hover:text-white'
          }`}
        >
          {v === 'grid' ? <Grid3X3 size={16} /> : <List size={16} />}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
