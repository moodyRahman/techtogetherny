import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login.jsx';
import Register from './Register.jsx';
import './App.scss';
import {tokenContext} from "./Context.js"

export default function App() {

  const [token, setToken] = useState("");
  
  return (
    <div className="App">
      <Router>
      <tokenContext.Provider value={{token, setToken}}>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Register />
            </Route>
          </Switch>
        </div>
      </tokenContext.Provider>
      </Router>
    </div>
  );
}