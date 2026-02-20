export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-gray-400">The requested resource could not be found.</p>
        <a href="/" className="mt-6 rounded-md bg-purple-600 px-4 py-2 font-medium hover:bg-purple-700">
          Go Home
        </a>
      </body>
    </html>
  );
}
