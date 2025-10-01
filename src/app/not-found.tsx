import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] bg-background text-gray-800 p-4">
      <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
      <p className="text-xl mb-6 text-primary">This page could not be found.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-accent text-foreground rounded-md hover:bg-accent/90 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
