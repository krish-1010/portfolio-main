import ContactForm from '@/components/shared/ContactForm';

export default function ContactView() {
  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#86868B',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 4,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        >
          New Message
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#1D1D1F',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          }}
        >
          Get in Touch
        </div>
      </div>

      <ContactForm
        variant="macos"
        email="krishna@mkrishna.dev"
        linkedin="https://linkedin.com/in/mkrishna10"
      />
    </div>
  );
}
