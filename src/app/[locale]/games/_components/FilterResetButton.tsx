'use client';

import { RotateCcw } from 'lucide-react';
import { useGameParams } from '../_hooks/useGameParams';

interface IFilterResetButtonProps {
  label: string;
}

const FilterResetButton = ({ label }: IFilterResetButtonProps) => {
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
    <button
      onClick={handleReset}
      className="flex items-center gap-1 text-xs text-text-secondary hover:text-primary transition-colors"
    >
      <RotateCcw size={12} />
      {label}
    </button>
  );
};

export default FilterResetButton;
