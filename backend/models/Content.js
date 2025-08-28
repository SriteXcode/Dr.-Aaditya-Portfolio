const mongoose = require("mongoose");

const baseSchema = {
  title: String,
  category: String,
  description: String,
  publishedYear: String,
  image: { type: String, default: "/api/placeholder/300/400" },
  document: String,
};

const bookSchema = new mongoose.Schema({
  ...baseSchema,
  publisher: String,
});

const thesisSchema = new mongoose.Schema({
  ...baseSchema,
  university: String,
});

const researchPaperSchema = new mongoose.Schema({
  ...baseSchema,
  journal: String,
});

// export const Book = mongoose.model("Book", bookSchema);
// export const Thesis = mongoose.model("Thesis", thesisSchema);
// export const ResearchPaper = mongoose.model("ResearchPaper", researchPaperSchema);

module.exports = {
  Book: mongoose.model("Book", bookSchema),
  Thesis: mongoose.model("Thesis", thesisSchema),
  ResearchPaper: mongoose.model("ResearchPaper", researchPaperSchema)
};
