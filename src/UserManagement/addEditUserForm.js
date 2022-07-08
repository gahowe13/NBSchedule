import "../styles.css";
import axios from "axios";
import { useState } from "react";
import url from "../index";

import LoadingSpinner from "../Utils/loadingSpinner";

export default function AddEditUserForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  division,
  setDivision,
  role,
  setRole,
  _id,
  set_id,
  editingUser,
  setEditingUser
}) {
  const [loadingState, setLoadingState] = useState("none");

  const possibleDivisions = [
    "Manager",
    "Senior",
    "Records",
    "Front Desk",
    "Correspondence",
    "Records Trainee",
    "Front Desk Trainee"
  ];
  const possibleRoles = ["User", "Admin"];

  function getLoadingState() {
    const loadingText = {
      none: "This is some example text.",
      adding: "Adding user...",
      doneAdding: "User added.",
      editing: "Editing user...",
      doneEditing: "User updated.",
      error: "An error occurred, no change in the database was made."
    };
    return loadingText[loadingState];
  }

  function getLoadingIcon() {
    return loadingState === "adding" || loadingState === "editing";
  }

  function handleCancelEditingUser(e) {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setPassword("");
    setEmail("");
    setDivision("none");
    setRole("none");
    set_id();
    setEditingUser(false);
  }

  async function handleAddEditUser(e) {
    e.preventDefault();

    setLoadingState("loading ");

    if (!_id) {
      setLoadingState("adding");
      await axios
        .post(`${url}/users/create`, {
          firstName,
          lastName,
          email,
          password,
          division,
          role
        })
        .then((response) => {
          setLoadingState("doneAdding");
          console.log(response);
        })
        .catch((error) => {
          setLoadingState("error");
          console.log(error);
        });
    } else {
      await axios
        .post(`${url}/users/update`, {
          firstName,
          lastName,
          email,
          division,
          role,
          _id
        })
        .then((response) => {
          setLoadingState("doneEditing");
          console.log(response);
        })
        .catch((error) => {
          setLoadingState("error");
          console.log(error);
        });
    }
  }

  return (
    <div id="addEditUserFormContainer">
      {editingUser && (
        <button onClick={handleCancelEditingUser} id="cancelEditUserButton">
          Cancel
        </button>
      )}
      <form id="addEditUserForm" onSubmit={handleAddEditUser}>
        <div id="nameInputs">
          <input
            id="firstNameInput"
            className="addEditUserInput"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <input
            className="addEditUserInput"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <input
          className="addEditUserInput"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        {!editingUser && (
          <input
            className="addEditUserInput"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        )}
        <select
          className="addEditUserInput"
          id="division"
          name="division"
          defaultValue="none"
          onChange={(e) => setDivision(e.target.value)}
        >
          <option value={division} disabled hidden>
            Division
          </option>
          {possibleDivisions.map((division, i) => {
            return (
              <option key={i} value={division}>
                {division}
              </option>
            );
          })}
        </select>
        <select
          className="addEditUserInput"
          id="role"
          name="role"
          defaultValue="none"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value={role} disabled hidden>
            Role
          </option>
          {possibleRoles.map((division, i) => {
            return (
              <option key={i} value={division}>
                {division}
              </option>
            );
          })}
        </select>

        <button className="btn btn-primary">
          {editingUser ? "Edit User" : "Add User"}
        </button>
      </form>
      <div className="loadingContainer">
        {getLoadingIcon() && <LoadingSpinner />}
        {getLoadingState()}
      </div>
    </div>
  );
}
