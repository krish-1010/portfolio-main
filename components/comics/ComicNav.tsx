'use client';

import Link from 'next/link';


const NAV_LINKS = [
  { label: 'The Atman',   href: '#about' },
  { label: 'Karma Log',  href: '#experience' },
  { label: 'Dharma',     href: '#projects' },
  { label: 'Arsenal',    href: '#skills' },
  { label: 'Seva Files', href: '#speaking' },
  { label: 'Signal',     href: '#contact' },
];

export default function ComicNav() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#1A1A1A',
        borderBottom: '4px solid #E8511A',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(12px, 4vw, 40px)',
        height: 52,
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Link
        href="/comics"
        className="comic-nav-logo"
        style={{
          fontFamily: 'var(--font-bangers)',
          fontSize: 22,
          letterSpacing: '0.06em',
          color: '#FFD700',
          textDecoration: 'none',
          textShadow: '2px 2px 0 #E8511A',
          flexShrink: 0,
          marginRight: 8,
        }}
      >
        THE KRISHNA CHRONICLES
      </Link>

      {/* Issue tag */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          background: '#E8511A',
          color: 'white',
          padding: '2px 7px',
          borderRadius: 3,
          fontFamily: 'var(--font-comic-neue)',
          flexShrink: 0,
          marginRight: 'auto',
          letterSpacing: '0.06em',
        }}
      >
        ISSUE #1
      </span>

      {/* Nav links — desktop */}
      <div
        style={{ display: 'flex', gap: 2, alignItems: 'center' }}
        className="comic-nav-links"
      >
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 14,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: 3,
              transition: 'color 0.12s, background 0.12s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#FFD700';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,215,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Back to main site */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-comic-neue)',
          fontSize: 11,
          fontWeight: 700,
          color: '#1A1A1A',
          background: '#FFD700',
          padding: '4px 10px',
          borderRadius: 4,
          textDecoration: 'none',
          marginLeft: 12,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          border: '2px solid #1A1A1A',
          transition: 'background 0.12s',
        }}
        onMouseEnter={e =>
          ((e.currentTarget as HTMLElement).style.background = '#E8511A')
        }
        onMouseLeave={e =>
          ((e.currentTarget as HTMLElement).style.background = '#FFD700')
        }
      >
        ← Main Site
      </Link>

      <style>{`
        @media (max-width: 700px) {
          .comic-nav-links { display: none !important; }
        }
        @media (max-width: 480px) {
          .comic-nav-logo { font-size: 15px !important; }
        }
      `}</style>
    </nav>
  );
}
