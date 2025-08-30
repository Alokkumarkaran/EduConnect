
import Layout from '../components/Layout'; 
import Link from 'next/link';


export default function Home() {
  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-4">
            Use this mini-project to add schools and view them like an e‑commerce listing.
          </p>
          <div className="flex gap-3">
            <Link href="/addSchool" className="px-4 py-2 rounded bg-blue-600 text-white">Add School</Link>
            <Link href="/showSchools" className="px-4 py-2 rounded border">View Schools</Link>
          </div>
        </div>
        <div className="rounded-2xl border p-6 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Quick Tips</p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Images are stored in <code>/public/schoolImages</code></li>
            <li>Validation handled with <code>react-hook-form</code></li>
            <li>MySQL connection via <code>mysql2</code></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
