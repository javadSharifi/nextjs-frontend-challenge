'use client';
import { useQuery } from '@tanstack/react-query';
import { useGameParams } from './useGameParams';
import type { IGamesResponse } from '../_services/games.types';

export const useGames = (initialData: IGamesResponse) => {
  const { search, genres, platforms, ordering, metacritic_min, metacritic_max, page } =
    useGameParams();

  const metacritic =
    metacritic_min > 0 || metacritic_max < 100 ? `${metacritic_min},${metacritic_max}` : undefined;

  return useQuery({
    queryKey: ['games', search, genres, platforms, ordering, metacritic_min, metacritic_max, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (genres) params.set('genres', genres);
      if (platforms) params.set('platforms', platforms);
      if (ordering) params.set('ordering', ordering);
      if (metacritic) params.set('metacritic', metacritic);
      params.set('page', String(page));
      params.set('page_size', '20');

      const res = await fetch(`/api/games?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json() as Promise<IGamesResponse>;
    },
    initialData,
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
};
