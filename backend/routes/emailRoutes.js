const express = require("express");
const agenda = require("../agenda");

const router = express.Router();

router.post("/schedule-email", async (req, res) => {
  const { time, email, subject, body } = req.body;

  try {
    const currentTime = new Date();

    const selectedTimeInMillis = time * 60 * 60 * 1000;

    const istOffset = 5.5 * 60 * 60 * 1000;
    const nextRunAt = new Date(
      currentTime.getTime() + selectedTimeInMillis + istOffset
    );

    console.log("Email scheduled for:", nextRunAt);

    await agenda.schedule(nextRunAt, "send email", {
      to: email,
      subject,
      body,
    });

    res.status(200).send("Email scheduled successfully!");
  } catch (err) {
    console.error("Failed to schedule email:", err);
    res.status(500).send("Failed to schedule email.");
  }
});

module.exports = router;
