'use server';

import { IGame, IGamesResponse, IGameFilters, IGenre, IPlatform } from './games.types';

const BASE_URL = process.env.RAWG_BASE_URL;
const API_KEY = process.env.RAWG_API_KEY;

function buildUrl(endpoint: string, params: Record<string, string | number | undefined>): string {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('key', API_KEY!);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export async function fetchGames(filters: IGameFilters): Promise<IGamesResponse> {
  const url = buildUrl('/games', {
    search: filters.search,
    genres: filters.genres,
    platforms: filters.platforms,
    ordering: filters.ordering || '-rating',
    metacritic: filters.metacritic,
    page: filters.page || 1,
    page_size: filters.page_size || 20,
    tags: filters.tags,
    dates: filters.dates,
  });

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch games: ${res.statusText}`);
  return res.json();
}

export async function fetchGameBySlug(slug: string): Promise<IGame> {
  const url = buildUrl(`/games/${slug}`, {});
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch game: ${res.statusText}`);
  return res.json();
}

export async function fetchGameScreenshots(
  slug: string,
): Promise<{ results: Array<{ id: number; image: string }> }> {
  const url = buildUrl(`/games/${slug}/screenshots`, {});
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch screenshots: ${res.statusText}`);
  return res.json();
}

export async function fetchGenres(): Promise<{ results: IGenre[] }> {
  const url = buildUrl('/genres', { page_size: 20 });
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Failed to fetch genres: ${res.statusText}`);
  return res.json();
}

export async function fetchPlatforms(): Promise<{ results: IPlatform[] }> {
  const url = buildUrl('/platforms', { page_size: 20 });
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Failed to fetch platforms: ${res.statusText}`);
  return res.json();
}

export async function fetchSimilarGames(gameId: number): Promise<IGamesResponse> {
  const url = buildUrl(`/games/${gameId}/game-series`, { page_size: 6 });
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    const fallback = buildUrl('/games', { page_size: 6, ordering: '-rating' });
    const fallbackRes = await fetch(fallback, { next: { revalidate: 3600 } });
    return fallbackRes.json();
  }
  return res.json();
}
