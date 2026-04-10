interface Project {
  name: string;
  tech: string;
  year: string;
  desc: string;
  color: string;
  github?: string | null;
  live?: string | null;
}

interface Props {
  project: Project;
}

export default function SpaceProjectCard({ project: p }: Props) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              flexShrink: 0,
              marginTop: 2,
            }}
          />
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'white',
              fontFamily: 'var(--font-space-grotesk)',
              letterSpacing: '-0.01em',
            }}
          >
            {p.name}
          </h3>
        </div>
        <span
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-jetbrains)',
            flexShrink: 0,
            paddingTop: 1,
          }}
        >
          {p.year}
        </span>
      </div>

      {/* Tech */}
      <div
        style={{
          fontSize: 11,
          color: '#4F9CF7',
          fontFamily: 'var(--font-jetbrains)',
          fontWeight: 500,
          lineHeight: 1.5,
        }}
      >
        {p.tech}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.6,
          fontFamily: 'var(--font-inter)',
          flex: 1,
        }}
      >
        {p.desc}
      </p>

      {/* Links */}
      {(p.github || p.live) && (
        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'color 0.15s',
                fontFamily: 'var(--font-inter)',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'white')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
            >
              ⌥ GitHub
            </a>
          )}
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: '#4F9CF7',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'color 0.15s',
                fontFamily: 'var(--font-inter)',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#9B70F9')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#4F9CF7')}
            >
              ↗ Live
            </a>
          )}
        </div>
      )}
    </div>
  );
}
