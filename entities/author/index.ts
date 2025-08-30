export type { Author, AuthorData, AuthorProfile, AuthorLayoutProps } from './model/types';

export {
  getAuthorBySlug,
  getAuthorsByNames,
  getDefaultAuthor,
  getAllAuthors,
} from './api/author-api';

export { formatTwitterHandle, getAuthorInitials, formatAuthorBio } from './lib/utils';
