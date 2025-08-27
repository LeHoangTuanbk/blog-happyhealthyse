/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { ConfettiCannon } from './confetti-cannon'
import { loadConfettiImages } from './utils/confetti-images'
import { createConfettiExplosion } from './utils/confetti-explosion'
import { ConfettiDrawingManager } from './utils/confetti-drawing'
import { HandCursorManager } from './utils/hand-cursor'

// Register GSAP plugins once
gsap.registerPlugin(Observer, ScrollTrigger, CustomEase, CustomWiggle, Physics2DPlugin, useGSAP)

export const ConfettiCannonContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const container = containerRef.current

      // Get DOM elements
      const elements = {
        hand: container.querySelector('.confetti-hero__hand') as HTMLElement,
        instructions: container.querySelector('.confetti-hero__hand small') as HTMLElement,
        rock: container.querySelector('.confetti-hero__rock') as HTMLElement,
        drag: container.querySelector('.confetti-hero__drag') as HTMLElement,
        handle: container.querySelector('.confetti-hero__handle') as HTMLElement,
        canvas: container.querySelector('.confetti-hero__canvas') as SVGSVGElement,
        proxy: container.querySelector('.confetti-hero__proxy') as HTMLElement,
      }

      // Load images
      const { imageMap, imageKeys, explosionMap, explosionKeys } = loadConfettiImages(container)

      // Setup animation helpers
      const animationIsOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches
      CustomWiggle.create('myWiggle', { wiggles: 6 })
      const clamper = gsap.utils.clamp(1, 100)

      // Create managers
      const drawingManager = new ConfettiDrawingManager(imageMap, imageKeys, elements, clamper)
      const cursorManager = new HandCursorManager(container, elements.hand)

      // Initialize cursor
      cursorManager.init()

      // Create explosion helper
      const createExplosion = (x: number, y: number, distance: number) => {
        createConfettiExplosion({ container, explosionMap, explosionKeys }, x, y, distance)
      }

      // Handle drawing end animation
      const handleClearDrawing = () => {
        const result = drawingManager.clearDrawing()
        if (!result) return

        createExplosion(result.x, result.y, result.distance)

        // Animate rock hand
        gsap.set(elements.drag, { opacity: 0 })
        gsap.set(elements.handle, { opacity: 0 })
        gsap.set(elements.rock, { opacity: 1 })

        gsap.to(elements.rock, {
          duration: 0.4,
          rotation: '+=30',
          ease: 'myWiggle',
          onComplete: () => {
            gsap.set(elements.rock, { opacity: 0 })
            gsap.set(elements.hand, { rotation: 0 })
            cursorManager.recreateSetters()
            gsap.to(elements.instructions, { opacity: 1 })
            gsap.set(elements.drag, { opacity: 1 })
          },
        })
      }

      // Setup mouse events
      const cleanupMouse = cursorManager.setupMouseEvents()

      // Setup drag observer
      if (animationIsOk) {
        Observer.create({
          target: elements.proxy,
          type: 'touch,pointer',
          onPress: (e: any) => {
            const x = e.x || e.clientX
            const y = e.y || e.clientY
            cursorManager.showOnTouch(x, y)
            drawingManager.startDrawing(e)
          },
          onDrag: (e: any) => {
            const x = e.x || e.clientX
            const y = e.y || e.clientY
            cursorManager.updateOnTouch(x, y)
            drawingManager.updateDrawing(e)
          },
          onDragEnd: () => {
            cursorManager.hideOnTouch()
            handleClearDrawing()
          },
          onRelease: () => {
            cursorManager.hideOnTouch()
            handleClearDrawing()
          },
        })
      }

      // Initial explosions for fun
      gsap.delayedCall(0.5, () => {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        createExplosion(centerX, centerY, 800)

        gsap.delayedCall(0.1, () => {
          createExplosion(centerX + 100, centerY - 50, 400)
        })
        gsap.delayedCall(0.2, () => {
          createExplosion(centerX - 80, centerY + 30, 350)
        })
      })

      // Cleanup
      return () => {
        cleanupMouse?.()
        Observer.getAll().forEach((observer) => observer.kill())
      }
    },
    { scope: containerRef }
  )

  return <ConfettiCannon ref={containerRef} />
}
