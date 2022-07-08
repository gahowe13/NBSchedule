import React, { useState, useEffect } from "react";
import { NavLink } from "react-bootstrap";
import axios from "axios";
import url from "../index";
import DPDisplayTable from "./dpDisplayTable";

export default function DPDisplay() {
  const [DPs, setDPs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const queryArgs = { page };

      await axios
        .get(`${url}/calendar/getDPsByPage`, queryArgs)
        .then((res) => {
          console.log(res.data.DPs);
          setDPs(res.data.DPs);
        })
        .catch((err) => console.log(err));
    })();
    return () => {};
  }, [page]);

  return (
    <>
      <h1>DP Display</h1>
      <div id="dpDisplay">
        <DPDisplayTable DPs={DPs} page={page} />
      </div>
    </>
  );
}
