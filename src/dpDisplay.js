import React from "react";
import { NavLink } from "react-bootstrap";

export default function DPDisplay() {
  return (
    <>
      <h1>DP Display</h1>
      <div id="dpDisplay">
        <a className="dpPreview selectedDP" href="/">
          <h1>DP#</h1>
        </a>
      </div>
    </>
  );
}
