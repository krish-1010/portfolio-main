import BootScreen from '@/components/shared/BootScreen';
import ComicNav from '@/components/comics/ComicNav';
import ComicCover from '@/components/comics/ComicCover';
import ComicAbout from '@/components/comics/ComicAbout';
import ComicExperience from '@/components/comics/ComicExperience';
import ComicProjects from '@/components/comics/ComicProjects';
import ComicSkills from '@/components/comics/ComicSkills';
import ComicSpeaking from '@/components/comics/ComicSpeaking';
import ComicTestimonials from '@/components/comics/ComicTestimonials';
import ComicContact from '@/components/comics/ComicContact';
import ComicFooter from '@/components/comics/ComicFooter';

export const metadata = {
  title: 'The Krishna Chronicles — Portfolio',
  description:
    'Krishna M\'s portfolio in comic book form. ACK-style panels, Lord Krishna/Gita influence, the story of a Software Engineer.',
};

export default function ComicsPage() {
  return (
    <div
      style={{
        background: '#F5EFD7',
        minHeight: '100vh',
        fontFamily: 'var(--font-comic-neue)',
      }}
    >
      <BootScreen storageKey="km_booted_comic" variant="comic" />
      <ComicNav />

      <main
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: 'clamp(12px, 3vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* The Cover */}
        <ComicCover />

        {/* Lotus divider */}
        <LotusDiv label="BEGIN THE STORY" />

        {/* Chapter I — About */}
        <ComicAbout />

        {/* Gita interlude strip */}
        <GitaStrip
          verse="Na jaayate mriyate vaa kadaachin…"
          translation="The soul is not born, nor does it die."
          ch="Ch. 2, V. 20"
        />

        {/* Chapter II — Experience */}
        <ComicExperience />

        {/* Lotus divider */}
        <LotusDiv label="THE WORKS" />

        {/* Chapter III — Projects */}
        <ComicProjects />

        {/* Chapter IV — Skills */}
        <ComicSkills />

        {/* Lotus divider */}
        <LotusDiv label="THE SERVICE" />

        {/* Chapter V — Speaking */}
        <ComicSpeaking />

        {/* Chapter VI — Testimonials */}
        <ComicTestimonials />

        {/* Lotus divider */}
        <LotusDiv label="SEND THE SIGNAL" />

        {/* Chapter VII — Contact */}
        <ComicContact />
      </main>

      <ComicFooter />
    </div>
  );
}

// ─── Shared inline utilities ─────────────────────────────

function LotusDiv({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 0',
      }}
    >
      <div style={{ flex: 1, height: 3, background: '#1A1A1A', borderRadius: 2 }} />
      <span style={{ fontSize: 20 }}>🪷</span>
      <span
        style={{
          fontFamily: 'var(--font-bangers)',
          fontSize: 13,
          letterSpacing: '0.18em',
          color: '#5A3500',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 20 }}>🪷</span>
      <div style={{ flex: 1, height: 3, background: '#1A1A1A', borderRadius: 2 }} />
    </div>
  );
}

function GitaStrip({
  verse,
  translation,
  ch,
}: {
  verse: string;
  translation: string;
  ch: string;
}) {
  return (
    <div
      style={{
        background: '#0F3D6E',
        border: '3px solid #1A1A1A',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flexWrap: 'wrap',
        margin: '0',
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0 }}>🪷</span>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div
          style={{
            fontFamily: 'var(--font-comic-neue)',
            fontSize: 13,
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#FFD700',
            marginBottom: 3,
          }}
        >
          &ldquo;{verse}&rdquo;
        </div>
        <div
          style={{
            fontFamily: 'var(--font-comic-neue)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          {translation}
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-bangers)',
          fontSize: 12,
          letterSpacing: '0.1em',
          color: '#E8511A',
          flexShrink: 0,
        }}
      >
        {ch}
      </div>
    </div>
  );
}
