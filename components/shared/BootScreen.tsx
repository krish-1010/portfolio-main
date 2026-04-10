'use client';

import { useEffect, useState } from 'react';

interface Props {
  storageKey?: string;
  variant?: 'space' | 'macos' | 'comic';
}

const LINES: Record<string, string[]> = {
  space: [
    '> Krishna.OS v2.0 — initialising...',
    '> Loading personality modules... [OK]',
    '> Mounting /dev/curiosity... [OK]',
    '> Starting telescope daemon... [OK]',
    '> Brewing filter coffee... [OK]',
    '> Syncing with the cosmos... [OK]',
    '> Welcome.',
  ],
  macos: [
    'Darwin Kernel Version 2.0.0 — Krishna Portfolio',
    'Loading window manager... [OK]',
    'Initializing Finder... [OK]',
    'Mounting desktop volumes... [OK]',
    'Starting dock... [OK]',
    'Portfolio ready.',
  ],
  comic: [
    'KRISHNA COMICS GROUP',
    'Loading Issue #1...',
    'Sketching panels... [OK]',
    'Inking borders... [OK]',
    'Adding colour... [OK]',
    '🪷 Karmanye vadhikaraste...',
    'BEGIN READING.',
  ],
};

const BG: Record<string, string> = {
  space: '#000',
  macos: '#1e1e1e',
  comic: '#1A1A1A',
};

const ACCENT: Record<string, string> = {
  space: '#30D158',
  macos: '#007AFF',
  comic: '#FFD700',
};

const LOGO: Record<string, React.ReactNode> = {
  space: (
    <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.04em', marginBottom: 28, textAlign: 'center', color: 'white' }}>
      <span style={{ color: '#4F9CF7' }}>K</span>M
      <span style={{ display: 'block', fontSize: 11, fontWeight: 400, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', marginTop: 4, fontFamily: 'var(--font-jetbrains)' }}>
        PORTFOLIO OS v2.0
      </span>
    </div>
  ),
  macos: (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 28 }}>
      <div style={{ width: 64, height: 64, borderRadius: 14, background: 'linear-gradient(135deg, #64ADEF, #AF52DE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🖥</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', letterSpacing: '-0.01em' }}>Krishna&apos;s Portfolio</div>
    </div>
  ),
  comic: (
    <div style={{ marginBottom: 24, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-bangers)', fontSize: 32, letterSpacing: '0.06em', color: '#FFD700', textShadow: '3px 3px 0 #E8511A' }}>THE KRISHNA CHRONICLES</div>
      <div style={{ fontFamily: 'var(--font-comic-neue)', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontStyle: 'italic' }}>Issue #1 — Loading…</div>
    </div>
  ),
};

export default function BootScreen({ storageKey = 'km_booted_space', variant = 'space' }: Props) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  const bootLines = LINES[variant] ?? LINES['space'];
  const accent = ACCENT[variant] ?? ACCENT['space'];
  const bg = BG[variant] ?? BG['space'];

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, '1');
    setShow(true);

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        if (line !== undefined) setLines(prev => [...prev, line]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setFading(true), 500);
        setTimeout(() => setShow(false), 1100);
      }
    }, variant === 'comic' ? 320 : 260);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || !show) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: bg,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Subtle star shimmer for space/dark variants */}
      {variant !== 'macos' && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.25) 0%, transparent 100%), radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.2) 0%, transparent 100%), radial-gradient(1px 1px at 80% 65%, rgba(255,255,255,0.18) 0%, transparent 100%), radial-gradient(1px 1px at 35% 80%, rgba(255,255,255,0.15) 0%, transparent 100%)',
        }} />
      )}

      <div style={{ position: 'relative', maxWidth: 460, width: '90%' }}>
        {LOGO[variant]}

        <div style={{
          fontFamily: variant === 'comic' ? 'var(--font-comic-neue)' : variant === 'macos' ? '-apple-system, BlinkMacSystemFont, "SF Mono", monospace' : 'var(--font-jetbrains)',
          fontSize: variant === 'comic' ? 14 : 13,
          lineHeight: variant === 'comic' ? 1.9 : 2,
          minHeight: `${bootLines.length * 2}em`,
        }}>
          {lines.map((line, idx) => (
            <div key={idx} style={{
              opacity: 0,
              animation: 'bootLine 0.22s ease forwards',
              color: line?.includes('[OK]') || line?.includes('ready') || line?.includes('Welcome') || line?.includes('BEGIN') || line?.includes('🪷')
                ? accent
                : 'rgba(255,255,255,0.65)',
              fontWeight: (line?.includes('[OK]') || line?.includes('BEGIN')) ? 700 : 400,
              paddingLeft: variant === 'comic' ? 0 : 0,
              letterSpacing: variant === 'comic' ? '0.02em' : 0,
            }}>
              {line}
            </div>
          ))}
          {lines.length < bootLines.length && (
            <span style={{
              display: 'inline-block', width: 8, height: variant === 'comic' ? 16 : 14,
              background: accent, verticalAlign: 'middle',
              animation: 'blink 0.7s step-end infinite',
            }} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes bootLine { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
