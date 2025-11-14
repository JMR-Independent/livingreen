import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold text-neutral-900 mb-4">Page Not Found</h2>
        <p className="text-xl text-neutral-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link href="/" className="btn-primary text-lg px-10 py-4">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
