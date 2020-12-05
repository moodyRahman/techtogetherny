import React, { useContext, useEffect, useState } from 'react';
import "./App.scss";
import {tokenContext} from "./Context.js"

export default function Register() {
  const { token, setToken } = useContext(tokenContext)
  const [username, setUsername] = useState("")
  const [password0, setPassword0] = useState("")
  const [password1, setPassword1] = useState("")
  const [message, setMessage] = useState("")
  const register = (event) =>{
    event.preventDefault()
    if (password0 !== password1)
    {
      setMessage("passwords need to match");
      return
    }

    const data = {
                  "username":username,
                  "password":password0
                }

    fetch("http://moodyrahman.com:5000/register", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then((response) => {
      console.log(response)
      if (response.status === 200){ 
        setToken(response.token)
        console.log(token)
      }
      else{
        setMessage("Username already exists")
      }
    })


  }

  return (
    <div className="register">
      <form>
        <label>Which zombie are you? <input type="text" name="username" id="" onChange={e => setUsername(e.target.value)} /></label>
        <label>How will we know it's you? <input type="password" name="password" id="" onChange={e => setPassword0(e.target.value)} /></label>
        <label>Are you sure it's you? <input type="password" name="password" id="" onChange={e => setPassword1(e.target.value)} /></label>
        <button type="submit" onClick={register}>REGISTER</button>
      </form>
      {message}
    </div>
  );
}