import {
  parseAsInteger,
  parseAsString,
} from 'nuqs/parsers';

export const searchParamsParsers = {
  search: parseAsString.withDefault(''),
  genre: parseAsString.withDefault(''),
  platform: parseAsString.withDefault(''),
  ordering: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
};
