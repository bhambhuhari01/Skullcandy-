'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [city, setCity] = useState('sydney');

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-black tracking-wider text-amber-500">
          AUS<span className="text-white">DIRECTORY</span>
        </Link>

        {/* Location Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 hidden md:inline">📍 Location:</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-xs text-amber-400 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="sydney">Sydney, NSW</option>
            <option value="melbourne">Melbourne, VIC</option>
            <option value="brisbane">Brisbane, QLD</option>
            <option value="perth">Perth, WA</option>
            <option value="gold-coast">Gold Coast, QLD</option>
            <option value="adelaide">Adelaide, SA</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-zinc-300 hover:text-amber-500 transition hidden sm:block"
          >
            Login / Register
          </Link>
          <Link
            href="/post-ad"
            className="rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-black hover:bg-amber-600 transition shadow-lg shadow-amber-500/10"
          >
            + Post Free Ad
          </Link>
        </div>
      </div>
    </nav>
  );
}
