'use client';

import { useState } from 'react';

interface Props {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
}

export default function DockIcon({ label, onClick, children, active = false }: Props) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        cursor: 'default',
        transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)',
        transform: hov ? 'translateY(-12px) scale(1.28)' : 'translateY(0) scale(1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Tooltip */}
      {hov && (
        <div
          style={{
            position: 'absolute',
            top: -32,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '4px 10px',
            background: 'rgba(30,30,30,0.92)',
            backdropFilter: 'blur(10px)',
            borderRadius: 6,
            fontSize: 12,
            color: 'white',
            whiteSpace: 'nowrap',
            fontWeight: 500,
            pointerEvents: 'none',
            fontFamily: '-apple-system, sans-serif',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {label}
        </div>
      )}

      {children}

      {/* Active dot */}
      {active && (
        <div
          style={{
            position: 'absolute',
            bottom: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.7)',
          }}
        />
      )}
    </div>
  );
}

export function DockSvg({
  bg,
  children,
  size = 44,
}: {
  bg: string;
  children?: React.ReactNode;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="10" fill={bg} />
      {children}
    </svg>
  );
}
