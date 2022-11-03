const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5001;

// app.use(express.static(path.resolve(__dirname, '../client/build')));


var url = "mongodb+srv://dbsmit:DBSMIT@cluster0.ff23x.mongodb.net/wolkus_users?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

const playlistSchema = new mongoose.Schema({
    name: String,
    email: String,
    private: String,
    movies: [String]
})
const Playlist = new mongoose.model("Playlist", playlistSchema)


app.post("/login", (req, res)=> {
    const { email, password} = req.body
    console.log(req.body)
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
});

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    console.log(email, password)
    User.findOne({ email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
});
app.post("/createPlaylist", (req, res)=> {
    const { name, email, private, movies} = req.body
    console.log(name, email, private, movies  )
    Playlist.findOne({ email: email, name:name}, (err, playlist) => {
        if(playlist){
            res.send({message: "Playlist already created"})
        } else {
            const playlist = new Playlist({
                name,
                email,
                private,
                movies
            })
            playlist.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Created Playlist" })
                }
            })
        }
    })
});

app.get('/getPlaylistByUser/:email', (req, res) => {    
    const { email} = req.params
    console.log(req.params);
    Playlist.find({ email: email}, (err, playlist) => {
        if(playlist){
            res.send({response: "true", playlist: playlist})
        } else {
            res.send({response: "No playlist found"})
        }
    })
});

app.post('/addToPlaylist', (req, res) => {
    const { email, name, movie} = req.body
    console.log(req.body);
    Playlist.findOne({ email: email, name: name}, (err, playlist) => {
        if(playlist){
            playlist.movies.push(movie)
            playlist.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Added to Playlist" })
                }
            })
        } else {
            res.send({response: "No playlist found"})
        }
    })
});
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.listen(5001,() => {
    console.log("server running on port", PORT);
});