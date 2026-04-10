import profile from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import speakingData from '@/data/speaking.json';
import educationData from '@/data/education.json';

export interface OutputLine {
  text: string;
  color?: string;
  indent?: boolean;
  bold?: boolean;
  dim?: boolean;
}

// ─── Colour helpers ──────────────────────────────────────

export const tGreen  = (t: string): OutputLine => ({ text: t, color: '#30D158' });
export const tYellow = (t: string): OutputLine => ({ text: t, color: '#FFD60A' });
export const tBlue   = (t: string): OutputLine => ({ text: t, color: '#64D2FF' });
export const tPink   = (t: string): OutputLine => ({ text: t, color: '#FF6482' });
export const tDim    = (t: string): OutputLine => ({ text: t, dim: true });
export const tBold   = (t: string): OutputLine => ({ text: t, bold: true });
export const tIndent = (t: string, color?: string): OutputLine => ({ text: t, indent: true, color });

// ─── Processor ───────────────────────────────────────────

export const CLEAR_SENTINEL = '__CLEAR__';

export function processCommand(raw: string): OutputLine[] {
  const cmd = raw.trim().toLowerCase();

  if (!cmd) return [];

  if (cmd === 'help' || cmd === '?') {
    return [
      tBold('Available commands:'),
      tDim('─────────────────────────────────────────'),
      tIndent('about / whoami       — About Krishna',       '#64D2FF'),
      tIndent('experience / work    — Work history',        '#64D2FF'),
      tIndent('projects             — Project portfolio',   '#64D2FF'),
      tIndent('skills / stack       — Tech stack',          '#64D2FF'),
      tIndent('speaking / talks     — Talks & workshops',   '#64D2FF'),
      tIndent('education            — Education',           '#64D2FF'),
      tIndent('contact / email      — Get in touch',        '#64D2FF'),
      tIndent('github               — Open GitHub ↗',       '#64D2FF'),
      tIndent('linkedin             — Open LinkedIn ↗',     '#64D2FF'),
      tIndent('resume               — Download resume',     '#64D2FF'),
      tIndent('clear / cls          — Clear terminal',      '#64D2FF'),
      tDim('─────────────────────────────────────────'),
      tDim('Easter eggs: sherlock · batman · kratos · matrix'),
      tDim('Tip: ↑↓ for command history · Ctrl+L to clear'),
    ];
  }

  if (cmd === 'about' || cmd === 'whoami') {
    return [
      tBold(profile.name),
      tIndent(profile.title, '#FF9500'),
      { text: '' },
      tIndent(profile.bio),
      { text: '' },
      tGreen('📍 ' + profile.location),
      tBlue('🌐 ' + profile.website),
      { text: '' },
      tDim('i love: ' + profile.iLove.join(', ')),
    ];
  }

  if (cmd === 'experience' || cmd === 'work' || cmd === 'jobs') {
    const lines: OutputLine[] = [tBold('Work Experience'), { text: '' }];
    (experienceData as typeof experienceData).forEach(e => {
      lines.push({ text: `  ${e.role}  @  ${e.company}`, color: '#FFD60A', bold: true });
      lines.push(tIndent(e.period, '#86868B'));
      e.bullets.forEach(b => lines.push(tIndent('▹ ' + b)));
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'projects' || cmd === 'ls projects') {
    const lines: OutputLine[] = [tBold('Projects'), { text: '' }];
    const p = projectsData as typeof projectsData;
    (['production', 'personal', 'research'] as const).forEach(cat => {
      lines.push(tYellow(`[${cat.toUpperCase()}]`));
      p[cat].forEach(proj => {
        lines.push(tIndent('  ' + proj.name, '#64D2FF'));
        lines.push(tIndent('    ' + proj.tech, '#86868B'));
        if (proj.live)   lines.push(tIndent('    live  → ' + proj.live, '#30D158'));
        if (proj.github) lines.push(tIndent('    code  → ' + proj.github, '#86868B'));
      });
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'skills' || cmd === 'stack' || cmd === 'tech') {
    const lines: OutputLine[] = [tBold('Tech Stack'), { text: '' }];
    const COLORS: Record<string, string> = {
      Languages: '#64D2FF', Frontend: '#FF6482', Backend: '#30D158',
      Databases: '#FFD60A', 'DevOps & Tools': '#FF9500', 'AI & ML': '#AF52DE',
      Integrations: '#5856D6', Other: '#8E8E93',
    };
    Object.entries(skillsData as Record<string, string[]>).forEach(([cat, items]) => {
      lines.push({ text: '  ' + cat, color: COLORS[cat] ?? '#64D2FF', bold: true });
      lines.push(tIndent('  ' + items.join('  ·  '), '#86868B'));
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'speaking' || cmd === 'talks') {
    const lines: OutputLine[] = [tBold('Speaking & Mentoring'), { text: '' }];
    (speakingData as typeof speakingData).forEach(s => {
      lines.push(tIndent(`[${s.year}]  ${s.event}`, '#64D2FF'));
      lines.push(tIndent(`         ${s.venue}  ·  ${s.type}`, '#86868B'));
    });
    return lines;
  }

  if (cmd === 'education' || cmd === 'edu') {
    const lines: OutputLine[] = [tBold('Education'), { text: '' }];
    (educationData as { degree: string; school: string; period: string; notes?: string }[]).forEach(e => {
      lines.push(tIndent(e.degree, '#FFD60A'));
      lines.push(tIndent(`${e.school}  ·  ${e.period}`, '#86868B'));
      if (e.notes) lines.push(tIndent(e.notes, '#3C3C43'));
      lines.push({ text: '' });
    });
    return lines;
  }

  if (cmd === 'contact' || cmd === 'email' || cmd === 'hire') {
    return [
      tBold('Contact Krishna'),
      { text: '' },
      tIndent('📧  ' + profile.email,    '#64D2FF'),
      tIndent('💼  ' + profile.linkedin, '#0A66C2'),
      tIndent('🐙  ' + profile.github,   '#86868B'),
      { text: '' },
      tGreen('Open to freelance projects, collabs & full-time roles.'),
    ];
  }

  if (cmd === 'github') {
    if (typeof window !== 'undefined') window.open(profile.github, '_blank');
    return [tGreen('Opening ' + profile.github + ' ...')];
  }

  if (cmd === 'linkedin') {
    if (typeof window !== 'undefined') window.open(profile.linkedin, '_blank');
    return [tGreen('Opening ' + profile.linkedin + ' ...')];
  }

  if (cmd === 'resume' || cmd === 'cv') {
    if (typeof window !== 'undefined') {
      const a = document.createElement('a');
      a.href = '/krishna-resume.pdf';
      a.download = 'Krishna_M_Resume.pdf';
      a.click();
    }
    return [tGreen('Downloading Krishna_M_Resume.pdf...')];
  }

  if (cmd === 'clear' || cmd === 'cls') {
    return [{ text: CLEAR_SENTINEL }];
  }

  if (cmd === 'pwd') return [tGreen('/Users/krishna/portfolio')];
  if (cmd === 'ls') return [{ text: 'about/   experience/   projects/   skills/   speaking/   education/   contact/', color: '#64D2FF' }];
  if (cmd === 'date') return [tGreen(new Date().toDateString())];
  if (cmd === 'uname' || cmd === 'uname -a') return [tDim('Krishna.OS 2.0 NextJS-arm64 Portfolio #2026 SMP Chennai India')];
  if (cmd === 'sudo rm -rf /' || cmd === 'rm -rf /') return [tPink('Nice try. 😄')];
  if (cmd === 'exit' || cmd === 'quit') return [tDim('(close the window to exit)')];
  if (cmd === 'matrix') return [tGreen('Wake up, Neo...'), tDim('The Matrix has you.')];

  // ── Pop culture easter eggs ───────────────────────────
  if (cmd === 'sherlock' || cmd === 'holmes') return [
    tYellow('"Elementary, my dear Watson."'),
    tDim('— Sherlock Holmes (well, sort of)'),
    { text: '' },
    tIndent('The game is afoot. Deduction > brute force.', '#64D2FF'),
    tDim('(Krishna reads every Conan Doyle he can find)'),
  ];
  if (cmd === 'batman' || cmd === 'bruce wayne') return [
    tYellow('"I am vengeance. I am the night. I AM BATMAN."'),
    tDim('— Bruce Wayne, The Dark Knight'),
    { text: '' },
    tIndent("World's greatest detective. No superpowers, just prep.", '#64D2FF'),
    tDim('(No cave here — just a GitHub repo and cold filter coffee)'),
  ];
  if (cmd === 'kratos' || cmd === 'god of war' || cmd === 'gow') return [
    tPink('"BOY!"'),
    tDim('— Kratos, God of War'),
    { text: '' },
    tIndent('Spartan rage unlocked. Shipping features, not armies.', '#FF9500'),
    tDim('Leviathan Axe > keyboard? Debatable.'),
  ];

  return [{ text: `command not found: ${raw}  (try 'help')`, color: '#FF3B30' }];
}
