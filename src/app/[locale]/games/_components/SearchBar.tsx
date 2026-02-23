'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useGameParams } from '../_hooks/useGameParams';

interface ISearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder }: ISearchBarProps) => {
  const t = useTranslations('game');
  const [, startTransition] = useTransition();
  const { search, setSearch } = useGameParams();

  return (
    <label className="input input-bordered bg-base-100/50 focus-within:input-primary flex w-full max-w-lg items-center gap-2">
      <Search size={16} className="opacity-50" />
      <input
        type="text"
        value={search || ''}
        onChange={(e) => {
          const value = e.target.value || null;
          startTransition(() => {
            setSearch(value);
          });
        }}
        placeholder={placeholder || t('search.placeholder')}
        className="grow"
      />
    </label>
  );
};

export default SearchBar;
