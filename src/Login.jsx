import React from 'react';
import "./App.scss";

export default function Login() {
  return (
    <div className="login">
      <form>
        <label>Which zombie are you? <input type="text" name="username" id="" /></label>
        <label>How do we know it's you? <input type="password" name="password" id="" /></label>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}