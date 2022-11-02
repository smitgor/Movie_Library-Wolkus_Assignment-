import './App.css'
import Homepage from "./components/Homepage"
import Login from "./components/Login"
import Register from "./components/Register"
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
            element={user && user._id ? <Homepage setLoginUser={setLoginUser}  /> : <Login setLoginUser={setLoginUser}/>}
            >
            
          </Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          
        </Routes >
      </Router>
    </div>
  );
}

export default App;
