'use client';

import { useEffect, useRef } from 'react';

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SpaceSection({ id, title, subtitle, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>('.reveal').forEach((node, i) => {
              setTimeout(() => node.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: 'clamp(64px, 10vh, 112px) clamp(16px, 6vw, 80px)',
        maxWidth: 1100,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Section header */}
      <div className="reveal" style={{ marginBottom: 48 }}>
        {/* Constellation line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#4F9CF7',
              boxShadow: '0 0 10px #4F9CF7, 0 0 20px rgba(79,156,247,0.3)',
            }}
          />
          <div style={{ height: 1, width: 32, background: 'linear-gradient(to right, #4F9CF7, transparent)' }} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.45)',
              marginTop: 10,
              fontFamily: 'var(--font-inter)',
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
