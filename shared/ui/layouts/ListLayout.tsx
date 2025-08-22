import { BlogListingContainer } from '@/features/blog-listing'
import type { BlogListProps } from '@/entities/blog'

export default function ListLayout(props: BlogListProps) {
  return <BlogListingContainer {...props} />
}