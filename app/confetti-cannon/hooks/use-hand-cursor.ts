import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useHandCursor = (container: HTMLElement | null, hand: HTMLElement | null) => {
  const settersRef = useRef<{
    xSetter?: any
    ySetter?: any
  }>({})

  const initCursor = useCallback(() => {
    if (!hand) return

    // Set initial position
    gsap.set(hand, { xPercent: -50, yPercent: -50 })

    // Create position setters
    settersRef.current.xSetter = gsap.quickTo(hand, 'x', { duration: 0.1 })
    settersRef.current.ySetter = gsap.quickTo(hand, 'y', { duration: 0.1 })
  }, [hand])

  const setupMouseEvents = useCallback(() => {
    if (!container || !hand || ScrollTrigger.isTouch === 1) return

    container.style.cursor = 'none'

    const handleMouseEnter = (e: MouseEvent) => {
      gsap.set(hand, { opacity: 1, x: e.clientX, y: e.clientY })
      settersRef.current.xSetter?.(e.clientX)
      settersRef.current.ySetter?.(e.clientY)
    }

    const handleMouseLeave = () => {
      gsap.set(hand, { opacity: 0 })
    }

    const handleMouseMove = (e: MouseEvent) => {
      settersRef.current.xSetter?.(e.clientX)
      settersRef.current.ySetter?.(e.clientY)
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [container, hand])

  const showHandOnTouch = useCallback(
    (x: number, y: number) => {
      if (!hand || ScrollTrigger.isTouch !== 1) return
      gsap.set(hand, { opacity: 1, x, y })
    },
    [hand]
  )

  const hideHandOnTouch = useCallback(() => {
    if (!hand || ScrollTrigger.isTouch !== 1) return
    gsap.set(hand, { opacity: 0 })
  }, [hand])

  const updateHandOnTouch = useCallback(
    (x: number, y: number) => {
      if (!hand || ScrollTrigger.isTouch !== 1) return
      gsap.set(hand, { x, y })
    },
    [hand]
  )

  const recreateSetters = useCallback(() => {
    if (!hand) return
    settersRef.current.xSetter = gsap.quickTo(hand, 'x', { duration: 0.1 })
    settersRef.current.ySetter = gsap.quickTo(hand, 'y', { duration: 0.1 })
  }, [hand])

  return {
    initCursor,
    setupMouseEvents,
    showHandOnTouch,
    hideHandOnTouch,
    updateHandOnTouch,
    recreateSetters,
  }
}