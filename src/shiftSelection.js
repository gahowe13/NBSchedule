import React, { useState, useEffect } from "react";
import url from "./index";
import ShiftRequest from "./shiftRequest";

export default function ShiftSelection() {
  const [shift, setShift] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {}, [comment]);

  function processClasses(shiftOfButton) {
    return shiftOfButton === shift
      ? "shiftSelectionButtons activeShift"
      : "shiftSelectionButtons";
  }

  function handleSetShift(shiftOfButton) {
    setShift(shiftOfButton);
  }

  function handleSetComment(e) {
    setComment(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://${url}.sse.codesandbox.io/calendar/shift/8`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dp: 8,
        shift,
        comment
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

  return (
    <div id="shiftSelection">
      <div id="shiftSelectionButtonsContainer">
        <button
          className={processClasses("day")}
          onClick={() => handleSetShift("day")}
        >
          Days
        </button>
        <button
          className={processClasses("night")}
          onClick={() => handleSetShift("night")}
        >
          Nights
        </button>
        <button
          className="shiftSelectionButtons submitButton"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <input type="text" onChange={handleSetComment} />
      </div>
      <ShiftRequest />;
    </div>
  );
}
