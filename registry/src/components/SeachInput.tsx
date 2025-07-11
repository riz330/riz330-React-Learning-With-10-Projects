import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { VscSearch } from "react-icons/vsc";


export default function SearchInput(){
    const [term,setTerm]=useState('')

    const navigate =useNavigate() 


    const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault()
            navigate(`/search?term=${term}`)

            // setTerm(term)
    }

    

    return <form onSubmit={handleSubmit}>
        <div className="relative ">
            <div className="absolute inset-y-0 flex items-center pl-3">
                 <VscSearch className="h-5 w-5 text-gray-500"/>
            </div>
        <input  className="pl-10 py-2 w-full border-0 shadow-none"
        placeholder="Search Packages"
        value={term} onChange={e=> setTerm(e.target.value)}/>
        </div>
    </form>
}