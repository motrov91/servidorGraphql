const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
    trim: true,
    //required: true,
    default:
      "https://res.cloudinary.com/tecnologia-aplicada-octa/image/upload/v1595604211/popayanmerca_w4hduw.png",
  },
  detalle: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  promocion: {
    type: Number,
    trim: true,
    default: 0,
  },
  categoria: {
    type: String,
    trim: true,
    required: true,
  },
  subcategoria: {
    type: String,
    trim: true,
  },
  seccion: {
    type: String,
    trim: true,
  },
  establecimiento: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Establecimiento",
  },
});

module.exports = mongoose.model("Productos", ProductoSchema);
