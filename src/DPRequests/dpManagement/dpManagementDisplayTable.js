import React, { useState } from "react";
import epochToDate from "../../Utils/epochConverter";

export default function DPManagementDisplayTable({
  dpInfo,
  _id,
  editingDP_id,
  setEditingDP_id,
  editDPButtonStyle,
  setEditDPButtonStyle
}) {
  return (
    <>
      <div
        className="dpManagementTable"
        onMouseEnter={(e) => setEditDPButtonStyle(_id)}
        onMouseLeave={(e) => setEditDPButtonStyle("")}
      >
        <div className="dpManagementHeaderRow">
          DP {dpInfo.dpNumber}-{dpInfo.dpYear}
          <button
            className="dpManagementEditDPButton"
            onClick={(e) => {
              setEditingDP_id(_id);
            }}
            style={
              _id === editDPButtonStyle
                ? { display: "inline" }
                : { display: "none" }
            }
          >
            Edit DP
          </button>
        </div>
        <div className="dpManagementItem">Status: {dpInfo.dpStatus}</div>
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
    </>
  );
}
