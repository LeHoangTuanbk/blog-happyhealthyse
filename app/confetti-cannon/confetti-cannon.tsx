'use client'

import { forwardRef } from 'react'

type Props = {}

export const ConfettiCannon = forwardRef<HTMLDivElement, Props>((_props, ref) => {

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Instructions */}
      <p className="fixed top-1/2 left-0 right-0 w-full text-center z-50 text-white text-lg">
        click and drag
      </p>
      
      {/* Main game area - simplified structure */}
      <section ref={ref} className="confetti-hero fixed inset-0 w-full h-full bg-black overflow-hidden z-10">
        <div className="relative w-full h-full">
          <div className="confetti-hero__content absolute inset-0 flex items-center justify-center">
            <div className="confetti-hero__flair w-full">
              {/* Hand cursor element */}
              <div className="confetti-hero__hand fixed left-0 top-0 w-8 opacity-0 pointer-events-none z-20">
                <img 
                  className="confetti-hero__drag absolute z-20 max-w-[141%] opacity-100 right-0 top-[-22px] w-[131%]" 
                  src="https://assets.codepen.io/16327/hand-drag.png" 
                  alt="" 
                />
                <img 
                  className="confetti-hero__rock absolute z-20 max-w-[141%] opacity-0 right-0 top-[-22px] w-[131%]" 
                  src="https://assets.codepen.io/16327/hand-rock.png" 
                  alt="" 
                />
                <img 
                  className="confetti-hero__handle absolute opacity-0 left-0 right-0 top-[-40px] w-full" 
                  src="https://assets.codepen.io/16327/2D-circle.png" 
                  alt="" 
                />
                <small className="absolute left-[-60%] top-5 w-[200%] text-xs text-white">drag me</small>
              </div>

              {/* Preload 3D shapes */}
              <div className="image-preload" aria-hidden="true">
                <img data-key="combo" src="https://assets.codepen.io/16327/3D-combo.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="cone" src="https://assets.codepen.io/16327/3D-cone.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="hoop" src="https://assets.codepen.io/16327/3D-hoop.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="keyframe" src="https://assets.codepen.io/16327/3D-keyframe.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="semi" src="https://assets.codepen.io/16327/3D-semi.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="spiral" src="https://assets.codepen.io/16327/3D-spiral.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="squish" src="https://assets.codepen.io/16327/3D-squish.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="triangle" src="https://assets.codepen.io/16327/3D-triangle.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="tunnel" src="https://assets.codepen.io/16327/3D-tunnel.png" className="absolute -left-[9999px]" width="1" height="1" />
                <img data-key="wat" src="https://assets.codepen.io/16327/3D-poly.png" className="absolute -left-[9999px]" width="1" height="1" />
              </div>

              {/* Preload explosion particles */}
              <div className="explosion-preload" aria-hidden="true">
                <img data-key="blue-circle" src="https://assets.codepen.io/16327/2D-circles.png" className="absolute -left-[9999px]" />
                <img data-key="green-keyframe" src="https://assets.codepen.io/16327/2D-keyframe.png" className="absolute -left-[9999px]" />
                <img data-key="orange-lightning" src="https://assets.codepen.io/16327/2D-lightning.png" className="absolute -left-[9999px]" />
                <img data-key="orange-star" src="https://assets.codepen.io/16327/2D-star.png" className="absolute -left-[9999px]" />
                <img data-key="purple-flower" src="https://assets.codepen.io/16327/2D-flower.png" className="absolute -left-[9999px]" />
                <img data-key="cone" src="https://assets.codepen.io/16327/3D-cone.png" className="absolute -left-[9999px]" />
                <img data-key="keyframe" src="https://assets.codepen.io/16327/3D-spiral.png" className="absolute -left-[9999px]" />
                <img data-key="spiral" src="https://assets.codepen.io/16327/3D-spiral.png" className="absolute -left-[9999px]" />
                <img data-key="tunnel" src="https://assets.codepen.io/16327/3D-tunnel.png" className="absolute -left-[9999px]" />
                <img data-key="hoop" src="https://assets.codepen.io/16327/3D-hoop.png" className="absolute -left-[9999px]" />
                <img data-key="semi" src="https://assets.codepen.io/16327/3D-semi.png" className="absolute -left-[9999px]" />
              </div>
            </div>
          </div>

          {/* SVG Canvas for drawing lines - full screen */}
          <svg className="confetti-hero__canvas absolute inset-0 w-full h-full pointer-events-none z-20"></svg>
          
          {/* Proxy div for event handling - full screen */}
          <div className="confetti-hero__proxy absolute inset-0 w-full h-full z-30"></div>
        </div>
      </section>
    </div>
  )
})

