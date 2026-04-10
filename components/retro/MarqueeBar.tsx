// CSS-only scrolling marquee bar (no <marquee> tag)

const ITEMS = [
  '★ KRISHNA M — FULL STACK ENGINEER',
  '◆ NEXT.JS · NODE.JS · REACT · JAVA · PYTHON',
  '★ AVAILABLE FOR PROJECTS',
  '◆ GUEST LECTURER · MENTOR · CO-FOUNDER',
  '★ BUILT 13+ SPEAKING ENGAGEMENTS',
  '◆ OBSERVATIONAL ASTRONOMY ENTHUSIAST',
  '★ MKRISHNA.DEV',
];

export default function MarqueeBar() {
  // Duplicate to create seamless loop
  const text = [...ITEMS, ...ITEMS].join('   ·   ');

  return (
    <div
      style={{
        background: '#000080',
        color: '#FFFF00',
        padding: '4px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: 13,
        fontFamily: 'var(--font-ibm-plex-mono), monospace',
        fontWeight: 500,
        letterSpacing: '0.04em',
        borderBottom: '2px solid #C0C0C0',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          animation: 'retroMarquee 28s linear infinite',
          paddingLeft: '100%',
        }}
      >
        {text}
      </div>

      <style>{`
        @keyframes retroMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
