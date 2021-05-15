import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch ,Link} from "react-router-dom";


import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import axios from 'axios'
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  
  const logout = () => {
    axios.post("http://localhost:5000/api/logout")
      .then(res => {
        console.log("Logged out!");
        localStorage.removeItem('token');
        window.location.href = "/";       
        
    })
      .catch(err=>console.log(err))
    
  };
  
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <Link  data-testid="logoutButton" onClick={logout}>logout</Link>
        </header> 
        <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path='/BubblePage' component={BubblePage}/>

        </Switch>

        
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.