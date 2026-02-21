import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';

export type OrderingOption = '-rating' | '-released' | '-metacritic' | 'name' | '-name' | '-added';

export const gameSearchParams = {
  search: parseAsString.withDefault(''),
  genres: parseAsString.withDefault(''),
  platforms: parseAsString.withDefault(''),
  ordering: parseAsStringEnum<OrderingOption>([
    '-rating',
    '-released',
    '-metacritic',
    'name',
    '-name',
    '-added',
  ]).withDefault('-rating'),
  metacritic_min: parseAsInteger.withDefault(0),
  metacritic_max: parseAsInteger.withDefault(100),
  page: parseAsInteger.withDefault(1),
  tags: parseAsString.withDefault(''),
};

export const searchParamsCache = createSearchParamsCache(gameSearchParams);
