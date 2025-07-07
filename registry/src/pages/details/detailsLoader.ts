import { getPackage } from "../../apis/queries/getPackage";
import type { Params } from "react-router-dom";
import type { PackageDetails } from "../../apis/types/packageDetails";

interface LoaderArgs {
  params: Params;
}

export interface DetailsLoaderResult{
    details : PackageDetails
}

export async function detaileLoader({ params }: LoaderArgs):Promise<DetailsLoaderResult> {
  const name = params.name; // ✅ extract 'name' from URL

  if (!name) {
    throw new Error("Name must be provided");
  }

  const details = await getPackage(name); // ✅ pass string
  return {
    details
}; // (return data instead of string)
}
