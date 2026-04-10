'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Vortex ring configs ──────────────────────────────────
// Each ring: size (px), aspect ratio (height/width), stroke colour, glow colour,
// animation duration (s), spin direction, initial tilt (deg)

const RINGS = [
  { w: 640, ar: 0.58, stroke: 'rgba(185,163,227,0.55)', glow: 'rgba(185,163,227,0.2)', dur: 18, cw: true,  tilt: -22 },
  { w: 560, ar: 0.60, stroke: 'rgba(143,193,243,0.50)', glow: 'rgba(143,193,243,0.18)', dur: 14, cw: false, tilt: 12  },
  { w: 480, ar: 0.56, stroke: 'rgba(210,160,235,0.55)', glow: 'rgba(210,160,235,0.2)', dur: 20, cw: true,  tilt: 5   },
  { w: 400, ar: 0.62, stroke: 'rgba(160,220,250,0.50)', glow: 'rgba(160,220,250,0.18)', dur: 12, cw: false, tilt: -38 },
  { w: 320, ar: 0.58, stroke: 'rgba(225,200,255,0.60)', glow: 'rgba(225,200,255,0.22)', dur: 16, cw: true,  tilt: 8   },
  { w: 240, ar: 0.60, stroke: 'rgba(240,220,255,0.65)', glow: 'rgba(240,220,255,0.25)', dur: 10, cw: false, tilt: -18 },
  { w: 160, ar: 0.58, stroke: 'rgba(255,240,255,0.75)', glow: 'rgba(255,240,255,0.3)',  dur: 8,  cw: true,  tilt: 25  },
];

// Generate per-ring CSS keyframes
const RING_KEYFRAMES = RINGS.map((r, i) => {
  const end = r.tilt + (r.cw ? 360 : -360);
  return `@keyframes tardisRing${i} {
    from { transform: rotate(${r.tilt}deg); }
    to   { transform: rotate(${end}deg); }
  }`;
}).join('\n');

// ─── Version cards ────────────────────────────────────────

const VERSIONS = [
  {
    label: 'Space HQ',
    href: '/',
    emoji: '🌌',
    desc: 'Dark space — the main site',
    bg: 'linear-gradient(135deg, #0b1120 0%, #1a1a3e 100%)',
    accent: '#4F9CF7',
    light: false,
  },
  {
    label: 'macOS Desktop',
    href: '/desktop',
    emoji: '🖥',
    desc: 'Finder-style interactive desktop',
    bg: 'linear-gradient(135deg, #1c1c2e 0%, #24243e 100%)',
    accent: '#64ADEF',
    light: false,
  },
  {
    label: 'The Krishna Chronicles',
    href: '/comics',
    emoji: '📖',
    desc: 'ACK comic book edition',
    bg: 'linear-gradient(135deg, #FFF8E7 0%, #FFE8B3 100%)',
    accent: '#E8511A',
    light: true,
  },
];

// ─── Component ────────────────────────────────────────────

