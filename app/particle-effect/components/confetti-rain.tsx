'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CONFETTI_IMAGES = [
  '/static/images/confetti-canon/2D-circle.png',
  '/static/images/confetti-canon/2D-flower.png',
  '/static/images/confetti-canon/2D-lightning.png',
  '/static/images/confetti-canon/2D-star.png',
  '/static/images/confetti-canon/3D-cone.png',
  '/static/images/confetti-canon/3D-hoop.png',
  '/static/images/confetti-canon/3D-spiral.png',
  '/static/images/confetti-canon/3D-triangle.png',
];

interface ConfettiRainProps {
  duration?: number;
  count?: number;
}

export function ConfettiRain({ duration = 4, count = 50 }: ConfettiRainProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const confettiElements: HTMLImageElement[] = [];

    // Create confetti elements
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.src = CONFETTI_IMAGES[Math.floor(Math.random() * CONFETTI_IMAGES.length)];
      img.className = 'confetti-piece';
      img.style.cssText = `
        position: absolute;
        pointer-events: none;
        width: ${gsap.utils.random(20, 60)}px;
        height: auto;
        left: ${gsap.utils.random(0, 100)}%;
        top: -100px;
        opacity: 0;
        z-index: 10;
      `;
      container.appendChild(img);
      confettiElements.push(img);
    }

    // Animate confetti falling
    const timeline = gsap.timeline();

    confettiElements.forEach((el, index) => {
      const delay = Math.random() * 2;
      const xMovement = gsap.utils.random(-100, 100);
      const rotationAmount = gsap.utils.random(-360, 360);
      const fallDuration = gsap.utils.random(2, 4);

      timeline.to(
        el,
        {
          y: window.innerHeight + 200,
          x: xMovement,
          rotation: rotationAmount,
          opacity: 1,
          duration: fallDuration,
          ease: 'power1.in',
          onComplete: () => {
            el.remove();
          },
        },
        delay
      );

      // Fade out near the end
      timeline.to(
        el,
        {
          opacity: 0,
          duration: 0.5,
        },
        delay + fallDuration - 0.5
      );
    });

    // Cleanup
    return () => {
      timeline.kill();
      confettiElements.forEach((el) => el.remove());
    };
  }, [count, duration]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 100 }}
    />
  );
}
