import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const FlowChart = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [emailDetails, setEmailDetails] = useState({
    to: "",
    subject: "",
    body: "",
    delay: 0,
  });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setEmailDetails(
      node.data.email || { to: "", subject: "", body: "", delay: 0 }
    );
  };

  const addNode = (nodeType) => {
    const nodeDetails = {
      coldEmail: { label: "Cold Email", type: "coldEmail" },
      waitDelay: { label: "Wait/Delay", type: "waitDelay" },
      leadSource: { label: "Lead Source", type: "leadSource" },
    };

    const node = nodeDetails[nodeType];
    if (!node) return;

    setNodes((nds) => [
      ...nds,
      {
        id: `node-${nds.length + 1}`,
        type: "default",
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: node.label, type: node.type, email: emailDetails },
        width: 150,
        height: 100,
      },
    ]);
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const saveEmailDetails = async () => {
    if (selectedNode) {
      try {
        // Send data to the backend
        const response = await fetch(
          "http://localhost:5000/api/email/schedule-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              time: emailDetails.delay, // Delay in hours
              email: emailDetails.to,
              subject: emailDetails.subject,
              body: emailDetails.body,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save email details on the server.");
        }

        // Update node data locally
        setNodes((nds) =>
          nds.map((node) =>
            node.id === selectedNode.id
              ? { ...node, data: { ...node.data, email: emailDetails } }
              : node
          )
        );

        setSelectedNode(null);
        alert("Email details saved successfully!");
      } catch (error) {
        console.error("Error saving email details:", error);
        alert("Failed to save email details. Please try again.");
      }
    } else {
      alert("No node selected to save email details.");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* Button Container */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          onClick={() => addNode("coldEmail")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Cold Email
        </button>
        <button
          onClick={() => addNode("waitDelay")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Wait/Delay
        </button>
        <button
          onClick={() => addNode("leadSource")}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Lead Source
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "150px",
          zIndex: 10,
        }}
      >
        <button
          onClick={saveEmailDetails}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF5722",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Send Email
        </button>
      </div>

      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "20px",
            zIndex: 10,
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h3>Set Email Details for {selectedNode.data.label}</h3>
          <div>
            <label>Email To: </label>
            <input
              type="email"
              name="to"
              value={emailDetails.to}
              onChange={handleEmailChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Subject: </label>
            <input
              type="text"
              name="subject"
              value={emailDetails.subject}
              onChange={handleEmailChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Body: </label>
            <textarea
              name="body"
              value={emailDetails.body}
              onChange={handleEmailChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              rows="4"
            ></textarea>
          </div>
          <div>
            <label>Delay (in hours): </label>
            <input
              type="number"
              name="delay"
              value={emailDetails.delay}
              onChange={handleEmailChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              min="0"
            />
          </div>
          <button
            onClick={saveEmailDetails}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
              borderRadius: "4px",
            }}
          >
            Send Email
          </button>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
