const express = require("express");
const router = express.Router();

// Dummy timetable route
router.get("/timetable", (req, res) => {
  res.json([
    { subject: "Math", lecture: "Dr. Rao", time: "9:00 AM" },
    { subject: "Physics", lecture: "Dr. Sharma", time: "11:00 AM" }
  ]);
});

// Complaint route
router.post("/complaint", (req, res) => {
  const { text } = req.body;
  console.log("Complaint received:", text);
  res.json({ message: "Complaint submitted successfully" });
});

module.exports = router;