const express = require("express");
const { Book } = require("../models/Content"); // ✅ import the model directly

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
   console.error("❌ Error fetching books:", err.message);
    res.status(500).json({ error: "Failed to fetch books", details: err.message });
  }
});

// Add a new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to add book" });
  }
});

// Update a book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // returns updated doc
    );
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to update book" });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete book" });
  }
});

module.exports = router;
