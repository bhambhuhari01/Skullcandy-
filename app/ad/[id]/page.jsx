'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function AdDetailPage({ params }) {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAd() {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching ad details:', error);
      } else {
        setAd(data);
      }
      setLoading(false);
    }

    if (params.id) {
      fetchAd();
    }
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading ad details...</div>;
  if (!ad) return <div className="text-center py-20">Ad not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-8">
      <Link href="/" className="text-pink-600 hover:underline mb-4 inline-block">
        &larr; Back to Listings
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <img
            src={ad.images && ad.images[0] ? ad.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={ad.title}
            className="w-full h-80 object-cover rounded-lg shadow"
          />
        </div>

        <div className="space-y-4">
          <span className="text-xs bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-semibold">
            {ad.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800">{ad.title}</h1>
          <p className="text-gray-600 text-lg">{ad.city} {ad.suburb && `• ${ad.suburb}`}</p>
          
          {ad.rate_1hr && (
            <p className="text-2xl font-bold text-pink-600">${ad.rate_1hr} / hour</p>
          )}

          <div className="border-t border-b py-4 space-y-2 text-sm text-gray-700">
            {ad.age && <p><strong>Age:</strong> {ad.age} years</p>}
            {ad.phone && <p><strong>Phone:</strong> <a href={`tel:${ad.phone}`} className="text-pink-600 font-semibold">{ad.phone}</a></p>}
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{ad.description || 'No description provided.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
