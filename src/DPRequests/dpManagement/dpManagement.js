import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../index";
import DPDisplayTable from "./dpManagementTable";

export default function DPManagement() {
  const [DPs, setDPs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelPromise = false;
    (async () => {
      const queryArgs = { page };

      await axios
        .get(`${url}/calendar/getDPsByPage`, queryArgs)
        .then((res) => {
          if (cancelPromise) return;
          setDPs(res.data.DPs);
        })
        .catch((err) => console.log(err));
    })();
    return () => (cancelPromise = true);
  }, [page]);

  return (
    <>
      <h1>DP Management</h1>
      <div id="dpManagement">
        <DPDisplayTable DPs={DPs} page={page} />
      </div>
    </>
  );
}
