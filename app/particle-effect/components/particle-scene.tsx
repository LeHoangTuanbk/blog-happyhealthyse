'use client';

import { ParticleText } from './particle-text';

interface ParticleSceneProps {
  imageSrc: string;
  particleCount?: number;
}

export function ParticleScene({ imageSrc, particleCount = 25000 }: ParticleSceneProps) {
  return (
    <div className="fixed inset-0 bg-black">
      <ParticleText imageSrc={imageSrc} particleCount={particleCount} />
    </div>
  );
}
