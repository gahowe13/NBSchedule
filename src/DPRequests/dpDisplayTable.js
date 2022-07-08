import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import epochToDate from "../Utils/epochConverter";

export default function DPDisplayTable({ DPs, page }) {
  const navigate = useNavigate();

  return (
    <table id="dpDisplayTable">
      <thead>
        <tr>
          <th>DP Number</th>
          <th>Date Range</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {DPs.map(({ dpInfo, _id }) => {
          return (
            dpInfo.dpStatus !== "Disabled" && (
              <tr
                className="dpDisplayTableRow"
                key={_id}
                onClick={() =>
                  navigate(`/calendar/${dpInfo.dpNumber}-${dpInfo.dpYear}`)
                }
              >
                <td>{`${dpInfo.dpNumber}-${dpInfo.dpYear}`}</td>
                <td>{`${epochToDate(dpInfo.startDate)} - ${epochToDate(
                  dpInfo.endDate
                )}`}</td>
                <td>{`${dpInfo.dpStatus}`}</td>
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
}
