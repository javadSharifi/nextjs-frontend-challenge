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
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={search || ''}
        onChange={(e) => startTransition(() => setSearch(e.target.value || null))}
        placeholder={placeholder || t('search.placeholder')}
        className="w-full rounded-lg bg-glass-card border border-border-subtle pl-9 pr-4 py-2 text-sm text-white placeholder-text-muted backdrop-blur-sm outline-none focus:border-primary transition-colors"
      />
    </div>
  );
};

export default SearchBar;
