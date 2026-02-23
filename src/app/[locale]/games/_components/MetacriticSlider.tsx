'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useGameParams } from '../_hooks/useGameParams';

const MetacriticSlider = () => {
  const t = useTranslations('game');
  const { metacritic_min, setMetacriticMin, metacritic_max, setMetacriticMax } = useGameParams();

  const min = metacritic_min ?? 0;
  const max = metacritic_max ?? 100;

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (val <= max) setMetacriticMin(val === 0 ? null : val);
    },
    [max, setMetacriticMin],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (val >= min) setMetacriticMax(val === 100 ? null : val);
    },
    [min, setMetacriticMax],
  );

  const leftPct = min;
  const rightPct = 100 - max;

  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest uppercase opacity-50 mb-3">
        {t('filters.metacritic')}
      </h3>
      <div className="mb-3 flex items-center justify-between">
        <span className="badge badge-neutral font-bold tabular-nums">
          {min}
        </span>
        <span className="opacity-30 text-xs">—</span>
        <span className="badge badge-primary font-bold tabular-nums">
          {max}
        </span>
      </div>
      <div className="relative px-1 h-6 flex items-center">
        <div className="bg-base-300 relative h-1.5 w-full rounded-full overflow-hidden">
          <div
            className="bg-primary absolute h-full transition-all"
            style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={min}
          onChange={handleMinChange}
          className="range range-primary range-xs pointer-events-none absolute inset-x-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: min > 90 ? 5 : 3 }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={max}
          onChange={handleMaxChange}
          className="range range-primary range-xs pointer-events-none absolute inset-x-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] opacity-40">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default MetacriticSlider;
