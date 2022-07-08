import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../index";
import html2pdf from "html2pdf.js";

import ScheduleTable from "./scheduleTable";

export default function ScheduleBody({ DP, setDP, dpRequest, setdpRequest }) {
  return (
    <div id="scheduleBody">
      <ScheduleTable
        DP={DP}
        setDP={setDP}
        dpRequest={dpRequest}
        setdpRequest={setdpRequest}
      />
    </div>
  );
}
