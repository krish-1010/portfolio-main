'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MenuBar from '@/components/macos/MenuBar';
import Window from '@/components/macos/Window';
import FinderSidebar from '@/components/macos/FinderSidebar';
import Dock from '@/components/macos/Dock';
import DesktopFolder from '@/components/macos/DesktopFolder';
import DesktopStickers from '@/components/macos/DesktopStickers';
import Toast from '@/components/macos/Toast';

// Views
import AboutView from '@/components/macos/views/AboutView';
import ProjectsView from '@/components/macos/views/ProjectsView';
import ExperienceView from '@/components/macos/views/ExperienceView';
import SkillsView from '@/components/macos/views/SkillsView';
import SpeakingView from '@/components/macos/views/SpeakingView';
import TestimonialsView from '@/components/macos/views/TestimonialsView';
import EducationView from '@/components/macos/views/EducationView';
import ContactView from '@/components/macos/views/ContactView';
import GalleryView from '@/components/macos/views/GalleryView';
import TerminalView from '@/components/macos/views/TerminalView';
import SpotlightSearch from '@/components/macos/SpotlightSearch';
import BootScreen from '@/components/shared/BootScreen';

// ─── Types ──────────────────────────────────────────────

type SectionId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'speaking'
  | 'testimonials'
  | 'education'
  | 'contact'
  | 'gallery'
  | 'terminal';

interface ViewConfig {
  component: React.ComponentType;
  title: string;
}

// ─── View registry ───────────────────────────────────────

const VIEWS: Record<SectionId, ViewConfig> = {
  about:        { component: AboutView,        title: 'About Me' },
  projects:     { component: ProjectsView,     title: 'Projects' },
  experience:   { component: ExperienceView,   title: 'Experience' },
  skills:       { component: SkillsView,       title: 'Skills' },
  speaking:     { component: SpeakingView,     title: 'Speaking & Mentoring' },
  testimonials: { component: TestimonialsView, title: 'Testimonials' },
  education:    { component: EducationView,    title: 'Education' },
  contact:      { component: ContactView,      title: 'Contact' },
  gallery:      { component: GalleryView,      title: 'Gallery & Interests' },
  terminal:     { component: TerminalView,     title: 'Terminal' },
};

// ─── Desktop folders ────────────────────────────────────

const FOLDERS: { id: SectionId; label: string; color: string }[] = [
  { id: 'about',        label: 'About Me',     color: '#64ADEF' },
  { id: 'projects',     label: 'Projects',     color: '#30D158' },
  { id: 'experience',   label: 'Experience',   color: '#FF9500' },
  { id: 'skills',       label: 'Skills',       color: '#5856D6' },
  { id: 'speaking',     label: 'Speaking',     color: '#AF52DE' },
  { id: 'testimonials', label: 'Testimonials', color: '#FFCC02' },
  { id: 'education',    label: 'Education',    color: '#FF2D55' },
  { id: 'contact',      label: 'Contact',      color: '#007AFF' },
  { id: 'gallery',      label: 'Gallery',      color: '#FF2D55' },
  { id: 'terminal',     label: 'Terminal',     color: '#1C1C1E' },
];

// ─── Tagline ────────────────────────────────────────────

const TAGLINE = 'i write code,\nmentor students,\n& point telescopes\nat the sky.';
const ROLES = [
  'Junior Software Engineer @ iCover India',
  'Co-founder, Veloit AI',
  'Guest Lecturer, Anna University',
];

// ─── Page ───────────────────────────────────────────────

