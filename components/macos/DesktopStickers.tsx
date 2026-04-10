interface StickerProps {
  children: React.ReactNode;
  style: React.CSSProperties;
}

function Sticker({ children, style }: StickerProps) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0.55,
        userSelect: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function DesktopStickers() {
  return (
    <>
      <Sticker style={{ top: '8%', left: '3%', fontSize: 26, transform: 'rotate(-15deg)', color: '#4F9CF7' }}>
        ⟨/⟩
      </Sticker>
      <Sticker style={{ top: '14%', left: '12%', fontSize: 16, opacity: 0.3 }}>★</Sticker>
      <Sticker style={{ top: '74%', left: '5%', fontSize: 22, transform: 'rotate(10deg)' }}>🔭</Sticker>
      <Sticker style={{ top: '58%', left: '14%', fontSize: 13, opacity: 0.3 }}>✦</Sticker>
      <Sticker style={{ top: '84%', left: '20%', fontSize: 15, opacity: 0.25 }}>⚡</Sticker>
      <Sticker style={{ top: '22%', left: '52%', fontSize: 11, opacity: 0.2 }}>✧</Sticker>
      <Sticker style={{ top: '42%', right: '9%', fontSize: 13, opacity: 0.25 }}>✦</Sticker>
      <Sticker
        style={{
          bottom: '16%',
          left: '38%',
          fontSize: 17,
          opacity: 0.25,
          transform: 'rotate(25deg)',
          fontFamily: 'monospace',
          color: '#30D158',
        }}
      >
        {'{ }'}
      </Sticker>
      <Sticker style={{ top: '5%', right: '22%', fontSize: 13, opacity: 0.3 }}>★</Sticker>
      <Sticker
        style={{
          top: '33%',
          left: '8%',
          fontSize: 18,
          opacity: 0.2,
          transform: 'rotate(-8deg)',
          fontFamily: 'monospace',
          color: '#FF9500',
        }}
      >
        $_
      </Sticker>
      <Sticker style={{ bottom: '24%', right: '14%', fontSize: 15, opacity: 0.25, color: '#AF52DE' }}>◈</Sticker>
      <Sticker style={{ top: '54%', left: '27%', fontSize: 9, opacity: 0.18 }}>●</Sticker>
      <Sticker style={{ top: '68%', left: '46%', fontSize: 11, opacity: 0.2 }}>✧</Sticker>
      <Sticker
        style={{ top: '11%', left: '36%', fontSize: 22, opacity: 0.12, transform: 'rotate(45deg)' }}
      >
        ⬡
      </Sticker>
    </>
  );
}
