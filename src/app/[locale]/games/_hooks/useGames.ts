'use client';

import { useQuery } from '@tanstack/react-query';
import { useGameParams } from './useGameParams';
import { fetchGames } from '../_services/games.service';
import type { IGamesResponse } from '../_services/games.types';

interface IUseGamesProps {
  initialData?: IGamesResponse;
}

export function useGames(initialData?: IGamesResponse) {
  const { search, genres, platforms, ordering, metacriticMin, metacriticMax, page, tags } = useGameParams();

  const metacriticRange = (metacriticMin || 0) > 0 || (metacriticMax || 100) < 100
    ? `${metacriticMin || 0},${metacriticMax || 100}`
    : undefined;

  const queryKey = [
    'games',
    search,
    genres,
    platforms,
    ordering,
    metacriticRange,
    page,
    tags
  ];

  const queryFn = () => fetchGames({
    search: search || undefined,
    genres: genres || undefined,
    platforms: platforms || undefined,
    ordering: ordering || '-rating',
    metacritic: metacriticRange,
    page: page || 1,
    page_size: 20,
    tags: tags || undefined,
  });

  return useQuery({
    queryKey,
    queryFn,
    initialData,
  });
}
