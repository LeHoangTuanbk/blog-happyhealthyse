import gsap from 'gsap';

type ObserverEvent = {
  x?: number;
  y?: number;
  clientX?: number;
  clientY?: number;
  touches?: TouchList;
};

type DrawingElements = {
  canvas: SVGSVGElement | null;
  drag: HTMLElement | null;
  handle: HTMLElement | null;
  rock: HTMLElement | null;
  hand: HTMLElement | null;
  instructions: HTMLElement | null;
};

export class ConfettiDrawingManager {
  private currentLine: SVGLineElement | null = null;
  private startImage: SVGImageElement | null = null;
  private circle: SVGCircleElement | null = null;
  private startX: number = 0;
  private startY: number = 0;
  private lastDistance: number = 0;
  private isDrawing: boolean = false;

  constructor(
    private imageMap: Record<string, HTMLImageElement>,
    private imageKeys: string[],
    private elements: DrawingElements,
    private clamper: (value: number) => number,
  ) {}

  startDrawing(e: ObserverEvent) {
    this.isDrawing = true;
    this.lastDistance = 0;

    if (this.elements.instructions) {
      gsap.set(this.elements.instructions, { opacity: 0 });
    }

    this.startX = e.x || e.clientX || e.touches?.[0]?.clientX || 0;
    this.startY = e.y || e.clientY || e.touches?.[0]?.clientY || 0;

    this.currentLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.currentLine.setAttribute('x1', this.startX.toString());
    this.currentLine.setAttribute('y1', this.startY.toString());
    this.currentLine.setAttribute('x2', this.startX.toString());
    this.currentLine.setAttribute('y2', this.startY.toString());
    this.currentLine.setAttribute('stroke', '#fffce1');
    this.currentLine.setAttribute('stroke-width', '2');
    this.currentLine.setAttribute('stroke-dasharray', '4');

    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle.setAttribute('cx', this.startX.toString());
    this.circle.setAttribute('cy', this.startY.toString());
    this.circle.setAttribute('r', '30');
    this.circle.setAttribute('fill', '#0e100f');

    const randomKey = gsap.utils.random(this.imageKeys);
    const original = this.imageMap[randomKey];
    const clone = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    clone.setAttribute('x', (this.startX - 25).toString());
    clone.setAttribute('y', (this.startY - 25).toString());
    clone.setAttribute('width', '50');
    clone.setAttribute('height', '50');
    clone.setAttributeNS('http://www.w3.org/1999/xlink', 'href', original.src);

    this.startImage = clone;

    if (this.elements.canvas) {
      this.elements.canvas.appendChild(this.currentLine);
      this.elements.canvas.appendChild(this.circle);
      this.elements.canvas.appendChild(this.startImage);
    }

    gsap.set(this.elements.drag, { opacity: 1 });
    gsap.set(this.elements.handle, { opacity: 1 });
    gsap.set(this.elements.rock, { opacity: 0 });
  }

  updateDrawing(e: ObserverEvent) {
    if (!this.currentLine || !this.startImage) return;

    const cursorX = e.x || e.clientX || e.touches?.[0]?.clientX || 0;
    const cursorY = e.y || e.clientY || e.touches?.[0]?.clientY || 0;

    const dx = cursorX - this.startX;
    const dy = cursorY - this.startY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const shrink = (distance - 30) / distance;

    let x2 = this.startX + dx * shrink;
    let y2 = this.startY + dy * shrink;

    if (distance < 30) {
      x2 = this.startX;
      y2 = this.startY;
    }

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    gsap.to(this.currentLine, {
      attr: { x2, y2 },
      duration: 0.1,
      ease: 'none',
    });

    const raw = distance / 100;
    const eased = Math.pow(raw, 0.5);
    const clamped = this.clamper(eased);

    gsap.set([this.startImage, this.circle], {
      scale: clamped,
      rotation: `${angle + -45}_short`,
      transformOrigin: 'center center',
    });

    if (this.elements.hand) {
      gsap.to(this.elements.hand, {
        rotation: `${angle + -90}_short`,
        duration: 0.1,
        ease: 'none',
        overwrite: 'auto',
      });
    }

    this.lastDistance = distance;
  }

  clearDrawing() {
    if (!this.isDrawing) return null;

    if (this.elements.canvas) {
      this.elements.canvas.innerHTML = '';
    }

    const result = {
      x: this.startX,
      y: this.startY,
      distance: this.lastDistance || 100,
    };

    this.currentLine = null;
    this.startImage = null;
    this.circle = null;
    this.isDrawing = false;

    return result;
  }
}
