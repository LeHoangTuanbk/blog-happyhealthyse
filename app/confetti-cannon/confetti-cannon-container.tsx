/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { ConfettiCannon } from './confetti-cannon'

export const ConfettiCannonContainer = () => {
  const gameRef = useRef<HTMLDivElement>(null)
  const gameInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!gameRef.current) return

    // Register GSAP plugins
    gsap.registerPlugin(Observer, ScrollTrigger, CustomEase, CustomWiggle, Physics2DPlugin)

    // Create and initialize the confetti cannon game
    class ConfettiCannonGame {
      el: HTMLDivElement
      hero: HTMLDivElement
      isDrawing: boolean = false
      imageMap: Record<string, HTMLImageElement> = {}
      imageKeys: string[] = []
      explosionMap: Record<string, HTMLImageElement> = {}
      explosionKeys: string[] = []
      currentLine: SVGLineElement | null = null
      startImage: SVGImageElement | null = null
      circle: SVGCircleElement | null = null
      startX: number = 0
      startY: number = 0
      lastDistance: number = 0
      animationIsOk: boolean
      wiggle: any
      clamper: any
      xSetter: any
      ySetter: any
      elements: {
        hand: HTMLElement | null
        instructions: HTMLElement | null
        rock: HTMLElement | null
        drag: HTMLElement | null
        handle: HTMLElement | null
        canvas: SVGSVGElement | null
        proxy: HTMLElement | null
        preloadImages: NodeListOf<HTMLImageElement>
        xplodePreloadImages: NodeListOf<HTMLImageElement>
      }

      constructor(el: HTMLDivElement) {
        this.el = el
        this.hero = el
        this.animationIsOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches
        this.wiggle = CustomWiggle.create('myWiggle', { wiggles: 6 })
        this.clamper = gsap.utils.clamp(1, 100)

        this.elements = {
          hand: el.querySelector('.confetti-hero__hand') as HTMLElement,
          instructions: el.querySelector('.confetti-hero__hand small') as HTMLElement,
          rock: el.querySelector('.confetti-hero__rock') as HTMLElement,
          drag: el.querySelector('.confetti-hero__drag') as HTMLElement,
          handle: el.querySelector('.confetti-hero__handle') as HTMLElement,
          canvas: el.querySelector('.confetti-hero__canvas') as SVGSVGElement,
          proxy: el.querySelector('.confetti-hero__proxy') as HTMLElement,
          preloadImages: el.querySelectorAll('.image-preload img') as NodeListOf<HTMLImageElement>,
          xplodePreloadImages: el.querySelectorAll(
            '.explosion-preload img'
          ) as NodeListOf<HTMLImageElement>,
        }

        this.xSetter = gsap.quickTo(this.elements.hand, 'x', { duration: 0.1 })
        this.ySetter = gsap.quickTo(this.elements.hand, 'y', { duration: 0.1 })
      }

      init() {
        // Build image maps
        this.elements.preloadImages.forEach((img: any) => {
          const key = img.dataset.key
          this.imageMap[key] = img
          this.imageKeys.push(key)
        })

        this.elements.xplodePreloadImages.forEach((img: any) => {
          const key = img.dataset.key
          this.explosionMap[key] = img
          this.explosionKeys.push(key)
        })

        this.setMotion()
        this.initObserver()
        this.initEvents()
      }

      setMotion() {
        gsap.set(this.elements.hand, { xPercent: -50, yPercent: -50 })
      }

      initEvents() {
        if (!this.animationIsOk || ScrollTrigger.isTouch === 1) return

        this.hero.style.cursor = 'none'

        this.hero.addEventListener('mouseenter', (e: MouseEvent) => {
          gsap.set(this.elements.hand, { opacity: 1 })
          this.xSetter(e.clientX, e.clientX)
          this.ySetter(e.clientY, e.clientY)
        })

        this.hero.addEventListener('mouseleave', () => {
          gsap.set(this.elements.hand, { opacity: 0 })
        })

        this.hero.addEventListener('mousemove', (e: MouseEvent) => {
          this.xSetter(e.clientX)
          this.ySetter(e.clientY)
        })

        // Initial explosion in viewport center
        gsap.delayedCall(0.5, () => {
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2
          this.createExplosion(centerX, centerY, 800)

          // Add multiple smaller explosions for more impact
          gsap.delayedCall(0.1, () => {
            this.createExplosion(centerX + 100, centerY - 50, 400)
          })
          gsap.delayedCall(0.2, () => {
            this.createExplosion(centerX - 80, centerY + 30, 350)
          })
        })
      }

      initObserver() {
        if (!this.animationIsOk) return

        if (ScrollTrigger.isTouch === 1) {
          Observer.create({
            target: this.elements.proxy,
            type: 'touch',
            onPress: (e: any) => {
              const x = e.x || e.clientX || 0
              const y = e.y || e.clientY || 0
              this.createExplosion(x, y, 400)
            },
          })
        } else {
          Observer.create({
            target: this.elements.proxy,
            type: 'pointer',
            onPress: (e: any) => this.startDrawing(e),
            onDrag: (e: any) => this.isDrawing && this.updateDrawing(e),
            onDragEnd: () => this.clearDrawing(),
            onRelease: () => this.clearDrawing(),
          })
        }
      }

      startDrawing(e: any) {
        this.isDrawing = true
        this.lastDistance = 0 // Reset distance at start of new drag

        gsap.set(this.elements.instructions, { opacity: 0 })

        // Use viewport coordinates directly since hero is fixed full screen
        this.startX = e.x || e.clientX
        this.startY = e.y || e.clientY

        // Debug: log coordinates for fine-tuning
        console.log('Drag start:', {
          eventX: e.x,
          eventClientX: e.clientX,
          startX: this.startX,
          startY: this.startY,
        })

        // Create line - adjust for SVG coordinates
        this.currentLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        this.currentLine.setAttribute('x1', this.startX.toString())
        this.currentLine.setAttribute('y1', this.startY.toString())
        this.currentLine.setAttribute('x2', this.startX.toString())
        this.currentLine.setAttribute('y2', this.startY.toString())
        this.currentLine.setAttribute('stroke', '#fffce1')
        this.currentLine.setAttribute('stroke-width', '2')
        this.currentLine.setAttribute('stroke-dasharray', '4')

        this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        this.circle.setAttribute('cx', this.startX.toString())
        this.circle.setAttribute('cy', this.startY.toString())
        this.circle.setAttribute('r', '30')
        this.circle.setAttribute('fill', '#0e100f')

        // Create image at start point
        const randomKey = gsap.utils.random(this.imageKeys)
        const original = this.imageMap[randomKey]
        const clone = document.createElementNS('http://www.w3.org/2000/svg', 'image')

        clone.setAttribute('x', (this.startX - 25).toString())
        clone.setAttribute('y', (this.startY - 25).toString())
        clone.setAttribute('width', '50')
        clone.setAttribute('height', '50')
        clone.setAttributeNS('http://www.w3.org/1999/xlink', 'href', original.src)

        this.startImage = clone

        if (this.elements.canvas) {
          this.elements.canvas.appendChild(this.currentLine)
          this.elements.canvas.appendChild(this.circle)
          this.elements.canvas.appendChild(this.startImage)
        }

        gsap.set(this.elements.drag, { opacity: 1 })
        gsap.set(this.elements.handle, { opacity: 1 })
        gsap.set(this.elements.rock, { opacity: 0 })
      }

      updateDrawing(e: any) {
        if (!this.currentLine || !this.startImage) return

        const cursorX = e.x || e.clientX
        const cursorY = e.y || e.clientY

        const dx = cursorX - this.startX
        const dy = cursorY - this.startY

        const distance = Math.sqrt(dx * dx + dy * dy)
        const shrink = (distance - 30) / distance

        let x2 = this.startX + dx * shrink
        let y2 = this.startY + dy * shrink

        if (distance < 30) {
          x2 = this.startX
          y2 = this.startY
        }

        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        gsap.to(this.currentLine, {
          attr: { x2, y2 },
          duration: 0.1,
          ease: 'none',
        })

        // Eased scale (starts fast, slows down)
        const raw = distance / 100
        const eased = Math.pow(raw, 0.5)
        const clamped = this.clamper(eased)

        gsap.set([this.startImage, this.circle], {
          scale: clamped,
          rotation: `${angle + -45}_short`,
          transformOrigin: 'center center',
        })

        // Move & rotate hand
        gsap.to(this.elements.hand, {
          rotation: `${angle + -90}_short`,
          duration: 0.1,
          ease: 'none',
          overwrite: true, // Override previous animations to prevent stuck rotation
        })

        // Update lastDistance immediately for every drag update
        this.lastDistance = distance
      }

      createExplosion(x: number, y: number, distance: number = 100) {
        const count = Math.round(gsap.utils.clamp(5, 120, distance / 15))
        const angleSpread = Math.PI * 2
        const explosion = gsap.timeline()
        const speed = gsap.utils.mapRange(0, 800, 0.5, 2.0, distance)
        const sizeRange = gsap.utils.mapRange(0, 800, 15, 80, distance)

        for (let i = 0; i < count; i++) {
          const randomKey = gsap.utils.random(this.explosionKeys)
          const original = this.explosionMap[randomKey]
          const img = original.cloneNode(true) as HTMLImageElement

          img.className = 'explosion-img'
          img.style.position = 'absolute'
          img.style.pointerEvents = 'none'
          img.style.height = `${gsap.utils.random(20, sizeRange)}px`
          img.style.left = `${x}px`
          img.style.top = `${y}px`
          img.style.zIndex = '4'

          // Debug: log explosion position for comparison
          if (i === 0) console.log('Explosion at:', { x, y, particleCount: count })

          this.hero.appendChild(img)

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

      clearDrawing() {
        if (!this.isDrawing) return

        console.log('Explosion triggered at drag start position:', {
          startX: this.startX,
          startY: this.startY,
          distance: this.lastDistance,
        })

        // Ensure we have valid distance, use minimum 100 if no drag
        const explosionDistance = this.lastDistance || 100
        this.createExplosion(this.startX, this.startY, explosionDistance)

        gsap.set(this.elements.drag, { opacity: 0 })
        gsap.set(this.elements.handle, { opacity: 0 })
        gsap.set(this.elements.rock, { opacity: 1 })

        gsap.to(this.elements.rock, {
          duration: 0.4,
          rotation: '+=30',
          ease: 'myWiggle',
          onComplete: () => {
            gsap.set(this.elements.rock, { opacity: 0 })
            // Force reset hand rotation with clearProps to prevent stuck at 90°
            gsap.set(this.elements.hand, {
              rotation: 0,
              clearProps: 'rotation',
              overwrite: true,
            })
            gsap.to(this.elements.instructions, { opacity: 1 })
            gsap.set(this.elements.drag, { opacity: 1 })
          },
        })

        // Reset state immediately
        this.isDrawing = false
        this.lastDistance = 0

        // Clear all elements from SVG and reset references
        if (this.elements.canvas) {
          this.elements.canvas.innerHTML = ''
        }
        this.currentLine = null
        this.startImage = null
      }

      destroy() {
        // Clean up any event listeners or timers if needed
        Observer.getAll().forEach((observer) => observer.kill())
      }
    }

    // Initialize the confetti cannon game
    gameInstanceRef.current = new ConfettiCannonGame(gameRef.current)
    gameInstanceRef.current.init()

    // Cleanup on unmount
    return () => {
      gameInstanceRef.current?.destroy()
    }
  }, [])

  return <ConfettiCannon ref={gameRef} />
}
