import React from "react";

const WaitDelayNode = ({ data }) => (
  <div style={{ padding: "10px", background: "#ffafcc", borderRadius: "8px" }}>
    <strong>Wait/Delay</strong>
    <p>{data.delay} hours</p>
  </div>
);

export default WaitDelayNode;
