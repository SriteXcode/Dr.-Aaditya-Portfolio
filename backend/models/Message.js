const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model("Message", messageSchema);
