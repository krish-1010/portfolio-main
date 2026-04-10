'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

export default function KonamiEasterEgg() {
  const { theme, toggleTheme } = useTheme();
  const [idx, setIdx] = useState(0);
  const [flash, setFlash] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      // If already in retro, any key exits
      if (theme === 'retro') return;

      if (e.key === KONAMI[idx]) {
        const next = idx + 1;
        if (next === KONAMI.length) {
          setIdx(0);
          setFlash(true);
          setTimeout(() => {
            setFlash(false);
            toggleTheme(); // space → retro
          }, 900);
        } else {
          setIdx(next);
        }
      } else {
        setIdx(e.key === KONAMI[0] ? 1 : 0);
      }
    },
    [idx, theme, toggleTheme]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!flash) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,128,0.92)',
        animation: 'konamiFlash 0.9s ease-out forwards',
        fontFamily: 'var(--font-ibm-plex-mono), monospace',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-vt323), monospace',
          fontSize: 'clamp(32px, 8vw, 72px)',
          color: '#FFFF00',
          letterSpacing: '0.08em',
          animation: 'konamiBlink 0.15s step-end 6',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        ★ CHEAT CODE ACTIVATED ★
      </div>
      <div style={{ color: '#C0C0C0', fontSize: 18, marginTop: 12 }}>
        Loading secret level...
      </div>

      <style>{`
        @keyframes konamiFlash {
          0%   { opacity: 0; }
          15%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes konamiBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
