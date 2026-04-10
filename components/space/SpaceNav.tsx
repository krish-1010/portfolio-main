'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Contact', href: '#contact' },
];

export default function SpaceNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(16px, 5vw, 48px)',
        background: scrolled ? 'rgba(11,17,32,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: 'white',
          textDecoration: 'none',
          fontFamily: 'var(--font-space-grotesk)',
          letterSpacing: '-0.02em',
          flex: '0 0 auto',
        }}
      >
        <span style={{ color: '#4F9CF7' }}>K</span>M
      </a>

      {/* Desktop nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginLeft: 'auto',
          marginRight: 16,
        }}
        className="hidden-mobile"
      >
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            style={{
              padding: '6px 14px',
              fontSize: 14,
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              borderRadius: 6,
              transition: 'color 0.15s, background 0.15s',
              fontFamily: 'var(--font-inter)',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.color = 'white';
              (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
              (e.target as HTMLElement).style.background = 'transparent';
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        {/* Desktop link */}
        <Link
          href="/desktop"
          style={{
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontFamily: 'var(--font-inter)',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.color = 'white';
            (e.target as HTMLElement).style.borderColor = 'rgba(79,156,247,0.4)';
            (e.target as HTMLElement).style.background = 'rgba(79,156,247,0.08)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
            (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
            (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
          }}
        >
          <span style={{ fontSize: 12 }}>🖥</span> Desktop
        </Link>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none',
            width: 34,
            height: 34,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.05)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="show-mobile"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            background: 'rgba(11,17,32,0.97)',
            backdropFilter: 'blur(20px)',
            padding: '16px 24px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            zIndex: 99,
          }}
        >
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                fontSize: 16,
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontFamily: 'var(--font-space-grotesk)',
                fontWeight: 500,
              }}
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/desktop"
            style={{
              display: 'block',
              padding: '12px 0',
              fontSize: 16,
              color: '#4F9CF7',
              textDecoration: 'none',
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: 500,
            }}
          >
            Desktop version ↗
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 639px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
