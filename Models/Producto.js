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
  disponible: {
    type: Boolean,
    default: true,
  },
  categoria: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("Producto", ProductoSchema);
