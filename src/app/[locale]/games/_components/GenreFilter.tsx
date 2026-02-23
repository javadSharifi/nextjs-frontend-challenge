'use client';

import { useTranslations } from 'next-intl';
import type { IGenre } from '../_services/games.types';
import { useGameParams } from '../_hooks/useGameParams';

interface IGenreFilterProps {
  genres: IGenre[];
}

const GenreFilter = ({ genres }: IGenreFilterProps) => {
  const t = useTranslations('game');
  const { genres: selectedGenres, setGenres } = useGameParams();

  const selectedList = selectedGenres ? selectedGenres.split(',') : [];

  const toggleGenre = (slug: string) => {
    const updated = selectedList.includes(slug)
      ? selectedList.filter((s) => s !== slug)
      : [...selectedList, slug];
    setGenres(updated.join(',') || null);
  };

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold tracking-widest uppercase opacity-50">
        {t('filters.genre')}
      </h3>
      <div className="space-y-1">
        {genres.map((genre) => (
          <label
            key={genre.id}
            className="hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedList.includes(genre.slug)}
                onChange={() => toggleGenre(genre.slug)}
                className="checkbox checkbox-primary checkbox-xs"
              />
              <span className="text-sm opacity-80">{genre.name}</span>
            </div>
            <span className="text-xs opacity-40">{genre.games_count?.toLocaleString()}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
