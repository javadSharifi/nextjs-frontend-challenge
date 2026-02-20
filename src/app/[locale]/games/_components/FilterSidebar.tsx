'use client';

import { useTranslations } from 'next-intl';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import GenreFilter from './GenreFilter';
import PlatformFilter from './PlatformFilter';
import MetacriticSlider from './MetacriticSlider';
import type { IGenre, IPlatform } from '../_services/games.types';
import { useGameParams } from '../_hooks/useGameParams';

interface IFilterSidebarProps {
  genres: IGenre[];
  platforms: IPlatform[];
}

const FilterSidebar = ({ genres, platforms }: IFilterSidebarProps) => {
  const t = useTranslations('game');
  const {
    setGenres, setPlatforms, setMetacriticMin, setMetacriticMax,
    setSearch, setTags, setOrdering, setPage
  } = useGameParams();

  const handleReset = () => {
    setGenres(null);
    setPlatforms(null);
    setMetacriticMin(null);
    setMetacriticMax(null);
    setSearch(null);
    setTags(null);
    setOrdering(null);
    setPage(null);
  };

  return (
    <div className="glass-panel sticky top-20 rounded-xl p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-display font-bold text-white">
          <SlidersHorizontal size={18} className="text-primary" />
          {t('filters.title')}
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-text-secondary hover:text-primary transition-colors"
        >
          <RotateCcw size={12} />
          {t('filters.reset')}
        </button>
      </div>

      {/* Genre Filter */}
      <GenreFilter genres={genres} />

      {/* Platform Filter */}
      <PlatformFilter platforms={platforms} />

      {/* Metacritic Slider */}
      <MetacriticSlider />
    </div>
  );
};

export default FilterSidebar;
