import type { Profile } from '@/types';

interface Props {
  profile: Profile;
}

export default function RetroHero({ profile }: Props) {
  return (
    <section
      id="hero"
      style={{
        padding: 'clamp(24px, 4vw, 48px) clamp(16px, 5vw, 48px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        alignItems: 'start',
      }}
    >
      {/* Main card */}
      <div
        className="retro-bevel-out"
        style={{ background: '#C0C0C0', padding: 0, overflow: 'hidden' }}
      >
        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(to right, #000080, #1084d0)',
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ fontSize: 13 }}>👤</span>
          <span
            style={{
              color: 'white',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
            }}
          >
            PROFILE.EXE — Krishna M
          </span>
        </div>

        <div style={{ padding: '16px 18px' }}>
          {/* Name + title */}
          <h1
            style={{
              fontFamily: 'var(--font-vt323), monospace',
              fontSize: 'clamp(44px, 8vw, 72px)',
              lineHeight: 1.0,
              color: '#000080',
              margin: '0 0 8px',
              letterSpacing: '0.02em',
            }}
          >
            {profile.name}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: 15,
              color: '#000',
              marginBottom: 16,
            }}
          >
            &gt; {profile.title} · {profile.location}
          </div>

          {/* Tagline in inset box */}
          <div
            className="retro-bevel-in"
            style={{
              background: 'white',
              padding: '10px 12px',
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: 14,
              lineHeight: 1.7,
              color: '#000',
              whiteSpace: 'pre-line',
              marginBottom: 16,
            }}
          >
            {profile.tagline}
          </div>

          {/* Roles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
            {profile.roles.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: 13,
                }}
              >
                <span style={{ color: '#000080', fontWeight: 700 }}>▶</span>
                {r}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="#projects" className="retro-btn">📂 Projects</a>
            <a href={`mailto:${profile.email}`} className="retro-btn">📧 Email</a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn"
            >
              🔗 GitHub
            </a>
            <a href={profile.resumeUrl} className="retro-btn" download>
              💾 Resume
            </a>
          </div>
        </div>
      </div>

      {/* Right panel — i love + spinning globe */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Under Construction / Fun panel */}
        <div
          className="retro-bevel-out"
          style={{ background: '#C0C0C0', padding: 0 }}
        >
          <div
            style={{
              background: 'linear-gradient(to right, #800000, #c04040)',
              padding: '3px 6px',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
              }}
            >
              ⚠ NOTICE.TXT
            </span>
          </div>
          <div style={{ padding: '12px 14px' }}>
            <div
              style={{
                fontFamily: 'var(--font-vt323), monospace',
                fontSize: 22,
                color: '#FF00FF',
                marginBottom: 8,
                animation: 'retroBlink 1s step-end infinite',
              }}
            >
              ★ WELCOME TO MY PORTFOLIO ★
            </div>
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: 12,
                lineHeight: 1.7,
                color: '#000',
              }}
            >
              Best viewed in 1024×768 resolution.<br />
              Enable JavaScript for full experience.<br />
              Netscape Navigator 4.0+ recommended.
            </div>
            {/* Spinning globe emoji */}
            <div
              style={{
                fontSize: 36,
                textAlign: 'center',
                marginTop: 12,
                animation: 'retroSpin 2s linear infinite',
                display: 'inline-block',
              }}
            >
              🌐
            </div>
          </div>
        </div>

        {/* i love */}
        <div
          className="retro-bevel-out"
          style={{ background: '#C0C0C0', padding: 0 }}
        >
          <div
            style={{
              background: 'linear-gradient(to right, #000080, #1084d0)',
              padding: '3px 6px',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
              }}
            >
              💖 INTERESTS.DAT
            </span>
          </div>
          <div style={{ padding: '10px 12px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {profile.iLove.map((t, i) => (
              <span
                key={i}
                className="retro-tag"
                style={{ fontSize: 12 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes retroBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes retroSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
