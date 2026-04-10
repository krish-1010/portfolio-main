'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import speakingData from '@/data/speaking.json';

// ─── Result types ────────────────────────────────────────

type ResultKind = 'section' | 'project' | 'experience' | 'skill' | 'speaking';

interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  subtitle: string;
  icon: string;
  action: string; // 'open:sectionId' | 'url:...'
}

// ─── Build search index once ─────────────────────────────

const INDEX: SearchResult[] = [];

// Sections
const SECTIONS: { id: string; title: string; icon: string; subtitle: string }[] = [
  { id: 'about',        title: 'About Me',          icon: '👤', subtitle: 'Who is Krishna?' },
  { id: 'experience',   title: 'Experience',         icon: '💼', subtitle: 'Work history' },
  { id: 'projects',     title: 'Projects',           icon: '🚀', subtitle: 'Portfolio & builds' },
  { id: 'skills',       title: 'Skills',             icon: '⚡', subtitle: 'Tech stack' },
  { id: 'speaking',     title: 'Speaking',           icon: '🎤', subtitle: 'Talks & workshops' },
  { id: 'testimonials', title: 'Testimonials',       icon: '💬', subtitle: 'What people say' },
  { id: 'education',    title: 'Education',          icon: '🎓', subtitle: 'Academic background' },
  { id: 'gallery',      title: 'Gallery',            icon: '📸', subtitle: 'Photos & interests' },
  { id: 'terminal',     title: 'Terminal',           icon: '⌨️', subtitle: 'Interactive CLI' },
  { id: 'contact',      title: 'Contact',            icon: '✉️', subtitle: 'Get in touch' },
];

SECTIONS.forEach(s =>
  INDEX.push({ id: s.id, kind: 'section', title: s.title, subtitle: s.subtitle, icon: s.icon, action: `open:${s.id}` })
);

// Projects
const allProjects = [
  ...(projectsData as any).production,
  ...(projectsData as any).personal,
  ...(projectsData as any).research,
];
allProjects.forEach((p: any) =>
  INDEX.push({
    id: `proj-${p.name}`,
    kind: 'project',
    title: p.name,
    subtitle: p.tech,
    icon: '🛠',
    action: 'open:projects',
  })
);

// Experience
(experienceData as any[]).forEach(e =>
  INDEX.push({
    id: `exp-${e.company}`,
    kind: 'experience',
    title: `${e.role} @ ${e.company}`,
    subtitle: e.period,
    icon: '💼',
    action: 'open:experience',
  })
);

// Skills (flatten)
Object.entries(skillsData as Record<string, string[]>).forEach(([cat, items]) =>
  items.forEach(skill =>
    INDEX.push({
      id: `skill-${skill}`,
      kind: 'skill',
      title: skill,
      subtitle: cat,
      icon: '⚡',
      action: 'open:skills',
    })
  )
);

// Speaking
(speakingData as any[]).forEach(s =>
  INDEX.push({
    id: `speak-${s.event}`,
    kind: 'speaking',
    title: s.event,
    subtitle: `${s.venue} · ${s.year}`,
    icon: '🎤',
    action: 'open:speaking',
  })
);

// ─── Fuzzy match ─────────────────────────────────────────

function score(item: SearchResult, q: string): number {
  const query = q.toLowerCase();
  const title = item.title.toLowerCase();
  const sub   = item.subtitle.toLowerCase();
  if (title === query) return 100;
  if (title.startsWith(query)) return 80;
  if (title.includes(query)) return 60;
  if (sub.includes(query)) return 40;
  // character-by-character fuzzy
  let j = 0;
  for (let i = 0; i < title.length && j < query.length; i++) {
    if (title[i] === query[j]) j++;
  }
  if (j === query.length) return 20;
  return 0;
}

function search(q: string): SearchResult[] {
  if (!q.trim()) return SECTIONS.map(s => INDEX.find(r => r.id === s.id)!);
  return INDEX
    .map(r => ({ r, s: score(r, q) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 12)
    .map(x => x.r);
}

// ─── Kind label colors ───────────────────────────────────

const KIND_COLORS: Record<ResultKind, string> = {
  section:    '#007AFF',
  project:    '#30D158',
  experience: '#FF9500',
  skill:      '#AF52DE',
  speaking:   '#FF2D55',
};

// ─── Component ───────────────────────────────────────────

interface Props {
  onAction: (action: string) => void;
  onClose: () => void;
}

export default function SpotlightSearch({ onAction, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const results = search(query);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`) as HTMLElement;
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  // Reset cursor when results change
  useEffect(() => {
    setCursor(0);
  }, [query]);

  const commit = useCallback(
    (result: SearchResult) => {
      onClose();
      onAction(result.action);
    },
    [onAction, onClose]
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    if (e.key === 'Enter' && results[cursor]) commit(results[cursor]);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 200,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(580px, 90vw)',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderRadius: 14,
          boxShadow:
            '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.08)',
          zIndex: 201,
          overflow: 'hidden',
          animation: 'menuDrop 0.15s ease-out',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
        onKeyDown={onKey}
      >
        {/* Search input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 16px',
            borderBottom: results.length > 0 ? '1px solid rgba(0,0,0,0.08)' : 'none',
          }}
        >
          <span style={{ fontSize: 18, opacity: 0.45 }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search portfolio…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 17,
              color: '#1D1D1F',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.18)',
                color: 'white',
                fontSize: 10,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          )}
          <kbd
            style={{
              fontSize: 11,
              color: '#86868B',
              background: 'rgba(0,0,0,0.07)',
              padding: '2px 6px',
              borderRadius: 4,
              flexShrink: 0,
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results list */}
        {results.length > 0 && (
          <div
            ref={listRef}
            style={{
              maxHeight: 360,
              overflowY: 'auto',
              padding: '6px 0',
            }}
          >
            {results.map((r, i) => (
              <div
                key={r.id}
                data-idx={i}
                onClick={() => commit(r)}
                onMouseEnter={() => setCursor(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  background: i === cursor ? 'rgba(0,122,255,0.1)' : 'transparent',
                  transition: 'background 0.08s',
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `${KIND_COLORS[r.kind]}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {r.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#1D1D1F',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: '#86868B',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.subtitle}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: KIND_COLORS[r.kind],
                    background: `${KIND_COLORS[r.kind]}15`,
                    padding: '2px 7px',
                    borderRadius: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    flexShrink: 0,
                  }}
                >
                  {r.kind}
                </span>
                {i === cursor && (
                  <span style={{ fontSize: 11, color: '#86868B', flexShrink: 0 }}>↵</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div
            style={{
              padding: '24px 16px',
              textAlign: 'center',
              color: '#86868B',
              fontSize: 13,
            }}
          >
            No results for &ldquo;{query}&rdquo;
          </div>
        )}

        {/* Footer hint */}
        <div
          style={{
            padding: '8px 16px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            gap: 16,
            fontSize: 11,
            color: '#86868B',
          }}
        >
          <span><kbd style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 4px', borderRadius: 3 }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 4px', borderRadius: 3 }}>↵</kbd> open</span>
          <span><kbd style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 4px', borderRadius: 3 }}>esc</kbd> dismiss</span>
        </div>
      </div>
    </>
  );
}
