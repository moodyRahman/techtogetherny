import React, { useContext, useEffect, useState } from 'react';
import { tokenContext } from "./Context.js"
import "./App.scss";
import { Redirect } from 'react-router-dom';

export default function Login() {
  const { token, setToken } = useContext(tokenContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState("")

  const login = (event) => {
    event.preventDefault();
    const data = {
      "username": username,
      "password": password
    }

    fetch("http://moodyrahman.com:5000/auth", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(response => {
        if (response.status == 200)
        {
          console.log(response)
          setToken(response.token)
          setRedirect("/register")
        }
      })

  }

  if (redirect) {
    return (
      <Redirect to={redirect} />
    )
  }
  else {

  }

  return (

    <div className="login">
      <form>
        <label>Which zombie are you? <input type="text" name="username" id="" onChange={e => setUsername(e.target.value)} /></label>
        <label>How do we know it's you? <input type="password" name="password" id="" onChange={e => setPassword(e.target.value)} /></label>
        <button type="submit" onClick={login}>LOGIN</button>
      </form>
    </div>
  );
}