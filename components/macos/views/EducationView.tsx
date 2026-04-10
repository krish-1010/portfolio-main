import educationData from '@/data/education.json';
import type { Education } from '@/types';

const education = educationData as Education[];

export default function EducationView() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {education.map((e, i) => (
        <div
          key={i}
          style={{
            padding: '16px 18px',
            background: 'white',
            borderRadius: 10,
            border: '1px solid rgba(0,0,0,0.06)',
            borderLeft: '3px solid #5856D6',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1D1D1F' }}>{e.degree}</div>
          <div style={{ fontSize: 12, color: '#5856D6', marginTop: 4 }}>
            {e.school} · {e.period}
          </div>
          {e.notes && (
            <div
              style={{
                fontSize: 12,
                color: '#555',
                marginTop: 8,
                lineHeight: 1.6,
                padding: '8px 12px',
                background: 'rgba(88,86,214,0.04)',
                borderRadius: 6,
              }}
            >
              {e.notes}
            </div>
          )}
        </div>
      ))}

      {/* Fun fact */}
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(0,122,255,0.04)',
          borderRadius: 10,
          border: '1px solid rgba(0,122,255,0.1)',
          fontSize: 12,
          color: '#555',
          lineHeight: 1.6,
        }}
      >
        <span style={{ fontSize: 14, marginRight: 6 }}>🔭</span>
        Studied Physics before pivoting to CS — the observational astronomy + telescopes background is real.
      </div>
    </div>
  );
}
