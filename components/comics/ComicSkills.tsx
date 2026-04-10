import ComicPanel from './ComicPanel';
import SoundEffect from './SoundEffect';
import skillsData from '@/data/skills.json';

const CAT_CONFIG: Record<string, { color: string; emoji: string }> = {
  Languages:       { color: '#0F3D6E', emoji: '💻' },
  Frontend:        { color: '#E8511A', emoji: '🎨' },
  Backend:         { color: '#228B22', emoji: '⚙️' },
  Databases:       { color: '#7B2D8B', emoji: '🗄️' },
  'DevOps & Tools':{ color: '#8B4513', emoji: '🔧' },
  'AI & ML':       { color: '#B8860B', emoji: '🤖' },
  Integrations:    { color: '#1A5276', emoji: '🔌' },
  Other:           { color: '#5D6D7E', emoji: '🌟' },
};

export default function ComicSkills() {
  return (
    <section id="skills" style={{ scrollMarginTop: 60 }}>
      <div
        style={{
          background: '#228B22',
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
          Chapter IV: The Arsenal
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
          (Weapons of Mass Creation)
        </span>
      </div>

      <div
        style={{
          border: '3px solid #1A1A1A',
          background: '#FFF8E7',
          padding: 16,
        }}
      >
        {/* Sound effects row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <SoundEffect word="ZAP!" size={36} color="#E8511A" rotate={-10} />
          <SoundEffect word="WHAM!" size={32} color="#0F3D6E" rotate={5} />
          <SoundEffect word="KAPOW!" size={28} color="#7B2D8B" rotate={-4} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
          }}
        >
          {Object.entries(skillsData as Record<string, string[]>).map(([cat, items], i) => {
            const cfg = CAT_CONFIG[cat] ?? { color: '#5D6D7E', emoji: '⚡' };
            return (
              <ComicPanel key={cat} color={cfg.color} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Category header */}
                <div
                  style={{
                    background: cfg.color,
                    padding: '7px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{cfg.emoji}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-bangers)',
                      fontSize: 14,
                      letterSpacing: '0.08em',
                      color: 'white',
                      textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
                    }}
                  >
                    {cat.toUpperCase()}
                  </span>
                </div>

                {/* Skills grid */}
                <div
                  style={{
                    padding: '10px 12px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 5,
                  }}
                >
                  {items.map((s, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: 'var(--font-comic-neue)',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#1A1A1A',
                        background: `${cfg.color}18`,
                        border: `1.5px solid ${cfg.color}60`,
                        padding: '2px 8px',
                        borderRadius: 3,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </ComicPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
