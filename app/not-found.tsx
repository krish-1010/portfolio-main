import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B1120',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-space-grotesk), sans-serif',
        color: 'white',
        gap: 16,
      }}
    >
      <div style={{ fontSize: 80, opacity: 0.2 }}>404</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>
        Page not found
      </h1>
      <Link
        href="/"
        style={{
          padding: '10px 22px',
          background: '#4F9CF7',
          color: 'white',
          borderRadius: 8,
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        ← Back home
      </Link>
    </div>
  );
}
