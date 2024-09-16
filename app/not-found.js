import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <Link href="/">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors">
          Return Home
        </button>
      </Link>
    </div>
  )
}
