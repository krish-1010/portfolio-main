'use client';

import { useEffect } from 'react';

interface Props {
  message: string;
  onDone: () => void;
}

export default function Toast({ message, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 38,
        right: 16,
        padding: '10px 18px',
        background: 'rgba(30,30,30,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 10,
        color: 'white',
        fontSize: 13,
        fontWeight: 500,
        boxShadow: '0 8px 30px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.08)',
        zIndex: 200,
        animation: 'slideInRight 0.22s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#28C840',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
      {message}
    </div>
  );
}
