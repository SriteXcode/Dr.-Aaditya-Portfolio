// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = connectDB;
