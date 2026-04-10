import CaptionBox from './CaptionBox';
import speakingData from '@/data/speaking.json';

const TYPE_ICONS: Record<string, string> = {
  'Guest Lecture': '🎓',
  'Panel Speaker': '🎤',
  'Workshop':      '🛠',
  'Chief Guest':   '⭐',
  'Judge':         '⚖️',
  'Developer':     '💻',
  'Mentor':        '🧭',
  'Volunteer':     '🤝',
  'Guest Speaker': '🎤',
};

export default function ComicSpeaking() {
  return (
    <section id="speaking" style={{ scrollMarginTop: 60 }}>
      <div
        style={{
          background: '#B8860B',
          padding: '8px 20px',
          border: '3px solid #1A1A1A',
          borderBottom: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 28,
            letterSpacing: '0.1em',
            color: 'white',
            textShadow: '2px 2px 0 #1A1A1A',
          }}
        >
          Chapter V: The Seva Files
        </span>
        <span
          style={{
            fontFamily: 'var(--font-comic-neue)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
            marginLeft: 12,
            fontStyle: 'italic',
          }}
        >
          (Acts of Service)
        </span>
      </div>

      <div
        style={{
          border: '3px solid #1A1A1A',
          background: '#FFF8E7',
        }}
      >
        {/* Mission briefing strip */}
        <div
          style={{
            background: '#1A1A1A',
            padding: '10px 20px',
            borderBottom: '3px solid #FFD700',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 11,
              color: '#30D158',
            }}
          >
            MISSION COUNT: {speakingData.length} COMPLETED · INSTITUTIONS REACHED: 10+ · STUDENTS IMPACTED: 2500+
          </span>
        </div>

        {/* Events grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 0,
          }}
        >
          {speakingData.map((s, i) => (
            <div
              key={i}
              style={{
                borderBottom: '2px solid #1A1A1A',
                borderRight: '2px solid #1A1A1A',
                padding: '14px 16px',
                background: i % 2 === 0 ? 'white' : '#FFF8E7',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              {/* Icon + type */}
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>
                  {TYPE_ICONS[s.type] ?? '🎤'}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-bangers)',
                    fontSize: 9,
                    letterSpacing: '0.08em',
                    background: s.color,
                    color: 'white',
                    padding: '2px 5px',
                    borderRadius: 2,
                    border: '1px solid #1A1A1A',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.type.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-bangers)',
                    fontSize: 14,
                    letterSpacing: '0.04em',
                    color: '#1A1A1A',
                    lineHeight: 1.2,
                    marginBottom: 4,
                  }}
                >
                  {s.event}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-comic-neue)',
                    fontSize: 11,
                    color: '#5A3500',
                    lineHeight: 1.4,
                  }}
                >
                  {s.venue}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-bangers)',
                    fontSize: 11,
                    color: s.color,
                    marginTop: 2,
                    letterSpacing: '0.06em',
                  }}
                >
                  {s.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gita verse footer */}
        <div style={{ padding: '16px 20px', borderTop: '3px solid #1A1A1A' }}>
          <CaptionBox
            translation="He who does the task dictated by duty, caring nothing for the fruit of the action, he is a yogi."
            attribution="Bhagavad Gita · Ch. 6, Verse 1"
            color="#FFD700"
          />
        </div>
      </div>
    </section>
  );
}
