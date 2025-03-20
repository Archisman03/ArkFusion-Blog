import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl mt-2">Oops! Page Not Found</h2>
      <p className="mt-4 text-gray-400">
        The page you are looking for doesn’t exist.
      </p>
      {/* This link is for the button to go back to Home */}
      <Link
        to='/'
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
