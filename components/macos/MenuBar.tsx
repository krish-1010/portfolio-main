'use client';

import { useState } from 'react';

type MenuAction = (action: string) => void;

interface MenuItem {
  label: string;
  shortcut?: string;
  action: (() => void) | null;
}

type MenuEntry = MenuItem | 'sep';

interface Props {
  onAction: MenuAction;
  time: string;
  activeSection: string | null;
}

export default function MenuBar({ onAction, time, activeSection }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menus: Record<string, MenuEntry[]> = {
    File: [
      { label: 'New Window', shortcut: '⌘N', action: null },
      { label: 'New Tab', shortcut: '⌘T', action: null },
      { label: 'Spotlight Search', shortcut: '⌘K', action: null },
      'sep',
      { label: 'Download Resume', shortcut: '⌘R', action: () => onAction('resume') },
      {
        label: 'Share Portfolio',
        shortcut: '⇧⌘C',
        action: () => {
          navigator.clipboard?.writeText('https://mkrishna.dev');
          onAction('copied');
        },
      },
      'sep',
      { label: 'Print...', shortcut: '⌘P', action: () => window.print() },
      { label: 'Close Window', shortcut: '⌘W', action: () => onAction('close') },
    ],
    Edit: [
      {
        label: 'Copy Email',
        shortcut: '',
        action: () => {
          navigator.clipboard?.writeText('krishna@mkrishna.dev');
          onAction('email-copied');
        },
      },
      {
        label: 'Copy Page URL',
        shortcut: '',
        action: () => {
          navigator.clipboard?.writeText(
            typeof window !== 'undefined' ? window.location.href : 'https://mkrishna.dev/desktop'
          );
          onAction('url-copied');
        },
      },
      'sep',
      { label: 'Find on Page', shortcut: '⌘F', action: null },
    ],
    View: [
      { label: 'About Me', shortcut: '', action: () => onAction('open:about') },
      { label: 'Projects', shortcut: '', action: () => onAction('open:projects') },
      { label: 'Experience', shortcut: '', action: () => onAction('open:experience') },
      'sep',
      { label: 'Skills', shortcut: '', action: () => onAction('open:skills') },
      { label: 'Testimonials', shortcut: '', action: () => onAction('open:testimonials') },
      { label: 'Speaking', shortcut: '', action: () => onAction('open:speaking') },
      { label: 'Education', shortcut: '', action: () => onAction('open:education') },
      { label: 'Contact', shortcut: '', action: () => onAction('open:contact') },
      { label: 'Gallery', shortcut: '', action: () => onAction('open:gallery') },
      { label: 'Terminal', shortcut: '⌘T', action: () => onAction('open:terminal') },
    ],
    Go: [
      {
        label: 'GitHub',
        shortcut: '',
        action: () => window.open('https://github.com/krish-1010', '_blank'),
      },
      {
        label: 'LinkedIn',
        shortcut: '',
        action: () => window.open('https://linkedin.com/in/mkrishna10', '_blank'),
      },
      {
        label: 'Main Site',
        shortcut: '',
        action: () => window.open('https://mkrishna.dev', '_blank'),
      },
    ],
  };

  const close = () => setOpenMenu(null);

  return (
    <>
      {openMenu && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 59 }}
          onClick={close}
        />
      )}
      <div
        style={{
          height: 26,
          background: 'rgba(22,22,22,0.82)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          fontSize: 13,
          color: 'rgba(255,255,255,0.92)',
          fontWeight: 500,
          flexShrink: 0,
          zIndex: 60,
          position: 'relative',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {/* Left: Apple + App menus */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <span style={{ fontSize: 15, marginRight: 18, cursor: 'default', opacity: 0.9 }}>&#63743;</span>
          <span style={{ fontWeight: 700, marginRight: 20, cursor: 'default', fontSize: 13 }}>
            Krishna M
          </span>

          {Object.keys(menus).map(key => (
            <div key={key} style={{ position: 'relative' }}>
              <span
                onClick={() => setOpenMenu(openMenu === key ? null : key)}
                style={{
                  padding: '2px 10px',
                  cursor: 'default',
                  borderRadius: 4,
                  background: openMenu === key ? 'rgba(255,255,255,0.18)' : 'transparent',
                  opacity: openMenu === key ? 1 : 0.8,
                  display: 'inline-block',
                  lineHeight: '20px',
                }}
              >
                {key}
              </span>

              {openMenu === key && (
                <div
                  style={{
                    position: 'absolute',
                    top: 23,
                    left: 0,
                    minWidth: 230,
                    background: 'rgba(36,36,36,0.97)',
                    backdropFilter: 'blur(50px)',
                    WebkitBackdropFilter: 'blur(50px)',
                    borderRadius: 7,
                    padding: '4px 0',
                    boxShadow:
                      '0 12px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.1)',
                    zIndex: 70,
                    animation: 'menuDrop 0.12s ease-out',
                  }}
                >
                  {menus[key].map((item, i) =>
                    item === 'sep' ? (
                      <div
                        key={i}
                        style={{
                          height: 1,
                          background: 'rgba(255,255,255,0.08)',
                          margin: '4px 0',
                        }}
                      />
                    ) : (
                      <div
                        key={i}
                        onClick={() => {
                          item.action?.();
                          close();
                        }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '5px 14px',
                          fontSize: 13,
                          color: item.action
                            ? 'rgba(255,255,255,0.92)'
                            : 'rgba(255,255,255,0.3)',
                          cursor: item.action ? 'default' : 'default',
                          borderRadius: 5,
                          margin: '0 4px',
                          transition: 'background 0.08s',
                        }}
                        onMouseEnter={e => {
                          if (item.action)
                            (e.currentTarget as HTMLElement).style.background = '#0058D0';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span style={{ opacity: 0.4, marginLeft: 28, fontSize: 12 }}>
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 12,
            opacity: 0.8,
          }}
        >
          <span>{time}</span>
        </div>
      </div>
    </>
  );
}
