import "../styles.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../index";
axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [jwt, setJwt] = useState("");

  function handleSubmit(e, submittedEmail, submittedPassword) {
    e.preventDefault();
    fetch(`${url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: submittedEmail,
        password: submittedPassword
      }),
      credentials: "include"
    })
      .then((response) => {
        if (response.status === 200) navigate("/calendar/6-2022");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        <button
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e, email, password)}
        >
          Login
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e, "jsmith@gmail.com", "pass123")}
        >
          Login Dev
        </button>
      </form>
    </div>
  );
}
