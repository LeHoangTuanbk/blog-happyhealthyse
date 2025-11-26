'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleTextProps {
  imageSrc: string;
  particleCount?: number;
}

/**
 * Particle text effect component using Three.js directly
 * Based on reference implementation with gold gradient colors
 */
export function ParticleText({ imageSrc, particleCount = 25000 }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    geometry: THREE.BufferGeometry;
    originalPositions: Float32Array;
    velocities: Float32Array;
    intersectionPoint: THREE.Vector3 | null;
    rotationX: number;
    rotationY: number;
    isDragging: boolean;
    previousMouseX: number;
    previousMouseY: number;
    particleCount: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Load image and sample particles
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      // Sample pixels from image
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const { data, width, height } = imageData;

      // Collect dark pixels (text is dark on gray/white background)
      const textPixels: { x: number; y: number }[] = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          const brightness = (r + g + b) / 3;
          // Dark pixels (text) - brightness < 150 to catch black text on gray background
          if (a > 100 && brightness < 150) {
            textPixels.push({ x, y });
          }
        }
      }

      // Sample particles
      const aspectRatio = width / height;
      const scale = 2.5; // Scale factor for the text size
      const thickness = 0.15; // Z-axis thickness

      const numParticles = Math.min(particleCount, textPixels.length);
      const positions = new Float32Array(numParticles * 3);
      const colors = new Float32Array(numParticles * 3);

      // Shuffle pixels to get random distribution instead of sequential sampling
      for (let k = textPixels.length - 1; k > 0; k--) {
        const rand = Math.floor(Math.random() * (k + 1));
        [textPixels[k], textPixels[rand]] = [textPixels[rand], textPixels[k]];
      }

      let i = 0;
      for (let j = 0; j < textPixels.length && i < numParticles; j++) {
        const pixel = textPixels[j];
        // Normalize to -1 to 1 range (no flip needed)
        const nx = (pixel.x / width - 0.5) * scale * aspectRatio;
        const ny = -(pixel.y / height - 0.5) * scale;
        const nz = Math.random() * thickness - thickness / 2;

        positions[i * 3] = nx;
        positions[i * 3 + 1] = ny;
        positions[i * 3 + 2] = nz;

        // Gold gradient based on x position
        // Gold gradient: from #B8860B (dark gold) to #FFD700 (bright gold)
        const t = (pixel.x / width);
        const r = (1 - t) * 0.72 + t * 1.0;
        const g = (1 - t) * 0.53 + t * 0.84;
        const b = (1 - t) * 0.04 + t * 0.0;

        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;

        i++;
      }

      const actualParticleCount = i;
      const originalPositions = positions.slice();
      const velocities = new Float32Array(actualParticleCount * 3);

      // Intro animation: scatter particles very slightly from original position
      const scatteredPositions = new Float32Array(actualParticleCount * 3);
      for (let k = 0; k < actualParticleCount; k++) {
        const ox = originalPositions[k * 3];
        const oy = originalPositions[k * 3 + 1];
        const oz = originalPositions[k * 3 + 2];

        // Very small random offset from original position
        const offsetX = (Math.random() - 0.5) * 0.4;
        const offsetY = (Math.random() - 0.5) * 0.4;
        const offsetZ = (Math.random() - 0.5) * 0.1;

        scatteredPositions[k * 3] = ox + offsetX;
        scatteredPositions[k * 3 + 1] = oy + offsetY;
        scatteredPositions[k * 3 + 2] = oz + offsetZ;
      }

      // Copy scattered positions to initial positions
      for (let k = 0; k < scatteredPositions.length; k++) {
        positions[k] = scatteredPositions[k];
      }

      // Setup Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(canvas.width, canvas.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      // Create geometry
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.008,
        sizeAttenuation: true,
        vertexColors: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      camera.position.set(0, 0, 3);

      // Store scene data
      sceneRef.current = {
        scene,
        camera,
        renderer,
        points,
        geometry,
        originalPositions,
        velocities,
        intersectionPoint: null,
        rotationX: 0,
        rotationY: 0,
        isDragging: false,
        previousMouseX: 0,
        previousMouseY: 0,
        particleCount: actualParticleCount,
      };

      // Mouse handlers
      const handleMouseMove = (event: MouseEvent) => {
        if (!sceneRef.current) return;

        const rect = canvas.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        mouse.x = (offsetX / canvas.clientWidth) * 2 - 1;
        mouse.y = -(offsetY / canvas.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersect = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, intersect)) {
          sceneRef.current.intersectionPoint = intersect;
        }

        // Handle dragging for rotation
        if (sceneRef.current.isDragging) {
          const deltaX = event.clientX - sceneRef.current.previousMouseX;
          const deltaY = event.clientY - sceneRef.current.previousMouseY;
          sceneRef.current.rotationY -= deltaX * 0.005;
          sceneRef.current.rotationX -= deltaY * 0.005;
          sceneRef.current.previousMouseX = event.clientX;
          sceneRef.current.previousMouseY = event.clientY;
        }
      };

      const handleMouseDown = (event: MouseEvent) => {
        if (!sceneRef.current) return;
        sceneRef.current.isDragging = true;
        sceneRef.current.previousMouseX = event.clientX;
        sceneRef.current.previousMouseY = event.clientY;
      };

      const handleMouseUp = () => {
        if (sceneRef.current) {
          sceneRef.current.isDragging = false;
        }
      };

      const handleMouseLeave = () => {
        if (sceneRef.current) {
          sceneRef.current.intersectionPoint = null;
          sceneRef.current.isDragging = false;
        }
      };

      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        if (sceneRef.current) {
          const zoomSpeed = 0.001;
          sceneRef.current.camera.position.z = Math.max(
            1,
            Math.min(5, sceneRef.current.camera.position.z + event.deltaY * zoomSpeed)
          );
        }
      };

      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.addEventListener('wheel', handleWheel, { passive: false });

      // Animation constants
      const effectRadius = 0.15; // Smaller hover radius
      const repelStrength = 0.03; // Gentler repulsion
      const attractStrength = 0.05;
      const damping = 0.92;

      // Animation loop
      let animationId: number;

      const animate = () => {
        if (!sceneRef.current) return;

        const {
          geometry,
          points,
          originalPositions,
          velocities,
          intersectionPoint,
          rotationX,
          rotationY,
          particleCount: count,
        } = sceneRef.current;

        const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;

        // Update rotations smoothly
        points.rotation.y += (rotationY - points.rotation.y) * 0.1;
        points.rotation.x += (rotationX - points.rotation.x) * 0.1;

        // Compute inverse quaternion for local intersection
        const euler = new THREE.Euler(points.rotation.x, points.rotation.y, points.rotation.z, 'XYZ');
        const inverseQuaternion = new THREE.Quaternion().setFromEuler(euler).invert();

        let localIntersection: THREE.Vector3 | null = null;
        if (intersectionPoint) {
          localIntersection = intersectionPoint.clone().applyQuaternion(inverseQuaternion);
        }

        // Update particles
        for (let j = 0; j < count; j++) {
          const idx = j * 3;

          const ox = originalPositions[idx];
          const oy = originalPositions[idx + 1];
          const oz = originalPositions[idx + 2];

          let px = positionAttribute.getX(j);
          let py = positionAttribute.getY(j);
          let pz = positionAttribute.getZ(j);

          let vx = velocities[idx];
          let vy = velocities[idx + 1];
          let vz = velocities[idx + 2];

          // Repulsion from mouse
          if (localIntersection) {
            const dx = px - localIntersection.x;
            const dy = py - localIntersection.y;
            const dz = pz - localIntersection.z;
            const distSq = dx * dx + dy * dy + dz * dz;
            const dist = Math.sqrt(distSq);

            if (distSq < effectRadius * effectRadius && distSq > 0.0001) {
              const force = (1 - dist / effectRadius) * repelStrength;
              vx += (dx / dist) * force;
              vy += (dy / dist) * force;
              vz += (dz / dist) * force;
            }
          }

          // Attract back to original position
          const attractDx = ox - px;
          const attractDy = oy - py;
          const attractDz = oz - pz;

          vx += attractDx * attractStrength;
          vy += attractDy * attractStrength;
          vz += attractDz * attractStrength;

          // Damping
          vx *= damping;
          vy *= damping;
          vz *= damping;

          // Update position
          px += vx;
          py += vy;
          pz += vz;

          positionAttribute.setXYZ(j, px, py, pz);
          velocities[idx] = vx;
          velocities[idx + 1] = vy;
          velocities[idx + 2] = vz;
        }

        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);

      // Handle resize
      const handleResize = () => {
        if (!sceneRef.current) return;
        const { camera, renderer } = sceneRef.current;

        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        canvas.width = width;
        canvas.height = height;
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };
  }, [imageSrc, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}
