import "./styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import url from "./index";

export default function UserManagement() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        `https://${url}.sse.codesandbox.io/users/getall`
      );
      setUsers(data.data.data.data); // <Better way to do this?
    })();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email);
    console.log(password);

    axios
      .post(`https://${url}.sse.codesandbox.io/users/create`, {
        email,
        password
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1 className="headerText">User Management</h1>
      <div className="createUser">
        <h3 className="sectionText">Add User</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="inputText"
            type="email"
            name="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="inputText"
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="btn btn-primary createUserButton">
            Add User
          </button>
        </form>
      </div>
      <div className="userList">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, email, role }) => {
              return (
                <tr key={_id}>
                  <td>{email}</td>
                  <td>{role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
