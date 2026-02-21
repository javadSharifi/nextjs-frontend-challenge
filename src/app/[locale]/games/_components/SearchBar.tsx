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
    <div className="relative w-full max-w-lg">
      <Search size={16} className="text-text-muted absolute top-1/2 left-3 -translate-y-1/2" />
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
        className="bg-glass-card border-border-subtle placeholder-text-muted focus:border-primary w-full rounded-lg border py-2 pr-4 pl-9 text-sm text-white backdrop-blur-sm transition-colors outline-none"
      />
    </div>
  );
};

export default SearchBar;
