import {React, useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";

const MovieCard = ({movies, loading, user}) => {
    const [showModal, setShowModal] = useState(false);
    const [userPlaylist, setUserPlaylist] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState("");

    useEffect(() => {
        axios.get(`/getPlaylistByUser/${user.email}`, {
            params: {
                email: user
            }
        })
        .then(res => {
            setUserPlaylist(res.data.playlist)
        })
    }, [])

    const addToPlaylist = () => {
        console.log(selectedPlaylist);
        axios.post("/addToPlaylist", {
            email: user.email,
            name: selectedPlaylist,
            movie: movies.imdbID
        })
        .then(res => {
            console.log(res.data);
        })
        setShowModal(false);
    }
    const handlePlaylistChnage = (e) => {
        setSelectedPlaylist(e.target.value)
    }

    if(loading === -1){
        return (
            <>
            home page
            </>
        )
    }
    else if(loading === 1){
        return (
            <div className="flex justify-center items-center">
                Loading
            </div>
        )
    }
    else if(loading === 0 && movies.Response == "False"){
        return (
            <div className="flex justify-center items-center">
                No movies found
            </div>
        )
    }
    return (
        <div class="mt-24 grid place-items-center font-mono">
        <div class="bg-gray-200 rounded-md shadow-lg border-2 border-gray-500">
            <div class="md:flex px-4 leading-none max-w-4xl">
            <div class="flex-none ">
            <img
                src={movies.Poster}
                alt="pic"
                class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-500 "
            />           
            </div>
        
            <div class="flex-col ">
    
                <p class="pt-4 text-2xl font-bold">{movies.Title} ({movies.Year})</p>
                <hr class="hr-text" data-content="" />
                <div class="text-md flex justify-between px-4 my-2">
                <span class="font-bold">{movies.Runtime} | {
                    movies.Genre?.split(",").map((genre, index) => {
                        return (
                            <span key={index} className="ml-1 bg-white text-sm p-1 border text-gray-800 border-black rounded-md">{genre} </span>
                        )
                    }
                    )

                } </span>
                <span class="font-bold"></span>
                </div>
                <p class="hidden md:block px-4 my-4 text-sm text-left">{movies.Plot}</p>
                
                <p class="flex text-md px-4 my-2">
                Rating: {movies.imdbRating}/10 
                
                </p>
                
                <div class="text-xs">
                <button type="button" class="border border-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    onClick={() => setShowModal(true)}
                    >
                        Add To list
                </button>
                </div>
            
            </div>
            </div>       
        </div>
        {showModal ? (
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-semibold">
                    Select Playlist
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                >
                    <span className="bg-white text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Select the playlist you want to add this movie to
                    {
                        userPlaylist?.map((playlist, index) => {
                            return (
                                <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <input name="playlistname" type="radio" className="mr-2" onClick={handlePlaylistChnage} value={playlist.name}/>
                                        <p>{playlist.name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
                <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => addToPlaylist()}
                >
                    Save
                </button>
                </div>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null}
    </div>
    );
};

export default MovieCard;