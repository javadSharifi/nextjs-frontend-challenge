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
      <h3 className="text-text-muted mb-3 text-xs font-semibold tracking-widest uppercase">
        {t('filters.metacritic')}
      </h3>
      <div className="mb-3 flex items-center justify-between">
        <span className="bg-bg-elevated rounded px-2 py-0.5 text-sm font-bold text-white tabular-nums">
          {min}
        </span>
        <span className="text-text-muted text-xs">—</span>
        <span className="bg-primary-muted text-primary rounded px-2 py-0.5 text-sm font-bold tabular-nums">
          {max}
        </span>
      </div>
      <div className="relative px-1">
        <div className="bg-bg-elevated relative h-1.5 w-full rounded-full">
          <div
            className="bg-primary absolute h-full rounded-full transition-all"
            style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={min}
          onChange={handleMinChange}
          className="accent-primary [&::-webkit-slider-thumb]:border-primary [&::-moz-range-thumb]:border-primary pointer-events-none absolute inset-x-1 top-0 h-1.5 w-[calc(100%-8px)] appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
          style={{ zIndex: min > 90 ? 5 : 3 }}
        />
        \{' '}
        <input
          type="range"
          min={0}
          max={100}
          value={max}
          onChange={handleMaxChange}
          className="accent-primary [&::-webkit-slider-thumb]:border-primary [&::-moz-range-thumb]:border-primary pointer-events-none absolute inset-x-1 top-0 h-1.5 w-[calc(100%-8px)] appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
          style={{ zIndex: 4 }}
        />
      </div>
      \{' '}
      <div className="text-text-muted mt-3 flex justify-between text-xs">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default MetacriticSlider;
