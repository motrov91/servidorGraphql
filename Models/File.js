const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  filename: {
    type: String,
    trim: true,
  },
  mimetype: {
    type: String,
    trim: true,
  },
  path: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("File", FileSchema);
