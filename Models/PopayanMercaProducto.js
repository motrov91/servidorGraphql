const mongoose = require("mongoose");
const { model } = require("./Producto");

const PopayanMercaProductoSchema = mongoose.Schema({
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  peso: {
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
});

module.exports = mongoose.model(
  "PopayanMercaProducto",
  PopayanMercaProductoSchema
);
