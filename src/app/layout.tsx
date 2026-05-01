import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import SlideMenu from '@/components/slide-menu/slide-menu';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Tanakrit Karaket — Presentation',
  description: 'A weighted, deliberate look at who I am and what I do.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="font-body relative flex min-h-screen flex-row items-start text-white">
        <div className="grid-bg pointer-events-none fixed inset-0 opacity-50" />
        <aside className="sticky top-0 z-10 flex h-screen w-16 shrink-0 items-center justify-center">
          <SlideMenu />
        </aside>
        <main className="relative z-0 min-w-0 flex-1">{children}</main>
      </body>
    </html>
  );
}
