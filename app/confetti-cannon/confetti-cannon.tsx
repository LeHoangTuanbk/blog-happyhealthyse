import { forwardRef } from 'react';
import Image from 'next/image';

type Props = object;

export const ConfettiCannon = forwardRef<HTMLDivElement, Props>((_props, ref) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <p className="fixed top-1/2 right-0 left-0 z-50 w-full text-center text-lg text-white">
        click and drag
      </p>

      <section
        ref={ref}
        className="confetti-hero fixed inset-0 z-10 h-full w-full overflow-hidden bg-black"
      >
        <div className="relative h-full w-full">
          <div className="confetti-hero__content absolute inset-0 flex items-center justify-center">
            <div className="confetti-hero__flair w-full">
              {/* Hand cursor element */}
              <div className="confetti-hero__hand pointer-events-none fixed top-0 left-0 z-50 w-8 opacity-0">
                <Image
                  className="confetti-hero__drag absolute top-[-22px] right-0 z-20 w-[131%] max-w-[141%] opacity-100"
                  src="/static/images/confetti-canon/hand-drag.png"
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                />
                <Image
                  className="confetti-hero__rock absolute top-[-22px] right-0 z-20 w-[131%] max-w-[141%] opacity-0"
                  src="/static/images/confetti-canon/hand-rock.png"
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                />
                <Image
                  className="confetti-hero__handle absolute top-[-40px] right-0 left-0 w-full opacity-0"
                  src="/static/images/confetti-canon/2D-circle.png"
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                />
                <small className="absolute top-5 left-[-60%] w-[200%] text-xs text-white">
                  drag me
                </small>
              </div>

              {/* Preload 3D shapes */}
              <div className="image-preload" aria-hidden="true">
                <Image
                  data-key="combo"
                  src="/static/images/confetti-canon/3D-combo.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={66}
                  height={66}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="cone"
                  src="/static/images/confetti-canon/3D-cone.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={900}
                  height={956}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="hoop"
                  src="/static/images/confetti-canon/3D-hoop.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={176}
                  height={176}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="keyframe"
                  src="/static/images/confetti-canon/3D-keyframe.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={48}
                  height={48}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="semi"
                  src="/static/images/confetti-canon/3D-semi.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={76}
                  height={76}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="spiral"
                  src="/static/images/confetti-canon/3D-spiral.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={120}
                  height={120}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="squish"
                  src="/static/images/confetti-canon/3D-squish.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={1080}
                  height={1132}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="triangle"
                  src="/static/images/confetti-canon/3D-triangle.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={1184}
                  height={1048}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="tunnel"
                  src="/static/images/confetti-canon/3D-tunnel.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={1352}
                  height={1272}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="wat"
                  src="/static/images/confetti-canon/3D-poly.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={52}
                  height={52}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
              </div>

              {/* Preload explosion particles */}
              <div className="explosion-preload" aria-hidden="true">
                <Image
                  data-key="blue-circle"
                  src="/static/images/confetti-canon/2D-circles.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={182}
                  height={182}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="green-keyframe"
                  src="/static/images/confetti-canon/2D-keyframe.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={170}
                  height={170}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="orange-lightning"
                  src="/static/images/confetti-canon/2D-lightning.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={496}
                  height={992}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="orange-star"
                  src="/static/images/confetti-canon/2D-star.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={66}
                  height={66}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="purple-flower"
                  src="/static/images/confetti-canon/2D-flower.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={224}
                  height={224}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="cone"
                  src="/static/images/confetti-canon/3D-cone.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={900}
                  height={956}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="keyframe"
                  src="/static/images/confetti-canon/3D-spiral.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={120}
                  height={120}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="spiral"
                  src="/static/images/confetti-canon/3D-spiral.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={120}
                  height={120}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="tunnel"
                  src="/static/images/confetti-canon/3D-tunnel.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={1352}
                  height={1272}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="hoop"
                  src="/static/images/confetti-canon/3D-hoop.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={176}
                  height={176}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  data-key="semi"
                  src="/static/images/confetti-canon/3D-semi.png"
                  className="absolute -left-[9999px]"
                  alt=""
                  width={76}
                  height={76}
                  quality={100}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>

          <svg className="confetti-hero__canvas pointer-events-none absolute inset-0 z-20 h-full w-full"></svg>

          <div className="confetti-hero__proxy absolute inset-0 z-30 h-full w-full"></div>
        </div>
      </section>
    </div>
  );
});

ConfettiCannon.displayName = 'ConfettiCannon';
