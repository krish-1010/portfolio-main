// Retro 90s layout — teal checkerboard desktop background

interface Props {
  children: React.ReactNode;
}

export default function RetroLayout({ children }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        // Classic Win95/98 teal checkerboard desktop
        backgroundColor: '#008080',
        backgroundImage:
          'repeating-conic-gradient(#006868 0% 25%, #008080 0% 50%)',
        backgroundSize: '8px 8px',
        fontFamily: 'var(--font-ibm-plex-mono), "Courier New", monospace',
        color: '#000000',
        overflowX: 'hidden',
      }}
    >
      {children}

      <style>{`
        /* Retro-scoped overrides */
        .retro-bevel-out {
          border: 2px solid;
          border-color: #FFFFFF #808080 #808080 #FFFFFF;
        }
        .retro-bevel-in {
          border: 2px solid;
          border-color: #808080 #FFFFFF #FFFFFF #808080;
        }
        .retro-btn {
          background: #C0C0C0;
          border: 2px solid;
          border-color: #FFFFFF #808080 #808080 #FFFFFF;
          padding: 3px 14px;
          font-family: var(--font-ibm-plex-mono), monospace;
          font-size: 13px;
          cursor: pointer;
          color: #000;
          text-decoration: none;
          display: inline-block;
          transition: border-color 0.05s;
        }
        .retro-btn:active {
          border-color: #808080 #FFFFFF #FFFFFF #808080;
        }
        .retro-btn:hover {
          background: #D4D0C8;
        }
        .retro-link {
          color: #0000EE;
          text-decoration: underline;
          cursor: pointer;
        }
        .retro-link:visited {
          color: #551A8B;
        }
        .retro-tag {
          background: #C0C0C0;
          border: 1px solid #808080;
          padding: 2px 8px;
          font-size: 12px;
          font-family: var(--font-ibm-plex-mono), monospace;
        }

        /* Scrollbar */
        .retro-scroll::-webkit-scrollbar { width: 16px; }
        .retro-scroll::-webkit-scrollbar-track {
          background: #C0C0C0;
          border-left: 1px solid #808080;
        }
        .retro-scroll::-webkit-scrollbar-thumb {
          background: #C0C0C0;
          border: 2px solid;
          border-color: #FFFFFF #808080 #808080 #FFFFFF;
        }
      `}</style>
    </div>
  );
}
