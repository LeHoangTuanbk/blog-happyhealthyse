import { Metadata } from 'next'
import { ConfettiCannonContainer } from './confetti-cannon-container'

export const metadata: Metadata = {
  title: 'Confetti Cannon Game',
  description: 'Click and drag to create explosive confetti effects - a fun interactive GSAP experience',
}

export default function ConfettiCannonPage() {
  return <ConfettiCannonContainer />
}