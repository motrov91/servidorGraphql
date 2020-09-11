const { gql } = require("apollo-server");

const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    telefono: String
    direccion: String
    email: String
    rol: String
  }

  type Establecimiento {
    id: ID
    establecimiento: String
    nit: String
    direccion: String
    telefono: String
    horario_atencion: String
    promociona: Boolean
    logo: String
    categoria: String
    productos: [Producto]
  }

  type Servicio {
    id: ID
    imagen: String
    nombre: String
    telefonos: String
    direccion: String
    descripcion: String
    categoria: String
    horario_atencion: String
    cedula_nit: String
  }

  type ProductoPopayanMerca {
    _id: ID
    categoria: String
    nombre: String
    descripcion: String
    precio: String
    peso: String
    imagen: String
  }

  type CategoriasPopayanMerca {
    id: ID
    categoria: String
    imagen: String
    productos: [ProductoPopayanMerca]
  }

  type Query {
    obtenerUsuario: Usuario
    obtenerEstablecimientos: [Establecimiento]
    obtenerEstablecimiento(id: ID!): Establecimiento
    obtenerProductosEstablecimiento(id: ID!): [Producto]
    obtenerServicios: [Servicio]
    obtenerCategoriasPopayanMerca: [CategoriasPopayanMerca]

    #Movil
    obtenerComidasRapidas: [Establecimiento]
  }

  type Token {
    token: String
  }

  type Producto {
    _id: ID
    nombre: String!
    imagen: String
    detalle: String
    precio: Float!
    disponible: Boolean
    categoria: String!
  }

  input UsuarioInput {
    nombre: String!
    telefono: String!
    direccion: String!
    email: String
    password: String!
    rol: String
  }

  input AutenticarInput {
    telefono: String!
    password: String!
  }

  input EstablecimientoInput {
    establecimiento: String!
    nit: String!
    direccion: String
    telefono: String!
    horario_atencion: String!
    logo: String
    categoria: String!
  }

  input ProductoInput {
    nombre: String
    imagen: String
    detalle: String
    precio: Int
    disponible: Boolean
    categoria: String
  }

  type File {
    filename: String!
    mimetype: String!
    path: String!
  }

  input ServicioInput {
    nombre: String!
    telefonos: String!
    direccion: String
    imagen: String
    descripcion: String!
    categoria: String!
    horario_atencion: String
    cedula_nit: String!
  }

  input PopayanMercaCategoriaInput {
    categoria: String
    imagen: String
  }

  input ProductoPopayanMercaInput {
    categoria: String!
    nombre: String!
    descripcion: String
    precio: String
    peso: String
    imagen: String
  }

  type Mutation {
    #USUARIOS
    crearUsuario(input: UsuarioInput): String
    autenticarUsuario(input: AutenticarInput): Token

    #ADMINISTRADOR
    #Establecimientos
    crearEstablecimiento(input: EstablecimientoInput): String
    eliminarEstablecimiento(id: ID!): String
    editarEstablecimiento(id: ID, input: EstablecimientoInput): Establecimiento
    AgregarCategoriasPopayanMerca(input: PopayanMercaCategoriaInput): String

    #ProductosEstablecimientos
    agregarProductoEstablecimiento(id: ID!, input: ProductoInput): Producto

    #Agregar productos popayan merca
    agregarProductoPopayanMerca(
      id: ID!
      input: ProductoPopayanMercaInput
    ): String

    #Directorio de servicios
    crearServicio(input: ServicioInput): String

    singleUpload(file: Upload!): File
    uploadFile(file: Upload!): Boolean
  }
`;

module.exports = typeDefs;
