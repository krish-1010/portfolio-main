'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Contact', href: '#contact' },
];

export default function RetroNav() {
  const { toggleTheme } = useTheme();
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav
      style={{
        background: '#C0C0C0',
        borderBottom: '2px solid',
        borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        fontFamily: 'var(--font-ibm-plex-mono), monospace',
      }}
    >
      {/* Logo/Brand */}
      <span
        style={{
          fontFamily: 'var(--font-vt323), monospace',
          fontSize: 22,
          fontWeight: 400,
          marginRight: 12,
          color: '#000080',
          letterSpacing: '0.05em',
        }}
      >
        KM.EXE
      </span>

      {/* Nav links as buttons */}
      {NAV_LINKS.map(l => (
        <a
          key={l.href}
          href={l.href}
          className="retro-btn"
          style={{ fontSize: 12, textDecoration: 'none' }}
        >
          {l.label}
        </a>
      ))}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Desktop link */}
      <Link
        href="/desktop"
        className="retro-btn"
        style={{ fontSize: 12, textDecoration: 'none' }}
      >
        🖥 Desktop
      </Link>

      {/* Theme toggle — back to Space */}
      <button
        onClick={toggleTheme}
        className="retro-btn"
        title="Switch to Space theme"
        style={{ fontSize: 12 }}
      >
        🌌 Space Mode
      </button>
    </nav>
  );
}
