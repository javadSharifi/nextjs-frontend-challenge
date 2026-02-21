'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { OrderingOption } from '../_lib/games.params';
import { useGameParams } from '../_hooks/useGameParams';

const ORDERING_OPTIONS: Array<{ value: OrderingOption; labelKey: string }> = [
  { value: '-rating', labelKey: 'sort.rating' },
  { value: '-released', labelKey: 'sort.released' },
  { value: '-metacritic', labelKey: 'sort.metacritic' },
  { value: 'name', labelKey: 'sort.nameAsc' },
  { value: '-name', labelKey: 'sort.nameDesc' },
  { value: '-added', labelKey: 'sort.added' },
];

const SortDropdown = () => {
  const t = useTranslations('game');
  const { ordering, setOrdering } = useGameParams();

  return (
    <div className="relative">
      <select
        value={ordering || '-rating'}
        onChange={(e) => setOrdering(e.target.value as OrderingOption)}
        className="glass-card border-border-subtle focus:border-primary cursor-pointer appearance-none rounded-lg border px-4 py-2 pr-8 text-sm text-white outline-none"
      >
        {ORDERING_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg-elevated">
            {t(opt.labelKey)}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="text-text-muted pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
      />
    </div>
  );
};

export default SortDropdown;
