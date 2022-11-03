import {React, useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";
import PlaylistCard from "./PlaylistCard";
import { useParams } from "react-router-dom";

const PlaylistWithId = () => {
    let {id} = useParams();
    const [playlist, setPlaylist] = useState({})
    useEffect(() => {
        axios.get(`/getPlaylistById/${id}`)
        .then(res => {
            setPlaylist(res.data.playlist)
            console.log(res.data)
        })
    }, [])

    return (
        <>
        <Header />
        {id}
        <PlaylistCard playlist={playlist} />
        </>
    )   
}

export default PlaylistWithId;