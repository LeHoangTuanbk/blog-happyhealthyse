/* eslint-disable @typescript-eslint/no-explicit-any */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export class HandCursorManager {
  private xSetter?: any
  private ySetter?: any

  constructor(
    private container: HTMLElement,
    private hand: HTMLElement | null
  ) {}

  init() {
    if (!this.hand) return

    // Set initial position
    gsap.set(this.hand, { xPercent: -50, yPercent: -50 })

    // Create position setters
    this.xSetter = gsap.quickTo(this.hand, 'x', { duration: 0.1 })
    this.ySetter = gsap.quickTo(this.hand, 'y', { duration: 0.1 })
  }

  setupMouseEvents() {
    if (!this.hand || ScrollTrigger.isTouch === 1) return null

    this.container.style.cursor = 'none'

    const handleMouseEnter = (e: MouseEvent) => {
      gsap.set(this.hand, { opacity: 1, x: e.clientX, y: e.clientY })
      this.xSetter?.(e.clientX)
      this.ySetter?.(e.clientY)
    }

    const handleMouseLeave = () => {
      gsap.set(this.hand, { opacity: 0 })
    }

    const handleMouseMove = (e: MouseEvent) => {
      this.xSetter?.(e.clientX)
      this.ySetter?.(e.clientY)
    }

    this.container.addEventListener('mouseenter', handleMouseEnter)
    this.container.addEventListener('mouseleave', handleMouseLeave)
    this.container.addEventListener('mousemove', handleMouseMove)

    // Return cleanup function
    return () => {
      this.container.removeEventListener('mouseenter', handleMouseEnter)
      this.container.removeEventListener('mouseleave', handleMouseLeave)
      this.container.removeEventListener('mousemove', handleMouseMove)
    }
  }

  showOnTouch(x: number, y: number) {
    if (!this.hand || ScrollTrigger.isTouch !== 1) return
    gsap.set(this.hand, { opacity: 1, x, y })
  }

  hideOnTouch() {
    if (!this.hand || ScrollTrigger.isTouch !== 1) return
    gsap.set(this.hand, { opacity: 0 })
  }

  updateOnTouch(x: number, y: number) {
    if (!this.hand || ScrollTrigger.isTouch !== 1) return
    gsap.set(this.hand, { x, y })
  }

  recreateSetters() {
    if (!this.hand) return
    this.xSetter = gsap.quickTo(this.hand, 'x', { duration: 0.1 })
    this.ySetter = gsap.quickTo(this.hand, 'y', { duration: 0.1 })
  }
}
