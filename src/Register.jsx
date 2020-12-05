import React from 'react';
import "./App.scss";

export default function Register() {
  return (
    <div className="register">
      <form>
        <label>Which zombie are you? <input type="text" name="username" id="" /></label>
        <label>How will we know it's you? <input type="password" name="password" id="" /></label>
        <label>Are you sure it's you? <input type="password" name="password" id="" /></label>
        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
}