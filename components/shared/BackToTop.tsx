'use client';

import { useEffect, useState } from 'react';

interface Props {
  /** 'space' | 'comic' — determines visual style */
  variant?: 'space' | 'comic';
}

export default function BackToTop({ variant = 'space' }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (variant === 'comic') {
    return (
      <button
        onClick={scrollTop}
        title="Back to top"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 24,
          zIndex: 80,
          width: 48,
          height: 48,
          background: '#FFD700',
          border: '3px solid #000',
          borderRadius: 4,
          cursor: 'pointer',
          fontFamily: 'var(--font-bangers), "Bangers", cursive',
          fontSize: 11,
          fontWeight: 700,
          color: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          boxShadow: '3px 3px 0 #000',
          transition: 'transform 0.1s, box-shadow 0.1s',
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          animation: 'fadeUp 0.25s ease-out',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #000';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = '';
          (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #000';
        }}
      >
        <span style={{ fontSize: 16 }}>↑</span>
        <span>TOP</span>
      </button>
    );
  }

  // Space variant
  return (
    <button
      onClick={scrollTop}
      title="Back to top"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 24,
        zIndex: 80,
        width: 40,
        height: 40,
        background: 'rgba(79,156,247,0.12)',
        border: '1px solid rgba(79,156,247,0.3)',
        borderRadius: 10,
        cursor: 'pointer',
        color: '#4F9CF7',
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'background 0.2s, box-shadow 0.2s',
        animation: 'fadeUp 0.25s ease-out',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(79,156,247,0.22)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(79,156,247,0.25)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(79,156,247,0.12)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      ↑
    </button>
  );
}
