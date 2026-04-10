'use client';

import { useState } from 'react';

interface Props {
  label: string;
  color: string;
  onClick: () => void;
}

export default function DesktopFolder({ label, color, onClick }: Props) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 76,
        padding: 5,
        borderRadius: 8,
        cursor: 'default',
        background: hov ? 'rgba(255,255,255,0.1)' : 'transparent',
        transition: 'background 0.15s',
        transform: hov ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <svg width={52} height={52} viewBox="0 0 64 64" fill="none">
        <path
          d="M8 16C8 13.8 9.8 12 12 12H26L30 18H52C54.2 18 56 19.8 56 22V48C56 50.2 54.2 52 52 52H12C9.8 52 8 50.2 8 48V16Z"
          fill={color}
        />
        <path
          d="M8 24H56V48C56 50.2 54.2 52 52 52H12C9.8 52 8 50.2 8 48V24Z"
          fill={color}
          opacity="0.75"
        />
        <path d="M8 24H56V27H8Z" fill="white" opacity="0.15" />
        {/* Subtle inner shadow */}
        <path d="M8 24H56V25H8Z" fill="white" opacity="0.2" />
      </svg>
      <span
        style={{
          fontSize: 11,
          color: 'white',
          textShadow: '0 1px 5px rgba(0,0,0,0.7)',
          textAlign: 'center',
          marginTop: 3,
          lineHeight: 1.2,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          fontWeight: hov ? 500 : 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}
