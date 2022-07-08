import axios from "axios";
import url from "../index";
import React, { useState, useEffect } from "react";

export default function ShiftRequest() {
  const [users, setUsers] = useState([]);
  const [shiftSelections, setShiftSelections] = useState({});

  function mapRequestsToState(requests) {
    const newShiftSelections = {};
    requests.forEach((req) => {
      newShiftSelections[req.user.lastName] = {
        shift: req.shiftRequest.shift,
        comment: req.shiftRequest.comment
      };
    });
    setShiftSelections(newShiftSelections);
  }

  useEffect(() => {
    (async () => {
      try {
        const endpoints = [`${url}/users/getall`, `${url}/calendar/get/8`];
        const data = await axios.all(
          endpoints.map((endpoint) => axios.get(endpoint))
        );
        setUsers(data[0].data.data); // <Where is the 2nd data coming from?
        mapRequestsToState(data[1].data.dpDocument.requests);
      } catch (err) {
        console.log(err);
      }
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
                <td>{shiftSelections[lastName]?.shift === "day" ? "X" : ""}</td>
                <td>
                  {shiftSelections[lastName]?.shift === "night" ? "X" : ""}
                </td>
                <td>{shiftSelections[lastName]?.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// If no optional chaining in the table, it is sometimes undefined?
