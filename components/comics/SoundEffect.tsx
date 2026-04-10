interface Props {
  word: string;
  size?: number;
  color?: string;
  rotate?: number;
  style?: React.CSSProperties;
}

export default function SoundEffect({ word, size = 48, color = '#E8511A', rotate = -8, style }: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-bangers)',
        fontSize: size,
        color,
        letterSpacing: '0.04em',
        textShadow: `3px 3px 0 #1A1A1A, -1px -1px 0 #1A1A1A`,
        transform: `rotate(${rotate}deg)`,
        display: 'inline-block',
        lineHeight: 1,
        userSelect: 'none',
        ...style,
      }}
    >
      {word}
    </div>
  );
}
