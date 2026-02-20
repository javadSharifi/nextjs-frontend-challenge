'use client';

import { useTranslations } from 'next-intl';
import { useGameParams } from '../_hooks/useGameParams';

const MetacriticSlider = () => {
  const t = useTranslations('game');
  const { metacriticMin, setMetacriticMin, metacriticMax, setMetacriticMax } = useGameParams();

  // Use local state or default to avoid nulls in UI
  const min = metacriticMin ?? 0;
  const max = metacriticMax ?? 100;

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
        {t('filters.metacritic')}
      </h3>
      <div className="px-1">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-text-secondary">{min}</span>
          <span className="text-sm font-bold text-primary">{max}+</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={min}
          onChange={(e) => setMetacriticMin(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <input
          type="range"
          min={0}
          max={100}
          value={max}
          onChange={(e) => setMetacriticMax(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );
};

export default MetacriticSlider;
