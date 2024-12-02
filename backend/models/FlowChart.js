const mongoose = require("mongoose");

const flowchartSchema = new mongoose.Schema({
  nodes: [
    {
      id: { type: String, required: true },
      type: { type: String, required: true },
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
      data: {
        label: { type: String, required: true },
        type: { type: String, required: true },
      },
      width: { type: Number, default: 100 },
      height: { type: Number, default: 100 },
    },
  ],
  edges: [
    {
      source: { type: String, required: true },
      target: { type: String, required: true },
      id: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Flowchart", flowchartSchema);
