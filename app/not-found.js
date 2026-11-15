import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
        Route not found
      </h1>
      <p className="mt-4 max-w-md text-mute">
        This path does not exist. Head back to the portfolio to keep exploring
        the builds.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to AayushBuilds
      </Link>
    </main>
  );
}
