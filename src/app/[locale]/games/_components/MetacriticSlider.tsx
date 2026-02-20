'use client';

import { useQueryState, parseAsInteger } from 'nuqs';
import { useTranslations } from 'next-intl';

const MetacriticSlider = () => {
  const t = useTranslations('game');
  const [min, setMin] = useQueryState('metacritic_min', parseAsInteger.withDefault(0));
  const [max, setMax] = useQueryState('metacritic_max', parseAsInteger.withDefault(100));

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
        {t('filters.metacritic')}
      </h3>
      <div className="px-1">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-[var(--color-text-secondary)]">{min}</span>
          <span className="text-sm font-bold text-[var(--color-primary)]">{max}+</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
        <input
          type="range"
          min={0}
          max={100}
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
      </div>
    </div>
  );
};

export default MetacriticSlider;
