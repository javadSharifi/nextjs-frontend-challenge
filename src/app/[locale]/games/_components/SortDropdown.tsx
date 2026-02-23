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
    <select
      value={ordering || '-rating'}
      onChange={(e) => setOrdering(e.target.value as OrderingOption)}
      className="select select-bordered select-sm bg-base-100/50 focus:select-primary"
    >
      {ORDERING_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {t(opt.labelKey)}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
