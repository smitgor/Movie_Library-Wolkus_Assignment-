import {React, useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";

const Playlist = ({user}) => {
    const [ newPlaylist, setNewPlaylist] = useState({
        email:user.email,
        name:"",
        private:"false",
        movies:[]
    })
    const [userPlaylist, setUserPlaylist] = useState([])

    useEffect(() => {
        axios.get(`/getPlaylistByUser/${user.email}`, {
            params: {
                email: user
            }
        })
        .then(res => {
            console.log(res.data)
            setUserPlaylist(res.data.playlist)
        })
    }, [])



    const handleChange = e => {
        const { name, value } = e.target
        setNewPlaylist({
            ...user,
            [name]: value
        })
    }
    const createPlaylist = () => {
        console.log(newPlaylist);
        axios.post("/createPlaylist", newPlaylist)
        .then(res => {
            console.log(res.data);
        })
    }
    if(userPlaylist.length === 0) {
        return (
            <>
            <Header />
            <h1>No Playlist</h1>
            </>
        )
    }
    return (
        <div>
            <Header />
            <input name="name" placeholder="Playlist name" onChange={handleChange}/>
            <button onClick={createPlaylist} className="border-2 border-black px-2 py-1 mt-4 mx-2 rounded-md" >create</button>
            <div className="flex flex-wrap justify-center">
                {userPlaylist?.map((item, index) => {
                    return (
                        <div className="border-2 border-black p-2 m-2 rounded-md">
                            <h1>{item.name}</h1>
                            <h1>{item.private}</h1>
                            <h1>{item.movies}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Playlist;