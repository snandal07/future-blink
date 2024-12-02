import React from "react";

const ColdEmailNode = ({ data }) => (
  <div style={{ padding: "10px", background: "#a2d2ff", borderRadius: "8px" }}>
    <strong>Cold Email</strong>
    <p>{data.label}</p>
  </div>
);

export default ColdEmailNode;
