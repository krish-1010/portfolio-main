'use client';

// Fixed window size — consistent across all sections
const WINDOW_W = 'min(760px, 96vw)';
const WINDOW_H = 'min(530px, 82vh)';

interface Props {
  title: string;
  onClose: () => void;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export default function Window({ title, onClose, sidebar, children }: Props) {
  return (
    <div
      style={{
        background: 'rgba(246,246,246,0.96)',
        backdropFilter: 'blur(50px) saturate(200%)',
        WebkitBackdropFilter: 'blur(50px) saturate(200%)',
        borderRadius: 12,
        boxShadow:
          '0 28px 90px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(0,0,0,0.14)',
        width: WINDOW_W,
        height: WINDOW_H,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'winOpen 0.22s cubic-bezier(0.16,1,0.3,1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          background: 'rgba(255,255,255,0.6)',
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 7, marginRight: 14 }}>
          {(
            [
              ['#FF5F57', onClose],
              ['#FEBC2E', null],
              ['#28C840', null],
            ] as [string, (() => void) | null][]
          ).map(([color, fn], i) => (
            <div
              key={i}
              onClick={fn ?? undefined}
              title={i === 0 ? 'Close' : i === 1 ? 'Minimise' : 'Maximise'}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: color,
                cursor: fn ? 'pointer' : 'default',
                boxShadow: `inset 0 -1px 1px rgba(0,0,0,0.12)`,
                transition: 'filter 0.1s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.filter = 'brightness(0.85)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.filter = 'none')}
            />
          ))}
        </div>

        {/* Back/Forward */}
        <div style={{ display: 'flex', gap: 5, marginRight: 14 }}>
          <span style={{ fontSize: 13, color: '#c0c0c0', cursor: 'default', lineHeight: 1 }}>‹</span>
          <span style={{ fontSize: 13, color: '#c0c0c0', cursor: 'default', lineHeight: 1 }}>›</span>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            color: '#1D1D1F',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>

        {/* Spacer to balance traffic lights */}
        <div style={{ width: 88 }} />
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Sidebar */}
        {sidebar && (
          <div
            style={{
              width: 170,
              borderRight: '1px solid rgba(0,0,0,0.07)',
              padding: '10px 0',
              background: 'rgba(255,255,255,0.4)',
              overflowY: 'auto',
              flexShrink: 0,
            }}
          >
            {sidebar}
          </div>
        )}

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px 22px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
