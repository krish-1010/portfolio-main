'use client';

import { useState } from 'react';
import type { Experience } from '@/types';

interface Props {
  experience: Experience[];
}

export default function SpaceExperienceTabs({ experience }: Props) {
  const [active, setActive] = useState(0);
  const e = experience[active];

  return (
    <div
      className="reveal exp-tabs-wrapper"
      style={{
        display: 'flex',
        gap: 0,
        minHeight: 280,
      }}
    >
      {/* Tab list — vertical on desktop, horizontal scroll on mobile */}
      <div
        className="exp-tabs-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '2px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
          overflowX: 'auto',
        }}
      >
        {experience.map((exp, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: '14px 20px',
              textAlign: 'left',
              background: active === i ? 'rgba(79,156,247,0.07)' : 'transparent',
              borderLeft: `2px solid ${active === i ? exp.color : 'transparent'}`,
              marginLeft: '-2px',
              color:
                active === i ? exp.color : 'rgba(255,255,255,0.45)',
              fontSize: 13,
              fontFamily: 'var(--font-jetbrains)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              if (active !== i)
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
            }}
            onMouseLeave={e => {
              if (active !== i)
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
            }}
          >
            {exp.company}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        key={active}
        className="exp-tabs-content"
        style={{
          padding: '4px 0 4px 28px',
          flex: 1,
          animation: 'fadeUp 0.25s ease-out',
        }}
      >
        {/* Role + company */}
        <h3
          style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            fontWeight: 700,
            color: 'white',
            fontFamily: 'var(--font-space-grotesk)',
            margin: '0 0 4px',
            letterSpacing: '-0.01em',
          }}
        >
          {e.role}{' '}
          <span style={{ color: e.color }}>@ {e.company}</span>
        </h3>

        {/* Period */}
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-jetbrains)',
            marginBottom: 20,
            letterSpacing: '0.04em',
          }}
        >
          {e.period}
        </div>

        {/* Bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {e.bullets.map((b, j) => (
            <div
              key={j}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  color: e.color,
                  flexShrink: 0,
                  marginTop: 3,
                  fontSize: 12,
                }}
              >
                ▹
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .exp-tabs-wrapper { flex-direction: column !important; }
          .exp-tabs-list {
            flex-direction: row !important;
            border-left: none !important;
            border-bottom: 2px solid rgba(255,255,255,0.08);
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 2px;
          }
          .exp-tabs-list button {
            border-left: none !important;
            border-bottom: 2px solid transparent;
            margin-left: 0 !important;
            margin-bottom: -2px;
            white-space: nowrap;
            padding: 10px 14px !important;
          }
          .exp-tabs-content { padding: 16px 0 0 0 !important; }
        }
      `}</style>
    </div>
  );
}
