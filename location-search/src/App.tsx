import LocationSearch from "./components/LocationSearch";
import Map from "./components/Map";
import type { Place } from "./api/place"
import { useState } from "react";



interface App{}

function App() {


  const [place,SetPlace]=useState<Place | null>(null)





  return (<div className="h-screen w-screen grid grid-cols-12">  
       
      <div className="col-span-3 p-2 ">
     <LocationSearch onPlaceClick={(p)=> SetPlace(p)} />
     </div>
     <div className="col-span-9">   
       <Map place={place} />
     </div>

    </div>

    
  );
}

export default App;
