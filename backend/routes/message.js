const express = require("express");
const Message = require("../models/Message"); // ✅ import Message model

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    console.error("❌ Error fetching messages:", err.message);
    res.status(500).json({ error: "Failed to fetch messages", details: err.message });
  }
});

// Add a new message
router.post("/", async (req, res) => {
  try {
    const newMsg = new Message(req.body);
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    console.error("❌ Error adding message:", err.message);
    res.status(400).json({ error: "Failed to add message", details: err.message });
  }
});

// Update a message
router.put("/:id", async (req, res) => {
  try {
    const updatedMsg = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );
    if (!updatedMsg) return res.status(404).json({ error: "Message not found" });
    res.json(updatedMsg);
  } catch (err) {
    console.error("❌ Error updating message:", err.message);
    res.status(400).json({ error: "Failed to update message", details: err.message });
  }
});

// Delete a message
router.delete("/:id", async (req, res) => {
  try {
    const deletedMsg = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMsg) return res.status(404).json({ error: "Message not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting message:", err.message);
    res.status(400).json({ error: "Failed to delete message", details: err.message });
  }
});

module.exports = router;
