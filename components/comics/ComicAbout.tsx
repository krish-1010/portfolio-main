import ComicPanel from './ComicPanel';
import SpeechBubble from './SpeechBubble';
import CaptionBox from './CaptionBox';
import SoundEffect from './SoundEffect';
import profile from '@/data/profile.json';

export default function ComicAbout() {
  return (
    <section id="about" style={{ scrollMarginTop: 60 }}>
      {/* Section title strip */}
      <div
        style={{
          background: '#1A1A1A',
          padding: '8px 20px',
          borderBottom: '3px solid #E8511A',
          marginBottom: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 28,
            letterSpacing: '0.1em',
            color: '#FFD700',
            textShadow: '2px 2px 0 #E8511A',
          }}
        >
          Chapter I: The Atman
        </span>
        <span
          style={{
            fontFamily: 'var(--font-comic-neue)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            marginLeft: 12,
            fontStyle: 'italic',
          }}
        >
          (The Self)
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          border: '3px solid #1A1A1A',
          borderTop: 'none',
        }}
        className="comic-two-col"
      >
        {/* Panel A — bio */}
        <ComicPanel
          style={{ padding: 24, borderRadius: 0, border: 'none', borderRight: '3px solid #1A1A1A' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 14,
              letterSpacing: '0.1em',
              color: '#E8511A',
              marginBottom: 14,
            }}
          >
            NARRATOR:
          </div>
          <SpeechBubble direction="none">
            {profile.bio}
          </SpeechBubble>
          <div style={{ marginTop: 20 }}>
            <SoundEffect word="CODE!" size={36} color="#0F3D6E" rotate={-5} />
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-bangers)',
                fontSize: 13,
                letterSpacing: '0.08em',
                background: '#1A1A1A',
                color: '#FFD700',
                padding: '5px 14px',
                borderRadius: 3,
                textDecoration: 'none',
                border: '2px solid #1A1A1A',
                boxShadow: '2px 2px 0 #E8511A',
              }}
            >
              GITHUB ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-bangers)',
                fontSize: 13,
                letterSpacing: '0.08em',
                background: '#0F3D6E',
                color: 'white',
                padding: '5px 14px',
                borderRadius: 3,
                textDecoration: 'none',
                border: '2px solid #1A1A1A',
                boxShadow: '2px 2px 0 #1A1A1A',
              }}
            >
              LINKEDIN ↗
            </a>
          </div>
        </ComicPanel>

        {/* Panel B — iLove + Gita verse */}
        <ComicPanel style={{ padding: 24, borderRadius: 0, border: 'none' }}>
          <div
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 18,
              letterSpacing: '0.08em',
              color: '#1A1A1A',
              marginBottom: 12,
            }}
          >
            POWER OF INTERESTS:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {profile.iLove.map((item, i) => {
              const colors = ['#E8511A', '#0F3D6E', '#FFD700', '#7B2D8B', '#228B22'];
              const bg = colors[i % colors.length];
              return (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-bangers)',
                    fontSize: 13,
                    letterSpacing: '0.06em',
                    background: bg,
                    color: bg === '#FFD700' ? '#1A1A1A' : 'white',
                    padding: '4px 10px',
                    border: '2px solid #1A1A1A',
                    borderRadius: 3,
                    boxShadow: '2px 2px 0 #1A1A1A',
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>

          <CaptionBox
            translation="The soul is neither born nor does it die at any time. It has not come into being, does not come into being, and will not come into being."
            attribution="Bhagavad Gita · Ch. 2, Verse 20"
            color="#FFD700"
          />

          <div style={{ marginTop: 16, fontSize: 28, textAlign: 'right', letterSpacing: 8 }}>
            🔭🌌✨
          </div>
        </ComicPanel>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .comic-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
