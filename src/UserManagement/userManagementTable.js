import "../styles.css";
import axios from "axios";
import url from "../index";
import { useEffect } from "react";

export default function AddEditUserForm({
  users,
  setUsers,
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
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${url}/users/getall`);
      setUsers(response.data.data);
    })();
    return () => {
      setUsers([]);
    };
  }, [setUsers]);

  function handleEditUser(user) {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPassword("");
    setEmail(user.email);
    setDivision(user.division);
    setRole(user.role);
    set_id(user._id);
    setEditingUser(true);
  }

  return (
    <table id="userManagementTable">
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Division</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ firstName, lastName, email, role, division, _id }) => {
          return (
            <tr
              key={_id}
              onClick={() =>
                handleEditUser({
                  firstName,
                  lastName,
                  email,
                  role,
                  division,
                  _id
                })
              }
            >
              <td>{lastName}</td>
              <td>{firstName}</td>
              <td>{email}</td>
              <td>{division}</td>
              <td>{role}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
