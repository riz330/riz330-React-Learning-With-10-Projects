
import type { PackageSummary } from "../types/packageSummary";


interface SearchResponse {
  objects: {
    package: {
      name: string;
      description: string;
      version: string;
      keywords?: string[]; // ← ✅ correct type
    };
  }[];
}

export async function searchPackages(term: string): Promise<PackageSummary[]> {
  const res = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=${term}`
  );

  const data: SearchResponse = await res.json();

  return data.objects.map((searchResult) => {
    const pkg = searchResult.package;

    return {
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      keywords: pkg.keywords ?? [], // ← ✅ fallback to empty array
    };
  });
}
