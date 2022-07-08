import React, { useState } from "react";
import epochToDate from "../../Utils/epochConverter";

export default function DPManagementEditTable({
  dpInfo,
  _id,
  editingDP_id,
  setEditingDP_id,
  editDPButtonStyle,
  setEditDPButtonStyle,
  status,
  setStatus,
  statusEnum
}) {
  return (
    <>
      <div
        className="dpManagementTable"
        onMouseEnter={(e) => setEditDPButtonStyle(_id)}
        onMouseLeave={(e) => setEditDPButtonStyle("")}
      >
        <div className="dpManagementHeaderRow">
          EDITING DP {dpInfo.dpNumber}-{dpInfo.dpYear}
        </div>
        <div className="dpManagementItem">
          {"Status: "}
          <select
            className="dpmanagementEditInput"
            id="division"
            name="division"
            defaultValue="none"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={dpInfo.status} disabled hidden>
              Division
            </option>
            {statusEnum.map((statusE, i) => {
              return (
                <option key={i} value={statusE}>
                  {statusE}
                </option>
              );
            })}
          </select>
        </div>
        <div className="dpManagementItem">
          {epochToDate(dpInfo.startDate)} - {epochToDate(dpInfo.endDate)}
        </div>
        <div className="dpManagementItem">
          Shift due date: {epochToDate(dpInfo.shiftDueDate)}
        </div>
        <div className="dpManagementItem">
          Schedule due date: {epochToDate(dpInfo.scheduleDueDate)}
        </div>
        <div className="dpManagementItem">
          3-12: {dpInfo.numberOfDaysOff12} days off
        </div>
        <div className="dpManagementItem">
          4-10: {dpInfo.numberOfDaysOff10} days off
        </div>
      </div>
      <button style={{ display: "inline" }}>This is a button.</button>
    </>
  );
}
