import type { Project } from '@/types';

interface Props {
  project: Project;
}

export default function RetroProjectCard({ project: p }: Props) {
  return (
    <div
      className="retro-bevel-out"
      style={{
        background: '#C0C0C0',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* File icon header */}
      <div
        style={{
          background: '#000080',
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: p.color,
            border: '1px solid rgba(255,255,255,0.4)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: 'white',
            fontSize: 12,
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontWeight: 700,
          }}
        >
          {p.name.toUpperCase()}.EXE
        </span>
        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
          {p.year}
        </span>
      </div>

      <div style={{ padding: '10px 12px' }}>
        {/* Tech stack in inset box */}
        <div
          className="retro-bevel-in"
          style={{
            background: 'white',
            padding: '3px 8px',
            fontSize: 11,
            color: '#0000EE',
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            marginBottom: 8,
          }}
        >
          {p.tech}
        </div>

        <p
          style={{
            fontSize: 12,
            color: '#000',
            lineHeight: 1.55,
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            margin: 0,
          }}
        >
          {p.desc}
        </p>

        {(p.github || p.live) && (
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn"
                style={{ fontSize: 11, textDecoration: 'none' }}
              >
                🔗 Code
              </a>
            )}
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn"
                style={{ fontSize: 11, textDecoration: 'none' }}
              >
                🌐 Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
