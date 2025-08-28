import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import type { BlogPost } from '../model/types';

export const getBlogPosts = (): BlogPost[] => {
  return allCoreContent(sortPosts(allBlogs));
};

export const getBlogPostBySlug = (slug: string) => {
  return allBlogs.find((post) => post.slug === slug);
};

export const getPublishedPosts = (): BlogPost[] => {
  const posts = getBlogPosts();
  return posts.filter((post) => !post.draft);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  const posts = getBlogPosts();
  return posts.filter((post) =>
    post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
};

export const getPaginatedPosts = (posts: BlogPost[], page: number, postsPerPage: number = 5) => {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / postsPerPage),
    currentPage: page,
    hasNext: endIndex < posts.length,
    hasPrev: page > 1,
  };
};
