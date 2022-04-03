import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router";
import { tileGenerator } from "./helperFunctions";
import url from "./index";
//import Tile from "./tile"

export default function Calendar() {
  //let navigate = useNavigate();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [offDays, setOffDays] = useState({});
  const results = [];

  function setStartAndEndDays() {
    const calendar = document.querySelector(".calendar");
    calendar.addEventListener("contextmenu", (e) => e.preventDefault());

    fetch(`https://${url}.sse.codesandbox.io/calendar`, {
      credentials: "include"
    }).then((res) =>
      res.json().then((data) => {
        setStart(data.start);
        setEnd(data.end);
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://${url}.sse.codesandbox.io/calendar/submit/5`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dp: 8,
        request: {
          email: "test2@gmail.com",
          offDays,
          notes: "NEW NEW test notes"
        }
      }),
      credentials: "include"
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setStartAndEndDays();
  }, [offDays]);

  let current = new Date(start);

  while (current.getDay() !== 0) {
    current.setDate(current.getDate() - 1);
  }

  while (current.getTime() <= end) {
    if (current.getTime() < start) {
      results.push(null);
    } else {
      results.push(new Date(current));
    }

    current.setDate(current.getDate() + 1);
  }

  return (
    <div className="calendar">
      <button className="submitButton" onClick={handleSubmit}>
        SUBMIT
      </button>
      <div className="calendarRow">
        <div className="dayOfWeekTitle">Sun</div>
        <div className="dayOfWeekTitle">Mon</div>
        <div className="dayOfWeekTitle">Tue</div>
        <div className="dayOfWeekTitle">Wed</div>
        <div className="dayOfWeekTitle">Thu</div>
        <div className="dayOfWeekTitle">Fri</div>
        <div className="dayOfWeekTitle">Sat</div>
        {results.map((date, i) => tileGenerator(offDays, setOffDays, date, i))}
      </div>
    </div>
  );
}
