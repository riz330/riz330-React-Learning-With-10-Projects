import type { PackageDetails } from "../../apis/types/packageDetails";
import { getFeaturedPackages } from "../../apis/queries/getFeaturedPackages";


export interface HomeLoaderResult{
    featuredPackages : PackageDetails[]
}

export async function homeLoader(): Promise<HomeLoaderResult>{
    const featuredPackages = await getFeaturedPackages()


    return {
        featuredPackages 
    }

}