export default function DesktopPage() {
  const [active, setActive] = useState<SectionId | null>(null);
  const [time, setTime] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [spotlight, setSpotlight] = useState(false);

  // Clock
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          weekday: 'short',
          hour: 'numeric',
          minute: '2-digit',
        })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Keyboard: Escape closes window; ⌘K / Ctrl+K opens Spotlight
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (spotlight) { setSpotlight(false); return; }
        setActive(null);
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSpotlight(s => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [spotlight]);

  const handleAction = useCallback((action: string) => {
    if (action.startsWith('open:')) {
      setActive(action.slice(5) as SectionId);
    } else if (action === 'close') {
      setActive(null);
    } else if (action === 'email-copied') {
      setToast('Email copied to clipboard');
    } else if (action === 'url-copied') {
      setToast('URL copied to clipboard');
    } else if (action === 'copied') {
      setToast('Portfolio link copied!');
    } else if (action === 'resume') {
      const link = document.createElement('a');
      link.href = '/krishna-resume.pdf';
      link.download = 'Krishna_M_Resume.pdf';
      link.click();
    }
  }, []);

  const currentView = active ? VIEWS[active] : null;
  const ViewComponent = currentView?.component ?? null;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
        background:
          'linear-gradient(140deg, #0f0c29 0%, #1a1a3e 25%, #24243e 50%, #0f3460 78%, #1a1a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <BootScreen storageKey="km_booted_macos" variant="macos" />

      {/* Toast notification */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Spotlight search */}
      {spotlight && (
        <SpotlightSearch
          onAction={handleAction}
          onClose={() => setSpotlight(false)}
        />
      )}

      {/* Menu bar — z-index 60 */}
      <MenuBar onAction={handleAction} time={time} activeSection={active} />

      {/* Desktop area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <DesktopStickers />

        {/* Desktop folders — right column, z-index 10 */}
        <div
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 10,
          }}
        >
          {FOLDERS.map(f => (
            <DesktopFolder
              key={f.id}
              label={f.label}
              color={f.color}
              onClick={() => setActive(f.id)}
            />
          ))}
        </div>

        {/* Welcome text — visible when no window open */}
        {!active && (
          <div
            style={{
              position: 'absolute',
              left: 'clamp(24px, 6%, 80px)',
              top: '50%',
              transform: 'translateY(-50%)',
              maxWidth: 460,
              animation: 'fadeUp 0.5s ease-out',
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Welcome to
            </div>

            <h1
              style={{
                fontSize: 'clamp(40px, 7vw, 72px)',
                fontWeight: 800,
                color: 'white',
                margin: 0,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
              }}
            >
              Krishna&apos;s
              <br />
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #64ADEF 0%, #AF52DE 50%, #FF6482 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Desktop
              </span>
            </h1>

            <p
              style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.55)',
                marginTop: 14,
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {TAGLINE}
            </p>

            {/* Role chips */}
            <div
              style={{
                marginTop: 18,
                display: 'flex',
                gap: 7,
                flexWrap: 'wrap',
              }}
            >
              {ROLES.map((r, i) => (
                <span
                  key={i}
                  style={{
                    padding: '5px 12px',
                    fontSize: 11,
                    borderRadius: 20,
                    fontWeight: 500,
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {r}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => setActive('about')}
                style={{
                  padding: '9px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 9,
                  color: 'white',
                  cursor: 'default',
                  fontFamily: 'inherit',
                  backdropFilter: 'blur(10px)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)')
                }
              >
                About Me
              </button>
              <button
                onClick={() => setActive('projects')}
                style={{
                  padding: '9px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  background: '#007AFF',
                  border: 'none',
                  borderRadius: 9,
                  color: 'white',
                  cursor: 'default',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLElement).style.background = '#0058D0')
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.background = '#007AFF')
                }
              >
                View Projects
              </button>
              <Link
                href="/"
                style={{
                  padding: '9px 16px',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  borderRadius: 9,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)')
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')
                }
              >
                ← Main site
              </Link>
            </div>
          </div>
        )}

        {/* Finder window — z-index 50, centered, fixed size */}
        {active && ViewComponent && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-54%, -50%)',
              zIndex: 50,
            }}
          >
            <Window
              title={currentView!.title}
              onClose={() => setActive(null)}
              sidebar={
                <FinderSidebar
                  active={active}
                  onNav={(id) => setActive(id)}
                />
              }
            >
              <ViewComponent />
            </Window>
          </div>
        )}
      </div>

      {/* Dock — z-index 40 (window z-50 renders above dock) */}
      <Dock
        activeSection={active}
        onOpen={(id) => setActive(id as SectionId)}
        email="krishna@mkrishna.dev"
        github="https://github.com/krish-1010"
        linkedin="https://linkedin.com/in/mkrishna10"
        website="mkrishna.dev"
      />

      {/* Mobile fallback overlay */}
      <div className="mobile-fallback">
        <div style={{
          background: 'rgba(15,12,41,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          textAlign: 'center',
          gap: 20,
        }}>
          <div style={{ fontSize: 52 }}>🖥</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            Best on a bigger screen
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 300 }}>
            The macOS Desktop experience is designed for laptops and desktops.
            Try the other versions below on mobile!
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
            {[
              { href: '/', label: '🌌  Space HQ', sub: 'The main portfolio' },
              { href: '/comics', label: '📖  Krishna Chronicles', sub: 'Comic book edition' },
            ].map(v => (
              <a key={v.href} href={v.href} style={{
                display: 'block',
                padding: '14px 20px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                color: 'white',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 600,
              }}>
                {v.label}
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginTop: 2 }}>{v.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .mobile-fallback { display: none; }
        @media (max-width: 600px) {
          .mobile-fallback { display: block; position: fixed; inset: 0; z-index: 99999; }
        }
      `}</style>
    </div>
  );
}
