import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  direction?: 'left' | 'right' | 'top' | 'none';
  thought?: boolean;
  color?: string;
}

export default function SpeechBubble({ children, direction = 'left', thought, color = 'white' }: Props) {
  const tailStyles: Record<string, React.CSSProperties> = {
    left: {
      position: 'absolute',
      bottom: -14,
      left: 24,
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '14px solid #1A1A1A',
    },
    right: {
      position: 'absolute',
      bottom: -14,
      right: 24,
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '14px solid #1A1A1A',
    },
    top: {
      position: 'absolute',
      top: -14,
      left: 24,
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '14px solid #1A1A1A',
    },
    none: {},
  };

  const innerTailStyles: Record<string, React.CSSProperties> = {
    left: { position: 'absolute', bottom: -10, left: 25, width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderTop: `12px solid ${color}` },
    right: { position: 'absolute', bottom: -10, right: 25, width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderTop: `12px solid ${color}` },
    top: { position: 'absolute', top: -10, left: 25, width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: `12px solid ${color}` },
    none: {},
  };

  return (
    <div
      style={{
        position: 'relative',
        background: color,
        border: `3px solid #1A1A1A`,
        borderRadius: thought ? '50%' : 12,
        padding: '10px 14px',
        display: 'inline-block',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-comic-neue)',
          fontSize: 13,
          color: '#1A1A1A',
          lineHeight: 1.55,
          fontStyle: thought ? 'italic' : 'normal',
        }}
      >
        {children}
      </div>
      {direction !== 'none' && (
        <>
          <div style={tailStyles[direction]} />
          <div style={innerTailStyles[direction]} />
        </>
      )}
    </div>
  );
}
