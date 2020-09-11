const mongoose = require("mongoose");

const ServicioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  cedula_nit: {
    type: String,
    required: true,
    trim: true,
  },
  telefonos: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  imagen: {
    type: String,
    default:
      "https://res.cloudinary.com/tecnologia-aplicada-octa/image/upload/v1595604211/popayanmerca_w4hduw.png",
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
  horario_atencion: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Servicio", ServicioSchema);
