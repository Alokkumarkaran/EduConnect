
import useSWR from 'swr';
import Layout from '../components/Layout';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function ShowSchools() {
  const { data, error, isLoading } = useSWR('/api/schools', fetcher, { refreshInterval: 0 });

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Schools</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Failed to load.</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="aspect-video bg-gray-100">
              {s.image ? (
                
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-gray-600">{s.address}</p>
              <p className="text-gray-500 text-sm mt-1">{s.city}</p>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && data?.data?.length === 0 && (
        <p className="text-gray-600">No schools yet. Add one from the Add School page.</p>
      )}
    </Layout>
  );
}
