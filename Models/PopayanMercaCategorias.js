const mongoose = require("mongoose");

const PopayanMercaCatSchema = mongoose.Schema({
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model(
  "PopayanMercaCategorias",
  PopayanMercaCatSchema
);
