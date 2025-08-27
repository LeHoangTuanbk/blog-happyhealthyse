import { useRef, useCallback } from 'react'

export const useConfettiImages = (container: HTMLElement | null) => {
  const imageMapRef = useRef<Record<string, HTMLImageElement>>({})
  const imageKeysRef = useRef<string[]>([])
  const explosionMapRef = useRef<Record<string, HTMLImageElement>>({})
  const explosionKeysRef = useRef<string[]>([])

  const loadImages = useCallback(() => {
    if (!container) return

    const preloadImages = container.querySelectorAll('.image-preload img') as NodeListOf<HTMLImageElement>
    const xplodePreloadImages = container.querySelectorAll('.explosion-preload img') as NodeListOf<HTMLImageElement>

    // Build image maps
    preloadImages.forEach((img) => {
      const key = img.dataset.key
      if (key) {
        imageMapRef.current[key] = img
        imageKeysRef.current.push(key)
      }
    })

    xplodePreloadImages.forEach((img) => {
      const key = img.dataset.key
      if (key) {
        explosionMapRef.current[key] = img
        explosionKeysRef.current.push(key)
      }
    })
  }, [container])

  return {
    imageMap: imageMapRef.current,
    imageKeys: imageKeysRef.current,
    explosionMap: explosionMapRef.current,
    explosionKeys: explosionKeysRef.current,
    loadImages,
  }
}