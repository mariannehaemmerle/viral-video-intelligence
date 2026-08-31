// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Viral Video Intelligence - AI Video Analyzer',
  description:
    'Predict video virality, auto-edit short-form videos, and generate viral content ideas',
  keywords: [
    'viral',
    'video',
    'ai',
    'tiktok',
    'reels',
    'youtube shorts',
    'editing',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <header className="sticky top-0 z-50 bg-white shadow">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-orange-600">🎬</div>
              <h1 className="text-2xl font-bold text-gray-900">
                Viral Video Intelligence
              </h1>
            </div>
            <div className="flex gap-4">
              <a
                href="/"
                className="px-4 py-2 text-gray-700 hover:text-orange-600 transition"
              >
                Dashboard
              </a>
              <a
                href="/upload"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                Upload Video
              </a>
            </div>
          </nav>
        </header>

        <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
          {children}
        </main>

        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">
              Built with ❤️ for creators by Marianne Hämmerle
            </p>
            <p className="text-xs text-gray-500 mt-2">
              © 2025 Viral Video Intelligence. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
