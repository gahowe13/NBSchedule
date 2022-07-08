import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../index";
import html2pdf from "html2pdf.js";

import ScheduleBody from "./scheduleBody";
import ScheduleHeader from "./scheduleHeader";

export default function Schedule() {
  const [DP, setDP] = useState({});
  const [dpRequest, setdpRequest] = useState([]);

  useEffect(() => {
    let cancelPromise = false;

    const currentURL = new URL(window.location.href).pathname.slice(1);
    const dpQuery = currentURL.split("/")[1];

    (async () => {
      await axios
        .get(`${url}/calendar/getDP/${dpQuery}`, {
          withCredentials: true
        })
        .then((res) => {
          if (!cancelPromise) {
            setDP(res.data.dpDocument);
            setdpRequest(res.data.dpDocument.requests);
          }
        })
        .catch((err) => console.log(err));
    })();
    return () => (cancelPromise = true);
  }, []);

  function handlePDF() {
    console.log("hello");
  }

  return (
    <div id="schedulePage">
      <button onClick={handlePDF}>Convert to PDF</button>
      <div id="schedule">
        <ScheduleHeader DP={DP} />
        <ScheduleBody
          DP={DP}
          setDP={setDP}
          dpRequest={dpRequest}
          setdpRequest={setdpRequest}
        />
      </div>
    </div>
  );
}
