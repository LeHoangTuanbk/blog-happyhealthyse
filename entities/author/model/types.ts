import type { Authors as ContentlayerAuthor } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';

export type Author = ContentlayerAuthor;
export type AuthorData = CoreContent<Author>;

export interface AuthorProfile {
  name: string;
  avatar?: string;
  occupation?: string;
  company?: string;
  email?: string;
  twitter?: string;
  bluesky?: string;
  linkedin?: string;
  github?: string;
}

export interface AuthorLayoutProps {
  children: React.ReactNode;
  content: AuthorData;
}
