import type { Place } from "../api/place"
import React, { Fragment, useState } from "react"
import { search } from "../api/search"


interface LocationSearchProps {
    onPlaceClick:(place:Place)=> void
}

function LocationSearch({onPlaceClick}:LocationSearchProps){

    const [places,setPlaces]=useState<Place[]  >([])
    const [term,setTerm]=useState('')

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const results= await search(term)
        setPlaces(results)

        // console.log('search  .. ',term)
        // setPlaces()

    }


     return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold text-sm mb-1" htmlFor="term">
            Search Location
          </label>
          <input
            className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 w-full"
            id="term"
            placeholder="Enter city, address, or place name"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2 rounded-md transition"
        >
          Search
        </button>
      </form>

      {places.length > 0 && (
        <>
          <h2 className="font-bold text-md mt-6 mb-2">Found Locations</h2>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
            {places.map((place) => (
              <Fragment key={place.id}>
                <p className="text-sm text-gray-800">{place.name}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-xs text-white font-semibold py-1 px-2 rounded transition"
                  onClick={() => onPlaceClick(place)}
                >
                  Go
                </button>
                <div className="border-b w-full col-span-2"></div>
              </Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );

}

export default LocationSearch