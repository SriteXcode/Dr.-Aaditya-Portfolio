const express = require("express");
const router = express.Router();
const data = require("../data/portfolio.json");

router.get("/", (req, res) => {
  res.json(data.memberships);
});

module.exports = router;
