'use client'

import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/shared/ui/components/link'
import Tag from '@/shared/ui/components/tag'
import siteMetadata from '@/shared/config/site'
import { BlogSearch } from './blog-search'
import { BlogPagination } from './blog-pagination'
import { useBlogListing } from '../lib/use-blog-listing'
import type { BlogListProps } from '@/entities/blog'

export const BlogListingContainer = ({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: BlogListProps) => {
  const { searchValue, setSearchValue, displayPosts, hasResults } = useBlogListing({
    posts,
    initialDisplayPosts
  })

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
          <BlogSearch 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            placeholder="Search articles"
          />
        </div>
        <ul>
          {!hasResults && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post
            return (
              <li key={path} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl leading-8 font-bold tracking-tight">
                        <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <BlogPagination 
          currentPage={pagination.currentPage} 
          totalPages={pagination.totalPages} 
        />
      )}
    </>
  )
}