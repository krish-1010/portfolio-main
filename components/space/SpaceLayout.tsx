import StarField from './StarField';

interface Props {
  children: React.ReactNode;
}

export default function SpaceLayout({ children }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #070d1a 0%, #0B1120 20%, #0d1428 60%, #0B1120 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <StarField />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
