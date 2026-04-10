import experienceData from '@/data/experience.json';
import type { Experience } from '@/types';

const experience = experienceData as Experience[];

export default function ExperienceView() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {experience.map((e, i) => (
        <div
          key={i}
          style={{
            padding: '14px 16px',
            background: 'white',
            borderRadius: 10,
            border: '1px solid rgba(0,0,0,0.06)',
            borderLeft: `3px solid ${e.color}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 4,
              marginBottom: 8,
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1D1D1F' }}>{e.role}</div>
              <div style={{ fontSize: 12, color: e.color, marginTop: 2 }}>{e.company}</div>
            </div>
            <span style={{ fontSize: 11, color: '#aaa', fontWeight: 500 }}>{e.period}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {e.bullets.map((b, j) => (
              <div
                key={j}
                style={{
                  fontSize: 12.5,
                  color: '#444',
                  lineHeight: 1.6,
                  paddingLeft: 12,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: e.color,
                    opacity: 0.8,
                  }}
                >
                  ·
                </span>
                {b}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
