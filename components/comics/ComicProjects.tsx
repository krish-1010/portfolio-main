'use client';

import { useState } from 'react';
import ComicPanel from './ComicPanel';
import SoundEffect from './SoundEffect';
import projectsData from '@/data/projects.json';

const TABS = ['production', 'personal', 'research'] as const;

const TAB_SOUNDS: Record<string, string> = {
  production: 'LAUNCH!',
  personal:   'BUILD!',
  research:   'DISCOVER!',
};

export default function ComicProjects() {
  const [tab, setTab] = useState<typeof TABS[number]>('production');

  return (
    <section id="projects" style={{ scrollMarginTop: 60 }}>
      <div
        style={{
          background: '#7B2D8B',
          padding: '8px 20px',
          border: '3px solid #1A1A1A',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 28,
            letterSpacing: '0.1em',
            color: '#FFD700',
            textShadow: '2px 2px 0 #1A1A1A',
          }}
        >
          Chapter III: Dharma in Action
        </span>
      </div>

      {/* Tab strip */}
      <div
        style={{
          display: 'flex',
          border: '3px solid #1A1A1A',
          borderBottom: 'none',
          background: '#1A1A1A',
          gap: 3,
          padding: 3,
        }}
      >
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              fontFamily: 'var(--font-bangers)',
              fontSize: 15,
              letterSpacing: '0.08em',
              border: '2px solid',
              borderColor: tab === t ? '#FFD700' : '#444',
              borderRadius: 3,
              padding: '6px 12px',
              cursor: 'pointer',
              background: tab === t ? '#FFD700' : '#2A2A2A',
              color: tab === t ? '#1A1A1A' : 'rgba(255,255,255,0.6)',
              textTransform: 'capitalize',
              transition: 'all 0.12s',
            }}
          >
            {t}
            <span
              style={{
                marginLeft: 6,
                fontSize: 11,
                opacity: 0.7,
                fontFamily: 'var(--font-comic-neue)',
                fontWeight: 700,
              }}
            >
              {projectsData[t].length}
            </span>
          </button>
        ))}
      </div>

      <div
        style={{
          border: '3px solid #1A1A1A',
          background: '#FFF8E7',
          padding: 16,
        }}
      >
        {/* Sound effect header */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <SoundEffect
            word={TAB_SOUNDS[tab]}
            size={40}
            color={tab === 'production' ? '#E8511A' : tab === 'personal' ? '#0F3D6E' : '#228B22'}
            rotate={-3}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 12,
          }}
        >
          {projectsData[tab].map((p, i) => (
            <ComicPanel key={i} color={p.color} style={{ padding: 16 }}>
              {/* Title bar */}
              <div
                style={{
                  background: p.color,
                  margin: '-16px -16px 12px',
                  padding: '6px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-bangers)',
                    fontSize: 14,
                    letterSpacing: '0.06em',
                    color: 'white',
                    textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
                  }}
                >
                  {p.name.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-comic-neue)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {p.year}
                </span>
              </div>

              {/* Tech */}
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 10,
                  color: p.color,
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}40`,
                  borderRadius: 3,
                  padding: '3px 8px',
                  marginBottom: 8,
                  letterSpacing: '0.03em',
                }}
              >
                {p.tech}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: 'var(--font-comic-neue)',
                  fontSize: 12,
                  color: '#1A1A1A',
                  lineHeight: 1.55,
                  marginBottom: 10,
                }}
              >
                {p.desc}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 6 }}>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-bangers)',
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      background: p.color,
                      color: 'white',
                      padding: '3px 10px',
                      border: '2px solid #1A1A1A',
                      borderRadius: 2,
                      textDecoration: 'none',
                      boxShadow: '2px 2px 0 #1A1A1A',
                    }}
                  >
                    LIVE ↗
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-bangers)',
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      background: '#1A1A1A',
                      color: 'white',
                      padding: '3px 10px',
                      border: '2px solid #1A1A1A',
                      borderRadius: 2,
                      textDecoration: 'none',
                      boxShadow: '2px 2px 0 #444',
                    }}
                  >
                    CODE ↗
                  </a>
                )}
              </div>
            </ComicPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
