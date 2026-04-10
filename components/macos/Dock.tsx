'use client';

import DockIcon, { DockSvg } from './DockIcon';

type SectionId = string;

interface Props {
  activeSection: SectionId | null;
  onOpen: (id: SectionId) => void;
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export default function Dock({
  activeSection,
  onOpen,
  email,
  github,
  linkedin,
  website,
}: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 4,
        padding: '6px 10px',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.14)',
        zIndex: 40,
      }}
    >
      {/* About */}
      <DockIcon label="About Me" onClick={() => onOpen('about')} active={activeSection === 'about'}>
        <DockSvg bg="#1D1D1F">
          <text x="22" y="28" textAnchor="middle" fontSize="22" fill="white" fontFamily="system-ui" fontWeight="700">
            K
          </text>
        </DockSvg>
      </DockIcon>

      {/* Projects */}
      <DockIcon label="Projects" onClick={() => onOpen('projects')} active={activeSection === 'projects'}>
        <DockSvg bg="#007AFF">
          <rect x="10" y="12" width="24" height="20" rx="3" fill="white" opacity="0.9" />
          <path d="M14 18H30M14 22H26M14 26H22" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" />
        </DockSvg>
      </DockIcon>

      {/* Terminal / Skills */}
      <DockIcon label="Skills" onClick={() => onOpen('skills')} active={activeSection === 'skills'}>
        <DockSvg bg="#1E1E1E">
          <path d="M12 28L19 21L12 14" stroke="#30D158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="22" y1="28" x2="34" y2="28" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" />
        </DockSvg>
      </DockIcon>

      {/* Calendar / Speaking */}
      <DockIcon label="Speaking" onClick={() => onOpen('speaking')} active={activeSection === 'speaking'}>
        <DockSvg bg="white">
          <rect x="4" y="4" width="36" height="11" rx="5" fill="#FF3B30" />
          <text x="22" y="13" textAnchor="middle" fontSize="7" fill="white" fontWeight="800" fontFamily="system-ui">
            APR
          </text>
          <text x="22" y="36" textAnchor="middle" fontSize="18" fill="#1D1D1F" fontWeight="200" fontFamily="system-ui">
            10
          </text>
        </DockSvg>
      </DockIcon>

      {/* Notes / Testimonials */}
      <DockIcon label="Testimonials" onClick={() => onOpen('testimonials')} active={activeSection === 'testimonials'}>
        <DockSvg bg="#FFCC02">
          <rect x="8" y="8" width="28" height="28" rx="4" fill="white" />
          <rect x="12" y="14" width="18" height="1.5" rx="1" fill="#ddd" />
          <rect x="12" y="19" width="14" height="1.5" rx="1" fill="#ddd" />
          <rect x="12" y="24" width="16" height="1.5" rx="1" fill="#ddd" />
          <rect x="12" y="29" width="10" height="1.5" rx="1" fill="#ddd" />
        </DockSvg>
      </DockIcon>

      {/* Experience */}
      <DockIcon label="Experience" onClick={() => onOpen('experience')} active={activeSection === 'experience'}>
        <DockSvg bg="#34C759">
          <rect x="10" y="14" width="24" height="16" rx="3" fill="white" opacity="0.9" />
          <rect x="14" y="10" width="16" height="6" rx="2" fill="white" opacity="0.7" />
          <rect x="14" y="20" width="8" height="1.5" rx="1" fill="#34C759" />
          <rect x="14" y="24" width="12" height="1.5" rx="1" fill="#34C759" />
        </DockSvg>
      </DockIcon>

      {/* Divider */}
      <div style={{ width: 1, height: 34, background: 'rgba(255,255,255,0.18)', margin: '0 2px' }} />

      {/* Safari / Website */}
      <DockIcon label="Website" onClick={() => window.open(`https://${website}`, '_blank')}>
        <DockSvg bg="#007AFF">
          <circle cx="22" cy="22" r="12" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M22 10L25 19L34 22L25 25L22 34L19 25L10 22L19 19Z" fill="white" opacity="0.85" />
        </DockSvg>
      </DockIcon>

      {/* Mail */}
      <DockIcon label="Mail" onClick={() => window.open(`mailto:${email}`)}>
        <DockSvg bg="#007AFF">
          <rect x="9" y="13" width="26" height="18" rx="3" fill="white" opacity="0.9" />
          <path d="M9 16L22 24L35 16" stroke="#007AFF" strokeWidth="2" fill="none" />
        </DockSvg>
      </DockIcon>

      {/* GitHub */}
      <DockIcon label="GitHub" onClick={() => window.open(github, '_blank')}>
        <DockSvg bg="#1D1D1F">
          <path
            d="M22 10C15.4 10 10 15.4 10 22c0 5.3 3.4 9.8 8.2 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-.6-4-1.5-.5-1.2-1.3-1.5-1.3-1.5-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.7 2.9 1.2 3.6.9.1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.2.5-2.2 1.2-2.9-.1-.3-.6-1.5.1-3 0 0 1-.3 3.3 1.1.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.4 3.3-1.1 3.3-1.1.7 1.5.2 2.7.1 3 .7.7 1.1 1.7 1.1 2.9 0 4.5-2.8 5.5-5.5 5.8.5.4.9 1.1.9 2.3v3.1c0 .3.2.7.8.6C30.6 31.8 34 27.3 34 22c.2-6.6-5.2-12-11.8-12z"
            fill="white"
          />
        </DockSvg>
      </DockIcon>

      {/* LinkedIn */}
      <DockIcon label="LinkedIn" onClick={() => window.open(linkedin, '_blank')}>
        <DockSvg bg="#0A66C2">
          <path
            d="M15 18h3v12h-3V18zm1.5-5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM20 18h3v1.5c.5-.8 1.7-1.8 3.5-1.8 3.5 0 4 2.3 4 5.3v7h-3v-6.5c0-1.5 0-3.5-2-3.5s-2.5 1.5-2.5 3v7h-3V18z"
            fill="white"
          />
        </DockSvg>
      </DockIcon>

      {/* Gallery */}
      <DockIcon label="Gallery" onClick={() => onOpen('gallery')} active={activeSection === 'gallery'}>
        <DockSvg bg="#FF2D55">
          <rect x="8" y="12" width="28" height="20" rx="3" fill="white" opacity="0.9" />
          <circle cx="15" cy="19" r="3" fill="#FF2D55" opacity="0.7" />
          <path d="M8 26l8-6 6 5 4-3 8 8H8z" fill="#FF2D55" opacity="0.5" />
        </DockSvg>
      </DockIcon>

      {/* Terminal */}
      <DockIcon label="Terminal" onClick={() => onOpen('terminal')} active={activeSection === 'terminal'}>
        <DockSvg bg="#1C1C1E">
          <rect x="8" y="10" width="28" height="22" rx="4" fill="#2C2C2E" />
          <text x="13" y="25" fontSize="9" fill="#30D158" fontFamily="monospace" fontWeight="bold">{'>'}_</text>
        </DockSvg>
      </DockIcon>

      {/* Contact */}
      <DockIcon label="Contact" onClick={() => onOpen('contact')} active={activeSection === 'contact'}>
        <DockSvg bg="#FF2D55">
          <rect x="9" y="13" width="26" height="18" rx="3" fill="white" opacity="0.9" />
          <path d="M9 16L22 24L35 16" stroke="#FF2D55" strokeWidth="2" fill="none" />
          <circle cx="31" cy="14" r="5" fill="#FF2D55" />
          <text x="31" y="17.5" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">!</text>
        </DockSvg>
      </DockIcon>
    </div>
  );
}
