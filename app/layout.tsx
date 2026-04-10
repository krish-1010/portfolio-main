import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono, VT323, IBM_Plex_Mono, Bangers, Comic_Neue } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt323',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const bangers = Bangers({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bangers',
  display: 'swap',
});

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comic-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Krishna M — Software Engineer',
  description:
    'Full Stack Engineer. I build web apps, mentor students, and give guest lectures. Next.js, Node.js, React, Java, Python.',
  openGraph: {
    title: 'Krishna M — Software Engineer',
    description: 'Portfolio of Krishna M — Software Engineer, Guest Lecturer, Mentor',
    url: 'https://mkrishna.dev',
    siteName: 'Krishna M',
    images: [{ url: '/og-image.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishna M — Software Engineer',
    description: 'Portfolio of Krishna M — Software Engineer, Guest Lecturer, Mentor',
  },
  metadataBase: new URL('https://mkrishna.dev'),
  alternates: { canonical: 'https://mkrishna.dev' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} ${vt323.variable} ${ibmPlexMono.variable} ${bangers.variable} ${comicNeue.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
