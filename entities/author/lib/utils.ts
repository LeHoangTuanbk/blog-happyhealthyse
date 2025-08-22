export const formatTwitterHandle = (twitterUrl: string): string => {
  return twitterUrl
    .replace('https://twitter.com/', '@')
    .replace('https://x.com/', '@')
}

export const getAuthorInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export const formatAuthorBio = (bio: string, maxLength: number = 160): string => {
  if (bio.length <= maxLength) return bio
  return bio.substring(0, maxLength).trim() + '...'
}