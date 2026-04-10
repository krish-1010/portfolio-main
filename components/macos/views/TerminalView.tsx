'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import profile from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import speakingData from '@/data/speaking.json';
import educationData from '@/data/education.json';

// ─── Types ───────────────────────────────────────────────

interface OutputLine {
  text: string;
  color?: string;
  indent?: boolean;
  bold?: boolean;
  dim?: boolean;
}

interface HistoryEntry {
  command: string;
  output: OutputLine[];
}

// ─── Colour helpers ──────────────────────────────────────

const green  = (text: string): OutputLine => ({ text, color: '#30D158' });
const yellow = (text: string): OutputLine => ({ text, color: '#FFD60A' });
const blue   = (text: string): OutputLine => ({ text, color: '#64D2FF' });
const pink   = (text: string): OutputLine => ({ text, color: '#FF6482' });
const dim    = (text: string): OutputLine => ({ text, dim: true });
const bold   = (text: string): OutputLine => ({ text, bold: true });
const indent = (text: string, color?: string): OutputLine => ({ text, indent: true, color });

// ─── Command processor ───────────────────────────────────

function process(raw: string): OutputLine[] {
  const cmd = raw.trim().toLowerCase();

  if (!cmd) return [];

  if (cmd === 'help' || cmd === '?') {
    return [
      bold('Available commands:'),
      dim('─────────────────────────────────────────'),
      indent('about / whoami     ', '#64D2FF'),
      indent('experience / work  ', '#64D2FF'),
      indent('projects           ', '#64D2FF'),
      indent('skills             ', '#64D2FF'),
      indent('speaking           ', '#64D2FF'),
      indent('education          ', '#64D2FF'),
      indent('contact            ', '#64D2FF'),
      indent('github             ', '#64D2FF'),
      indent('linkedin           ', '#64D2FF'),
      indent('resume             ', '#64D2FF'),
      indent('clear              ', '#64D2FF'),
      dim('─────────────────────────────────────────'),
      dim('Tip: commands are case-insensitive.'),
    ].map((l, i) => {
      // Add descriptions inline
      const descs: Record<number, string> = {
        2: '— About Krishna',
        3: '— Work history',
        4: '— Project portfolio',
        5: '— Tech stack',
        6: '— Talks & workshops',
        7: '— Education',
        8: '— Get in touch',
        9: '— Open GitHub ↗',
        10: '— Open LinkedIn ↗',
        11: '— Download resume',
        12: '— Clear terminal',
      };
      if (descs[i]) return { ...l, text: l.text + descs[i] };
      return l;
    });
  }

  if (cmd === 'about' || cmd === 'whoami') {
    return [
      bold(`${profile.name}`),
      indent(`${profile.title}`, '#FF9500'),
      { text: '' },
      indent(profile.bio),
      { text: '' },
      green('📍 ' + profile.location),
      blue('🌐 ' + profile.website),
      { text: '' },
      dim('i love: ' + profile.iLove.join(', ')),
    ];
  }

  if (cmd === 'experience' || cmd === 'work' || cmd === 'jobs') {
    const lines: OutputLine[] = [bold('Work Experience'), { text: '' }];
    (experienceData as typeof experienceData).forEach(e => {
      lines.push({ text: `  ${e.role}  @  ${e.company}`, color: '#FFD60A', bold: true });
      lines.push(indent(`${e.period}`, '#86868B'));
      e.bullets.forEach(b => lines.push(indent(`▹ ${b}`)));
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'projects' || cmd === 'ls' || cmd === 'ls projects') {
    const lines: OutputLine[] = [bold('Projects'), { text: '' }];
    const p = projectsData as typeof projectsData;
    (['production', 'personal', 'research'] as const).forEach(cat => {
      lines.push(yellow(`[${cat.toUpperCase()}]`));
      p[cat].forEach(proj => {
        lines.push(indent(`  ${proj.name}`, '#64D2FF'));
        lines.push(indent(`    ${proj.tech}`, '#86868B'));
        if (proj.live)   lines.push(indent(`    live  → ${proj.live}`, '#30D158'));
        if (proj.github) lines.push(indent(`    code  → ${proj.github}`, '#86868B'));
      });
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'skills' || cmd === 'stack' || cmd === 'tech') {
    const lines: OutputLine[] = [bold('Tech Stack'), { text: '' }];
    const SKILL_COLORS: Record<string, string> = {
      Languages:   '#64D2FF',
      Frontend:    '#FF6482',
      Backend:     '#30D158',
      Databases:   '#FFD60A',
      DevOps:      '#FF9500',
      Tools:       '#AF52DE',
    };
    Object.entries(skillsData as Record<string, string[]>).forEach(([cat, items]) => {
      const col = SKILL_COLORS[cat] ?? '#64D2FF';
      lines.push({ text: `  ${cat}`, color: col, bold: true });
      lines.push(indent('  ' + items.join('  ·  '), '#86868B'));
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'speaking' || cmd === 'talks') {
    const lines: OutputLine[] = [bold('Speaking & Mentoring'), { text: '' }];
    (speakingData as typeof speakingData).forEach(s => {
      lines.push(indent(`[${s.year}]  ${s.event}`, '#64D2FF'));
      lines.push(indent(`         ${s.venue}  ·  ${s.type}`, '#86868B'));
    });
    return lines;
  }

  if (cmd === 'education' || cmd === 'edu') {
    const lines: OutputLine[] = [bold('Education'), { text: '' }];
    (educationData as { degree: string; school: string; period: string; notes?: string }[]).forEach(e => {
      lines.push(indent(`${e.degree}`, '#FFD60A'));
      lines.push(indent(`${e.school}  ·  ${e.period}`, '#86868B'));
      if (e.notes) lines.push(indent(e.notes, '#3C3C43'));
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'contact' || cmd === 'email' || cmd === 'hire') {
    return [
      bold('Contact Krishna'),
      { text: '' },
      indent(`📧  ${profile.email}`, '#64D2FF'),
      indent(`💼  ${profile.linkedin}`, '#0A66C2'),
      indent(`🐙  ${profile.github}`, '#86868B'),
      { text: '' },
      green('Open to freelance projects, collabs & full-time roles.'),
    ];
  }

  if (cmd === 'github') {
    if (typeof window !== 'undefined') window.open(profile.github, '_blank');
    return [green(`Opening ${profile.github} ...`)];
  }

  if (cmd === 'linkedin') {
    if (typeof window !== 'undefined') window.open(profile.linkedin, '_blank');
    return [green(`Opening ${profile.linkedin} ...`)];
  }

  if (cmd === 'resume' || cmd === 'cv') {
    if (typeof window !== 'undefined') {
      const a = document.createElement('a');
      a.href = '/krishna-resume.pdf';
      a.download = 'Krishna_M_Resume.pdf';
      a.click();
    }
    return [green('Downloading resume...')];
  }

  if (cmd === 'clear' || cmd === 'cls') {
    return [{ text: '__CLEAR__' }];
  }

  if (cmd === 'whoami') {
    return [green('krishna')];
  }

  if (cmd === 'pwd') {
    return [green('/Users/krishna/portfolio')];
  }

  if (cmd === 'ls') {
    return [
      { text: 'about/   experience/   projects/   skills/   speaking/   education/   contact/', color: '#64D2FF' },
    ];
  }

  if (cmd === 'uname' || cmd === 'uname -a') {
    return [dim('Krishna.OS 2.0 NextJS-arm64 Portfolio #2026 SMP Chennai India')];
  }

  if (cmd === 'date') {
    return [green(new Date().toDateString())];
  }

  if (cmd === 'sudo rm -rf /' || cmd === 'rm -rf /') {
    return [pink('Nice try. 😄')];
  }

  if (cmd === 'exit' || cmd === 'quit') {
    return [dim('(close the window to exit)')];
  }

  return [{ text: `command not found: ${raw}  (try 'help')`, color: '#FF3B30' }];
}

// ─── Component ───────────────────────────────────────────

const WELCOME: OutputLine[] = [
  green('Krishna.OS v2.0 — Terminal'),
  dim('Type "help" to see available commands.'),
  { text: '' },
];

const PROMPT = 'krishna@portfolio:~$';

export default function TerminalView() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const submit = () => {
    const raw = input.trim();
    setInput('');
    setCmdIdx(-1);

    const output = process(raw);

    if (output.length === 1 && output[0].text === '__CLEAR__') {
      setHistory([]);
      return;
    }

    setHistory(prev => [...prev, { command: raw, output }]);
    if (raw) setCmdHistory(prev => [raw, ...prev].slice(0, 50));
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(cmdIdx - 1, -1);
      setCmdIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        height: '100%',
        background: '#1C1C1E',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-jetbrains), "JetBrains Mono", "SF Mono", monospace',
        fontSize: 12.5,
        lineHeight: 1.65,
        color: '#E5E5EA',
        cursor: 'text',
      }}
    >
      {/* Output area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 16px 0',
        }}
      >
        {/* Welcome lines */}
        {WELCOME.map((l, i) => (
          <div key={`w${i}`} style={{ color: l.color ?? 'rgba(255,255,255,0.5)', opacity: l.dim ? 0.5 : 1 }}>
            {l.text}
          </div>
        ))}

        {/* Command history */}
        {history.map((entry, hi) => (
          <div key={hi}>
            {/* Prompt + command */}
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <span style={{ color: '#30D158', userSelect: 'none' }}>{PROMPT}</span>
              <span style={{ color: 'white' }}>{entry.command}</span>
            </div>

            {/* Output lines */}
            {entry.output.map((l, li) => (
              <div
                key={li}
                style={{
                  color: l.color ?? (l.dim ? 'rgba(255,255,255,0.38)' : '#E5E5EA'),
                  fontWeight: l.bold ? 700 : 400,
                  paddingLeft: l.indent ? 8 : 0,
                  opacity: l.dim ? 0.6 : 1,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {l.text}
              </div>
            ))}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px 12px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span style={{ color: '#30D158', userSelect: 'none', flexShrink: 0 }}>{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            caretColor: '#30D158',
          }}
        />
      </div>
    </div>
  );
}
