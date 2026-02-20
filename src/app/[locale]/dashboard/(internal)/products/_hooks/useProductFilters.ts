import { useQueryState, parseAsString } from 'nuqs';
import { useTableParams } from '../../../_hooks/useTableParams';

export const useProductFilters = () => {
  const tableParams = useTableParams();
  const [category, setCategory] = useQueryState('category', parseAsString.withDefault('all'));

  const updateCategory = (val: string) => {
    setCategory(val || 'all');
    tableParams.setPage(1);
  };

  return {
    ...tableParams,
    category,
    updateCategory,
  };
};
