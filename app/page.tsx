'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import RetroPage from '@/components/retro/RetroPage';
import SpaceLayout from '@/components/space/SpaceLayout';
import SpaceNav from '@/components/space/SpaceNav';
import SpaceHero from '@/components/space/SpaceHero';
import SpaceSection from '@/components/space/SpaceSection';
import SpaceProjectCard from '@/components/space/SpaceProjectCard';
import SpaceExperienceTabs from '@/components/space/SpaceExperienceTabs';
import SpaceTestimonialsCarousel from '@/components/space/SpaceTestimonialsCarousel';
import SpaceShipConsole from '@/components/space/SpaceShipConsole';
import SpaceFooter from '@/components/space/SpaceFooter';
import ContactForm from '@/components/shared/ContactForm';
import BackToTop from '@/components/shared/BackToTop';
import KonamiEasterEgg from '@/components/shared/KonamiEasterEgg';
import RocketCursor from '@/components/space/RocketCursor';
import ShootingStars from '@/components/space/ShootingStars';
import TardisButton from '@/components/shared/TardisButton';
import BootScreen from '@/components/shared/BootScreen';

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


export default function Home() {
  const { theme } = useTheme();
  const [projectTab, setProjectTab] = useState<'production' | 'personal' | 'research'>('production');

  // Render Retro theme when toggled — all content comes from the same JSON data
  if (theme === 'retro') return <RetroPage />;

  return (
    <SpaceLayout>
      <BootScreen />
      <KonamiEasterEgg />
      <RocketCursor />
      <ShootingStars />
      <BackToTop variant="space" />
      <TardisButton />
      <SpaceNav />
      <SpaceHero profile={p} />

      {/* ── About ─────────────────────────────────────────── */}
      <SpaceSection
        id="about"
        title="About Me"
        subtitle="Full Stack Engineer building real-world products at the intersection of code, teaching, and curiosity."
      >
        <div
          className="glass-card reveal"
          style={{ padding: '28px 32px', display: 'grid', gap: 28, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          <div>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.75,
                fontFamily: 'var(--font-inter)',
              }}
            >
              {p.bio}
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow"
                style={{ textDecoration: 'none', fontSize: 13 }}
              >
                GitHub ↗
              </a>
              <a
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow"
                style={{ textDecoration: 'none', fontSize: 13 }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#4F9CF7',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-jetbrains)',
                marginBottom: 14,
              }}
            >
              Things I love
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.iLove.map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: '5px 12px',
                    fontSize: 12,
                    background: 'rgba(79,156,247,0.08)',
                    color: '#4F9CF7',
                    borderRadius: 20,
                    fontWeight: 500,
                    border: '1px solid rgba(79,156,247,0.15)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SpaceSection>

      {/* ── Experience ────────────────────────────────────── */}
      <SpaceSection
        id="experience"
        title="Experience"
        subtitle="4 roles across product startups, satellite tech, and enterprise software."
      >
        <SpaceExperienceTabs experience={experience} />
      </SpaceSection>

      {/* ── Projects ──────────────────────────────────────── */}
      <SpaceSection
        id="projects"
        title="Projects"
        subtitle="Production deployments, personal builds, and research."
      >
        {/* Tab switcher */}
        <div className="reveal" style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'inline-flex',
              gap: 0,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10,
              padding: 3,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {(['production', 'personal', 'research'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setProjectTab(tab)}
                style={{
                  padding: '7px 18px',
                  fontSize: 13,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 7,
                  cursor: 'pointer',
                  background:
                    projectTab === tab
                      ? 'rgba(79,156,247,0.15)'
                      : 'transparent',
                  color:
                    projectTab === tab
                      ? '#4F9CF7'
                      : 'rgba(255,255,255,0.45)',
                  boxShadow:
                    projectTab === tab
                      ? '0 0 0 1px rgba(79,156,247,0.3)'
                      : 'none',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-inter)',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 11,
                    opacity: 0.6,
                  }}
                >
                  {projects[tab].length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 14,
          }}
        >
          {projects[projectTab].map((project, i) => (
            <div
              key={i}
              className="reveal"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <SpaceProjectCard project={project} />
            </div>
          ))}
        </div>
      </SpaceSection>

      {/* ── Speaking ──────────────────────────────────────── */}
      <SpaceSection
        id="speaking"
        title="Speaking & Mentoring"
        subtitle="13 engagements across Anna University, IIT Madras, Stella Maris, and beyond."
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 12,
          }}
        >
          {speaking.map((s, i) => (
            <div
              key={i}
              className="glass-card reveal"
              style={{
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: '3px 10px',
                  fontSize: 10,
                  fontWeight: 700,
                  background: s.color,
                  color: 'white',
                  borderRadius: 4,
                  flexShrink: 0,
                  marginTop: 1,
                  fontFamily: 'var(--font-jetbrains)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.type}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: 'white',
                    fontFamily: 'var(--font-space-grotesk)',
                  }}
                >
                  {s.event}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 3,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {s.venue} · {s.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SpaceSection>

      {/* ── Testimonials ──────────────────────────────────── */}
      <SpaceSection
        id="testimonials"
        title="Testimonials"
        subtitle="From colleagues, clients, co-founders, and students."
      >
        <SpaceTestimonialsCarousel testimonials={testimonials} />
      </SpaceSection>

      {/* ── Skills ────────────────────────────────────────── */}
      <SpaceSection id="skills" title="Skills">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {Object.entries(skills).map(([cat, items], i) => (
            <div
              key={cat}
              className="glass-card reveal"
              style={{ padding: '18px 20px' }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#4F9CF7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-jetbrains)',
                  marginBottom: 12,
                }}
              >
                {cat}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {items.map((s, j) => (
                  <span
                    key={j}
                    style={{
                      padding: '4px 10px',
                      fontSize: 12,
                      background: 'rgba(255,255,255,0.04)',
                      color: 'rgba(255,255,255,0.65)',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.07)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SpaceSection>

      {/* ── Ship Console ─────────────────────────────────── */}
      <SpaceSection
        id="console"
        title="Ship Console"
        subtitle="Interactive terminal — query the mission database."
      >
        <SpaceShipConsole />
      </SpaceSection>

      {/* ── Education ─────────────────────────────────────── */}
      <SpaceSection id="education" title="Education">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {education.map((e, i) => (
            <div
              key={i}
              className="glass-card reveal"
              style={{ padding: '20px 24px', borderLeft: '3px solid #5856D6' }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: 'var(--font-space-grotesk)',
                }}
              >
                {e.degree}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#5856D6',
                  marginTop: 4,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {e.school} · {e.period}
              </div>
              {e.notes && (
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.45)',
                    marginTop: 8,
                    fontFamily: 'var(--font-inter)',
                    lineHeight: 1.6,
                  }}
                >
                  {e.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </SpaceSection>

      {/* ── Contact ───────────────────────────────────────── */}
      <SpaceSection
        id="contact"
        title="Get in Touch"
        subtitle="Open to freelance projects, collaborations, and full-time roles."
      >
        <div className="glass-card reveal" style={{ padding: 'clamp(24px, 4vw, 40px)', maxWidth: 680, margin: '0 auto' }}>
          <ContactForm variant="space" email={p.email} linkedin={p.linkedin} />
        </div>
      </SpaceSection>

      <SpaceFooter profile={p} />
    </SpaceLayout>
  );
}
