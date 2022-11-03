import {React, useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";

const SmallMovieCard = ({id}) => {
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`https://www.omdbapi.com/?i=${id}&apikey=4a3b711b`)
        .then(res => {
            setMovie(res.data)
        })
        setLoading(false)
    }, [])
    if(loading === true){
        return (
            <div className="flex justify-center items-center">
                Loading
            </div>
        )
    }

    return (
        <>
        <div class="flex flex-grow mt-4 mb-4 max-w-md  bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
            <div class="hidden md:inline-block w-1/3 bg-cover bg-landscape relative ">
                <img src={movie.Poster} alt="shopping image" class="absolute rounded-lg inset-0 w-full h-full object-cover"/>
            </div>
            <div class="w-full md:w-2/3 p-4">
                <h1 class="text-gray-900 font-bold text-2xl">
                    {movie.Title}
                </h1>
                <p class="mt-2 text-gray-600 text-sm text-justify">
                    {movie.Plot}
                </p>
                <div class="flex item-center mt-2">
                    
                </div>

                <p class="flex text-md my-2">
                    Rating: {movie.imdbRating}/10 
                
                </p>
                <span class="flex font-bold text-start">{movie.Runtime} | {movie.Genre} </span>
            </div>
        </div>

        </>
    )
}

export default SmallMovieCard;