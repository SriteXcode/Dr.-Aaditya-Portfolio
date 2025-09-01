const mongoose = require("mongoose");

// Common fields
const baseSchema = {
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  publishedYear: { type: String },
  image: { type: String, default: "/api/placeholder/300/400" },
  document: { type: String }, // e.g., PDF link
};

// Book schema
const bookSchema = new mongoose.Schema({
  ...baseSchema,
  publisher: { type: String, required: true },
});

// Research Project (Paper) schema
const researchProjectSchema = new mongoose.Schema({
  ...baseSchema,
  journal: { type: String }, // optional, in case published in a journal
  impactFactor: { type: Number }, // numeric value
  indexed: { type: [String] }, // ["SCIE", "Scopus", "ESCI", ...]
});

// Prevent OverwriteModelError by reusing existing models
const Book =
  mongoose.models.Book || mongoose.model("Book", bookSchema);

const ResearchProject =
  mongoose.models.ResearchProject ||
  mongoose.model("ResearchProject", researchProjectSchema);

module.exports = {
  Book,
  ResearchProject,
};
