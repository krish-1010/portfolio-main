'use client';

import { useState } from 'react';
import RetroLayout from './RetroLayout';
import RetroNav from './RetroNav';
import RetroHero from './RetroHero';
import RetroWindow from './RetroWindow';
import RetroProjectCard from './RetroProjectCard';
import MarqueeBar from './MarqueeBar';
import RetroFooter from './RetroFooter';

import profile from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';
import testimonialsData from '@/data/testimonials.json';
import speakingData from '@/data/speaking.json';
import skillsData from '@/data/skills.json';
import educationData from '@/data/education.json';

import type { Profile, Experience, Projects, Testimonial, SpeakingEvent, Skills, Education } from '@/types';

const p = profile as Profile;
const experience = experienceData as Experience[];
const projects = projectsData as Projects;
const testimonials = testimonialsData as Testimonial[];
const speaking = speakingData as SpeakingEvent[];
const skills = skillsData as Skills;
const education = educationData as Education[];

const SECTION_PAD: React.CSSProperties = {
  padding: 'clamp(12px, 3vw, 24px) clamp(16px, 5vw, 48px)',
};

export default function RetroPage() {
  const [projectTab, setProjectTab] = useState<'production' | 'personal' | 'research'>('production');

  return (
    <RetroLayout>
      <MarqueeBar />
      <RetroNav />

      <div style={SECTION_PAD}>

        {/* ── Hero ────────────────────────────────────── */}
        <RetroHero profile={p} />

        {/* ── Experience ──────────────────────────────── */}
        <section id="experience">
          <RetroWindow title="EXPERIENCE.EXE" icon="💼">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {experience.map((e, i) => (
                <div
                  key={i}
                  className="retro-bevel-in"
                  style={{
                    background: 'white',
                    padding: '10px 12px',
                    borderLeft: `4px solid ${e.color}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 4,
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: 'var(--font-ibm-plex-mono), monospace',
                          color: '#000',
                        }}
                      >
                        {e.role}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: e.color,
                          fontFamily: 'var(--font-ibm-plex-mono), monospace',
                          marginTop: 2,
                        }}
                      >
                        {e.company}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: '#555',
                        fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      }}
                    >
                      {e.period}
                    </span>
                  </div>
                  {e.bullets.map((b, j) => (
                    <div
                      key={j}
                      style={{
                        fontSize: 12,
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-ibm-plex-mono), monospace',
                        paddingLeft: 14,
                        position: 'relative',
                        color: '#111',
                        marginTop: 3,
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: e.color,
                          fontWeight: 700,
                        }}
                      >
                        ·
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </RetroWindow>
        </section>

        {/* ── Projects ────────────────────────────────── */}
        <section id="projects">
          <RetroWindow title="PROJECTS.DIR" icon="📂">
            {/* Tab bar */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                marginBottom: 14,
                borderBottom: '2px solid #808080',
              }}
            >
              {(['production', 'personal', 'research'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setProjectTab(tab)}
                  style={{
                    padding: '4px 16px',
                    fontSize: 12,
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    background: projectTab === tab ? '#C0C0C0' : '#A0A0A0',
                    border: '2px solid',
                    borderColor:
                      projectTab === tab
                        ? '#FFFFFF #808080 #C0C0C0 #FFFFFF'
                        : '#808080 #FFFFFF #FFFFFF #808080',
                    borderBottom: projectTab === tab ? '2px solid #C0C0C0' : '2px solid #808080',
                    cursor: 'default',
                    color: '#000',
                    marginBottom: projectTab === tab ? '-2px' : 0,
                    fontWeight: projectTab === tab ? 700 : 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {tab} ({projects[tab].length})
                </button>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 12,
              }}
            >
              {projects[projectTab].map((project, i) => (
                <RetroProjectCard key={i} project={project} />
              ))}
            </div>
          </RetroWindow>
        </section>

        {/* ── Skills ──────────────────────────────────── */}
        <RetroWindow title="SKILLS.SYS" icon="⚙">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    color: '#000080',
                    marginBottom: 6,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  [{cat}]
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {items.map((s, j) => (
                    <span
                      key={j}
                      className="retro-tag"
                      style={{ fontSize: 12 }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RetroWindow>

        {/* ── Speaking ────────────────────────────────── */}
        <section id="speaking">
          <RetroWindow title="SPEAKING.LOG" icon="🎤">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {speaking.map((s, i) => (
                <div
                  key={i}
                  className="retro-bevel-in"
                  style={{
                    background: i % 2 === 0 ? 'white' : '#F0F0F0',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      padding: '1px 7px',
                      fontSize: 10,
                      fontWeight: 700,
                      background: s.color,
                      color: 'white',
                      flexShrink: 0,
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      minWidth: 48,
                      textAlign: 'center',
                    }}
                  >
                    {s.type}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: 'var(--font-ibm-plex-mono), monospace',
                        color: '#000',
                      }}
                    >
                      {s.event}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#555',
                        fontFamily: 'var(--font-ibm-plex-mono), monospace',
                        marginTop: 1,
                      }}
                    >
                      {s.venue} · {s.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RetroWindow>
        </section>

        {/* ── Testimonials (scrolling marquee style) ───── */}
        <RetroWindow title="TESTIMONIALS.TXT" icon="💬">
          {/* Marquee strip of short quotes */}
          <div
            style={{
              background: '#000080',
              color: '#FFFF00',
              padding: '5px 0',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                animation: 'retroMarquee 20s linear infinite',
                paddingLeft: '100%',
              }}
            >
              {[...testimonials, ...testimonials]
                .map(t => `"${t.quote.slice(0, 60)}…" — ${t.name}`)
                .join('   ◆   ')}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="retro-bevel-in"
                style={{ background: 'white', padding: '10px 12px' }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    lineHeight: 1.65,
                    color: '#111',
                    fontStyle: 'italic',
                    margin: '0 0 8px',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    color: '#000080',
                    fontWeight: 700,
                  }}
                >
                  — {t.name}, {t.role} @ {t.company}
                </div>
              </div>
            ))}
          </div>
        </RetroWindow>

        {/* ── Education ───────────────────────────────── */}
        <RetroWindow title="EDUCATION.DAT" icon="🎓">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {education.map((e, i) => (
              <div
                key={i}
                className="retro-bevel-in"
                style={{
                  background: 'white',
                  padding: '10px 12px',
                  borderLeft: '4px solid #5856D6',
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    color: '#000',
                  }}
                >
                  {e.degree}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#5856D6',
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    margin: '3px 0 6px',
                  }}
                >
                  {e.school} · {e.period}
                </div>
                {e.notes && (
                  <div
                    style={{
                      fontSize: 12,
                      color: '#333',
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      lineHeight: 1.6,
                    }}
                  >
                    {e.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </RetroWindow>

        {/* ── Contact ─────────────────────────────────── */}
        <section id="contact">
          <RetroWindow title="CONTACT.EXE" icon="📧">
            <div
              style={{
                textAlign: 'center',
                padding: '16px 0',
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-vt323), monospace',
                  fontSize: 36,
                  color: '#000080',
                  marginBottom: 12,
                  letterSpacing: '0.05em',
                }}
              >
                GET IN TOUCH
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: '#333',
                  lineHeight: 1.7,
                  maxWidth: 500,
                  margin: '0 auto 20px',
                }}
              >
                Open to freelance projects, collaborations, and full-time roles.<br />
                Based in {p.location}.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={`mailto:${p.email}`} className="retro-btn" style={{ textDecoration: 'none' }}>
                  📧 {p.email}
                </a>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn"
                  style={{ textDecoration: 'none' }}
                >
                  🔗 LinkedIn
                </a>
                <a
                  href={p.resumeUrl}
                  className="retro-btn"
                  style={{ textDecoration: 'none' }}
                  download
                >
                  💾 Download Resume
                </a>
              </div>
            </div>
          </RetroWindow>
        </section>

      </div>

      <RetroFooter profile={p} />
    </RetroLayout>
  );
}
