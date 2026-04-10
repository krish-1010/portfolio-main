'use client';

import Link from 'next/link';
import CaptionBox from './CaptionBox';

export default function ComicCover() {
  return (
    <section
      style={{
        minHeight: '92vh',
        background: 'linear-gradient(160deg, #0F3D6E 0%, #1B5E9B 40%, #0F3D6E 100%)',
        border: '5px solid #1A1A1A',
        borderRadius: 4,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        position: 'relative',
      }}
      className="comic-cover-grid"
    >
      {/* Left — art panel */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0A2A50 0%, #0F3D6E 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          borderRight: '4px solid #1A1A1A',
          position: 'relative',
          gap: 20,
        }}
      >
        {/* Sudarshana Chakra — spinning disc SVG */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.06,
          }}
        >
          <svg width="360" height="360" viewBox="0 0 360 360">
            <circle cx="180" cy="180" r="170" stroke="#FFD700" strokeWidth="4" fill="none" />
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={180 + 30 * Math.cos(rad)}
                  y1={180 + 30 * Math.sin(rad)}
                  x2={180 + 165 * Math.cos(rad)}
                  y2={180 + 165 * Math.sin(rad)}
                  stroke="#FFD700"
                  strokeWidth="3"
                />
              );
            })}
            <circle cx="180" cy="180" r="30" stroke="#FFD700" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Avatar / art */}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: '5px solid #FFD700',
            background: 'linear-gradient(135deg, #1B5E9B, #0A2A50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80,
            boxShadow: '0 0 0 3px #1A1A1A, 0 12px 40px rgba(0,0,0,0.5)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          🧑‍💻
        </div>

        {/* Role chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1, width: '100%', maxWidth: 240 }}>
          {['Software Engineer', 'Guest Lecturer', 'Stargazer'].map((r, i) => (
            <div
              key={i}
              style={{
                background: i === 0 ? '#FFD700' : 'rgba(255,215,0,0.15)',
                border: '2px solid #FFD700',
                borderRadius: 4,
                padding: '5px 12px',
                fontFamily: 'var(--font-bangers)',
                fontSize: 14,
                letterSpacing: '0.08em',
                color: i === 0 ? '#1A1A1A' : '#FFD700',
                textAlign: 'center',
              }}
            >
              {r}
            </div>
          ))}
        </div>

        {/* Peacock feathers decorative */}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            fontSize: 28,
            letterSpacing: 12,
            opacity: 0.5,
            zIndex: 1,
          }}
        >
          🦚🪷🦚
        </div>
      </div>

      {/* Right — title panel */}
      <div
        style={{
          background: '#FFF8E7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(20px, 5vw, 48px)',
          gap: 20,
        }}
      >
        {/* Publisher strip */}
        <div
          style={{
            background: '#E8511A',
            color: 'white',
            fontFamily: 'var(--font-bangers)',
            fontSize: 13,
            letterSpacing: '0.15em',
            padding: '4px 12px',
            alignSelf: 'flex-start',
            border: '2px solid #1A1A1A',
            borderRadius: 3,
          }}
        >
          KRISHNA COMICS GROUP · ISSUE #1
        </div>

        {/* Main title */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              color: '#1A1A1A',
              textShadow: '4px 4px 0 #E8511A',
            }}
          >
            THE KRISHNA
            <br />
            <span style={{ color: '#E8511A', textShadow: '4px 4px 0 #1A1A1A' }}>
              CHRONICLES
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-comic-neue)',
              fontSize: 14,
              color: '#5A3500',
              marginTop: 8,
              fontStyle: 'italic',
              fontWeight: 700,
            }}
          >
            &ldquo;A Portfolio in Panels&rdquo;
          </div>
        </div>

        {/* Gita verse */}
        <CaptionBox
          sanskrit="Karmanye vadhikaraste, Ma phaleshu kadachana"
          translation="You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
          attribution="Bhagavad Gita · Ch. 2, Verse 47"
        />

        {/* Tagline */}
        <div
          style={{
            background: '#0F3D6E',
            border: '3px solid #1A1A1A',
            borderRadius: 4,
            padding: '12px 16px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-comic-neue)',
              fontSize: 13,
              color: 'white',
              lineHeight: 1.65,
            }}
          >
            Full Stack Engineer. Building real-world products, mentoring students, giving
            guest lectures, and occasionally pointing telescopes at the sky.
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 13,
              color: '#FFD700',
              letterSpacing: '0.1em',
              marginTop: 8,
            }}
          >
            📍 Chennai, India
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href="#about"
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 16,
              letterSpacing: '0.1em',
              background: '#E8511A',
              color: 'white',
              border: '3px solid #1A1A1A',
              borderRadius: 4,
              padding: '8px 20px',
              textDecoration: 'none',
              boxShadow: '3px 3px 0 #1A1A1A',
              transition: 'transform 0.1s, box-shadow 0.1s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #1A1A1A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'none';
              (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #1A1A1A';
            }}
          >
            READ THE STORY →
          </a>
          <Link
            href="/desktop"
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 16,
              letterSpacing: '0.1em',
              background: '#FFD700',
              color: '#1A1A1A',
              border: '3px solid #1A1A1A',
              borderRadius: 4,
              padding: '8px 20px',
              textDecoration: 'none',
              boxShadow: '3px 3px 0 #1A1A1A',
              transition: 'transform 0.1s, box-shadow 0.1s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #1A1A1A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'none';
              (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #1A1A1A';
            }}
          >
            🖥 DESKTOP
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .comic-cover-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
