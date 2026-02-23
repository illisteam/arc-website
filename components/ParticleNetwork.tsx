import React, { useRef, useEffect } from 'react';

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configuration - Optimized for Performance
    // Reduced from 600 to 300 to prevent main thread blocking on load
    const particleCount = 300;
    const mouseDistance = 150;
    const connectionDensity = 0.30;

    let mouse = { x: 0, y: 0 };

    interface Rect { x: number; y: number; w: number; h: number; }
    let cardRects: Rect[] = [];

    // Helper to get actual DOM positions of the cards
    const updateCardRectsFromDOM = () => {
      const grid = document.getElementById('services-grid');
      if (!grid) return false;

      const children = grid.children;
      if (children.length === 0) return false;

      const rects: Rect[] = [];
      for (let i = 0; i < children.length; i++) {
        const domRect = children[i].getBoundingClientRect();
        rects.push({
          x: domRect.left,
          y: domRect.top,
          w: domRect.width,
          h: domRect.height
        });
      }
      cardRects = rects;
      return true;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      cardIndex: number;
      targetRelX: number; // Target relative to card top-left
      targetRelY: number;
      ease: number;
      twinkleSpeed: number;
      twinklePhase: number;
      noiseOffset: number;
      connects: boolean; // Determines if this particle forms lines

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;

        // Slower, star-like movement
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;

        // Smaller stars
        this.size = Math.random() * 1.2 + 0.3;

        this.cardIndex = Math.floor(Math.random() * 4);
        this.targetRelX = Math.random();
        this.targetRelY = Math.random();

        // Base ease factor
        this.ease = Math.random() * 0.15 + 0.15;

        // Visual properties
        this.twinkleSpeed = Math.random() * 0.05;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.noiseOffset = Math.random() * 1000;

        // Randomly decide if this particle can form connections
        this.connects = Math.random() < connectionDensity;
      }

      update(rects: Rect[], mode: 'hero' | 'construct', time: number) {
        if (mode === 'hero') {
          // Hero Mode: Disperse to full screen star field

          // 1. Calculate vector to home position
          const dxHome = this.baseX - this.x;
          const dyHome = this.baseY - this.y;

          // 2. Smoothly return to base (Disperse effect)
          this.x += dxHome * 0.05;
          this.y += dyHome * 0.05;

          // 3. Add ambient drift (star movement)
          this.x += this.vx;
          this.y += this.vy;

          // 4. Wrap logic for infinite field
          if (Math.abs(dxHome) < 100 && Math.abs(dyHome) < 100) {
            this.baseX += this.vx;
            this.baseY += this.vy;

            if (this.baseX < 0) this.baseX = width;
            if (this.baseX > width) this.baseX = 0;
            if (this.baseY < 0) this.baseY = height;
            if (this.baseY > height) this.baseY = 0;

            if (Math.abs(this.x - this.baseX) > 100) {
              this.x = this.baseX;
              this.y = this.baseY;
            }
          }

          // Mouse interaction
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseDistance - dist) / mouseDistance;
            this.x -= Math.cos(angle) * force * 1;
            this.y -= Math.sin(angle) * force * 1;
          }

        } else {
          // Construct Mode: Track the DOM element
          const rect = rects[this.cardIndex];
          if (rect) {
            const targetX = rect.x + (this.targetRelX * rect.w);
            const targetY = rect.y + (this.targetRelY * rect.h);

            const dx = targetX - this.x;
            const dy = targetY - this.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 900) { // Within 30px
              // Tight tracking
              this.x += dx * 0.85;
              this.y += dy * 0.85;
            } else {
              // Smooth entry
              this.x += dx * this.ease;
              this.y += dy * this.ease;
            }

            // Very subtle noise
            this.x += Math.sin(time * 0.02 + this.noiseOffset) * 0.05;
            this.y += Math.cos(time * 0.02 + this.noiseOffset) * 0.05;
          }
        }
      }

      draw(time: number) {
        if (!ctx) return;

        // Twinkle effect
        const opacity = 0.3 + 0.7 * Math.abs(Math.sin(time * this.twinkleSpeed + this.twinklePhase));

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    }

    let particles: Particle[] = [];
    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      time++;
      ctx.clearRect(0, 0, width, height);

      // Update positions from DOM
      const hasGrid = updateCardRectsFromDOM();

      let mode: 'hero' | 'construct' = 'hero';
      let planeOpacity = 0;

      if (hasGrid && cardRects.length > 0) {
        const top = cardRects[0].y;
        const bottom = cardRects[cardRects.length - 1].y + cardRects[cardRects.length - 1].h;

        if (top < height * 0.8 && bottom > 0) {
          mode = 'construct';
          const centerDist = Math.abs((top + (bottom - top) / 2) - height / 2);
          planeOpacity = Math.max(0, 1 - (centerDist / (height * 0.8)));
        }
      }

      // Draw Background Planes
      if (mode === 'construct' && planeOpacity > 0.05) {
        cardRects.forEach(rect => {
          ctx.fillStyle = `rgba(10, 10, 12, ${planeOpacity * 0.95})`;
          ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

          ctx.strokeStyle = `rgba(255, 255, 255, ${planeOpacity * 0.1})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
        });
      }

      // Update Particles
      particles.forEach(p => {
        p.update(cardRects, mode, time);
        p.draw(time);
      });

      // Draw Connections (Lines)
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i += 1) {
        // Only particles marked as connectors initiate lines
        if (!particles[i].connects) continue;

        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          if (mode === 'construct' && p1.cardIndex !== p2.cardIndex) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          // Balanced maxDist
          const maxDist = mode === 'hero' ? 130 : 75;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * 0.3; // Gentle alpha

            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Capture Functionality
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'S' || e.key === 's')) {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `arc-particle-background-${timestamp}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Canvas image captured successfully.');
      }
    };

    init();
    const animId = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleNetwork;