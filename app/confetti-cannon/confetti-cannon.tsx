// TODO: This is a work in progress. Will fix eslint errors later.
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import { forwardRef } from 'react';

type Props = {};

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
                <img
                  className="confetti-hero__drag absolute top-[-22px] right-0 z-20 w-[131%] max-w-[141%] opacity-100"
                  src="https://assets.codepen.io/16327/hand-drag.png"
                  alt=""
                />
                <img
                  className="confetti-hero__rock absolute top-[-22px] right-0 z-20 w-[131%] max-w-[141%] opacity-0"
                  src="https://assets.codepen.io/16327/hand-rock.png"
                  alt=""
                />
                <img
                  className="confetti-hero__handle absolute top-[-40px] right-0 left-0 w-full opacity-0"
                  src="https://assets.codepen.io/16327/2D-circle.png"
                  alt=""
                />
                <small className="absolute top-5 left-[-60%] w-[200%] text-xs text-white">
                  drag me
                </small>
              </div>

              {/* Preload 3D shapes */}
              <div className="image-preload" aria-hidden="true">
                <img
                  data-key="combo"
                  src="https://assets.codepen.io/16327/3D-combo.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="cone"
                  src="https://assets.codepen.io/16327/3D-cone.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="hoop"
                  src="https://assets.codepen.io/16327/3D-hoop.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="keyframe"
                  src="https://assets.codepen.io/16327/3D-keyframe.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="semi"
                  src="https://assets.codepen.io/16327/3D-semi.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="spiral"
                  src="https://assets.codepen.io/16327/3D-spiral.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="squish"
                  src="https://assets.codepen.io/16327/3D-squish.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="triangle"
                  src="https://assets.codepen.io/16327/3D-triangle.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="tunnel"
                  src="https://assets.codepen.io/16327/3D-tunnel.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
                <img
                  data-key="wat"
                  src="https://assets.codepen.io/16327/3D-poly.png"
                  className="absolute -left-[9999px]"
                  width="1"
                  height="1"
                />
              </div>

              {/* Preload explosion particles */}
              <div className="explosion-preload" aria-hidden="true">
                <img
                  data-key="blue-circle"
                  src="https://assets.codepen.io/16327/2D-circles.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="green-keyframe"
                  src="https://assets.codepen.io/16327/2D-keyframe.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="orange-lightning"
                  src="https://assets.codepen.io/16327/2D-lightning.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="orange-star"
                  src="https://assets.codepen.io/16327/2D-star.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="purple-flower"
                  src="https://assets.codepen.io/16327/2D-flower.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="cone"
                  src="https://assets.codepen.io/16327/3D-cone.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="keyframe"
                  src="https://assets.codepen.io/16327/3D-spiral.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="spiral"
                  src="https://assets.codepen.io/16327/3D-spiral.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="tunnel"
                  src="https://assets.codepen.io/16327/3D-tunnel.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="hoop"
                  src="https://assets.codepen.io/16327/3D-hoop.png"
                  className="absolute -left-[9999px]"
                />
                <img
                  data-key="semi"
                  src="https://assets.codepen.io/16327/3D-semi.png"
                  className="absolute -left-[9999px]"
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
