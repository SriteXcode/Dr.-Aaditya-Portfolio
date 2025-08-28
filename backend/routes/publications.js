const express = require("express");
const router = express.Router();
const data = require("../data/portfolio.json");

// Journals
router.get("/journals", (req, res) => {
  res.json(data.publications.journals);
});

// Conferences
router.get("/conferences", (req, res) => {
  res.json(data.publications.conferences);
});

module.exports = router;
