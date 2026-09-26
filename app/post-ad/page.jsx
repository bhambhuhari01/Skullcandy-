'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function PostAdPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Escorts',
    city: 'Sydney',
    suburb: '',
    age: '',
    phone: '',
    rate_1hr: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // 1. फोटो अपलोड करें (अगर सेलेक्ट की गई है)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: storageData, error: storageError } = await supabase.storage
          .from('ad-images')
          .upload(fileName, imageFile);

        if (storageError) throw storageError;

        // फोटो का पब्लिक यूआरएल निकालें
        const { data: publicUrlData } = supabase.storage
          .from('ad-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      // 2. Supabase की 'ads' टेबल में डेटा इन्सर्ट करें
      const { error: dbError } = await supabase.from('ads').insert([
        {
          title: formData.title,
          category: formData.category,
          city: formData.city,
          suburb: formData.suburb,
          age: parseInt(formData.age) || null,
          phone: formData.phone,
          rate_1hr: parseFloat(formData.rate_1hr) || null,
          description: formData.description,
          images: imageUrl ? [imageUrl] : [],
        },
      ]);

      if (dbError) throw dbError;

      alert('विज्ञापन सफलतापूर्वक पोस्ट हो गया!');
      router.push('/');
    } catch (error) {
      alert('एरर: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">नया विज्ञापन पोस्ट करें</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">शीर्षक (Title)</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">कैटेगरी</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Escorts">Escorts</option>
              <option value="Massage">Massage</option>
              <option value="Spa">Spa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">शहर</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Sydney">Sydney</option>
              <option value="Melbourne">Melbourne</option>
              <option value="Brisbane">Brisbane</option>
              <option value="Perth">Perth</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">सबअर्ब (Suburb)</label>
            <input
              type="text"
              name="suburb"
              value={formData.suburb}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">उम्र (Age)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">1 घंटे का रेट ($)</label>
            <input
              type="number"
              name="rate_1hr"
              value={formData.rate_1hr}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">फ़ोन नंबर</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">विवरण (Description)</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">फ़ोटो अपलोड करें</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 disabled:bg-gray-400"
        >
          {loading ? 'पोस्ट हो रहा है...' : 'विज्ञापन पोस्ट करें'}
        </button>
      </form>
    </div>
  );
}
