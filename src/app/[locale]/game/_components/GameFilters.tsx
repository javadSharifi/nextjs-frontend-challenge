'use client';

import { useQueryState } from 'nuqs';
import { searchParamsParsers } from '../_lib/search-params';
import { Genre } from '../_lib/types';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IGameFiltersProps {
  genres: Genre[];
  platforms: { id: number; name: string; slug: string }[];
}

const GameFilters = ({ genres, platforms }: IGameFiltersProps) => {
  const t = useTranslations('GameFilters');
  const [search, setSearch] = useQueryState('search', searchParamsParsers.search.withOptions({ shallow: false, throttleMs: 500 }));
  const [genre, setGenre] = useQueryState('genre', searchParamsParsers.genre.withOptions({ shallow: false }));
  const [platform, setPlatform] = useQueryState('platform', searchParamsParsers.platform.withOptions({ shallow: false }));
  const [ordering, setOrdering] = useQueryState('ordering', searchParamsParsers.ordering.withOptions({ shallow: false }));

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between shadow-sm">
      <div className="relative w-full md:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          value={search || ''}
          onChange={(e) => setSearch(e.target.value || null)}
          className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <select
          value={genre || ''}
          onChange={(e) => setGenre(e.target.value || null)}
          className="h-10 flex-1 md:flex-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="">{t('all_genres')}</option>
          {genres.map((g) => (
            <option key={g.id} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={platform || ''}
          onChange={(e) => setPlatform(e.target.value || null)}
          className="h-10 flex-1 md:flex-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="">{t('all_platforms')}</option>
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={ordering || ''}
          onChange={(e) => setOrdering(e.target.value || null)}
          className="h-10 flex-1 md:flex-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="">{t('sort_by')}</option>
          <option value="-released">{t('sort_released_desc')}</option>
          <option value="released">{t('sort_released_asc')}</option>
          <option value="-rating">{t('sort_rating_desc')}</option>
          <option value="rating">{t('sort_rating_asc')}</option>
          <option value="name">{t('sort_name_asc')}</option>
          <option value="-name">{t('sort_name_desc')}</option>
        </select>
      </div>
    </div>
  );
};

export default GameFilters;
