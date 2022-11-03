import {React, useState, useEffect, useReducer} from "react";
import Header from "./Header";
import axios from "axios";
import SmallMovieCard from "./SmallMovieCard";

const PlaylistCard = ({item}) => {
    console.log(item);
    return (
        <div className="mb-3">
            <div className="border-t-2 border-r-2 bg-blue-300 border-l-2 text-left px-8 py-4 rounded-t-2xl">
                <h1 className="text-2xl font-semibold">{item?.name}</h1>
                <p className="text-xs text-gray-500">Created By {item?.email}</p>
                
                <div className="flex">
                    <div className="flex-grow">
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-zinc-400 bg-zinc-200 last:mr-0 mr-1">
                        {item?.private==="true" ? "Private" : "Public"}
                    </span>    
                    </div>
                    <div>ID: {item?._id}</div>

                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-blue-200  border-collapse border-2 rounded-b-2xl px-2">
                {item?.movies?.map((movie, index) => {
                    return (
                        <SmallMovieCard id={movie}/>
                    )
                })}
            </div>
        </div>
    )
}

export default PlaylistCard;