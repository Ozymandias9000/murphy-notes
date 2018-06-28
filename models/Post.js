const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
