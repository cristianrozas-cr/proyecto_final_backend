import { Router } from "express";
import { publicacionController } from "../controllers/publicacionController.js";
import { usuarioController } from "../controllers/usuariosController.js";
import { imagenesController } from "../controllers/imagenesController.js";
import { pedidosController } from "../controllers/pedidosController.js";
import { carritoController } from "../controllers/carritoController.js";
import { agregarFavorito, obtenerFavoritos, eliminarFavorito } from "../controllers/favoritoController.js";
import { comentariosController } from "../controllers/comentariosController.js";
import { middlewares } from "../middlewares.js";

const validarToken = middlewares.validarToken

const router = Router()

//Publicaciones
router.get("/galeria", publicacionController.readGaleria); // Desplegar Galeria
router.post("/publicaciones", publicacionController.agregarPublicacion); // Agregar Publicacion
router.get("/publicaciones/:id", publicacionController.detallePublicacion); //Obtener detalle de una publicacion
router.get("/usuarios/perfil/:id", publicacionController.publicacionesUsuarios); //Obtener todas las publicaciones de un usuario
router.delete("/publicaciones/:id", publicacionController.eliminarPublicacion); //Eliminar una publicacion

//Carrito
router.post('/carrito', carritoController.agregarProducto); // Agregar producto a carrito
router.get('/carrito/:usuario_id', carritoController.obtenerProductos); //Obtener carrito de usuario
router.put('/carrito', carritoController.actualizarCantidad); // Modificar cantidad de producto en Carrito
router.delete('/carrito', carritoController.eliminarProducto); // Eliminar producto de Carrito

//Gestión de usuarios
router.post("/login", usuarioController.loginUsuario); // Inicio de sesión + TOKEN
router.post("/registro", usuarioController.crearUsuario) // Registro de usuario + TOKEN
router.get("/usuario/perfil", validarToken, usuarioController.tokenUsuario) // Perfil de usuario validando TOKEN
router.put("/usuario/update_perfil", validarToken, usuarioController.updateUsuario) // Actualizacion info de Usuario
router.delete("/usuario/borrar/:id", validarToken, usuarioController.borrarUsuario) // Borrar Usuario

//Imágenes
router.post("/publicaciones/imagenes", validarToken, imagenesController.agregarImagenes) // Agregar imagenes a Publicacion
router.put("/publicaciones/imagenes/:id", validarToken, imagenesController.actualizarImagenes) // Actualizar imagenes de Publicacion
router.put("/publicaciones/borrar_imagenes/:id", validarToken, imagenesController.borrarImagenes) // Actualizar imagenes con NULL

//Pedidos
router.post("/pedidos", pedidosController.agregarPedido) // Agregar producto a tabla de pedidos
router.get("/pedidos/:comprador_id", pedidosController.obtenerPedidos) //Obtener todos los pedidos de un usuario
router.put("/pedidos/:id/estado", pedidosController.actualizarEstadoPedido); //Actualizar estado del pedido

//Favoritos
router.post('/favoritos', agregarFavorito);
router.get('/favoritos/:usuario_id', obtenerFavoritos);
router.delete('/favoritos/:usuario_id', eliminarFavorito);

//direcciones
router.post('/direccion', agregarDireccion);
router.get('/direccion/:usuario_id', obtenerDireccion);
router.delete('/direccion/:id', eliminarDireccion);

//Comentarios
router.post("/comentario/:publicacion_id", validarToken, comentariosController.agregarComentario) // Agregar comentario en una publicacion
router.get("/comentario/:publicacion_id", comentariosController.obtenerComentarios) // Cargar comentarios de una publicacion
router.delete("/comentario/:publicacion_id", validarToken, comentariosController.borrarComentario) // Eliminar comentario de ususario

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

export default router

