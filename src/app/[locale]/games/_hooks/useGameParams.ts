'use client';

import { useQueryState, parseAsString, parseAsInteger, parseAsStringEnum } from 'nuqs';
import type { OrderingOption } from '../_lib/games.params';

export function useGameParams() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [genres, setGenres] = useQueryState('genres', parseAsString.withDefault(''));
  const [platforms, setPlatforms] = useQueryState('platforms', parseAsString.withDefault(''));
  const [ordering, setOrdering] = useQueryState(
    'ordering',
    parseAsStringEnum<OrderingOption>(['-rating', '-released', '-metacritic', 'name', '-name', '-added']).withDefault('-rating')
  );
  const [metacriticMin, setMetacriticMin] = useQueryState('metacritic_min', parseAsInteger.withDefault(0));
  const [metacriticMax, setMetacriticMax] = useQueryState('metacritic_max', parseAsInteger.withDefault(100));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [tags, setTags] = useQueryState('tags', parseAsString.withDefault(''));
  const [view, setView] = useQueryState('view', parseAsStringEnum(['grid', 'list']).withDefault('grid'));

  return {
    search, setSearch,
    genres, setGenres,
    platforms, setPlatforms,
    ordering, setOrdering,
    metacriticMin, setMetacriticMin,
    metacriticMax, setMetacriticMax,
    page, setPage,
    tags, setTags,
    view, setView
  };
}
