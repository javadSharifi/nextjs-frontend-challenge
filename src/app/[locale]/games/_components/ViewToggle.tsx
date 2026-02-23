'use client';

import { Grid3X3, List } from 'lucide-react';
import { useGameParams } from '../_hooks/useGameParams';

const ViewToggle = () => {
  const { view, setView } = useGameParams();

  return (
    <div className="join border border-white/10 overflow-hidden">
      {(['grid', 'list'] as const).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`join-item btn btn-sm ${
            (view || 'grid') === v ? 'btn-primary' : 'btn-ghost opacity-50'
          }`}
        >
          {v === 'grid' ? <Grid3X3 size={16} /> : <List size={16} />}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
