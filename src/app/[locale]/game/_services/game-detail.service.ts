import { fetchFromRawg } from './game.service';
import { Game } from '../_lib/types';

export interface GameDetail extends Game {
  description_raw: string;
  website: string;
  publishers: { id: number; name: string }[];
  developers: { id: number; name: string }[];
}

export interface Screenshot {
  id: number;
  image: string;
}

export const gameDetailService = {
  getGameDetails: async (id: string | number): Promise<GameDetail> => {
    // RAWG API accepts slug or ID for details
    return fetchFromRawg<GameDetail>(`games/${id}`);
  },

  getScreenshots: async (id: string | number): Promise<{ results: Screenshot[] }> => {
    return fetchFromRawg<{ results: Screenshot[] }>(`games/${id}/screenshots`);
  },

  getSuggestedGames: async (id: string | number): Promise<{ results: Game[] }> => {
    return fetchFromRawg<{ results: Game[] }>(`games/${id}/suggested`);
  },
};
