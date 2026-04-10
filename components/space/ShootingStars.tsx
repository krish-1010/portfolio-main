'use client';

// Reduced to 3 stars with long delays — subtle, not distracting
const STARS = [
  { delay: '8s',  dur: '1.3s', top: '7%'  },
  { delay: '28s', dur: '1.5s', top: '18%' },
  { delay: '52s', dur: '1.2s', top: '4%'  },
];

export default function ShootingStars() {
  return (
    <>
      <style>{`
        @keyframes shootLeft {
          0%   { opacity: 0; transform: translate(0, 0); }
          6%   { opacity: 0.7; }
          88%  { opacity: 0.5; }
          100% { opacity: 0; transform: translate(-110vw, 18vh); }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}
      >
        {STARS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: s.top,
              right: 0,
              width: 140,
              height: 1.5,
              background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.55) 60%, white)',
              borderRadius: 2,
              animation: `shootLeft ${s.dur} ease-in infinite`,
              animationDelay: s.delay,
              opacity: 0,
              transformOrigin: 'right center',
            }}
          />
        ))}
      </div>
    </>
  );
}