export default function TardisButton() {
  const [open, setOpen] = useState(false);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <style>{`
        ${RING_KEYFRAMES}

        @keyframes tardisVortexFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes tardisCardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.95); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes tardisBeaconPulse {
          0%, 100% { box-shadow: 0 0 6px 2px rgba(255,229,102,0.35); }
          50%       { box-shadow: 0 0 14px 5px rgba(255,229,102,0.6); }
        }
        .tardis-btn:hover { opacity: 1 !important; transform: scale(1.06); }
        .tardis-version-card:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5) !important;
        }
      `}</style>

      {/* ── Trigger button — bottom-right, subtle ── */}
      <button
        className="tardis-btn"
        onClick={() => setOpen(true)}
        title="Travel the portfolio"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 24,
          zIndex: 88,
          width: 44,
          height: 54,
          background: 'linear-gradient(180deg, #0062C8 0%, #003FAA 100%)',
          border: '2px solid #4A90D9',
          borderRadius: 4,
          cursor: 'pointer',
          padding: 0,
          opacity: 0.55,
          transition: 'opacity 0.2s, transform 0.2s',
          overflow: 'visible',
        }}
      >
        {/* Beacon */}
        <div style={{
          position: 'absolute',
          top: -5,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#FFE566',
          animation: 'tardisBeaconPulse 2.5s ease-in-out infinite',
        }} />
        {/* Header text */}
        <div style={{ fontSize: 3.5, fontWeight: 900, color: 'rgba(255,255,255,0.8)', textAlign: 'center', letterSpacing: '0.02em', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '2px 1px', lineHeight: 1.2, fontFamily: 'var(--font-inter)' }}>
          POLICE<br />PUBLIC CALL BOX
        </div>
        {/* Windows */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: '3px 3px 2px' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ height: 8, background: 'rgba(180,220,255,0.15)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 1 }} />
          ))}
        </div>
        {/* Door */}
        <div style={{ margin: '0 4px 2px', height: 11, background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 1, height: '65%', background: 'rgba(255,255,255,0.28)' }} />
        </div>
      </button>

      {/* ── Vortex overlay ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(4,4,16,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'tardisVortexFadeIn 0.35s ease-out',
          }}
        >
          {/* ── Spinning rings ── */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
          >
            {RINGS.map((r, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: r.w,
                  height: r.w * r.ar,
                  borderRadius: '50%',
                  border: `1.5px solid ${r.stroke}`,
                  boxShadow: `0 0 18px ${r.glow}, inset 0 0 18px ${r.glow}`,
                  animation: `tardisRing${i} ${r.dur}s linear infinite`,
                }}
              />
            ))}
            {/* Central glow */}
            <div style={{
              position: 'absolute',
              width: 120, height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(220,200,255,0.25) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }} />
          </div>

          {/* ── Content (stop propagation so clicking here doesn't close) ── */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 32,
              padding: '0 20px',
              maxWidth: 640,
              width: '100%',
            }}
          >
            {/* Header text */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(22px, 4vw, 32px)',
                fontWeight: 800,
                color: 'white',
                fontFamily: 'var(--font-space-grotesk)',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                textShadow: '0 0 40px rgba(180,160,220,0.6)',
              }}>
                Looking for a different site?
                <br />
                <span style={{ color: 'rgba(200,180,255,0.9)', fontStyle: 'italic' }}>
                  Go back in time…
                </span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-inter)' }}>
                Choose your version
              </div>
            </div>

            {/* Version cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 14,
              width: '100%',
            }}
            className="tardis-cards-grid"
            >
              {VERSIONS.map((v, i) => (
                <Link
                  key={v.href}
                  href={v.href}
                  onClick={() => setOpen(false)}
                  className="tardis-version-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                    padding: '20px 14px',
                    background: v.bg,
                    border: `2px solid ${v.accent}60`,
                    borderRadius: 14,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: `0 4px 20px rgba(0,0,0,0.35), 0 0 0 1px ${v.accent}30`,
                    animation: `tardisCardIn 0.4s ease-out ${i * 0.07}s both`,
                  }}
                >
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: 12,
                    background: `${v.accent}22`,
                    border: `1.5px solid ${v.accent}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                  }}>
                    {v.emoji}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: v.light ? '#1A1A1A' : 'white',
                      fontFamily: 'var(--font-space-grotesk)',
                      marginBottom: 3,
                    }}>
                      {v.label}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: v.light ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.45)',
                      fontFamily: 'var(--font-inter)',
                      lineHeight: 1.4,
                    }}>
                      {v.desc}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: v.accent,
                    fontFamily: 'var(--font-jetbrains)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    Visit →
                  </div>
                </Link>
              ))}
            </div>

            {/* Close hint */}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-inter)' }}>
              Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>ESC</kbd> or click outside to close
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 36, height: 36,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
              zIndex: 2,
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 540px) {
          .tardis-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
