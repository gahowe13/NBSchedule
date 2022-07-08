import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../index";
import ShiftRequest from "./shiftRequest";

export default function ShiftSelection() {
  const [shift, setShift] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {}, [comment]);

  function handleSubmit(e) {
    e.preventDefault();
    const endpoint = `${url}/calendar/shift/8`;
    axios
      .post(endpoint, { shift, comment }, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

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
