import speakingData from '@/data/speaking.json';
import type { SpeakingEvent } from '@/types';

const speaking = speakingData as SpeakingEvent[];

export default function SpeakingView() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {speaking.map((s, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: '9px 12px',
            background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
            borderRadius: 8,
          }}
        >
          <div
            style={{
              padding: '3px 9px',
              fontSize: 10,
              fontWeight: 700,
              background: s.color,
              color: 'white',
              borderRadius: 4,
              flexShrink: 0,
              marginTop: 1,
              minWidth: 52,
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            {s.type}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1D1D1F' }}>{s.event}</div>
            <div style={{ fontSize: 11, color: '#86868B', marginTop: 2 }}>
              {s.venue} · {s.year}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
