import React, { useState, useEffect, useMemo } from "react";

export default function CalendarTiles({
  dpInfo,
  requests,
  modifiedRequests,
  offDays,
  setOffDays
}) {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    if (dpInfo) {
      setStart(dpInfo.startDate);
      setEnd(dpInfo.endDate);
    }
  }, [offDays, dpInfo, dpInfo.startDate, dpInfo.endDate]);

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  const results = useMemo(() => {
    let current = new Date(start);
    let currentNewResults = [];

    while (current.getDay() !== 0 && isValidDate(current)) {
      current.setDate(current.getDate() - 1);
    }

    while (current.getTime() <= end) {
      if (current.getTime() < start) {
        currentNewResults.push(null);
      } else {
        currentNewResults.push(new Date(current));
      }

      current.setDate(current.getDate() + 1);
    }
    return currentNewResults;
  }, [end, start]);

  function formatDate(date) {
    if (date) return `${date.getMonth() + 1}-${date.getDate()}`;
  }

  function handleOffDays(date, clickType, index) {
    const formattedDate = formatDate(date);

    if (offDays[formattedDate]) {
      const newOffDays = { ...offDays };
      delete newOffDays[formattedDate];
      setOffDays(newOffDays);
    } else {
      const xOrPlus = clickType === "x" ? "x" : "+";
      if (date) setOffDays({ ...offDays, [formattedDate]: xOrPlus });
    }
  }

  function leftClickHandler(date, index) {
    return () => {
      handleOffDays(date, "x", index);
      return true;
    };
  }

  function rightClickHandler(date, index) {
    return () => {
      handleOffDays(date, "+", index);
      return false;
    };
  }

  function tileGenerator(date, i) {
    let tile = "tile";
    const key = date ? `${date.getMonth()}-${date.getDate()}` : i;
    let newDiv = "";
    if (offDays[formatDate(date)] === "x") {
      newDiv = <div className="xTile"></div>;
    } else if (offDays[formatDate(date)] === "+") {
      newDiv = <div className="plusTile"></div>;
    } else if (key === i) {
      tile = "noTile";
    }
    return (
      <div
        onClick={leftClickHandler(date, i)}
        onContextMenu={rightClickHandler(date, i)}
        className={tile}
        key={key}
      >
        <div className="tileDay">{date?.getDate()}</div>
        {newDiv}
      </div>
    );
  }

  return (
    <div className="calendarRow">
      <div className="dayOfWeekTitle" onContextMenu={(e) => e.preventDefault()}>
        Sun
      </div>
      <div className="dayOfWeekTitle" onContextMenu={(e) => e.preventDefault()}>
        Mon
      </div>
      <div className="dayOfWeekTitle" onContextMenu={(e) => e.preventDefault()}>
        Tue
      </div>
      <div className="dayOfWeekTitle" onContextMenu={(e) => e.preventDefault()}>
        Wed
      </div>
      <div className="dayOfWeekTitle" onContextMenu={(e) => e.preventDefault()}>
        Thu
      </div>
      <div className="dayOfWeekTitle" onContextMenu={(e) => e.preventDefault()}>
        Fri
      </div>
      <div className="dayOfWeekTitle" onContextMenu={(e) => e.preventDefault()}>
        Sat
      </div>
      {results.map((date, i) => tileGenerator(date, i))}
    </div>
  );
}
