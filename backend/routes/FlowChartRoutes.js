const express = require("express");
const Flowchart = require("../models/FlowChart");
const router = express.Router();

router.post("/save-flowchart", async (req, res) => {
  try {
    const { nodes, edges } = req.body;

    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
      return res
        .status(400)
        .json({ message: "Invalid data format for nodes or edges" });
    }

    const newFlowchart = new Flowchart({ nodes, edges });
    await newFlowchart.save();

    res.status(201).json({
      message: "Flowchart saved successfully",
      flowchart: newFlowchart,
    });
  } catch (error) {
    console.error("Error saving flowchart:", error);
    res.status(500).json({ message: "Error saving flowchart", error });
  }
});

module.exports = router;
