'use client';
import { useState } from 'react';
import Link from 'next/link';

// Dummy Single Ad Details Data
const AD_DETAILS = {
  id: '1',
  title: 'Luxury Day Spa & Full Body Wellness Therapy in Sydney',
  city: 'Sydney',
  suburb: 'Sydney CBD',
  age: 24,
  ethnicity: 'Caucasian / Australian',
  height: "5'7\" (170cm)",
  category: 'Spa & Massage',
  phone: '+61 400 000 000',
  rate_1hr: 250,
  description: `Welcome! I provide premium relaxation and wellness massage therapies in a clean, private, and luxurious setup. 

Available for Incall in Sydney CBD and Outcall to major hotels.

Features:
- Private & Discreet
- Shower Facilities Available
- Easy Parking Nearby

Call or Text to book your appointment today!`,
  images: [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop'
  ]
};

export default function AdDetailPage() {
  const [selectedImage, setSelectedImage] = useState(AD_DETAILS.images[0]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 my-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <Link href="/" className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 mb-6 font-medium">
        ← Back to Listings
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
            <img 
              src={selectedImage} 
              alt={AD_DETAILS.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {AD_DETAILS.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-pink-600' : 'border-gray-200'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full">
            {AD_DETAILS.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{AD_DETAILS.title}</h1>
          <p className="text-gray-500 font-medium">{AD_DETAILS.city} • {AD_DETAILS.suburb}</p>

          <div className="p-4 bg-pink-50 rounded-lg border border-pink-100 flex justify-between items-center">
            <div>
              <p className="text-xs text-pink-600 font-bold uppercase">Rate</p>
              <p className="text-2xl font-black text-pink-700">${AD_DETAILS.rate_1hr} <span className="text-sm font-normal">/ hr</span></p>
            </div>
            <a 
              href={`tel:${AD_DETAILS.phone}`} 
              className="bg-pink-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              Call Now
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
            <div><span className="text-gray-500">Age:</span> <strong className="text-gray-800">{AD_DETAILS.age}</strong></div>
            <div><span className="text-gray-500">Ethnicity:</span> <strong className="text-gray-800">{AD_DETAILS.ethnicity}</strong></div>
            <div><span className="text-gray-500">Height:</span> <strong className="text-gray-800">{AD_DETAILS.height}</strong></div>
            <div><span className="text-gray-500">Phone:</span> <strong className="text-gray-800">{AD_DETAILS.phone}</strong></div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
              {AD_DETAILS.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
