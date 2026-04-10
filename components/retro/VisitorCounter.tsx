'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem('visitor-count') ?? '0', 10);
      const next = isNaN(stored) ? 1 : stored + 1;
      localStorage.setItem('visitor-count', String(next));
      setCount(next);
    } catch {
      setCount(1);
    }
  }, []);

  const display = count !== null ? String(count).padStart(6, '0') : '??????';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-ibm-plex-mono), monospace',
        fontSize: 13,
      }}
    >
      <span style={{ opacity: 0.7 }}>Visitors:</span>
      <span
        className="retro-bevel-in"
        style={{
          background: '#000',
          color: '#00FF00',
          padding: '2px 8px',
          fontSize: 14,
          letterSpacing: '0.15em',
          fontFamily: 'var(--font-ibm-plex-mono), "Courier New", monospace',
        }}
      >
        {display}
      </span>
    </div>
  );
}
