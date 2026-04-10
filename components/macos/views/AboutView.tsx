// Set NEXT_PUBLIC_CDN_BASE in .env.local to your image CDN root URL.
// e.g. NEXT_PUBLIC_CDN_BASE=https://res.cloudinary.com/your-cloud/image/upload
// Expected images:
//   ${CDN}/krishna-hero.jpg     — main photo (portrait / selfie style)
//   ${CDN}/krishna-work.jpg     — second photo (optional, candid / at desk)

const CDN = process.env.NEXT_PUBLIC_CDN_BASE ?? '';

const TAGLINE = 'i write code,\nmentor students,\n& point telescopes\nat the sky.';

const ROLES = [
  'Junior Software Engineer @ iCover India',
  'Co-founder, Veloit AI',
  'Guest Lecturer, Anna University',
];

const I_LOVE = [
  'building tools',
  'mentoring',
  'guest lectures',
  'observational astronomy',
  'theater',
  'clean code',
  'Next.js',
  'open source',
  'teaching kids',
  'space',
];

// ── Photo helpers ───────────────────────────────────────

function PhotoOrGradient({
  src,
  alt,
  style,
  fallbackStyle,
  fallbackText,
}: {
  src: string;
  alt: string;
  style: React.CSSProperties;
  fallbackStyle: React.CSSProperties;
  fallbackText: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ ...style, objectFit: 'cover' }}
        loading="lazy"
      />
    );
  }
  return (
    <div
      style={{
        ...fallbackStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.25)',
        fontSize: 12,
        fontStyle: 'italic',
        fontFamily: '-apple-system, sans-serif',
      }}
    >
      {fallbackText}
    </div>
  );
}

// ── About View ──────────────────────────────────────────

export default function AboutView() {
  const heroSrc = CDN ? `${CDN}/krishna-hero.jpg` : '';
  const workSrc = CDN ? `${CDN}/krishna-work.jpg` : '';

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        paddingBottom: 8,
      }}
    >
      {/* ── Hero banner ───────────────────────────────── */}
      {/* Bleed to edge of content area (negative margin matches padding) */}
      <div
        style={{
          position: 'relative',
          height: 210,
          margin: '-18px -22px 0',
          overflow: 'hidden',
          background: 'linear-gradient(140deg, #0f0c29 0%, #1a1a3e 45%, #0f3460 75%, #533483 100%)',
          borderRadius: '0 0 0 0',
        }}
      >
        {/* Hero photo */}
        <PhotoOrGradient
          src={heroSrc}
          alt="Krishna M"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          fallbackStyle={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(140deg, #0f0c29 0%, #1a1a3e 45%, #0f3460 75%, #533483 100%)',
          }}
          fallbackText="Add photo via NEXT_PUBLIC_CDN_BASE"
        />

        {/* Right-side gradient so text stays readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* "allow ME to introduce Myself" text — top right */}
        <div
          style={{
            position: 'absolute',
            right: 18,
            top: 16,
            textAlign: 'right',
            lineHeight: 1.05,
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: '#FFD60A',
              letterSpacing: '-0.03em',
            }}
          >
            allow
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 200,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            ME to
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: '#FFD60A',
              fontStyle: 'italic',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '-0.01em',
            }}
          >
            introduce
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: 'white',
              fontStyle: 'italic',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '-0.01em',
            }}
          >
            Myself
          </div>
          {/* Decorative sparkle */}
          <div
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.55)',
              marginTop: 6,
              lineHeight: 1,
            }}
          >
            ✦
          </div>
        </div>

        {/* Avatar badge — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.8)',
              background: 'linear-gradient(135deg, #1a3c5e, #2b6777)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 17,
              color: 'white',
              fontWeight: 700,
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {heroSrc ? (
              <img src={heroSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              'K'
            )}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              Krishna M
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              Software Engineer · Chennai
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column: photo strip + tagline ─────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: workSrc ? '100px 1fr' : '1fr',
          gap: 16,
          marginTop: 16,
          alignItems: 'start',
        }}
      >
        {/* Work photo (optional) */}
        {workSrc && (
          <div
            style={{
              width: 100,
              height: 130,
              borderRadius: 10,
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <img
              src={workSrc}
              alt="Krishna at work"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        )}

        {/* Tagline + roles */}
        <div>
          <div
            style={{
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 800,
              color: '#1D1D1F',
              lineHeight: 1.3,
              whiteSpace: 'pre-line',
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}
          >
            {TAGLINE}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ROLES.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 12px',
                  background: 'rgba(0,0,0,0.03)',
                  borderRadius: 8,
                  fontSize: 12.5,
                  color: '#333',
                  borderLeft: '3px solid #007AFF',
                  lineHeight: 1.4,
                }}
              >
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── i love ────────────────────────────────────── */}
      <div style={{ marginTop: 20 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#86868B',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 10,
          }}
        >
          i love
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {I_LOVE.map((t, i) => (
            <span
              key={i}
              style={{
                padding: '5px 12px',
                fontSize: 12,
                background: 'rgba(0,122,255,0.06)',
                color: '#007AFF',
                borderRadius: 20,
                fontWeight: 500,
                border: '1px solid rgba(0,122,255,0.1)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Contact strip ─────────────────────────────── */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <a
          href="mailto:krishna@mkrishna.dev"
          style={{
            padding: '6px 14px',
            fontSize: 12,
            background: '#007AFF',
            color: 'white',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ✉ Email
        </a>
        <a
          href="https://github.com/krish-1010"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '6px 14px',
            fontSize: 12,
            background: 'rgba(0,0,0,0.05)',
            color: '#333',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          GitHub ↗
        </a>
        <a
          href="https://linkedin.com/in/mkrishna10"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '6px 14px',
            fontSize: 12,
            background: 'rgba(10,102,194,0.08)',
            color: '#0A66C2',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          LinkedIn ↗
        </a>
      </div>
    </div>
  );
}
