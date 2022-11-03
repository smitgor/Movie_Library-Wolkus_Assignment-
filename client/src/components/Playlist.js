import {React, useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";
import PlaylistCard from "./PlaylistCard";

const Playlist = ({user}) => {
    const [ newPlaylist, setNewPlaylist] = useState({
        email:user.email,
        name:"",
        private:false,
        movies:[]
    })
    const [userPlaylist, setUserPlaylist] = useState([])
    const [checked, setChecked] = useState(false);
    const [findName, setFindName] = useState("");

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

    const handleFindChange = (e) => {
        setFindName(e.target.value)
    }
    const handleCheckChange = () => {
        setChecked(!checked)
        setNewPlaylist({
            ...newPlaylist,
            private: !checked
        })
    }
    const handleChange = e => {
        const { name, value } = e.target
        setNewPlaylist({
            ...newPlaylist,
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
            <input name="name" placeholder="Playlist name" onChange={handleChange}/>
            <button onClick={createPlaylist} className="border-2 border-black px-2 py-1 mt-4 mx-2 rounded-md" >create</button>
            <h1>No Playlist</h1>
            </>
        )
    }
    return (
        <div>
            <Header />
            <div className=" flex items-center w-2/3 my-4 mx-8 border-black">
                <input 
                    type="text" 
                    name="name"
                    className="border-b-2 sm:w-96 h-10 pl-5 flex-grow  focus:outline-none placeholder:text-black" 
                    onChange={handleChange}
                    placeholder="Playlist name" 
                />
                <div className="ml-8 flex items-center">
                    <input 
                        type="checkbox" 
                        name="private"
                        className="border-b-2 mx-2h-4 pl-5 flex-grow  focus:outline-none placeholder:text-black" 
                        checked={checked}
                        onChange={handleCheckChange}
                        />
                    <p className="px-2">Private</p>
                </div>

                <button onClick={createPlaylist} className="border-2 bg-green-400 border-green-500 px-2 py-1  mx-2 rounded-md" >create</button>
            </div>
            <div className=" flex items-center w-2/3 my-4 mx-8 border-black">
                <input 
                    type="text" 
                    name="name"
                    className="border-b-2 sm:w-96 h-10 pl-5 flex-grow  focus:outline-none placeholder:text-black" 
                    onChange={handleFindChange}
                    placeholder="Playlist ID" 
                />
                <button onClick={createPlaylist} className="border-2 bg-green-400 border-green-500 px-2 py-1  mx-2 rounded-md" >Find Playlist</button>
            </div>

            <div className="mt-10 mx-2 sm:mx-5 md:mx-10 grid ">
                {userPlaylist?.map((item, index) => {
                    return (
                        <PlaylistCard item={item} />
                    )
                })}
            </div>
        </div>
    );
};

export default Playlist;