const fileSystem = require("fs");

const Usuario = require("../Models/Usuario");
const Establecimiento = require("../Models/Establecimiento");
const Productos = require("../Models/Productos");
const Servicio = require("../Models/Servicio");
const PopayanMercaCategorias = require("../Models/PopayanMercaCategorias");
const PopayanMercaProducto = require("../Models/PopayanMercaProducto");
const File = require("../Models/File");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { createWriteStream, mkdir } = require("fs");

const cloudinary = require("cloudinary");

require("dotenv").config({ path: "variables.env" });

//Credenciales cloudinary
cloudinary.config({
  cloud_name: "tecnologia-aplicada-octa",
  api_key: "392792575655893",
  api_secret: "8iQ0ASIr6lRkyYstUjd2mnrlYL4",
});

//Crea y firma un JWT
//En dado caso de pasarle un tiempo de expiracion irá como un tercer parametro
const crearToken = (usuario, secreta) => {
  //console.log(usuario);
  const { id, nombre, direccion, telefono, rol } = usuario;

  return jwt.sign({ id, nombre, direccion, telefono, rol }, secreta);
};

//almacena imagenes
/* const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;
  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path, filename, mimetype }))
      .on("error", reject)
  );
};
const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
}; */

const resolvers = {
  Query: {
    obtenerUsuario: async (_, {}, ctx) => {
      return ctx.usuario;
    },
    obtenerEstablecimientos: async (_, {}, ctx) => {
      try {
        const establecimientos = await Establecimiento.find({});
        return establecimientos;
      } catch (error) {}
      console.log(error);
    },
    obtenerEstablecimiento: async (_, { id }, ctx) => {
      //Verificar si existe
      let establecimiento = await Establecimiento.findById(id);

      if (!establecimiento) {
        throw new Error("El establecimiento no existe");
      }

      return establecimiento;
    },
    obtenerProductosEstablecimiento: async (_, { id }, ctx) => {
      let prod = await Productos.find({ establecimiento: id });

      return prod;
    },
    obtenerProductoEstablecimiento: async (_, { id }, ctx) => {
      let producto = await Productos.findOne({ _id: id });
      return producto;
    },
    obtenerEstablecimientosComidasRapidas: async (_, {}, ctx) => {
      const rapidas = await Establecimiento.find({
        categoria: "Comidas Rapidas",
      });

      return rapidas;
    },
    obtenerServicios: async (_, {}, ctx) => {
      const servicios = await Servicio.find();
      return servicios;
    },
    obtenerCategoriasPopayanMerca: async (_, {}, ctx) => {
      const categorias = await PopayanMercaCategorias.find();
      return categorias;
    },
    obtenerProductosPopayanMerca: async (_, {}, ctx) => {
      const productosPm = await Productos.find({categoria : "Popayan Merca" })
      return productosPm;
    },
    obtenerEstablecimientosPromocionados: async (_, {}, ctx) => {
      const promocionados = await Establecimiento.find({ promociona: true });
      return promocionados;
    },
    obtenerPromocionadosPopayanMerca: async (_, {}, ctx) => {
      const promosPM = await Productos.find({categoria: "Popayan Merca", promocion:{$gt:0}})
      return promosPM;
    }
  },

  Mutation: {
    crearUsuario: async (_, { input }, ctx) => {
      const { telefono, password } = input;

      const existeUsuario = await Usuario.findOne({ telefono });

      if (existeUsuario) {
        throw new Error("El usuario ya esta registrado");
      }

      try {
        //Hash password
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);

        //Registrar nuevo usuario
        const nuevoUsuario = new Usuario(input);
        nuevoUsuario.save();

        return "Usuario creado con exito";
      } catch (error) {
        console.log(error);
      }
    },
    autenticarUsuario: async (_, { input }, ctx) => {
      const { telefono, password } = input;

      //Verificar si el usuario existe
      const existeUsuario = await Usuario.findOne({ telefono });

      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }

      //Revisar si el password es correcto
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );

      if (!passwordCorrecto) {
        throw new Error("Contraseña incorrecta");
      }

      //Dar acceso a la app
      //Al enviar los parametros, despues de la palabra secreta podemos pasar el tiempo de expiracion del token, '2hr'
      return {
        token: crearToken(existeUsuario, process.env.SECRETA),
      };
    },
    //Administrador
    crearEstablecimiento: async (_, { input }, ctx) => {
      const { nit, telefono } = input;

      //Verificar si ya hay una cuenta creada con ese nit
      const existeEstablecimiento = await Establecimiento.findOne({
        $or: [{ nit }, { telefono }],
      });

      if (existeEstablecimiento) {
        throw new Error("El nit o cedula ya esta registrado");
      }

      const nuevoEstablecimiento = new Establecimiento(input);

      //Almacenar en la bd
      await nuevoEstablecimiento.save();

      return "Establecimiento creado con exito";
    },
    eliminarEstablecimiento: async (_, { id }, ctx) => {
      //Verificar si existe
      let establecimiento = await Establecimiento.findById(id);

      if (!establecimiento) {
        throw new Error("El establecimiento no existe");
      }

      //Eliminar establecimiento
      await Establecimiento.findOneAndDelete({ _id: id });

      return "Establecimiento eliminado!";
    },
    editarEstablecimiento: async (_, { id, input }, ctx) => {
      //Verificar si existe
      let establecimiento = await Establecimiento.findById(id);

      if (!establecimiento) {
        throw new Error("El establecimiento no existe");
      }

      //guardar el establecimiento
      establecimiento = await Establecimiento.findByIdAndUpdate(
        { _id: id },
        input,
        { new: true }
      );

      return establecimiento;
    },
    editarProductoEstablecimiento: async (_, { id, input }, ctx) => {
      console.log("id", id);
      console.log("input", input);
      let producto = await Productos.findById(id);

      if (!producto) {
        throw new Error("No existe el producto");
      }

      producto = await Productos.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });

      return "El producto se ha actualizado";
    },
    agregarProductoEstablecimiento: async (_, { input }, ctx) => {
      const producto = new Productos(input);
      producto.save();

      return "El producto ha sido creado";
    },
    //Directorio de servicios
    crearServicio: async (_, { input }, ctx) => {
      const { cedula_nit } = input;

      //Verificar si ya se encuentra registrado el servicio con el nit o la cedula
      const existeServicio = await Servicio.findOne({ cedula_nit });

      if (existeServicio) {
        throw new Error(
          "El servicio ya se encuentra registrado en la base de datos"
        );
      }
      const nuevoServicio = new Servicio(input);

      //Almacenar en la base de datos
      await nuevoServicio.save();

      return "Servicio creado con exito";
    },
    //Popayan merca
    AgregarCategoriasPopayanMerca: async (_, { input }, ctx) => {
      const nuevaCategoria = new PopayanMercaCategorias(input);
      nuevaCategoria.save();
      return "Categoria creada con éxito";
    },
    //Agregar Productos popayan merca
    agregarProductoPopayanMerca: async (_, { id, input }, ctx) => {
      let categoria = await PopayanMercaCategorias.findById(id);
      const producto = new PopayanMercaProducto(input);
      categoria.productos.push(producto);
      categoria = await PopayanMercaCategorias.findByIdAndUpdate(
        { _id: id },
        categoria,
        { new: true }
      );
      return "El producto se ha creado con exito";
    },
    singleUpload: async (parent, args) => {
      return args.file.then((file) => {
        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.createReadStream() is a readable node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html

        console.log(file);

        return file;
      });
    },
    uploadFile: async (_, { file }) => {
      // Creates an images folder in the root directory
      mkdir("images", { recursive: true }, (err) => {
        if (err) throw err;
      });
      // Process upload
      const upload = await processUpload(file);
      console.log(upload);
      return upload;
    },
  },
};
module.exports = resolvers;
