const mongoose = require("mongoose");

const EstablecimientoSchema = mongoose.Schema({
  establecimiento: {
    type: String,
    required: true,
    trim: true,
  },
  nit: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  horario_atencion: {
    type: String,
    trim: true,
  },
  promociona: {
    type: Boolean,
    default: false,
  },
  logo: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/tecnologia-aplicada-octa/image/upload/v1595604211/popayanmerca_w4hduw.png",
  },
  categoria: {
    type: String,
    default: "Establecimiento",
    trim: true,
  },
  productos: {
    type: Array,
  },
});

module.exports = mongoose.model("Establecimiento", EstablecimientoSchema);
