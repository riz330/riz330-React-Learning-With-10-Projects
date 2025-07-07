import { searchPackages } from "../../apis/queries/searchPackages"
import  type{ PackageSummary } from "../../apis/types/packageSummary"


export interface SearchLoaderResult{
    searchResults :PackageSummary[]
}

export async function searchLoader({request}:{request:Request}):Promise<SearchLoaderResult>{
        // console.log(request)
        const {searchParams} = new URL (request.url)
        const term = searchParams.get('term')

        if (!term){
          throw new Error('Search Term Must Be Provided')
        }

        const results = await searchPackages(term)

        return {
            searchResults:results
        }

        
      } 