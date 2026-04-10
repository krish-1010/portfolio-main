'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { processCommand, CLEAR_SENTINEL, OutputLine } from '@/lib/terminalCommands';

interface HistoryEntry {
  command: string;
  output: OutputLine[];
}

const PROMPT = 'mission-control@krishna.os:~$';

const WELCOME: OutputLine[] = [
  { text: '╔══════════════════════════════════════════════╗', color: '#4F9CF7' },
  { text: '║  KRISHNA.OS v2.0  —  SHIP CONSOLE           ║', color: '#4F9CF7' },
  { text: '╚══════════════════════════════════════════════╝', color: '#4F9CF7' },
  { text: 'All systems nominal. Type "help" for commands.', dim: true },
  { text: '' },
];

export default function SpaceShipConsole() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length > 0 && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const submit = () => {
    const raw = input.trim();
    setInput('');
    setCmdIdx(-1);
    const output = processCommand(raw);
    if (output.length === 1 && output[0].text === CLEAR_SENTINEL) {
      setHistory([]);
      return;
    }
    setHistory(prev => [...prev, { command: raw, output }]);
    if (raw) setCmdHistory(prev => [raw, ...prev].slice(0, 50));
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(next);
      setInput(cmdHistory[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(cmdIdx - 1, -1);
      setCmdIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    }
    if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setHistory([]); }
  };

  return (
    <div className="reveal" style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Header strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 8,
          padding: '0 4px',
        }}
      >
        <div
          style={{
            height: 1,
            flex: 1,
            background: 'linear-gradient(to right, transparent, rgba(79,156,247,0.3))',
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#4F9CF7',
            fontFamily: 'var(--font-jetbrains)',
            textTransform: 'uppercase',
          }}
        >
          Ship Console
        </span>
        <div
          style={{
            height: 1,
            flex: 1,
            background: 'linear-gradient(to left, transparent, rgba(79,156,247,0.3))',
          }}
        />
      </div>

      {/* Terminal window */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="glass-card"
        style={{
          background: 'rgba(11,17,32,0.92)',
          border: '1px solid rgba(79,156,247,0.2)',
          borderRadius: 12,
          overflow: 'hidden',
          cursor: 'text',
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: 12.5,
          lineHeight: 1.65,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {['#FF5F57', '#FFBD2E', '#28C941'].map((c, i) => (
            <div
              key={i}
              style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }}
            />
          ))}
          <span
            style={{
              marginLeft: 8,
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-inter)',
            }}
          >
            terminal — krishna@portfolio
          </span>
          <div style={{ flex: 1 }} />
          <div
            style={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#30D158',
                boxShadow: '0 0 6px #30D158',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 10, color: '#30D158', fontFamily: 'var(--font-jetbrains)' }}>
              ONLINE
            </span>
          </div>
        </div>

        {/* Output area */}
        <div
          ref={outputRef}
          style={{
            height: 340,
            overflowY: 'auto',
            padding: '12px 16px 0',
            color: '#E5E5EA',
          }}
        >
          {WELCOME.map((l, i) => (
            <div
              key={`w${i}`}
              style={{
                color: l.color ?? (l.dim ? 'rgba(255,255,255,0.35)' : '#E5E5EA'),
                opacity: l.dim ? 0.55 : 1,
              }}
            >
              {l.text}
            </div>
          ))}

          {history.map((entry, hi) => (
            <div key={hi}>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <span style={{ color: '#4F9CF7', userSelect: 'none' }}>{PROMPT}</span>
                <span style={{ color: 'white' }}>{entry.command}</span>
              </div>
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
        </div>

        {/* Input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px 12px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <span className="console-prompt" style={{ color: '#4F9CF7', userSelect: 'none', flexShrink: 0, fontSize: 12 }}>
            {PROMPT}
          </span>
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
              caretColor: '#4F9CF7',
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 8,
          textAlign: 'center',
          fontSize: 11,
          color: 'rgba(255,255,255,0.2)',
          fontFamily: 'var(--font-jetbrains)',
        }}
      >
        ↑↓ history · ctrl+l to clear · type &apos;help&apos; to begin
      </div>

      <style>{`
        @media (max-width: 600px) {
          .console-prompt { display: none !important; }
        }
      `}</style>
    </div>
  );
}
