import gsap from 'gsap'

type ExplosionOptions = {
  container: HTMLElement
  explosionMap: Record<string, HTMLImageElement>
  explosionKeys: string[]
}

export const useConfettiExplosion = ({ container, explosionMap, explosionKeys }: ExplosionOptions) => {
  const createExplosion = (x: number, y: number, distance: number = 100) => {
    const count = Math.round(gsap.utils.clamp(5, 120, distance / 15))
    const angleSpread = Math.PI * 2
    const explosion = gsap.timeline()
    const speed = gsap.utils.mapRange(0, 800, 0.5, 2.0, distance)
    const sizeRange = gsap.utils.mapRange(0, 800, 15, 80, distance)

    for (let i = 0; i < count; i++) {
      const randomKey = gsap.utils.random(explosionKeys)
      const original = explosionMap[randomKey]
      if (!original) continue

      const img = original.cloneNode(true) as HTMLImageElement

      img.className = 'explosion-img'
      img.style.position = 'absolute'
      img.style.pointerEvents = 'none'
      img.style.height = `${gsap.utils.random(20, sizeRange)}px`
      img.style.left = `${x}px`
      img.style.top = `${y}px`
      img.style.zIndex = '4'

      container.appendChild(img)

      const angle = Math.random() * angleSpread
      const velocity = gsap.utils.random(600, 2000) * speed

      explosion
        .to(
          img,
          {
            physics2D: {
              angle: angle * (180 / Math.PI),
              velocity: velocity,
              gravity: 2000,
            },
            rotation: gsap.utils.random(-360, 360),
            duration: 1.2 + Math.random() * 0.8,
          },
          0
        )
        .to(
          img,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => img.remove(),
          },
          0.8
        )
    }

    return explosion
  }

  return { createExplosion }
}