'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Dummy Data for Australian Spa & Companion Listings
const INITIAL_ADS = [
  {
    id: '1',
    title: 'Luxury Day Spa & Full Body Massage in Sydney CBD',
    city: 'Sydney',
    suburb: 'Sydney CBD',
    rate: 220,
    age: 24,
    category: 'Spa & Massage',
    isVerified: true,
    isFeatured: true,
    phone: '+61400000001',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
  },
  {
    id: '2',
    title: 'Relaxing Aromatherapy & Independent Companion',
    city: 'Melbourne',
    suburb: 'South Yarra',
    rate: 250,
    age: 22,
    category: 'Escorts & Companions',
    isVerified: true,
    isFeatured: false,
    phone: '+61400000002',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
  {
    id: '3',
    title: 'Deep Tissue Massage & Hydrotherapy Session',
    city: 'Brisbane',
    suburb: 'Fortitude Valley',
    rate: 180,
    age: 26,
    category: 'Spa & Massage',
    isVerified: false,
    isFeatured: true,
    phone: '+61400000003',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
  {
    id: '4',
    title: 'Private Virtual Chat & Outcall Service Available',
    city: 'Perth',
    suburb: 'Perth CBD',
    rate: 200,
    age: 23,
    category: 'Virtual & Dating',
    isVerified: true,
    isFeatured: false,
    phone: '+61400000004',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  },
];

export default function HomePage() {
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Check 18+ Verification on load
  useEffect(() => {
    const isVerified = localStorage.getItem('age_verified_18');
    if (!isVerified) {
      setShowAgeGate(true);
    }
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem('age_verified_18', 'true');
    setShowAgeGate(false);
  };

  const handleAgeReject = () => {
    window.location.href = 'https://www.google.com';
  };

  // Filter Ads based on Category & Search Keyword
  const filteredAds = INITIAL_ADS.filter((ad) => {
    const matchesCategory =
      activeCategory === 'All' || ad.category === activeCategory;
    const matchesSearch =
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-100 pb-16">
      {/* ================= 1. AGE GATE MODAL ================= */}
      {showAgeGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 text-center border border-amber-500/40 shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 font-bold text-xl border border-amber-500/30">
              18+
            </div>
            <h2 className="text-2xl font-black text-amber-500 mb-2">
              Age Verification Required
            </h2>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              This directory contains adult services, spa treatments, and companionship listings in Australia. You must be at least 18 years old to proceed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAgeConfirm}
                className="w-1/2 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm rounded-xl transition shadow-lg shadow-amber-500/20"
              >
                I am 18 or Older
              </button>
              <button
                onClick={handleAgeReject}
                className="w-1/2 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm rounded-xl transition"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. HERO SEARCH BANNER ================= */}
      <section className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 mb-3">
            🇦🇺 Australia's Premier Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Find Top Spa, Wellness & <span className="text-amber-500">Companionship</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
            Browse verified independent providers, local day spas, and private listings across major Australian cities.
          </p>

          {/* Search Box Input */}
          <div className="flex flex-col sm:flex-row items-center bg-zinc-900 p-2 rounded-2xl border border-zinc-800 shadow-xl gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suburb, keyword or city (e.g., Sydney CBD, Massage)..."
              className="w-full bg-transparent px-4 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none placeholder:text-zinc-500"
            />
            <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shrink-0">
              Search Ads
            </button>
          </div>
        </div>
      </section>

      {/* ================= 3. CATEGORY TABS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Spa & Massage', 'Escorts & Companions', 'Virtual & Dating'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition border ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ================= 4. MAIN ADS GRID ================= */}
      <section className="mx-auto max-w-7xl px-4 py-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-zinc-200 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Active Classified Listings ({filteredAds.length})
          </h2>
          <span className="text-xs text-zinc-500">Updated Real-Time</span>
        </div>

        {filteredAds.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center text-zinc-500 text-xs">
            No listings found matching your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900 border transition ${
                  ad.isFeatured
                    ? 'border-amber-500/50 shadow-lg shadow-amber-500/5'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  {/* Photo Section */}
                  <div className="relative h-60 w-full overflow-hidden bg-zinc-800">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {/* Badges Overlay */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {ad.isVerified && (
                        <span className="rounded-md bg-emerald-500/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-white shadow">
                          ✓ Verified
                        </span>
                      )}
                      {ad.isFeatured && (
                        <span className="rounded-md bg-amber-500/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-black shadow">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    {/* Rate Tag */}
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/80 backdrop-blur border border-zinc-700/50 px-2.5 py-1 text-xs font-bold text-amber-400">
                      ${ad.rate} AUD / hr
                    </span>
                  </div>

                  {/* Details Section */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                      <span>📍 {ad.suburb}, {ad.city}</span>
                      <span>Age: {ad.age}</span>
                    </div>

                    <h3 className="line-clamp-2 text-xs font-bold text-zinc-100 group-hover:text-amber-500 transition leading-snug">
                      {ad.title}
                    </h3>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 pt-0 border-t border-zinc-800/60 mt-3">
                  <div className="flex items-center gap-2 pt-3">
                    <a
                      href={`https://wa.me/${ad.phone.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-emerald-600/20 border border-emerald-500/30 py-2 text-center text-[11px] font-semibold text-emerald-400 hover:bg-emerald-600 hover:text-white transition"
                    >
                      WhatsApp
                    </a>
                    <Link
                      href={`/ad/${ad.id}`}
                      className="flex-1 rounded-xl bg-zinc-800 border border-zinc-700 py-2 text-center text-[11px] font-semibold text-zinc-200 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
        }
