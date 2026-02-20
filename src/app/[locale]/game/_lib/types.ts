export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  genres: Genre[];
  platforms: Platform[];
}

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface GameSearchParams {
  search?: string;
  genre?: string;
  platform?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}
