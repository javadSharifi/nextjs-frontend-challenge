import { getTranslations } from 'next-intl/server';
import { SlidersHorizontal } from 'lucide-react';
import GenreFilter from './GenreFilter';
import PlatformFilter from './PlatformFilter';
import MetacriticSlider from './MetacriticSlider';
import FilterResetButton from './FilterResetButton';
import type { IGenre, IPlatform } from '../_services/games.types';

interface IFilterSidebarProps {
  genres: IGenre[];
  platforms: IPlatform[];
}

const FilterSidebar = async ({ genres, platforms }: IFilterSidebarProps) => {
  const t = await getTranslations('game');

  return (
    <div className="glass-panel sticky top-20 space-y-6 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="font-display flex items-center gap-2 font-bold text-white">
          <SlidersHorizontal size={18} className="text-primary" />
          {t('filters.title')}
        </div>
        <FilterResetButton label={t('filters.reset')} />
      </div>

      <GenreFilter genres={genres} />

      <PlatformFilter platforms={platforms} />

      <MetacriticSlider />
    </div>
  );
};

export default FilterSidebar;
