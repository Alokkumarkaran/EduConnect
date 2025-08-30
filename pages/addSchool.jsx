
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Layout from '../components/Layout';


export default function AddSchool() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '', address: '', city: '', state: '', contact: '', email_id: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage(null);

      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));
      if (data.image && data.image[0]) formData.append('image', data.image[0]);

      const res = await fetch('/api/schools', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to add school');
      setMessage({ type: 'success', text: json.message || 'School added successfully.' });
      reset();
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Add School</h2>
        {message && (
          <div className={
            `mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`
          }>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" encType="multipart/form-data">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">School Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                {...register('email_id', {
                  required: 'Email is required',
                  pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, message: 'Invalid email' }
                })}
              />
              {errors.email_id && <p className="text-sm text-red-600 mt-1">{errors.email_id.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact</label>
              <input
                type="tel"
                className="w-full border rounded px-3 py-2"
                {...register('contact', {
                  required: 'Contact is required',
                  pattern: { value: /^\+?\d{7,15}$/, message: 'Enter a valid phone number' }
                })}
              />
              {errors.contact && <p className="text-sm text-red-600 mt-1">{errors.contact.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">School Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              {...register('image', { required: 'Image is required' })}
            />
            {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>}
            <p className="text-xs text-gray-500 mt-1">Accepted: JPG, PNG, etc.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save School'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
