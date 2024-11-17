import { Router } from "express";
import { publicacionController } from "../controllers/publicacioncontroller.js";
import { usuarioController } from "../controllers/usuariosController.js";
import { imagenesController } from "../controllers/imagenesController.js";
import { pedidosController } from "../controllers/pedidosController.js";
import { agregarProducto, obtenerProductos, actualizarCantidad, eliminarProducto } from '../controllers/carritocontroller.js';
import { agregarFavorito, obtenerFavoritos, eliminarFavorito } from "../controllers/favoritocontroller.js";
import { agregarDireccion, obtenerDireccion, eliminarDireccion } from "../controllers/direccionController.js";
const router = Router()

router.get("/galeria", publicacionController.readGaleria); // Desplegar Galeria
router.post("/publicaciones", publicacionController.agregarPublicacion); // Agregar Publicacion
router.post('/carrito', agregarProducto); // Agregar producto a carrito
router.get('/carrito/:usuario_id', obtenerProductos); //Obtener carrito de ususario
router.put('/carrito', actualizarCantidad); // Modificar cantidad de producto en Carrito
router.delete('/carrito', eliminarProducto); // Eliminar producto de Carrito
router.post("/login", usuarioController.loginUsuario); // Inicio de sesión + TOKEN
router.post("/registro", usuarioController.crearUsuario) // Registro de usuario + TOKEN
router.get("/usuario", usuarioController.tokenUsuario) // Verificacion de TOKEN
router.put("/update_perfil", usuarioController.updateUsuario) // Actualizacion info de Usuario
router.delete("/usuario/:id", usuarioController.borrarUsuario) // Borrar Usuario
router.post("/publicaciones/imagenes", imagenesController.agregarImagenes) // Agregar imagenes a Publicacion
router.put("/publicaciones/imagenes/:id", imagenesController.actualizarImagenes) // Actualizar imagenes de Publicacion
router.put("/publicaciones/borrar_imagenes/:id", imagenesController.borrarImagenes) // Actualizar imagenes con NULL
router.post("/pedidos", pedidosController.agregarPedido) // Agregar producto a tabla de pedidos
router.post('/favoritos', agregarFavorito);
router.get('/favoritos/:usuario_id', obtenerFavoritos);
router.delete('/favoritos/:usuario_id', eliminarFavorito);
router.post('/direccion', agregarDireccion);
router.get('/direccion/:usuario_id', obtenerDireccion);
router.delete('/direccion/:id', eliminarDireccion);


//RUTAS INEXISTENTES
router.get("*", (req, res) => {
    res.status(404).send("Esta ruta no existe");
});
router.post("*", (req, res) => {
    res.status(404).send("Esta ruta no existe");
});
router.put("*", (req, res) => {
    res.status(404).send("Esta ruta no existe");
});
router.delete("*", (req, res) => {
    res.status(404).send("Esta ruta no existe");
});

//Publicaciones
// GET PUBLICACIONES PARA CATALOGO --- LISTO-> Modificado con JOIN para incluir IMG PORTADA
// POST PUBLICACION --- Lista
// GET PUBLICACIONES: ID
// GET PUBLICACIONES DE USUARIO
// DELETE PUBLICACION ID

//Registro de usuarios
// POST REGISTRO USUARIO ---LISTO
// PUT USUARIO ACTUALIZAR ---LISTO
// DELETE USUARIO ---LISTO

//Inicio de sesión de usuarios
// POST LOGIN recibir TOKEN ---LISTO
// GET LOGIN USUARIO validar token ---LISTO

//Imágenes
// POST IMAGENES ---LISTO
// PUT IMAGENES ---LISTO
// GET IMAGENES  USAR JOIN ---listo
// DELETE IMAGENES  ---listo


//Pedidos
// POST PEDIDO

// GET PEDIDO
// PUT PEDIDO(PDTE O ENVIADO)

//Direcciones de pedidos
// POST DIRECCIONES
// GET DIRECCIONES
// DELETE DIRECCIONES

//Comentarios para publicaciones
// POST POST
// GET POST
// DELETE POST

export default router






