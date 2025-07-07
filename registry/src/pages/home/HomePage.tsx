import { useLoaderData, Link } from "react-router-dom";
import type { HomeLoaderResult } from "./homeLoader";

export default function HomePage() {
  const { featuredPackages } = useLoaderData() as HomeLoaderResult;

  const renderedPackages = featuredPackages.map((p) => {
    return (
      <div
        key={p.name}
        className="flex flex-col justify-between gap-3 border rounded shadow p-4 hover:shadow-md transition"
      >
        <div className="flex flex-col gap-1 border-b border-gray-300 pb-2">
          <div className="font-bold text-center text-lg">{p.name}</div>
          <div className="text-sm text-gray-500">{p.description}</div>
          <div className="text-sm text-gray-500">
            {p.maintainers.length} Maintainers
          </div>
        </div>
        <Link
          to={`/packages/${p.name}`}
          className="border rounded border-gray-900 text-center px-4 py-2 hover:bg-gray-100 transition"
        >
          View
        </Link>
      </div>
    );
  });

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold">NPM Registry</h1>
        <p className="mx-auto max-w-[600px] text-gray-500">
          The Package Manager For JavaScript. Search and view packages.
        </p>
      </div>

      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[900px] gap-4">
        {renderedPackages}
      </div>
    </div>
  );
}
