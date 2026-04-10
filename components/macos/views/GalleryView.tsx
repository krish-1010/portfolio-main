'use client';

import { useState } from 'react';
import galleryData from '@/data/gallery.json';

interface ILikeItem {
  title: string;
  type: string;
  emoji: string;
  src: string | null;
  link: string | null;
}

interface PersonalPhoto {
  src: string;
  caption?: string;
  alt?: string;
}

const gallery = galleryData as { personal: PersonalPhoto[]; ilike: ILikeItem[] };

const TYPE_COLORS: Record<string, string> = {
  cinema:      '#FF3B30',
  anime:       '#FF9500',
  comics:      '#FFCC02',
  science:     '#34C759',
  spirituality:'#AF52DE',
  gaming:      '#5856D6',
  music:       '#FF2D55',
  photography: '#007AFF',
};

export default function GalleryView() {
  const [lightbox, setLightbox] = useState<PersonalPhoto | null>(null);
  const [activeType, setActiveType] = useState<string>('all');

  const types = ['all', ...Array.from(new Set(gallery.ilike.map(i => i.type)))];
  const filtered =
    activeType === 'all'
      ? gallery.ilike
      : gallery.ilike.filter(i => i.type === activeType);

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {/* Photos section */}
      <div style={{ padding: '16px 20px 0' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#86868B',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          Photos
        </div>

        {gallery.personal.length === 0 ? (
          <div
            style={{
              background: 'rgba(0,0,0,0.04)',
              border: '1.5px dashed rgba(0,0,0,0.13)',
              borderRadius: 10,
              padding: '28px 20px',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>📸</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1D1D1F', marginBottom: 4 }}>
              Photos coming soon
            </div>
            <div style={{ fontSize: 12, color: '#86868B', lineHeight: 1.5 }}>
              CDN uploads in progress. Check back for stargazing nights,
              <br />
              hackathon memories, and campus moments.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: 4,
              marginBottom: 20,
            }}
          >
            {gallery.personal.map((p, i) => (
              <div
                key={i}
                onClick={() => setLightbox(p)}
                style={{
                  aspectRatio: '1',
                  borderRadius: 6,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#F2F2F7',
                  position: 'relative',
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLElement).style.opacity = '0.85')
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.opacity = '1')
                }
              >
                <img
                  src={p.src}
                  alt={p.alt ?? `Photo ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', margin: '0 20px' }} />

      {/* iLike section */}
      <div style={{ padding: '14px 20px 20px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#86868B',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Things I love
        </div>

        {/* Type filter chips */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 14,
          }}
        >
          {types.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              style={{
                padding: '3px 10px',
                fontSize: 11,
                fontWeight: 500,
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                textTransform: 'capitalize',
                background:
                  activeType === t
                    ? (TYPE_COLORS[t] ?? '#007AFF')
                    : 'rgba(0,0,0,0.07)',
                color: activeType === t ? 'white' : '#3C3C43',
                transition: 'all 0.12s',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* iLike grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 8,
          }}
        >
          {filtered.map((item, i) => {
            const color = TYPE_COLORS[item.type] ?? '#007AFF';
            const card = (
              <div
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 10,
                  padding: '12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  cursor: item.link ? 'pointer' : 'default',
                  transition: 'transform 0.12s, box-shadow 0.12s',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: 26 }}>{item.emoji}</div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#1D1D1F',
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: color,
                    background: `${color}18`,
                    padding: '2px 7px',
                    borderRadius: 10,
                  }}
                >
                  {item.type}
                </div>
              </div>
            );

            return item.link ? (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'contents' }}
              >
                {card}
              </a>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            cursor: 'pointer',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt ?? 'Gallery'}
              style={{ maxWidth: '80vw', maxHeight: '75vh', display: 'block', objectFit: 'contain' }}
            />
            {lightbox.caption && (
              <div
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '10px 16px',
                  fontSize: 13,
                  textAlign: 'center',
                }}
              >
                {lightbox.caption}
              </div>
            )}
          </div>
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: 'white',
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
