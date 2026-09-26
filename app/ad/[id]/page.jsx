'use client';

import { useState } from 'react';
import Link from 'next/link';

// Dummy Single Ad Details Data
const AD_DETAILS = {
  id: '1',
  title: 'Luxury Day Spa & Full Body Wellness Therapy in Sydney CBD',
  city: 'Sydney',
  suburb: 'Sydney CBD',
  age: 24,
  ethnicity: 'Caucasian / Australian',
  height: "5'7\" (170cm)",
  category: 'Spa & Massage',
  isVerified: true,
  phone: '+61 400 000 001',
  rates: {
    thirtyMin: 120,
    oneHour: 220,
    twoHours: 400,
    incall: 'Available (Luxury Private Suite)',
    outcall: 'Available (Hotels & Apartments)',
  },
  services: [
    'Aromatherapy Massage',
    'Deep Tissue Bodywork',
    'Swedish Massage',
    'Hydrotherapy Session',
    'Incall Available',
    'Outcall Available',
  ],
  description: `Welcome to my private relaxation space in the heart of Sydney CBD. Offering high-end, professional wellness and bodywork sessions tailored to melt your stress away. 

Clean, private, and discreet environment with air conditioning, fresh towels, and shower facilities available before and after sessions. Bookings via WhatsApp or SMS preferred.`,
  images: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=80',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1000&q=80',
  ],
};

export default function AdDetailPage() {
  const [activeImage, setActiveImage] = useState(AD_DETAILS.images[0]);
  const [showPhone, setShowPhone] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pb-16 pt-6">
      <div className="mx-auto max-w-6xl px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-amber-500 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-500">{AD_DETAILS.city}</span>
          <span>/</span>
          <span className="text-amber-500 line-clamp-1">{AD_DETAILS.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= LEFT COLUMN: IMAGES GALLERY & DESCRIPTION ================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Featured Image */}
            <div className="relative h-96 sm:h-[480px] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
              <img
                src={activeImage}
                alt={AD_DETAILS.title}
                className="h-full w-full object-cover transition duration-300"
              />
              {AD_DETAILS.isVerified && (
                <span className="absolute top-3 left-3 rounded-md bg-emerald-500/90 backdrop-blur px-3 py-1 text-xs font-bold text-white shadow">
                  ✓ Verified Photos
                </span>
              )}
            </div>

            {/* Thumbnail Selection Bar */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {AD_DETAILS.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                    activeImage === img
                      ? 'border-amber-500 scale-95 shadow-md shadow-amber-500/20'
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description Box */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-lg font-bold text-amber-500 mb-4 border-l-4 border-amber-500 pl-3">
                About This Listing
              </h2>
              <p className="whitespace-pre-line text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {AD_DETAILS.description}
              </p>
            </div>

            {/* Services Checklist */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-lg font-bold text-amber-500 mb-4 border-l-4 border-amber-500 pl-3">
                Services Offered
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {AD_DETAILS.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80 px-3 py-2 text-xs text-zinc-300"
                  >
                    <span className="text-emerald-400 font-bold">✓</span>
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: QUICK INFO & CONTACT BOX ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Key Highlights Card */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-xl">
              <span className="inline-block rounded-md bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-[11px] font-bold text-amber-400">
                {AD_DETAILS.category}
              </span>

              <h1 className="text-xl font-extrabold text-white leading-snug">
                {AD_DETAILS.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-zinc-400 border-b border-zinc-800 pb-4">
                <span>📍 {AD_DETAILS.suburb}, {AD_DETAILS.city}</span>
                <span>•</span>
                <span>Age: {AD_DETAILS.age}</span>
              </div>

              {/* Quick Specs Table */}
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/60">
                <div>
                  <span className="text-zinc-500 block">Height</span>
                  <span className="font-semibold">{AD_DETAILS.height}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Ethnicity</span>
                  <span className="font-semibold">{AD_DETAILS.ethnicity}</span>
                </div>
              </div>

              {/* Rates Breakdown */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Rates (AUD $)
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-zinc-800/40">
                    <span className="text-zinc-400">30 Minutes</span>
                    <span className="font-bold text-amber-400">${AD_DETAILS.rates.thirtyMin} AUD</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/40">
                    <span className="text-zinc-400">1 Hour</span>
                    <span className="font-bold text-amber-400">${AD_DETAILS.rates.oneHour} AUD</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/40">
                    <span className="text-zinc-400">2 Hours</span>
                    <span className="font-bold text-amber-400">${AD_DETAILS.rates.twoHours} AUD</span>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                {/* Reveal Phone Button */}
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-amber-500/20"
                >
                  {showPhone ? AD_DETAILS.phone : '📞 Click to Reveal Phone Number'}
                </button>

                {/* WhatsApp Direct Link */}
                <a
                  href={`https://wa.me/${AD_DETAILS.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-emerald-600/20"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Safety Notice & Report Button */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-4 text-center space-y-2">
              <p className="text-[11px] text-zinc-500">
                Always meet in a safe location. Never send advance deposits to unverified providers.
              </p>
              <button
                onClick={() => setShowReportModal(true)}
                className="text-xs font-semibold text-rose-400 hover:underline"
              >
                🚩 Report this Ad
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= REPORT AD MODAL ================= */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 border border-zinc-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Report Listing</h3>
            <p className="text-xs text-zinc-400">
              Please select the reason why you are reporting this ad:
            </p>
            <select className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500">
              <option value="fake">Fake Photos / Scam</option>
              <option value="underage">Underage Concerns</option>
              <option value="phone">Wrong Phone Number</option>
              <option value="spam">Spam / Duplicate Listing</option>
            </select>
            <textarea
              rows={3}
              placeholder="Provide additional details..."
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 resize-none"
            ></textarea>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition"
              >
                Submit Report
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-1/2 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
                    }
