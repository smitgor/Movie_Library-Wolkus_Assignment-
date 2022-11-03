import './App.css'
import Homepage from "./components/Homepage"
import Login from "./components/Login"
import Register from "./components/Register"
import Playlist from "./components/Playlist"
import About from "./components/About"
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import { useState } from 'react';


function App() {

  const [ user, setLoginUser] = useState({})
  const updateUser =  user => {
    setLoginUser(current  => user )
  }
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route exact path="/" 
            element={user && user._id ? <Homepage setLoginUser={setLoginUser} user={user} /> : <Login setLoginUser={setLoginUser}/>}
            >
            
          </Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/playlist" 
            element={user && user._id ? <Playlist user={user} /> : <Login setLoginUser={setLoginUser}/>}
            ></Route>
          <Route exact path="/about" element={<About />}></Route>
        </Routes >
      </Router>
    </div>
  );
}

export default App;
