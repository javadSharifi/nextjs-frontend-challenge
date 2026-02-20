'use client';

import { useQueryState, parseAsString } from 'nuqs';
import { useTranslations } from 'next-intl';
import type { IPlatform } from '../_services/games.types';

interface IPlatformFilterProps {
  platforms: IPlatform[];
}

const MAIN_PLATFORMS = [4, 18, 7, 1, 186]; // PC, PS4, Xbox One, XSX, PS5

const PlatformFilter = ({ platforms }: IPlatformFilterProps) => {
  const t = useTranslations('game');
  const [selectedPlatforms, setSelectedPlatforms] = useQueryState('platforms', parseAsString.withDefault(''));

  const selectedList = selectedPlatforms ? selectedPlatforms.split(',') : [];
  const filteredPlatforms = platforms.filter((p) => MAIN_PLATFORMS.includes(p.id));

  const togglePlatform = (id: number) => {
    const idStr = String(id);
    const updated = selectedList.includes(idStr)
      ? selectedList.filter((s) => s !== idStr)
      : [...selectedList, idStr];
    setSelectedPlatforms(updated.join(',') || null);
  };

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
        {t('filters.platform')}
      </h3>
      <div className="flex flex-wrap gap-2">
        {filteredPlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              selectedList.includes(String(platform.id))
                ? 'border-[var(--color-primary)] bg-[var(--color-primary-muted)] text-[var(--color-primary)]'
                : 'border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-accent)]'
            }`}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformFilter;
