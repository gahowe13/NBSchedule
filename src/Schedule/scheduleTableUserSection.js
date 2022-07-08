import "../styles.css";
import axios from "axios";
import url from "../index";
import { useState, useEffect } from "react";

export default function ScheduleTableUserSection({
  DP,
  setDP,
  dpRequest,
  setdpRequest,
  userRole,
  dateRange,
  setDateRange,
  users,
  setUsers,
  selectedDate,
  setSelectedDate,
  generateDateRange,
  leftClickHandler,
  rightClickHandler,
  processClassName,
  processScheduleTile
}) {
  const dayHeaderKey = {
    0: "S",
    1: "M",
    2: "T",
    3: "W",
    4: "T",
    5: "F",
    6: "S"
  };

  return (
    <table id="scheduleTable">
      <thead>
        <tr key="dayOfTheMonthRow">
          <th></th>
          {dateRange &&
            dateRange.map((date) => {
              return (
                <td
                  className={`${processClassName(date)} dayOfTheMonth`}
                  key={`${date.getDay()}-${date.getDate()}`}
                >
                  {date.getDate()}
                </td>
              );
            })}
        </tr>
        <tr className="dayOfTheWeekRow" key="dayOfTheWeekRow">
          <th>DAY WATCH</th>
          {dateRange &&
            dateRange.map((date) => {
              return (
                <td
                  className={`${processClassName(date)} dayOfTheWeek`}
                  key={`${date.getDay()}-${date.getDate()}`}
                >
                  {dayHeaderKey[date.getDay()]}
                </td>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {dpRequest.length > 0 &&
          users.length > 0 &&
          users.map((user) => {
            const daysOffRequested = dpRequest.find(
              (req) => req.user._id === user._id
            );

            const requestIndex = dpRequest.findIndex(
              (req) => req.user._id === user._id
            );

            if (!daysOffRequested) {
              console.log(
                `${user.firstName} ${user.lastName} does not have days off`
              );
              return (
                <tr key={user._id}>
                  <td>{user.lastName}</td>
                </tr>
              );
            }

            const offDays = daysOffRequested.offDays;

            return (
              <tr key={user._id} onContextMenu={(e) => e.preventDefault()}>
                <td>{user.lastName}</td>
                {dateRange &&
                  dateRange.map((date) => {
                    return (
                      <td
                        onContextMenu={() =>
                          rightClickHandler(
                            date,
                            user._id,
                            requestIndex,
                            offDays
                          )
                        }
                        onClick={() =>
                          leftClickHandler(
                            date,
                            user._id,
                            requestIndex,
                            offDays
                          )
                        }
                        className={processClassName(date, user._id, offDays)}
                        key={`${user._id}-${date.getDate()}`}
                      >
                        {processScheduleTile(date, offDays)}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
