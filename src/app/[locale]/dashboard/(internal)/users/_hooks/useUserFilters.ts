import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';

export const useUserFilters = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10));
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''));

  const handleSearch = (val: string) => {
    setQ(val || null);
    setPage(1);
  };

  const handleLimitChange = (val: number) => {
    setLimit(val);
    setPage(1);
  };

  return { page, setPage, limit, handleLimitChange, q, handleSearch };
};
