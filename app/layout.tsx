import type { Metadata } from 'next';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gabi Fox Games - Game Store',
  description: 'Your ultimate destination for amazing games. Shop the latest releases with Gabi Fox Games.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f97316" width="100" height="100"/><text x="50" y="65" font-size="60" font-weight="bold" text-anchor="middle" fill="black">GF</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-black text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="font-sora font-semibold mb-2">© 2026 Gabi Fox Games. All rights reserved.</p>
            <p className="text-sm text-gray-400">Powered by Next.js & Vercel</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
