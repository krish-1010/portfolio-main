import testimonialsData from '@/data/testimonials.json';
import type { Testimonial } from '@/types';

const testimonials = testimonialsData as Testimonial[];

export default function TestimonialsView() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {testimonials.map((t, i) => (
        <div
          key={i}
          style={{
            padding: '14px 16px',
            background: 'white',
            borderRadius: 10,
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {/* Quote mark */}
          <div
            style={{
              fontSize: 28,
              color: '#007AFF',
              lineHeight: 1,
              fontFamily: 'Georgia, serif',
              opacity: 0.4,
              marginBottom: 4,
            }}
          >
            "
          </div>

          <p
            style={{
              fontSize: 13,
              color: '#333',
              lineHeight: 1.65,
              fontStyle: 'italic',
              marginBottom: 10,
            }}
          >
            {t.quote}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingTop: 10,
              borderTop: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: `hsl(${i * 67}, 52%, 58%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: 'white',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {t.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1D1D1F' }}>{t.name}</div>
              <div style={{ fontSize: 11, color: '#86868B' }}>
                {t.role}, {t.company}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
