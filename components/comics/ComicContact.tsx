import SoundEffect from './SoundEffect';
import CaptionBox from './CaptionBox';
import ContactForm from '@/components/shared/ContactForm';
import profile from '@/data/profile.json';

export default function ComicContact() {
  return (
    <section id="contact" style={{ scrollMarginTop: 60 }}>
      <div
        style={{
          background: '#E8511A',
          padding: '8px 20px',
          border: '3px solid #1A1A1A',
          borderBottom: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bangers)',
            fontSize: 28,
            letterSpacing: '0.1em',
            color: 'white',
            textShadow: '2px 2px 0 #1A1A1A',
          }}
        >
          Chapter VII: The Signal
        </span>
        <span
          style={{
            fontFamily: 'var(--font-comic-neue)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
            marginLeft: 12,
            fontStyle: 'italic',
          }}
        >
          (Send a Message)
        </span>
      </div>

      <div
        style={{
          border: '3px solid #1A1A1A',
          background: '#FFF8E7',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
        className="comic-contact-grid"
      >
        {/* Left panel — call to action */}
        <div
          style={{
            padding: '28px 24px',
            background: '#0F3D6E',
            borderRight: '3px solid #1A1A1A',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <SoundEffect word="RING!" size={52} color="#FFD700" rotate={-6} />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 'clamp(24px, 4vw, 40px)',
              letterSpacing: '0.04em',
              color: 'white',
              textShadow: '3px 3px 0 #1A1A1A',
              lineHeight: 1.1,
            }}
          >
            LET&apos;S BUILD
            <br />
            <span style={{ color: '#FFD700' }}>SOMETHING</span>
            <br />
            TOGETHER!
          </div>

          <CaptionBox
            translation="Whatever you do, do it as an offering to the Lord."
            attribution="Bhagavad Gita · Ch. 9, Verse 27"
            color="#FFD700"
          />

          {/* Direct links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
              href={`mailto:${profile.email}`}
              style={{
                fontFamily: 'var(--font-bangers)',
                fontSize: 14,
                letterSpacing: '0.08em',
                color: '#1A1A1A',
                background: '#FFD700',
                padding: '8px 14px',
                border: '3px solid #1A1A1A',
                borderRadius: 3,
                textDecoration: 'none',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              📧 {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-bangers)',
                fontSize: 14,
                letterSpacing: '0.08em',
                color: 'white',
                background: '#0A66C2',
                padding: '8px 14px',
                border: '3px solid #1A1A1A',
                borderRadius: 3,
                textDecoration: 'none',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
              }}
            >
              💼 LINKEDIN ↗
            </a>
          </div>
        </div>

        {/* Right panel — form */}
        <div style={{ padding: '24px 20px', background: 'white' }}>
          <div
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 18,
              letterSpacing: '0.1em',
              color: '#E8511A',
              marginBottom: 16,
              textShadow: '1px 1px 0 rgba(0,0,0,0.15)',
            }}
          >
            SEND YOUR MESSAGE:
          </div>
          <ContactForm
            variant="comic"
            email={profile.email}
            linkedin={profile.linkedin}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .comic-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
