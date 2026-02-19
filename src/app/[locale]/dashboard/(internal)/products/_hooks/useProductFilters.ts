import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';

export const useProductFilters = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10));
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''));
  const [category, setCategory] = useQueryState('category', parseAsString.withDefault('all'));

  const updateSearch = (val: string) => {
    setQ(val || null);
    setPage(1);
  };

  const updateCategory = (val: string) => {
    setCategory(val || 'all');
    setPage(1);
  };

  return {
    page,
    setPage,
    limit,
    setLimit,
    q,
    updateSearch,
    category,
    updateCategory,
  };
};
