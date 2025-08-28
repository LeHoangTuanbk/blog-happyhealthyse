export const loadConfettiImages = (container: HTMLElement) => {
  const imageMap: Record<string, HTMLImageElement> = {};
  const imageKeys: string[] = [];
  const explosionMap: Record<string, HTMLImageElement> = {};
  const explosionKeys: string[] = [];

  const preloadImages = container.querySelectorAll(
    '.image-preload img',
  ) as NodeListOf<HTMLImageElement>;
  const xplodePreloadImages = container.querySelectorAll(
    '.explosion-preload img',
  ) as NodeListOf<HTMLImageElement>;

  // Build image maps
  preloadImages.forEach((img) => {
    const key = img.dataset.key;
    if (key) {
      imageMap[key] = img;
      imageKeys.push(key);
    }
  });

  xplodePreloadImages.forEach((img) => {
    const key = img.dataset.key;
    if (key) {
      explosionMap[key] = img;
      explosionKeys.push(key);
    }
  });

  return {
    imageMap,
    imageKeys,
    explosionMap,
    explosionKeys,
  };
};
