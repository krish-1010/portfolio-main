import { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  thick?: boolean;
  color?: string;
  className?: string;
}

export default function ComicPanel({ children, style, thick, color, className }: Props) {
  return (
    <div
      className={className}
      style={{
        border: `${thick ? 4 : 3}px solid #1A1A1A`,
        borderRadius: 4,
        background: 'white',
        position: 'relative',
        overflow: 'hidden',
        ...(color ? { borderTop: `6px solid ${color}` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
