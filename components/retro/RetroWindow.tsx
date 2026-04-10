// Beveled Win95-style window container

interface Props {
  title: string;
  icon?: string;
  children: React.ReactNode;
  noPad?: boolean;
}

export default function RetroWindow({ title, icon = '📁', children, noPad = false }: Props) {
  return (
    <div
      className="retro-bevel-out"
      style={{ background: '#C0C0C0', marginBottom: 18 }}
    >
      {/* Title bar */}
      <div
        style={{
          background: 'linear-gradient(to right, #000080 0%, #1084d0 100%)',
          padding: '3px 4px 3px 6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 13 }}>{icon}</span>
          <span
            style={{
              color: 'white',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              letterSpacing: '0.02em',
            }}
          >
            {title}
          </span>
        </div>

        {/* Window control buttons */}
        <div style={{ display: 'flex', gap: 2 }}>
          {['_', '□', '✕'].map((s, i) => (
            <span
              key={i}
              className="retro-bevel-out"
              style={{
                width: 16,
                height: 14,
                background: '#C0C0C0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                cursor: 'default',
                fontFamily: 'monospace',
                flexShrink: 0,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Menu bar strip */}
      <div
        style={{
          background: '#C0C0C0',
          borderBottom: '1px solid #808080',
          padding: '2px 6px',
          fontSize: 13,
          display: 'flex',
          gap: 2,
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
        }}
      >
        {['File', 'Edit', 'View', 'Help'].map(m => (
          <span
            key={m}
            style={{
              padding: '1px 8px',
              cursor: 'default',
              textDecoration: 'underline',
              textDecorationColor: 'transparent',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#000080';
              (e.currentTarget as HTMLElement).style.color = 'white';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#000';
            }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* Body */}
      <div
        className="retro-scroll"
        style={{
          padding: noPad ? 0 : '12px 14px',
          overflowY: 'auto',
          maxHeight: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}
