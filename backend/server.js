require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectdb = require('./utils/mongodb');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
// const mongoose = require("mongoose");


connectdb()

// Routes
app.use("/api/profile", require("./routes/profile"));
app.use("/api/education", require("./routes/education"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/research_projects", require("./routes/researchProjects"));
app.use("/api/publications", require("./routes/publications"));
app.use("/api/books", require("./routes/books"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/achievements", require("./routes/achievements"));
app.use("/api/memberships", require("./routes/memberships"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/messages", require("./routes/message"));
app.get("/", (req, res) => {
  res.send("Portfolio API is running 🚀");
});

// Example API
app.get("/api/message", (req, res) => {
  res.json({ text: "Hello from Express Backend 🚀" });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));