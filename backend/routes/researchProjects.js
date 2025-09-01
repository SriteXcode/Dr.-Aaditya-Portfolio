const express = require("express");
const mongoose = require("mongoose");
const { ResearchProject } = require("../models/Content"); // ✅ import models from Content.js

const router = express.Router();


// Get all research projects
router.get("/", async (req, res) => {
  try {
    const projects = await ResearchProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
   console.error("❌ Error fetching research projects:", err.message);
    res.status(500).json({ error: "Failed to fetch research projects", details: err.message });
  }
});

// Add a new research project
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming data:", req.body); 
    const newProject = new ResearchProject(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: "Failed to add research project", details: err.message });
  }
});

// Update a research project
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await ResearchProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );
    if (!updatedProject) return res.status(404).json({ error: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: "Failed to update research project", details: err.message });
  }
});

// Delete a research project
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await ResearchProject.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete research project", details: err.message });
  }
});

module.exports = router;
