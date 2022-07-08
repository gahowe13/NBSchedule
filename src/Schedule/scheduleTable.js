import "../styles.css";
import axios from "axios";
import url from "../index";
import { useState, useEffect } from "react";
import ScheduleTableUserSection from "./scheduleTableUserSection";

export default function ScheduleTable({ DP, setDP, dpRequest, setdpRequest }) {
  const [dateRange, setDateRange] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState({ date: "", user: "" });

  //state: dateRange, users, selectedDate
  //functions: generateDateRange, left/rightClickHandler, processClassName, processScheduleTile

  const dayHeaderKey = {
    0: "S",
    1: "M",
    2: "T",
    3: "W",
    4: "T",
    5: "F",
    6: "S"
  };

  function generateDateRange() {
    if (!DP?.dpInfo?.startDate) return;

    let newDateRange = [];
    const dateifiedStartDate = new Date(DP.dpInfo.startDate);

    for (let i = 0; i < 28; i++) {
      let dateToPush = new Date(dateifiedStartDate.getTime());
      dateToPush.setDate(dateToPush.getDate() + i);
      newDateRange.push(dateToPush);
    }
    return newDateRange;
  }

  function dateStateString(date) {
    return `${date.getMonth() + 1}-${date.getDate()}`;
  }

  function leftClickHandler(dateSelected, userID, requestIndex, offDays) {
    if (
      selectedDate.date &&
      dateSelected.getTime() === selectedDate.date.getTime() &&
      userID === selectedDate.user
    ) {
      setSelectedDate({ date: "", user: "" });
    } else if (offDays[dateStateString(dateSelected)]) {
      setSelectedDate({ date: dateSelected, user: userID });
    } else if (
      !offDays[dateStateString(dateSelected)] &&
      userID === selectedDate.user
    ) {
      const newOffDays = JSON.parse(JSON.stringify(offDays));
      const newDPRequest = JSON.parse(JSON.stringify(dpRequest));

      delete newOffDays[dateStateString(selectedDate.date)];
      newOffDays[dateStateString(dateSelected)] = "x";
      newDPRequest[requestIndex].offDays = { ...newOffDays };

      setdpRequest(newDPRequest);
      setSelectedDate({ date: "", user: "" });
    }
  }

  function rightClickHandler(dateSelected, userID, requestIndex, offDays) {
    let offDayValue = offDays[dateStateString(dateSelected)];
    if (offDayValue) {
      const newOffDays = JSON.parse(JSON.stringify(offDays));
      const newDPRequest = JSON.parse(JSON.stringify(dpRequest));

      newOffDays[dateStateString(dateSelected)] =
        offDayValue !== "+" ? "+" : dateSelected.getDate();
      newDPRequest[requestIndex].offDays = JSON.parse(
        JSON.stringify(newOffDays)
      );

      setdpRequest(newDPRequest);
      setSelectedDate({ date: "", user: "" });
    }
  }

  function processClassName(date, userID, offDays) {
    let className;

    if (date.getDay() === 0 || date.getDay() === 6) className = "weekend";
    else className = "weekday";

    if (selectedDate.date === date && userID === selectedDate.user)
      className += " selectedScheduleDate";

    if (offDays && offDays[dateStateString(date)]) className += " offDay";

    if (offDays && offDays[dateStateString(date)] === "+") {
      className += " plusDay";
    }

    return className + " noselect";
  }

  function processScheduleTile(date, offDays) {
    let tileText = "";
    const offDay = offDays[dateStateString(date)];

    if (offDays && offDay) {
      tileText = offDay === "+" ? "+" : date.getDate();
    }

    return tileText;
  }

  useEffect(() => {
    let cancelPromise = false;
    (async () => {
      await axios
        .get(`${url}/users/getall`, {
          withCredentials: true
        })
        .then((getUsersRes) => {
          if (!cancelPromise) {
            setUsers(getUsersRes.data.data);
            setDateRange(generateDateRange());
          }
        })
        .catch((err) => console.log(err));
    })();
    return () => (cancelPromise = true);
  }, [DP, dpRequest]);

  return (
    <>
      <ScheduleTableUserSection
        DP={DP}
        setDP={setDP}
        dpRequest={dpRequest}
        setdpRequest={setdpRequest}
        dateRange={dateRange}
        setDateRange={setDateRange}
        users={users}
        setUsers={setUsers}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        generateDateRange={generateDateRange}
        leftClickHandler={leftClickHandler}
        rightClickHandler={rightClickHandler}
        processClassName={processClassName}
        processScheduleTile={processScheduleTile}
      />
    </>
  );
}
