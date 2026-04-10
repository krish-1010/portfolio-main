'use client';

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

interface Props {
  active: SectionId;
  onNav: (id: SectionId) => void;
}

const DOCS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'terminal', label: 'Terminal' },
];

export default function FinderSidebar({ active, onNav }: Props) {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      {/* Documents group */}
      <div
        style={{
          padding: '0 14px 6px',
          fontSize: 11,
          fontWeight: 700,
          color: '#86868B',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Documents
      </div>

      {DOCS.map(f => {
        const isActive = active === f.id;
        return (
          <div
            key={f.id}
            onClick={() => onNav(f.id)}
            style={{
              padding: '5px 14px',
              fontSize: 13,
              margin: '1px 6px',
              borderRadius: 6,
              cursor: 'default',
              color: isActive ? 'white' : '#1D1D1F',
              fontWeight: isActive ? 500 : 400,
              background: isActive ? '#007AFF' : 'transparent',
              transition: 'background 0.1s, color 0.1s',
            }}
            onMouseEnter={e => {
              if (!isActive)
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={e => {
              if (!isActive)
                (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            {f.label}
          </div>
        );
      })}

      {/* Links group */}
      <div
        style={{
          padding: '10px 14px 6px',
          fontSize: 11,
          fontWeight: 700,
          color: '#86868B',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginTop: 4,
        }}
      >
        Links
      </div>

      {[
        { label: 'GitHub', url: 'https://github.com/krish-1010' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/mkrishna10' },
      ].map(x => (
        <a
          key={x.label}
          href={x.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '5px 14px',
            fontSize: 13,
            color: '#007AFF',
            textDecoration: 'none',
            margin: '1px 6px',
            borderRadius: 6,
            transition: 'background 0.1s',
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLElement).style.background = 'rgba(0,122,255,0.07)')
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLElement).style.background = 'transparent')
          }
        >
          {x.label} ↗
        </a>
      ))}
    </div>
  );
}
