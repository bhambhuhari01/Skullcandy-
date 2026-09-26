'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Home() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ads:', error);
      } else {
        setAds(data || []);
      }
      setLoading(false);
    }

    fetchAds();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Classified Listings</h1>
        <Link 
          href="/post-ad" 
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
        >
          + Post New Ad
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-10">Loading ads...</p>
      ) : ads.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No ads posted yet.</p>
          <Link href="/post-ad" className="text-pink-600 underline">
            Be the first to post an ad!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white">
              <img
                src={ad.images && ad.images[0] ? ad.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={ad.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                  {ad.category}
                </span>
                <h2 className="text-xl font-semibold mt-2">{ad.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{ad.city} {ad.suburb && `• ${ad.suburb}`}</p>
                {ad.rate_1hr && (
                  <p className="text-pink-600 font-bold mt-2">${ad.rate_1hr} / hr</p>
                )}
                <Link
                  href={`/ad/${ad.id}`}
                  className="block text-center bg-gray-100 text-gray-800 mt-4 py-2 rounded hover:bg-gray-200 text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
