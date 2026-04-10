import Link from 'next/link';

export default function ComicFooter() {
  return (
    <footer
      style={{
        background: '#1A1A1A',
        border: '3px solid #1A1A1A',
        padding: '20px clamp(16px, 4vw, 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      {/* Left */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 18,
            letterSpacing: '0.08em',
            color: '#FFD700',
            textShadow: '2px 2px 0 #E8511A',
          }}
        >
          THE KRISHNA CHRONICLES
        </div>
        <div
          style={{
            fontFamily: 'var(--font-comic-neue)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 2,
          }}
        >
          © {new Date().getFullYear()} Krishna M · All Rights Reserved
        </div>
      </div>

      {/* Center — Gita line */}
      <div
        style={{
          fontFamily: 'var(--font-comic-neue)',
          fontSize: 11,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.45)',
          textAlign: 'center',
          maxWidth: 300,
        }}
      >
        🪷 &ldquo;Do your duty without attachment to results.&rdquo;
      </div>

      {/* Right — links */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 13,
            letterSpacing: '0.08em',
            color: '#1A1A1A',
            background: '#FFD700',
            padding: '5px 12px',
            border: '2px solid #FFD700',
            borderRadius: 3,
            textDecoration: 'none',
          }}
        >
          🌌 SPACE
        </Link>
        <Link
          href="/desktop"
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 13,
            letterSpacing: '0.08em',
            color: 'white',
            background: '#0F3D6E',
            padding: '5px 12px',
            border: '2px solid #4F9CF7',
            borderRadius: 3,
            textDecoration: 'none',
          }}
        >
          🖥 DESKTOP
        </Link>
      </div>
    </footer>
  );
}
