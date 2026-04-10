import ComicPanel from './ComicPanel';
import CaptionBox from './CaptionBox';
import SoundEffect from './SoundEffect';
import experienceData from '@/data/experience.json';

const TYPE_LABELS: Record<string, string> = {
  current:    'ACTIVE MISSION',
  cofounded:  'ORIGIN STORY',
  internship: 'FIELD TRAINING',
};

const TYPE_COLORS: Record<string, string> = {
  current:    '#E8511A',
  cofounded:  '#7B2D8B',
  internship: '#0F3D6E',
};

export default function ComicExperience() {
  return (
    <section id="experience" style={{ scrollMarginTop: 60 }}>
      <div
        style={{
          background: '#E8511A',
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
          Chapter II: The Karma Log
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
          (The Record of Actions)
        </span>
      </div>

      <div style={{ border: '3px solid #1A1A1A', padding: '0 0 4px', background: '#FFF8E7' }}>
        {experienceData.map((e, i) => (
          <div
            key={i}
            style={{
              borderBottom: i < experienceData.length - 1 ? '3px solid #1A1A1A' : 'none',
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              minHeight: 160,
            }}
            className="comic-exp-row"
          >
            {/* Left — company badge */}
            <div
              style={{
                background: e.color,
                borderRight: '3px solid #1A1A1A',
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-bangers)',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '2px 8px',
                  borderRadius: 2,
                  alignSelf: 'flex-start',
                }}
              >
                {TYPE_LABELS[e.type] ?? 'MISSION'}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-bangers)',
                  fontSize: 22,
                  letterSpacing: '0.04em',
                  color: 'white',
                  textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                }}
              >
                {e.company}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-comic-neue)',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 700,
                }}
              >
                {e.period}
              </div>
            </div>

            {/* Right — role + bullets */}
            <div style={{ padding: '20px 20px', background: 'white' }}>
              <div
                style={{
                  fontFamily: 'var(--font-bangers)',
                  fontSize: 18,
                  letterSpacing: '0.06em',
                  color: e.color,
                  marginBottom: 10,
                  textShadow: '1px 1px 0 rgba(0,0,0,0.15)',
                }}
              >
                {e.role}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {e.bullets.map((b, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        color: e.color,
                        fontFamily: 'var(--font-bangers)',
                        fontSize: 16,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ▶
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-comic-neue)',
                        fontSize: 13,
                        color: '#1A1A1A',
                        lineHeight: 1.55,
                      }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gita interlude */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          padding: '16px 20px',
          background: '#0F3D6E',
          border: '3px solid #1A1A1A',
          borderTop: 'none',
        }}
      >
        <SoundEffect word="ZOOM!" size={32} color="#FFD700" rotate={5} style={{ flexShrink: 0 }} />
        <CaptionBox
          translation="Let right deeds be thy motive, not the fruit which comes from them."
          attribution="Bhagavad Gita · Ch. 2, Verse 47"
          color="#FFD700"
        />
        <SoundEffect word="POW!" size={28} color="#E8511A" rotate={-8} style={{ flexShrink: 0 }} />
      </div>

      <style>{`
        @media (max-width: 600px) {
          .comic-exp-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
