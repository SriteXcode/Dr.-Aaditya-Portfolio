const express = require("express");
const Message = require('../models/Message');
const { Book, Thesis, ResearchPaper } = require('../models/Content');


const router = express.Router();

// 📨 Messages
router.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ date: -1 });
  res.json(messages);
});

router.post("/messages", async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.json(message);
});

router.put("/messages/:id/read", async (req, res) => {
  const updated = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(updated);
});

router.delete("/messages/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// 📚 Dynamic Content Handler
const models = { books: Book, thesis: Thesis, researchPapers: ResearchPaper };

router.get("/:type", async (req, res) => {
  const Model = models[req.params.type];
  if (!Model) return res.status(400).json({ error: "Invalid type" });
  const items = await Model.find().sort({ publishedYear: -1 });
  res.json(items);
});

router.post("/:type", async (req, res) => {
  const Model = models[req.params.type];
  if (!Model) return res.status(400).json({ error: "Invalid type" });
  const item = new Model(req.body);
  await item.save();
  res.json(item);
});

router.put("/:type/:id", async (req, res) => {
  const Model = models[req.params.type];
  if (!Model) return res.status(400).json({ error: "Invalid type" });
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete("/:type/:id", async (req, res) => {
  const Model = models[req.params.type];
  if (!Model) return res.status(400).json({ error: "Invalid type" });
  await Model.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
