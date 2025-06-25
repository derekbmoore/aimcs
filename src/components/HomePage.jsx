import React from 'react';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-yellow-100 via-indigo-200 to-purple-300">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex justify-center">
            {/* Optional: Logo placeholder */}
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-400 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">A</span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-indigo-900 drop-shadow-md">
            AI Multimodal Customer System
          </h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-orange-600 drop-shadow-sm">
            by Zimax Networks
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-indigo-800 font-medium">
            Empowering customer experiences with advanced, multimodal AI—secure, scalable, and designed for the future.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#"
              className="inline-block rounded-lg bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform"
            >
              Learn More
            </a>
            <a
              href="#"
              className="inline-block rounded-lg border-2 border-indigo-400 px-8 py-3 text-lg font-semibold text-indigo-700 bg-white bg-opacity-80 hover:bg-indigo-50 hover:border-orange-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-orange-900 py-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-yellow-100">
            © 2024 Zimax Networks. All rights reserved.
          </p>
          <p className="text-xs text-orange-200 mt-1">
            Designed by the Zimax Networks AI Architecture and Engineering Team
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage; 