'use client';

import { useState } from 'react';
import { filterPostsBySearch } from '@/entities/blog';
import type { BlogPost } from '@/entities/blog';

interface UseBlogListingProps {
  posts: BlogPost[];
  initialDisplayPosts?: BlogPost[];
}

export const useBlogListing = ({ posts, initialDisplayPosts = [] }: UseBlogListingProps) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = filterPostsBySearch(posts, searchValue);

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredPosts;

  return {
    searchValue,
    setSearchValue,
    displayPosts,
    hasResults: displayPosts.length > 0,
  };
};
