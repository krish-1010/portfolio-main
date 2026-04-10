import { ReactNode } from 'react';

interface Props {
  sanskrit?: string;
  translation: string;
  attribution?: string;
  color?: string;
}

export default function CaptionBox({ sanskrit, translation, attribution, color = '#FFD700' }: Props) {
  return (
    <div
      style={{
        background: color,
        border: '3px solid #1A1A1A',
        borderRadius: 4,
        padding: '10px 14px',
        position: 'relative',
      }}
    >
      {sanskrit && (
        <div
          style={{
            fontFamily: 'var(--font-comic-neue)',
            fontSize: 13,
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#1A1A1A',
            marginBottom: 6,
            lineHeight: 1.5,
          }}
        >
          🪷 &ldquo;{sanskrit}&rdquo;
        </div>
      )}
      <div
        style={{
          fontFamily: 'var(--font-comic-neue)',
          fontSize: 12,
          color: '#1A1A1A',
          lineHeight: 1.55,
        }}
      >
        {translation}
      </div>
      {attribution && (
        <div
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: '#5A3500',
            marginTop: 6,
          }}
        >
          — {attribution}
        </div>
      )}
    </div>
  );
}
