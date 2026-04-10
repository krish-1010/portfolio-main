'use client';

// Golden-angle distributed star positions — deterministic, no JS random needed
const makeStars = (count: number, seed: number) =>
  Array.from({ length: count }, (_, i) => ({
    x: ((i * 137.508 + seed) % 100).toFixed(3),
    y: ((i * 97.3 + seed * 0.7) % 100).toFixed(3),
    r: i % 3 === 0 ? 1.5 : i % 7 === 0 ? 2 : 1,
    opacity: (0.3 + (i % 8) * 0.09).toFixed(2),
    delay: `${(i % 5) * 0.8}s`,
    dur: `${3 + (i % 4)}s`,
  }));

const SM = makeStars(120, 13);
const MD = makeStars(40, 37);
const LG = makeStars(15, 71);

export default function StarField() {
  return (
    <div className="stars-layer" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        {/* Small dim stars */}
        {SM.map((s, i) => (
          <circle
            key={`sm-${i}`}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r * 0.015}
            fill="white"
            opacity={s.opacity}
          >
            <animate
              attributeName="opacity"
              values={`${s.opacity};0.05;${s.opacity}`}
              dur={s.dur}
              begin={s.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {/* Medium stars */}
        {MD.map((s, i) => (
          <circle
            key={`md-${i}`}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={0.04}
            fill="white"
            opacity={s.opacity}
          >
            <animate
              attributeName="opacity"
              values={`${s.opacity};0.1;${s.opacity}`}
              dur={s.dur}
              begin={s.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {/* Large bright stars with glow */}
        {LG.map((s, i) => (
          <g key={`lg-${i}`}>
            <circle cx={`${s.x}%`} cy={`${s.y}%`} r={0.12} fill="#4F9CF7" opacity={0.15} />
            <circle cx={`${s.x}%`} cy={`${s.y}%`} r={0.05} fill="white" opacity={0.9}>
              <animate
                attributeName="opacity"
                values="0.9;0.3;0.9"
                dur={s.dur}
                begin={s.delay}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
        {/* Subtle nebula glow patches */}
        <radialGradient id="nebula1" cx="30%" cy="25%" r="25%">
          <stop offset="0%" stopColor="#4F9CF7" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#4F9CF7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nebula2" cx="75%" cy="65%" r="30%">
          <stop offset="0%" stopColor="#9B70F9" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#9B70F9" stopOpacity="0" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#nebula1)" />
        <rect width="100%" height="100%" fill="url(#nebula2)" />
      </svg>
    </div>
  );
}
