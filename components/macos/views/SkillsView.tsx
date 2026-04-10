import skillsData from '@/data/skills.json';
import type { Skills } from '@/types';

const skills = skillsData as Skills;

const CAT_COLORS: Record<string, string> = {
  Languages: '#007AFF',
  Frontend: '#30D158',
  Backend: '#FF9500',
  Databases: '#AF52DE',
  'DevOps & Tools': '#FF3B30',
  'AI & ML': '#5856D6',
  Integrations: '#FF2D55',
  Other: '#8E8E93',
};

export default function SkillsView() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {Object.entries(skills).map(([cat, items]) => {
        const color = CAT_COLORS[cat] ?? '#007AFF';
        return (
          <div key={cat}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 8,
              }}
            >
              {cat}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {items.map((s, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 10px',
                    fontSize: 12,
                    background: `${color}10`,
                    color,
                    borderRadius: 6,
                    fontWeight: 500,
                    border: `1px solid ${color}20`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
