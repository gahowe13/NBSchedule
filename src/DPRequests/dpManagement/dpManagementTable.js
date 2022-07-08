import React, { useState } from "react";
import DPManagementDisplayTable from "./dpManagementDisplayTable";
import DPManagementEditTable from "./dpManagementEditTable";

export default function DPManagementTable({ DPs, page }) {
  const [editDPButtonStyle, setEditDPButtonStyle] = useState("");
  const [editingDP_id, setEditingDP_id] = useState("");
  const [status, setStatus] = useState("");
  const statusEnum = ["In Progress", "Archived", "Disabled"];

  return DPs.map(({ dpInfo, _id }) => {
    return _id === editingDP_id ? (
      <DPManagementEditTable
        dpInfo={dpInfo}
        _id={_id}
        editingDP_id={editingDP_id}
        setEditingDP_id={setEditingDP_id}
        editDPButtonStyle={editDPButtonStyle}
        setEditDPButtonStyle={setEditDPButtonStyle}
        status={status}
        setStatus={setStatus}
        statusEnum={statusEnum}
        key={`e-${_id}`}
      />
    ) : (
      <DPManagementDisplayTable
        dpInfo={dpInfo}
        _id={_id}
        editingDP_id={editingDP_id}
        setEditingDP_id={setEditingDP_id}
        editDPButtonStyle={editDPButtonStyle}
        setEditDPButtonStyle={setEditDPButtonStyle}
        key={`d-${_id}`}
      />
    );
  });
}
