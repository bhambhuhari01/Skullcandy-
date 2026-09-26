'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PostAdPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Spa & Massage',
    city: 'Sydney',
    suburb: '',
    age: '',
    phone: '',
    whatsappAvailable: true,
    rateThirtyMin: '',
    rateOneHour: '',
    incall: true,
    outcall: false,
    description: '',
    services: [],
  });

  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Available Services Options
  const availableServices = [
    'Aromatherapy Massage',
    'Deep Tissue Massage',
    'Swedish Massage',
    'Hydrotherapy Session',
    'Full Body Relaxing',
    'Private Suite Incall',
    'Hotel Outcall',
    'Virtual Chat',
  ];

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle Services Checkbox Toggle
  const handleServiceToggle = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      if (exists) {
        return {
          ...prev,
          services: prev.services.filter((s) => s !== service),
        };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  // Handle Image Selection Preview
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // Remove Selected Image Preview
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan Supabase Database me data insert hoga
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pb-16 pt-8">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-amber-500 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-500">Post Free Ad</span>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          <div className="border-b border-zinc-800 pb-5 mb-6">
            <h1 className="text-2xl font-black text-amber-500">
              Post Your Free Ad
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Reach thousands of clients across Sydney, Melbourne, Brisbane & major Australian cities.
            </p>
          </div>

          {submitted ? (
            /* Success Message State */
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl border border-emerald-500/30">
                ✓
              </div>
              <h2 className="text-xl font-bold text-white">
                Ad Submitted Successfully!
              </h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Your ad is currently under automated review and will be live on the directory shortly.
              </p>
              <div className="pt-4 flex gap-3 justify-center">
                <Link
                  href="/"
                  className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-black hover:bg-amber-600 transition"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: BASIC INFORMATION */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                  1. Basic Details
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Ad Title / Headline *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Luxury Day Spa & Relaxation Session in Sydney CBD"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Spa & Massage">Spa & Massage</option>
                      <option value="Escorts & Companions">Escorts & Companions</option>
                      <option value="Male Escorts">Male Escorts</option>
                      <option value="Transsexual / Shemale">Transsexual / Shemale</option>
                      <option value="Virtual & Dating">Virtual & Dating</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      required
                      min="18"
                      max="60"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 24"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: LOCATION & RATES */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                  2. Location & Rates (AUD $)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Sydney">Sydney, NSW</option>
                      <option value="Melbourne">Melbourne, VIC</option>
                      <option value="Brisbane">Brisbane, QLD</option>
                      <option value="Perth">Perth, WA</option>
                      <option value="Gold Coast">Gold Coast, QLD</option>
                      <option value="Adelaide">Adelaide, SA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Suburb / Area *
                    </label>
                    <input
                      type="text"
                      name="suburb"
                      required
                      value={formData.suburb}
                      onChange={handleChange}
                      placeholder="e.g. Sydney CBD, South Yarra"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      30 Mins Rate ($ AUD)
                    </label>
                    <input
                      type="number"
                      name="rateThirtyMin"
                      value={formData.rateThirtyMin}
                      onChange={handleChange}
                      placeholder="e.g. 120"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      1 Hour Rate ($ AUD) *
                    </label>
                    <input
                      type="number"
                      name="rateOneHour"
                      required
                      value={formData.rateOneHour}
                      onChange={handleChange}
                      placeholder="e.g. 220"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      name="incall"
                      checked={formData.incall}
                      onChange={handleChange}
                      className="rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0"
                    />
                    Incall Available
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      name="outcall"
                      checked={formData.outcall}
                      onChange={handleChange}
                      className="rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0"
                    />
                    Outcall Available
                  </label>
                </div>
              </div>

              {/* SECTION 3: DESCRIPTION & SERVICES */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                  3. Description & Services
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Full Description *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your services, location details, working hours, and amenities..."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Select Services Offered
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableServices.map((service, idx) => {
                      const isChecked = formData.services.includes(service);
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleServiceToggle(service)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition ${
                            isChecked
                              ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          {isChecked ? '✓ ' : '+ '} {service}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 4: PHOTOS & CONTACT */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                  4. Photos & Contact Info
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Upload Photos (Up to 5 images)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full text-xs text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-amber-400 hover:file:bg-zinc-700 cursor-pointer"
                  />

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pt-3">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border border-zinc-800"
                        >
                          <img
                            src={img}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-black/80 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Phone Number (Australian) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +61 400 000 000"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        name="whatsappAvailable"
                        checked={formData.whatsappAvailable}
                        onChange={handleChange}
                        className="rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0"
                      />
                      WhatsApp Available on this Number
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-zinc-800">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-sm rounded-xl transition shadow-lg shadow-amber-500/20"
                >
                  🚀 Publish Free Ad
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-3">
                  By publishing, you agree to our Terms of Service and 18+ legal guidelines.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
              }
                        
