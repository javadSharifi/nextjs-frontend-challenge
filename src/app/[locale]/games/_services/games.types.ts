export interface IGame {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic: number | null;
  playtime: number;
  description_raw?: string;
  description?: string;
  website?: string;
  platforms: IGamePlatform[];
  genres: IGenre[];
  tags: ITag[];
  screenshots_count: number;
  developers?: IDeveloper[];
  publishers?: IPublisher[];
  esrb_rating?: IEsrbRating;
  clip?: IClip | null;
  short_screenshots?: IShortScreenshot[];
}

export interface IGamePlatform {
  platform: IPlatform;
  released_at: string | null;
  requirements_en?: Record<string, string> | null;
}

export interface IPlatform {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

export interface IGenre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
}

export interface IDeveloper {
  id: number;
  name: string;
  slug: string;
}

export interface IPublisher {
  id: number;
  name: string;
  slug: string;
}

export interface IEsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface IShortScreenshot {
  id: number;
  image: string;
}

export interface IClip {
  clip: string;
  clips: Record<string, string>;
  preview: string;
  video: string;
}

export interface IGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IGame[];
}

export interface IGameFilters {
  search?: string;
  genres?: string;
  platforms?: string;
  ordering?: string;
  metacritic?: string;
  page?: number;
  page_size?: number;
  tags?: string;
  dates?: string;
}
