import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../index";

import CalendarHeader from "./calendarHeader";
import CalendarTiles from "./calendarTiles";

export default function Calendar() {
  const [offDays, setOffDays] = useState({});
  const [dpInfo, setdpInfo] = useState({});
  const [requests, setRequests] = useState([]);
  const [modifiedRequests, setModifiedRequests] = useState([]);

  useEffect(() => {
    let cancelPromise = false;
    (async () => {
      const currentURL = new URL(window.location.href).pathname
        .slice(1)
        .split("/")[1];
      const [dpQuery, yearQuery] = currentURL.split("-");

      await axios
        .get(`${url}/calendar/getDP/${dpQuery}-${yearQuery}`, {
          withCredentials: true
        })
        .then((res) => {
          if (cancelPromise) return;
          console.log(res.data.dpDocument);
          setdpInfo(res.data.dpDocument.dpInfo);
          setRequests(res.data.dpDocument.requests);
          setModifiedRequests(res.data.dpDocument.modifiedRequests);
        })
        .catch((err) => console.log(err));
    })();
    return () => (cancelPromise = true);
  }, [offDays]);

  async function handleSubmit(e) {
    e.preventDefault();

    const DPNum = `${dpInfo.dpNumber}-${dpInfo.dpYear}`;

    await axios
      .post(`${url}/calendar/submit/${DPNum}`, {
        dp: DPNum,
        request: {
          offDays,
          notes: "TEST NOTES"
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return Object.keys(dpInfo).length > 0 ? (
    <div className="calendar" onContextMenu={(e) => e.preventDefault()}>
      <CalendarHeader dpInfo={dpInfo} handleSubmit={handleSubmit} />
      <CalendarTiles
        dpInfo={dpInfo}
        requests={requests}
        modifiedRequests={modifiedRequests}
        offDays={offDays}
        setOffDays={setOffDays}
      />
    </div>
  ) : (
    <h1>DP not found!</h1>
  );
}
