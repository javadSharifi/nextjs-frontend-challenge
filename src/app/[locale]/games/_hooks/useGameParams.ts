'use client';
import { useQueryState, parseAsString, parseAsInteger, parseAsStringEnum } from 'nuqs';

export const useGameParams = () => {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [genres, setGenres] = useQueryState('genres', parseAsString.withDefault(''));
  const [platforms, setPlatforms] = useQueryState('platforms', parseAsString.withDefault(''));
  const [ordering, setOrdering] = useQueryState(
    'ordering',
    parseAsStringEnum([
      '-rating',
      '-released',
      '-metacritic',
      'name',
      '-name',
      '-added',
    ]).withDefault('-rating'),
  );
  const [metacritic_min, setMetacriticMin] = useQueryState(
    'metacritic_min',
    parseAsInteger.withDefault(0),
  );
  const [metacritic_max, setMetacriticMax] = useQueryState(
    'metacritic_max',
    parseAsInteger.withDefault(100),
  );
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [tags, setTags] = useQueryState('tags', parseAsString.withDefault(''));
  const [view, setView] = useQueryState(
    'view',
    parseAsStringEnum(['grid', 'list']).withDefault('grid'),
  );

  return {
    search,
    setSearch,
    genres,
    setGenres,
    platforms,
    setPlatforms,
    ordering,
    setOrdering,
    metacritic_min,
    setMetacriticMin,
    metacritic_max,
    setMetacriticMax,
    page,
    setPage,
    tags,
    setTags,
    view,
    setView,
  };
};
