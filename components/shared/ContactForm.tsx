'use client';

import { useState } from 'react';

const ENDPOINT = 'https://getform.io/f/82943b03-8289-4ff9-bd88-d31bc4601ce4';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Variant = 'space' | 'macos' | 'comic';

interface Props {
  variant?: Variant;
  email?: string;
  linkedin?: string;
}

export default function ContactForm({
  variant = 'space',
  email = 'krishna@mkrishna.dev',
  linkedin = 'https://linkedin.com/in/mkrishna10',
}: Props) {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'space') return <SpaceForm status={status} onSubmit={handleSubmit} email={email} linkedin={linkedin} />;
  if (variant === 'macos') return <MacForm status={status} onSubmit={handleSubmit} />;
  return <ComicForm status={status} onSubmit={handleSubmit} />;
}

// ─── Space variant ───────────────────────────────────────

function SpaceForm({
  status, onSubmit, email, linkedin,
}: {
  status: Status;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  linkedin: string;
}) {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: 'white',
    fontSize: 14,
    fontFamily: 'var(--font-inter)',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div>
      {/* Info row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        {[
          { icon: '✉', label: 'Email', value: email, href: `mailto:${email}` },
          { icon: '🔗', label: 'LinkedIn', value: 'connect with me', href: linkedin },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.label === 'LinkedIn' ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 18px',
              flex: 1,
              minWidth: 200,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,156,247,0.3)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)')}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(79,156,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'white', fontFamily: 'var(--font-inter)' }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>{item.value}</div>
            </div>
          </a>
        ))}
      </div>

      {status === 'sent' ? (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#4F9CF7', fontFamily: 'var(--font-space-grotesk)', marginBottom: 6 }}>Message sent!</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}>I'll get back to you soon.</div>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
            <input name="name" type="text" placeholder="Your Name" required style={inputStyle}
              onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(79,156,247,0.5)')}
              onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')} />
            <input name="email" type="email" placeholder="Your Email" required style={inputStyle}
              onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(79,156,247,0.5)')}
              onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
          <input name="subject" type="text" placeholder="Subject" required style={{ ...inputStyle, marginBottom: 12 }}
            onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(79,156,247,0.5)')}
            onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')} />
          <textarea name="message" placeholder="Message" rows={6} required
            style={{ ...inputStyle, resize: 'vertical', marginBottom: 16 }}
            onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(79,156,247,0.5)')}
            onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')} />
          <button type="submit" disabled={status === 'sending'}
            style={{
              padding: '11px 32px',
              background: status === 'sending' ? 'rgba(79,156,247,0.5)' : '#4F9CF7',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: status === 'sending' ? 'wait' : 'pointer',
              fontFamily: 'var(--font-inter)',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
            {status === 'sending' ? '⏳ Sending...' : '✉ Send Message'}
          </button>
          {status === 'error' && (
            <div style={{ marginTop: 10, fontSize: 13, color: '#FF6482', fontFamily: 'var(--font-inter)' }}>
              Something went wrong. Try emailing directly at {email}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

// ─── macOS variant ───────────────────────────────────────

function MacForm({ status, onSubmit }: { status: Status; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  const macInput: React.CSSProperties = {
    width: '100%',
    padding: '6px 10px',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 13,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    outline: 'none',
    color: '#1D1D1F',
  };

  return status === 'sent' ? (
    <div style={{ textAlign: 'center', padding: '24px 0', fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1D1D1F' }}>Message sent!</div>
      <div style={{ fontSize: 12, color: '#86868B', marginTop: 4 }}>I'll reply soon.</div>
    </div>
  ) : (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      {[
        { name: 'name', label: 'From', placeholder: 'Your Name', type: 'text' },
        { name: 'email', label: 'Reply-To', placeholder: 'your@email.com', type: 'email' },
        { name: 'subject', label: 'Subject', placeholder: 'Subject', type: 'text' },
      ].map(f => (
        <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(0,0,0,0.07)', paddingBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#86868B', width: 56, textAlign: 'right', flexShrink: 0 }}>{f.label}:</span>
          <input name={f.name} type={f.type} placeholder={f.placeholder} required style={{ ...macInput, border: 'none', padding: '3px 6px', flex: 1 }} />
        </div>
      ))}
      <textarea name="message" placeholder="Write your message here..." rows={5} required
        style={{ ...macInput, resize: 'vertical', marginTop: 4 }} />
      <button type="submit" disabled={status === 'sending'}
        style={{
          padding: '7px 20px',
          background: '#007AFF',
          border: 'none',
          borderRadius: 8,
          color: 'white',
          fontSize: 13,
          fontWeight: 600,
          cursor: status === 'sending' ? 'wait' : 'pointer',
          fontFamily: 'inherit',
          alignSelf: 'flex-end',
        }}>
        {status === 'sending' ? 'Sending...' : '▶ Send'}
      </button>
      {status === 'error' && <div style={{ fontSize: 12, color: '#FF3B30' }}>Failed to send. Try again.</div>}
    </form>
  );
}

// ─── Comic variant (placeholder, used in /comics) ────────

function ComicForm({ status, onSubmit }: { status: Status; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <div style={{ fontFamily: 'var(--font-comic-neue, "Comic Neue", cursive)' }}>
      {status === 'sent' ? (
        <div style={{ textAlign: 'center', padding: 24, border: '3px solid #000', background: '#FFD700' }}>
          <div style={{ fontFamily: 'var(--font-bangers, Bangers, cursive)', fontSize: 36, color: '#000' }}>
            MESSAGE SENT! 💥
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input name="name" type="text" placeholder="Your Name" required style={{ padding: '8px 12px', border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', background: 'white' }} />
            <input name="email" type="email" placeholder="Your Email" required style={{ padding: '8px 12px', border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', background: 'white' }} />
          </div>
          <input name="subject" type="text" placeholder="Subject" required style={{ padding: '8px 12px', border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', background: 'white' }} />
          <textarea name="message" placeholder="Message" rows={5} required style={{ padding: '8px 12px', border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', background: 'white', resize: 'vertical' }} />
          <button type="submit" disabled={status === 'sending'}
            style={{ padding: '10px 24px', background: '#FF3B30', border: '3px solid #000', fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'var(--font-bangers, Bangers, cursive)', letterSpacing: '0.05em', boxShadow: '3px 3px 0 #000' }}>
            {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE! 🚀'}
          </button>
          {status === 'error' && <div style={{ color: '#FF3B30', fontWeight: 700 }}>Failed! Try again.</div>}
        </form>
      )}
    </div>
  );
}
