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
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
        {t('filters.genre')}
      </h3>
      <div className="space-y-2">
        {genres.map((genre) => (
          <label
            key={genre.id}
            className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-primary-muted"
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                  selectedList.includes(genre.slug)
                    ? 'border-primary bg-primary'
                    : 'border-border-default'
                }`}
                onClick={() => toggleGenre(genre.slug)}
              >
                {selectedList.includes(genre.slug) && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3 fill-white">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-text-secondary">{genre.name}</span>
            </div>
            <span className="text-xs text-text-muted">
              {genre.games_count?.toLocaleString()}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
