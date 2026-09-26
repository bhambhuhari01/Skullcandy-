import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Australia Spa & Classified Directory',
  description: 'Find verified spa, wellness, and companionship services in Australia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic Page Content */}
        <div className="min-h-[calc(100vh-140px)]">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-zinc-800 bg-zinc-900 py-6 text-center text-xs text-zinc-500">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 AusClassifieds Portal. All rights reserved. 18+ Only.</p>
            <div className="flex gap-4">
              <a href="/terms" className="hover:text-amber-500">Terms of Service</a>
              <a href="/privacy" className="hover:text-amber-500">Privacy Policy</a>
              <a href="/safety" className="hover:text-amber-500">Safety Guidelines</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
