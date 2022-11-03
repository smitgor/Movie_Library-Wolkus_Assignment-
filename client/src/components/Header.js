import {React, useState} from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Header = ({setLoginUser, user}) => {

    const navigate = useNavigate();
    
    
    
    return (
        <header className="grid grid-cols-3 sticky top-0 z-10 items-center shadow-md bg-white py-5 px-5 md:px-10">
            <div className="flex flex-row pr-2 md:pr-8 items-center">
                <div class="mr-10 text-blue-900 hover:text-indigo-600 cursor-pointer" onClick={()=> navigate("/")}>
                    Home    
                </div>
                <div class="mr-10 text-blue-900 hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/playlist")}>
                    Playlist
                </div>
                {/* <div class="text-blue-900 hover:text-indigo-600 cursor-pointer" onClick={() => navigate("/about")}>
                    About
                </div> */}
            </div>

            <div className=" flex items-center rounded-full">
                

            </div>

            <div className="flex flex-row-reverse pr-2 md:pr-8">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={() => setLoginUser({})}>Logout
                </button>
            </div>
            
        </header>
    )
}

export default Header