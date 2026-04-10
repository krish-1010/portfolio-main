import testimonialsData from '@/data/testimonials.json';

const CARD_ACCENTS = ['#E8511A', '#0F3D6E', '#7B2D8B', '#228B22', '#B8860B', '#1A5276'];

export default function ComicTestimonials() {
  const testimonials = testimonialsData as { name: string; role: string; company: string; quote: string }[];

  return (
    <section id="testimonials" style={{ scrollMarginTop: 60 }}>
      <div style={{ background: '#1A5276', padding: '8px 20px', border: '3px solid #1A1A1A', borderBottom: 'none' }}>
        <span style={{ fontFamily: 'var(--font-bangers)', fontSize: 28, letterSpacing: '0.1em', color: '#FFD700', textShadow: '2px 2px 0 #1A1A1A' }}>
          Chapter VI: Reflections
        </span>
        <span style={{ fontFamily: 'var(--font-comic-neue)', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginLeft: 12, fontStyle: 'italic' }}>
          (What People Say)
        </span>
      </div>

      <div style={{
        border: '3px solid #1A1A1A',
        background: '#FFF8E7',
        padding: 20,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}>
        {testimonials.map((t, i) => {
          const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
          return (
            <div
              key={i}
              style={{
                background: 'white',
                border: '3px solid #1A1A1A',
                borderTop: `6px solid ${accent}`,
                borderRadius: 4,
                padding: '16px 16px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: `4px 4px 0 #1A1A1A`,
              }}
            >
              {/* Big quote mark */}
              <div style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 52,
                color: accent,
                lineHeight: 0.8,
                opacity: 0.8,
                userSelect: 'none',
              }}>
                &ldquo;
              </div>

              {/* Quote text */}
              <p style={{
                fontFamily: 'var(--font-comic-neue)',
                fontSize: 13,
                color: '#1A1A1A',
                lineHeight: 1.65,
                margin: 0,
                fontStyle: 'italic',
                flex: 1,
              }}>
                {t.quote}
              </p>

              {/* Divider */}
              <div style={{ height: 2, background: '#1A1A1A', opacity: 0.12 }} />

              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34,
                  borderRadius: '50%',
                  border: `3px solid ${accent}`,
                  background: `hsl(${i * 67}, 55%, 55%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-bangers)',
                  fontSize: 15, color: 'white',
                  flexShrink: 0,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-bangers)', fontSize: 13, letterSpacing: '0.05em', color: '#1A1A1A' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-comic-neue)', fontSize: 11, color: '#5A3500' }}>
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
