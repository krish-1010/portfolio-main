import VisitorCounter from './VisitorCounter';
import type { Profile } from '@/types';

interface Props {
  profile: Profile;
}

export default function RetroFooter({ profile }: Props) {
  return (
    <footer
      style={{
        background: '#C0C0C0',
        borderTop: '2px solid',
        borderColor: '#808080 #FFFFFF #FFFFFF #808080',
        padding: '6px 16px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
        position: 'sticky',
        bottom: 0,
        zIndex: 50,
        fontFamily: 'var(--font-ibm-plex-mono), monospace',
        fontSize: 12,
      }}
    >
      {/* Status panels */}
      <div
        className="retro-bevel-in"
        style={{
          padding: '2px 10px',
          background: '#C0C0C0',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#00FF00',
            display: 'inline-block',
            animation: 'retroBlink 2s step-end infinite',
          }}
        />
        {profile.name} — Online — {profile.location}
      </div>

      <div className="retro-bevel-in" style={{ padding: '2px 10px', background: '#C0C0C0' }}>
        <VisitorCounter />
      </div>

      <div style={{ flex: 1 }} />

      <div
        className="retro-bevel-in"
        style={{ padding: '2px 10px', background: '#C0C0C0' }}
      >
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="retro-link">
          GitHub
        </a>
        {' · '}
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="retro-link">
          LinkedIn
        </a>
        {' · '}
        <a href={`mailto:${profile.email}`} className="retro-link">
          Email
        </a>
      </div>

      <style>{`
        @keyframes retroBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </footer>
  );
}
