import React from "react";

const LeadSourceNode = ({ data }) => (
  <div style={{ padding: "10px", background: "#d4a5a5", borderRadius: "8px" }}>
    <strong>Lead Source</strong>
    <p>{data.source}</p>
  </div>
);

export default LeadSourceNode;
