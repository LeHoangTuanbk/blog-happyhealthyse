import Link from '@/shared/ui/components/link'
import { usePagination } from '../lib/use-pagination'
import type { PaginationProps } from '@/entities/blog'

export const BlogPagination = ({ totalPages, currentPage }: PaginationProps) => {
  const { prevPage, nextPage, getPrevPageUrl, getNextPageUrl } = usePagination({
    totalPages,
    currentPage
  })

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={getPrevPageUrl()} rel="prev">
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={getNextPageUrl()} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}