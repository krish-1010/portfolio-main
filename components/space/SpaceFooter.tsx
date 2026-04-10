import type { Profile } from '@/types';

interface Props {
  profile: Profile;
}

export default function SpaceFooter({ profile }: Props) {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px clamp(16px, 6vw, 80px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        fontSize: 13,
        color: 'rgba(255,255,255,0.35)',
        fontFamily: 'var(--font-inter)',
      }}
    >
      <div>
        <span style={{ color: 'rgba(255,255,255,0.55)' }}>Krishna M</span> — Built with Next.js · Chennai, India
      </div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = 'white')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = 'white')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = 'white')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
        >
          Email
        </a>
      </div>
    </footer>
  );
}
