import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { useCallback } from 'react';

export const useTableParams = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10));
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''));

  const handleSearch = useCallback(
    (query: string) => {
      setQ(query || null);
      setPage(1);
    },
    [setQ, setPage],
  );

  const handlePageSizeChange = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      setPage(1);
    },
    [setLimit, setPage],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage],
  );

  return {
    page,
    limit,
    q,
    setPage: handlePageChange,
    setLimit: handlePageSizeChange,
    setSearch: handleSearch,
  };
};
