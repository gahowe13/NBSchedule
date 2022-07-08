import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../index";
import epochToDate from "../Utils/epochConverter";

export default function ScheduleHeader({ DP }) {
  return (
    <div id="scheduleHeader">
      <div id="division">Records</div>
      <div id="dpLabelContainer">
        <h1 id="dpLabel">
          DP {DP?.dpInfo?.dpNumber} - {DP?.dpInfo?.dpYear}
        </h1>
        <div id="dpDateLabel">{`${epochToDate(
          DP?.dpInfo?.startDate
        )} - ${epochToDate(DP?.dpInfo?.endDate)}`}</div>
      </div>
      <div id="numberOfDaysOff">Days Off: {DP?.dpInfo?.numberOfDaysOff12}</div>
    </div>
  );
}