ConfettiCannon.displayName = 'ConfettiCannon'

// The main confetti cannon game logic
const getConfettiCannonScript = () => `
class ConfettiCannonGame {
  constructor(el) {
    this.el = el;
  }

  init() {
    // Import GSAP and plugins
    const { gsap, ScrollTrigger, Observer, CustomEase, CustomWiggle, Physics2DPlugin } = window;
    
    if (!gsap) {
      console.error('GSAP is not loaded');
      return;
    }

    // Register plugins
    gsap.registerPlugin(Observer, CustomEase, CustomWiggle, Physics2DPlugin, ScrollTrigger);

    const hero = this.el;
    this.hero = hero;

    const el = {
      hand: hero.querySelector(".confetti-hero__hand"),
      instructions: hero.querySelector(".confetti-hero__hand small"),
      rock: hero.querySelector(".confetti-hero__rock"),
      drag: hero.querySelector(".confetti-hero__drag"),
      handle: hero.querySelector(".confetti-hero__handle"),
      canvas: hero.querySelector(".confetti-hero__canvas"),
      proxy: hero.querySelector(".confetti-hero__proxy"),
      preloadImages: hero.querySelectorAll(".image-preload img"),
      xplodePreloadImages: hero.querySelectorAll(".explosion-preload img")
    };
    this.el = el;
    this.isDrawing = false;

    this.imageMap = {};
    this.imageKeys = [];

    this.el.preloadImages.forEach((img) => {
      const key = img.dataset.key;
      this.imageMap[key] = img;
      this.imageKeys.push(key);
    });

    this.explosionMap = {};
    this.explosionKeys = [];

    this.el.xplodePreloadImages.forEach((img) => {
      const key = img.dataset.key;
      this.explosionMap[key] = img;
      this.explosionKeys.push(key);
    });

    this.currentLine = null;
    this.startImage = null;
    this.circle = null;
    this.startX = 0;
    this.startY = 0;
    this.lastDistance = 0;

    this.animationIsOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    this.wiggle = CustomWiggle.create("myWiggle", { wiggles: 6 });
    this.clamper = gsap.utils.clamp(1, 100);

    this.xSetter = gsap.quickTo(this.el.hand, "x", { duration: 0.1 });
    this.ySetter = gsap.quickTo(this.el.hand, "y", { duration: 0.1 });

    this.setMotion();
    this.initObserver();
    this.initEvents();
  }

  initEvents() {
    if (!this.animationIsOk || ScrollTrigger.isTouch === 1) return;

    this.hero.style.cursor = "none";

    this.hero.addEventListener("mouseenter", (e) => {
      gsap.set(this.el.hand, { opacity: 1 });
      this.xSetter(e.x, e.x);
      this.ySetter(e.y, e.y);
    });

    this.hero.addEventListener("mouseleave", (e) => {
      gsap.set(this.el.hand, { opacity: 0 });
    });

    this.hero.addEventListener("mousemove", (e) => {
      this.xSetter(e.x);
      this.ySetter(e.y);
    });
    
    // Initial explosion in the center after 1 second
    gsap.delayedCall(1, (e) => {
      this.createExplosion(window.innerWidth/2, window.innerHeight/2, 600);
    });
  }

  setMotion() {
    gsap.set(this.el.hand, { xPercent: -50, yPercent: -50 });
  }

  initObserver() {
    if (!this.animationIsOk) return;

    if (ScrollTrigger.isTouch === 1) {
      Observer.create({
        target: this.el.proxy,
        type: "touch",
        onPress: (e) => {
          this.createExplosion(e.x, e.y, 400);
        }
      });
    } else {
      Observer.create({
        target: this.el.proxy,
        type: "pointer",
        onPress: (e) => this.startDrawing(e),
        onDrag: (e) => this.isDrawing && this.updateDrawing(e),
        onDragEnd: (e) => this.clearDrawing(e),
        onRelease: (e) => this.clearDrawing(e)
      });
    }
  }

  startDrawing(e) {
    this.isDrawing = true;

    gsap.set(this.el.instructions, { opacity: 0 });

    this.startX = e.x;
    this.startY = e.y + window.scrollY;

    // Create line
    this.currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.currentLine.setAttribute("x1", this.startX);
    this.currentLine.setAttribute("y1", this.startY);
    this.currentLine.setAttribute("x2", this.startX);
    this.currentLine.setAttribute("y2", this.startY);
    this.currentLine.setAttribute("stroke", "#fffce1");
    this.currentLine.setAttribute("stroke-width", "2");
    this.currentLine.setAttribute("stroke-dasharray", "4");

    this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.circle.setAttribute("cx", this.startX);
    this.circle.setAttribute("cy", this.startY);
    this.circle.setAttribute("r", "30");
    this.circle.setAttribute("fill", "#0e100f");

    // Create image at start point
    const randomKey = gsap.utils.random(this.imageKeys);
    const original = this.imageMap[randomKey];
    const clone = document.createElementNS("http://www.w3.org/2000/svg", "image");

    clone.setAttribute("x", this.startX - 25);
    clone.setAttribute("y", this.startY - 25);
    clone.setAttribute("width", "50");
    clone.setAttribute("height", "50");
    clone.setAttributeNS("http://www.w3.org/1999/xlink", "href", original.src);

    this.startImage = clone;

    this.el.canvas.appendChild(this.currentLine);
    this.el.canvas.appendChild(this.circle);
    this.el.canvas.appendChild(this.startImage);

    gsap.set(this.el.drag, { opacity: 1 });
    gsap.set(this.el.handle, { opacity: 1 });
    gsap.set(this.el.rock, { opacity: 0 });
  }

  updateDrawing(e) {
    if (!this.currentLine || !this.startImage) return;

    let cursorX = e.x;
    let cursorY = e.y + window.scrollY;

    let dx = cursorX - this.startX;
    let dy = cursorY - this.startY;

    let distance = Math.sqrt(dx * dx + dy * dy);
    let shrink = (distance - 30) / distance;

    let x2 = this.startX + dx * shrink;
    let y2 = this.startY + dy * shrink;

    if (distance < 30) {
      x2 = this.startX;
      y2 = this.startY;
    }

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);

    gsap.to(this.currentLine, {
      attr: { x2, y2 },
      duration: 0.1,
      ease: "none"
    });

    // Eased scale (starts fast, slows down)
    let raw = distance / 100;
    let eased = Math.pow(raw, 0.5);
    let clamped = this.clamper(eased);

    gsap.set([this.startImage, this.circle], {
      scale: clamped,
      rotation: \`\${angle + -45}_short\`,
      transformOrigin: "center center"
    });

    // Move & rotate hand
    gsap.to(this.el.hand, {
      rotation: \`\${angle + -90}_short\`,
      duration: 0.1,
      ease: "none"
    });

    this.lastDistance = distance;
  }

  createExplosion(x, y, distance = 100) {
    const count = Math.round(gsap.utils.clamp(3, 100, distance / 20));
    const angleSpread = Math.PI * 2;
    const explosion = gsap.timeline();
    const gravity = 5;
    const speed = gsap.utils.mapRange(0, 500, 0.3, 1.5, distance);
    const sizeRange = gsap.utils.mapRange(0, 500, 20, 60, distance);

    for (let i = 0; i < count; i++) {
      const randomKey = gsap.utils.random(this.explosionKeys);
      const original = this.explosionMap[randomKey];
      const img = original.cloneNode(true);

      img.className = "explosion-img";
      img.style.position = "absolute";
      img.style.pointerEvents = "none";
      img.style.height = \`\${gsap.utils.random(20, sizeRange)}px\`;
      img.style.left = \`\${x}px\`;
      img.style.top = \`\${y}px\`;
      img.style.zIndex = 4;

      this.hero.appendChild(img);

      const angle = Math.random() * angleSpread;
      const velocity = gsap.utils.random(500, 1500) * speed;

      explosion
        .to(
          img,
          {
            physics2D: {
              angle: angle * (180 / Math.PI),
              velocity: velocity,
              gravity: 3000
            },
            rotation: gsap.utils.random(-180, 180),
            duration: 1 + Math.random()
          },
          0
        )
        .to(
          img,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => img.remove()
          },
          1
        );
    }

    return explosion;
  }

  clearDrawing(e) {
    if (!this.isDrawing) return;
    this.createExplosion(this.startX, this.startY, this.lastDistance);

    gsap.set(this.el.drag, { opacity: 0 });
    gsap.set(this.el.handle, { opacity: 0 });
    gsap.set(this.el.rock, { opacity: 1 });

    gsap.to(this.el.rock, {
      duration: 0.4,
      rotation: "+=30",
      ease: "myWiggle",
      onComplete: () => {
        gsap.set(this.el.rock, { opacity: 0 });
        gsap.set(this.el.hand, { rotation: 0, overwrite: "auto" });
        gsap.to(this.el.instructions, { opacity: 1 });
        gsap.set(this.el.drag, { opacity: 1 });
      }
    });

    this.isDrawing = false;

    // Clear all elements from SVG and reset references
    this.el.canvas.innerHTML = "";
    this.currentLine = null;
    this.startImage = null;
  }

  destroy() {
    // Clean up any event listeners or timers if needed
  }
}

// Make it globally available
window.ConfettiCannonGame = ConfettiCannonGame;
`