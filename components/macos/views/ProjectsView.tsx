'use client';

import { useState } from 'react';
import projectsData from '@/data/projects.json';
import type { Projects, Project } from '@/types';

const projects = projectsData as Projects;

const TABS = [
  { id: 'production', label: 'Production' },
  { id: 'personal', label: 'Personal' },
  { id: 'research', label: 'Research' },
] as const;

type Tab = (typeof TABS)[number]['id'];

function ProjectCard({ p }: { p: Project }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '13px 14px',
        background: hov ? 'rgba(0,0,0,0.04)' : 'white',
        borderRadius: 10,
        border: '1px solid rgba(0,0,0,0.06)',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 6px 20px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.15s',
        cursor: 'default',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: p.color,
            flexShrink: 0,
            marginTop: 4,
          }}
        />
        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1D1D1F', flex: 1, lineHeight: 1.3 }}>
          {p.name}
        </div>
        <span style={{ fontSize: 11, color: '#aaa', flexShrink: 0 }}>{p.year}</span>
      </div>

      <div style={{ fontSize: 11, color: '#007AFF', marginBottom: 5, fontWeight: 500, paddingLeft: 16 }}>
        {p.tech}
      </div>

      <div style={{ fontSize: 12, color: '#555', lineHeight: 1.55, paddingLeft: 16 }}>
        {p.desc}
      </div>

      {(p.github || p.live) && (
        <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingLeft: 16 }}>
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#555', textDecoration: 'none' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#1D1D1F')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#555')}
            >
              ⌥ GitHub
            </a>
          )}
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#007AFF', textDecoration: 'none' }}
            >
              ↗ Live
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectsView() {
  const [tab, setTab] = useState<Tab>('production');

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      {/* Segmented control */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          marginBottom: 16,
          background: 'rgba(0,0,0,0.05)',
          borderRadius: 7,
          padding: 2,
          width: 'fit-content',
        }}
      >
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '5px 14px',
              fontSize: 12,
              fontWeight: 500,
              border: 'none',
              borderRadius: 5,
              cursor: 'default',
              background: tab === t.id ? 'white' : 'transparent',
              color: tab === t.id ? '#1D1D1F' : '#86868B',
              boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              fontFamily: 'inherit',
              transition: 'all 0.12s',
            }}
          >
            {t.label}
            <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.55 }}>
              {projects[t.id].length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 10,
        }}
      >
        {projects[tab].map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
    </div>
  );
}
