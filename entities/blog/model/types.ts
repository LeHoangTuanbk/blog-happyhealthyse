import type { Blog as ContentlayerBlog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'

export type Blog = ContentlayerBlog
export type BlogPost = CoreContent<Blog>

export type BlogListProps = {
  posts: BlogPost[]
  initialDisplayPosts?: BlogPost[]
  pagination?: PaginationProps
  title: string
}

export type PaginationProps = {
  totalPages: number
  currentPage: number
}

export type BlogMetadata = {
  title: string
  date: string
  tags?: string[]
  draft?: boolean
  summary?: string
  authors?: string[]
  layout?: string
}
