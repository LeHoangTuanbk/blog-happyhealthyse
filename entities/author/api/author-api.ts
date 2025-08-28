import { allAuthors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import type { AuthorData } from '../model/types';

export const getAuthorBySlug = (slug: string): AuthorData | undefined => {
  const author = allAuthors.find((author) => author.slug === slug);
  return author ? coreContent(author) : undefined;
};

export const getAuthorsByNames = (names: string[]): AuthorData[] => {
  return names
    .map((name) => {
      const author = allAuthors.find((author) => author.slug === name);
      return author ? coreContent(author) : null;
    })
    .filter(Boolean) as AuthorData[];
};

export const getDefaultAuthor = (): AuthorData | undefined => {
  return getAuthorBySlug('default');
};

export const getAllAuthors = (): AuthorData[] => {
  return allAuthors.map((author) => coreContent(author));
};
