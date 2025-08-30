import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="bg-white border-b">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">School Directory</h1>
          <nav className="flex gap-4">
            <Link href="/addSchool" className="text-blue-600 hover:underline">Add School</Link>
            <Link href="/showSchools" className="text-blue-600 hover:underline">Show Schools</Link>
          </nav>
        </div>
      </header>
      <main className="container py-6">{children}</main>
      <footer className="container py-10 text-center text-sm text-gray-500">
        Created By Alok Kumar
      </footer>
    </div>
  );
}