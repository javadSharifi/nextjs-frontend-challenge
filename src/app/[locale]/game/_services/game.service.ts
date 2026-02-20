import { FetchResponse, Game, GameSearchParams, Genre, Platform } from '../_lib/types';

const RAWG_BASE_URL = 'https://api.rawg.io/api';
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

if (!API_KEY) {
  console.warn('RAWG API Key is missing. Please set NEXT_PUBLIC_RAWG_API_KEY in your .env file.');
}

export async function fetchFromRawg<T>(endpoint: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const url = new URL(`${RAWG_BASE_URL}/${endpoint}`);

  if (API_KEY) {
    url.searchParams.append('key', API_KEY);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`RAWG API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from RAWG (${endpoint}):`, error);
    throw error;
  }
}

export const gameService = {
  getGames: async (params: GameSearchParams = {}): Promise<FetchResponse<Game>> => {
    // Map internal params to RAWG API params
    const apiParams: Record<string, string | number | undefined> = {
      page: params.page || 1,
      page_size: params.page_size || 20,
      search: params.search,
      genres: params.genre, // RAWG uses 'genres' (slug or id)
      platforms: params.platform, // RAWG uses 'platforms' (id)
      ordering: params.ordering, // e.g., '-released', '-rating'
    };

    return fetchFromRawg<FetchResponse<Game>>('games', apiParams);
  },

  getGenres: async (): Promise<FetchResponse<Genre>> => {
    return fetchFromRawg<FetchResponse<Genre>>('genres', { page_size: 40 });
  },

  getPlatforms: async (): Promise<FetchResponse<{ id: number; name: string; slug: string }>> => {
    // The platforms endpoint returns a slightly different structure sometimes, but usually similar results
    // We'll use 'platforms/lists/parents' or just 'platforms'
    return fetchFromRawg<FetchResponse<{ id: number; name: string; slug: string }>>('platforms', { page_size: 40 });
  },
};
