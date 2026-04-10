// Infinite auto-scrolling carousel — two rows, CSS-only animation
// Row 1 scrolls left, Row 2 scrolls right. Pauses on hover.
import type { Testimonial } from '@/types';

interface Props {
  testimonials: Testimonial[];
}

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 38vw, 380px)',
        padding: '20px 22px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        margin: '0 8px',
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: '#4F9CF7',
          opacity: 0.45,
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
        }}
      >
        "
      </div>
      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7,
          fontStyle: 'italic',
          fontFamily: 'var(--font-inter)',
          margin: 0,
          flex: 1,
          // Clamp to ~4 lines
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {t.quote}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingTop: 10,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: `hsl(${i * 67}, 50%, 55%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: 'white',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {t.name[0]}
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'white',
              fontFamily: 'var(--font-space-grotesk)',
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-inter)',
            }}
          >
            {t.role}, {t.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpaceTestimonialsCarousel({ testimonials }: Props) {
  // Double the array for seamless looping
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...[...testimonials].reverse(), ...[...testimonials].reverse()];

  return (
    <div
      style={{ overflow: 'hidden', position: 'relative' }}
      // Fade edges
    >
      {/* Left/right fade masks */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(to right, #0B1120, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(to left, #0B1120, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Row 1 — scrolls left */}
      <div
        className="carousel-track"
        style={{
          display: 'flex',
          marginBottom: 16,
          animation: 'scrollLeft 40s linear infinite',
        }}
      >
        {row1.map((t, i) => (
          <TestimonialCard key={i} t={t} i={i % testimonials.length} />
        ))}
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="carousel-track"
        style={{
          display: 'flex',
          animation: 'scrollRight 40s linear infinite',
        }}
      >
        {row2.map((t, i) => (
          <TestimonialCard key={i} t={t} i={i % testimonials.length} />
        ))}
      </div>

      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
