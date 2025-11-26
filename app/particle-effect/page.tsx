'use client';

import { ParticleScene, ConfettiRain } from './components';

export default function ParticleEffectPage() {
  return (
    <>
      <ConfettiRain count={80} duration={5} />
      <ParticleScene imageSrc="/static/images/hapins.png" particleCount={40000} />
    </>
  );
}
