import { useRef } from 'react'
import gsap from 'gsap'

type DrawingState = {
  currentLine: SVGLineElement | null
  startImage: SVGImageElement | null
  circle: SVGCircleElement | null
  startX: number
  startY: number
  lastDistance: number
  isDrawing: boolean
}

type DrawingElements = {
  canvas: SVGSVGElement | null
  drag: HTMLElement | null
  handle: HTMLElement | null
  rock: HTMLElement | null
  hand: HTMLElement | null
  instructions: HTMLElement | null
}

export const useConfettiDrawing = (
  imageMap: Record<string, HTMLImageElement>,
  imageKeys: string[],
  elements: DrawingElements,
  clamper: (value: number) => number
) => {
  const stateRef = useRef<DrawingState>({
    currentLine: null,
    startImage: null,
    circle: null,
    startX: 0,
    startY: 0,
    lastDistance: 0,
    isDrawing: false,
  })

  const startDrawing = (e: any) => {
    const state = stateRef.current
    state.isDrawing = true
    state.lastDistance = 0

    if (elements.instructions) {
      gsap.set(elements.instructions, { opacity: 0 })
    }

    state.startX = e.x || e.clientX
    state.startY = e.y || e.clientY

    // Create line
    state.currentLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    state.currentLine.setAttribute('x1', state.startX.toString())
    state.currentLine.setAttribute('y1', state.startY.toString())
    state.currentLine.setAttribute('x2', state.startX.toString())
    state.currentLine.setAttribute('y2', state.startY.toString())
    state.currentLine.setAttribute('stroke', '#fffce1')
    state.currentLine.setAttribute('stroke-width', '2')
    state.currentLine.setAttribute('stroke-dasharray', '4')

    // Create circle
    state.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    state.circle.setAttribute('cx', state.startX.toString())
    state.circle.setAttribute('cy', state.startY.toString())
    state.circle.setAttribute('r', '30')
    state.circle.setAttribute('fill', '#0e100f')

    // Create image at start point
    const randomKey = gsap.utils.random(imageKeys)
    const original = imageMap[randomKey]
    const clone = document.createElementNS('http://www.w3.org/2000/svg', 'image')

    clone.setAttribute('x', (state.startX - 25).toString())
    clone.setAttribute('y', (state.startY - 25).toString())
    clone.setAttribute('width', '50')
    clone.setAttribute('height', '50')
    clone.setAttributeNS('http://www.w3.org/1999/xlink', 'href', original.src)

    state.startImage = clone

    // Add to canvas
    if (elements.canvas) {
      elements.canvas.appendChild(state.currentLine)
      elements.canvas.appendChild(state.circle)
      elements.canvas.appendChild(state.startImage)
    }

    // Update UI
    gsap.set(elements.drag, { opacity: 1 })
    gsap.set(elements.handle, { opacity: 1 })
    gsap.set(elements.rock, { opacity: 0 })
  }

  const updateDrawing = (e: any) => {
    const state = stateRef.current
    if (!state.currentLine || !state.startImage) return

    const cursorX = e.x || e.clientX
    const cursorY = e.y || e.clientY

    const dx = cursorX - state.startX
    const dy = cursorY - state.startY

    const distance = Math.sqrt(dx * dx + dy * dy)
    const shrink = (distance - 30) / distance

    let x2 = state.startX + dx * shrink
    let y2 = state.startY + dy * shrink

    if (distance < 30) {
      x2 = state.startX
      y2 = state.startY
    }

    const angle = Math.atan2(dy, dx) * (180 / Math.PI)

    // Update line
    gsap.to(state.currentLine, {
      attr: { x2, y2 },
      duration: 0.1,
      ease: 'none',
    })

    // Scale elements
    const raw = distance / 100
    const eased = Math.pow(raw, 0.5)
    const clamped = clamper(eased)

    gsap.set([state.startImage, state.circle], {
      scale: clamped,
      rotation: `${angle + -45}_short`,
      transformOrigin: 'center center',
    })

    // Rotate hand
    if (elements.hand) {
      gsap.to(elements.hand, {
        rotation: `${angle + -90}_short`,
        duration: 0.1,
        ease: 'none',
        overwrite: 'auto',
      })
    }

    state.lastDistance = distance
  }

  const clearDrawing = () => {
    const state = stateRef.current
    if (!state.isDrawing) return

    // Clear canvas
    if (elements.canvas) {
      elements.canvas.innerHTML = ''
    }

    state.currentLine = null
    state.startImage = null
    state.circle = null
    state.isDrawing = false

    // Return explosion position and distance for parent to handle
    return {
      x: state.startX,
      y: state.startY,
      distance: state.lastDistance || 100,
    }
  }

  return {
    startDrawing,
    updateDrawing,
    clearDrawing,
    getState: () => stateRef.current,
  }
}