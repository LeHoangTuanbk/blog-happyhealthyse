import { slug } from 'github-slugger';
import siteMetadata from '@/shared/config/site';
import type { BlogPost } from '../model/types';

export const formatBlogDate = (date: string): string => {
  return new Date(date).toLocaleDateString(siteMetadata.locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const createBlogSlug = (title: string): string => {
  return slug(title);
};

export const getBlogEditUrl = (filePath: string): string => {
  return `${siteMetadata.siteRepo}/blob/main/shared/content/${filePath}`;
};

export const filterPostsBySearch = (posts: BlogPost[], searchValue: string) => {
  if (!searchValue) return posts;

  return posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });
};
