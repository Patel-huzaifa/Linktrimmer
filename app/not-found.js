import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The short URL you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Go Home
            </button>
          </Link>
          
          <Link href="/shorten">
            <button className="w-full bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300">
              Create New Link
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 