const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/portfolio", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/profile", require("./routes/profile"));
app.use("/api/education", require("./routes/education"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/research-projects", require("./routes/researchProjects"));
app.use("/api/publications", require("./routes/publications"));
app.use("/api/books", require("./routes/books"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/achievements", require("./routes/achievements"));
app.use("/api/memberships", require("./routes/memberships"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("Portfolio API is running 🚀");
});
// Example API
app.get("/api/message", (req, res) => {
  res.json({ text: "Hello from Express Backend 🚀" });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));