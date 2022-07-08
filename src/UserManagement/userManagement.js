import "../styles.css";
import React, { useState } from "react";

import AddEditUserForm from "./addEditUserForm";
import UserManagementTable from "./userManagementTable";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [division, setDivision] = useState("none");
  const [role, setRole] = useState("none");
  const [_id, set_id] = useState(0);
  const [editingUser, setEditingUser] = useState(false);

  return (
    <div>
      <h1 className="headerText">User Management</h1>
      <div id="userManagement">
        <div className="userManagementSection">
          <h2 className="sectionText">
            {editingUser ? "Edit User" : "Add User"}
          </h2>

          <AddEditUserForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
            division={division}
            setDivision={setDivision}
            role={role}
            setRole={setRole}
            _id={_id}
            set_id={set_id}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
          />
        </div>
        <div className="userList userManagementSection">
          <h2 className="sectionText">Users</h2>
          <UserManagementTable
            users={users}
            setUsers={setUsers}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            division={division}
            setDivision={setDivision}
            role={role}
            setRole={setRole}
            _id={_id}
            set_id={set_id}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
          />
        </div>
      </div>
    </div>
  );
}
