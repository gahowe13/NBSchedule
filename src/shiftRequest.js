import axios from "axios";
import url from "./index";
import React, { useState, useEffect } from "react";

export default function ShiftRequest() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        `https://${url}.sse.codesandbox.io/users/getall`
      );
      setUsers(data.data.data.data); // <Better way to do this?
    })();
  }, []);

  return (
    <div className="shiftRequest">
      <table id="shiftRequestTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Days</th>
            <th>Nights</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ _id, lastName }) => {
            return (
              <tr key={_id}>
                <td>{lastName}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// useEffect(() => {
//   (async () => {
//     const data = await axios.get(
//       `https://${url}.sse.codesandbox.io/users/getall`
//     );
//     setUsers(data.data.data.data);
//   })();
// }, []);
