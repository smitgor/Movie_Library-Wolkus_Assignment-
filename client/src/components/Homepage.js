import {React, useState} from "react"
import Header from "./Header"
import axios from "axios"
import MovieCard from "./MovieCard"

const Homepage = ({setLoginUser, user}) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(-1);
    const [movies, setMovies] = useState({})

    
    const search = async (e) => {
        // const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2b3c1b2c1b2c1b2c1b2c1b2c1b2c1b2c&query=${input}`)
        // const data = await response.json();
        // setMovies(data.results);
        setLoading(1);
        axios.get(`http://www.omdbapi.com/?apikey=18dee8f3&t=${input}`)
        .then(res => {
            setMovies(res.data)
            console.log(res.data)
        })
        setLoading(0);
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }
    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            search();
        }
    }

    return (
        <div className="homepage bg-gray-400 min-h-screen">
            <Header setLoginUser={setLoginUser} user={user} setMovies={setMovies}/>
            <div className="border-b-2 flex items-center w-1/2 my-4 mx-8 border-black">
                <input 
                    type="text" 
                    className="w-96 h-10 pl-5 flex-grow bg-gray-400 rounded-full focus:outline-none placeholder:text-black" 
                    onChange={handleInput} 
                    onKeyUp={handleKeyPress.bind(this)}
                    placeholder="Search Any Movie" 
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                    class="w-5 h-5 cursor-pointer mr-3">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                </svg>
            </div>
            <MovieCard movies={movies} loading={loading} user={user}/>
        </div>
    )
}

export default Homepage