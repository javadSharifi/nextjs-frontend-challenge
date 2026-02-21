'use client';

import { useTranslations } from 'next-intl';
import type { IPlatform } from '../_services/games.types';
import { useGameParams } from '../_hooks/useGameParams';

interface IPlatformFilterProps {
  platforms: IPlatform[];
}

const MAIN_PLATFORMS = [4, 18, 7, 1, 186];

const PlatformFilter = ({ platforms }: IPlatformFilterProps) => {
  const t = useTranslations('game');
  const { platforms: selectedPlatforms, setPlatforms } = useGameParams();

  const selectedList = selectedPlatforms ? selectedPlatforms.split(',') : [];
  const filteredPlatforms = platforms.filter((p) => MAIN_PLATFORMS.includes(p.id));

  const togglePlatform = (id: number) => {
    const idStr = String(id);
    const updated = selectedList.includes(idStr)
      ? selectedList.filter((s) => s !== idStr)
      : [...selectedList, idStr];
    setPlatforms(updated.join(',') || null);
  };

  return (
    <div>
      <h3 className="text-text-muted mb-3 text-xs font-semibold tracking-widest uppercase">
        {t('filters.platform')}
      </h3>
      <div className="flex flex-wrap gap-2">
        {filteredPlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              selectedList.includes(String(platform.id))
                ? 'border-primary bg-primary-muted text-primary'
                : 'border-border-default text-text-secondary hover:border-border-accent'
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
