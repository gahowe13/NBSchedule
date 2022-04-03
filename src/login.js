import "./styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import url from "./index";
axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [jwt, setJwt] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://${url}.sse.codesandbox.io/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "createusertest@gmail.com",
        password: "testpass123"
      }),
      credentials: "include"
    })
      .then((response) => {
        console.log(response);
        navigate('/calendar')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {});

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
