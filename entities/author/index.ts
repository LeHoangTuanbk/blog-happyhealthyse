// Types
export type { Author, AuthorData, AuthorProfile, AuthorLayoutProps } from './model/types'

// API
export {
  getAuthorBySlug,
  getAuthorsByNames,
  getDefaultAuthor,
  getAllAuthors
} from './api/author-api'

// Utils
export {
  formatTwitterHandle,
  getAuthorInitials,
  formatAuthorBio
} from './lib/utils'