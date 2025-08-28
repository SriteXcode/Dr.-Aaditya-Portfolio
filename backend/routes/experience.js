const express = require("express");
const router = express.Router();
const experience = require("../data/experience.json");

router.get("/", (req, res) => {
  res.json(experience);
});

module.exports = router;
