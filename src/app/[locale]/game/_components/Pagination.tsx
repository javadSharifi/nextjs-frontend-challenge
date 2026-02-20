'use client';

import { useQueryState } from 'nuqs';
import { searchParamsParsers } from '../../_lib/search-params';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IPaginationProps {
  currentPage: number;
  count: number;
  pageSize?: number;
}

const Pagination = ({ currentPage, count, pageSize = 20 }: IPaginationProps) => {
  const [page, setPage] = useQueryState('page', searchParamsParsers.page);

  const totalPages = Math.ceil(count / pageSize);
  const actualPage = page || 1;

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={() => handlePageChange(actualPage - 1)}
        disabled={actualPage === 1}
        className="flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </button>

      <span className="text-sm font-medium text-muted-foreground">
        Page {actualPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(actualPage + 1)}
        disabled={actualPage === totalPages}
        className="flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
