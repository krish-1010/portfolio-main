'use client';

import { useEffect } from 'react';

// Spaceman follows cursor with lerp — always slightly behind, faces direction of travel
const LERP = 0.11;   // smoothing factor (lower = more lag)
const TRAIL = 10;    // comet trail dots

export default function RocketCursor() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    document.body.style.cursor = 'none';

    // ── Spaceman element ──
    const spaceman = document.createElement('div');
    spaceman.textContent = '🧑‍🚀';
    spaceman.style.cssText =
      'position:fixed;pointer-events:none;z-index:9999;font-size:22px;' +
      'user-select:none;transform-origin:center center;will-change:left,top,transform;' +
      'filter:drop-shadow(0 0 4px rgba(79,156,247,0.5));';
    document.body.appendChild(spaceman);

    // ── Trail dots ──
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL; i++) {
      const d = document.createElement('div');
      const size = Math.max(2, 5 - i * 0.3);
      const alpha = (1 - i / TRAIL) * 0.5;
      d.style.cssText =
        `position:fixed;pointer-events:none;z-index:9998;` +
        `width:${size}px;height:${size}px;border-radius:50%;` +
        `background:radial-gradient(circle,#4F9CF7,#9B70F9);` +
        `opacity:${alpha.toFixed(2)};transform:translate(-50%,-50%);will-change:left,top;`;
      document.body.appendChild(d);
      dots.push(d);
    }

    // ── State ──
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let sx = targetX;
    let sy = targetY;
    let prevSx = sx;
    let prevSy = sy;
    const trailPos: { x: number; y: number }[] = Array.from({ length: TRAIL }, () => ({ x: sx, y: sy }));
    let raf = 0;
    let bobT = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // Lerp spaceman toward cursor
      sx += (targetX - sx) * LERP;
      sy += (targetY - sy) * LERP;

      // Direction of movement
      const dx = sx - prevSx;
      const dy = sy - prevSy;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Rotate to face direction of travel (only if moving)
      let angle = 0;
      if (speed > 0.5) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      // Slight bob when moving
      bobT += speed > 0.3 ? 0.18 : 0.04;
      const bob = speed > 0.3 ? Math.sin(bobT) * 2.5 : 0;

      // Flip horizontally when moving leftward
      const scaleX = dx < -0.3 ? -1 : 1;

      spaceman.style.left = `${sx}px`;
      spaceman.style.top = `${sy + bob}px`;
      spaceman.style.transform = `translate(-50%, -50%) rotate(${angle * 0.25}deg) scaleX(${scaleX})`;

      prevSx = sx;
      prevSy = sy;

      // Trail follows spaceman position
      trailPos.unshift({ x: sx, y: sy });
      trailPos.length = TRAIL;
      dots.forEach((dot, i) => {
        dot.style.left = `${trailPos[i].x}px`;
        dot.style.top = `${trailPos[i].y}px`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      spaceman.remove();
      dots.forEach(d => d.remove());
    };
  }, []);

  return null;
}
