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

router.get("/galeria", publicacionController.readGaleria); // Desplegar Galeria
router.post("/publicaciones", publicacionController.agregarPublicacion); // Agregar Publicacion
router.post('/carrito', carritoController.agregarProducto); // Agregar producto a carrito
router.get('/carrito/:usuario_id', carritoController.obtenerProductos); //Obtener carrito de usuario
router.put('/carrito', carritoController.actualizarCantidad); // Modificar cantidad de producto en Carrito
router.delete('/carrito', carritoController.eliminarProducto); // Eliminar producto de Carrito
router.post("/login", usuarioController.loginUsuario); // Inicio de sesión + TOKEN
router.post("/registro", usuarioController.crearUsuario) // Registro de usuario + TOKEN
router.get("/usuario/perfil", validarToken, usuarioController.tokenUsuario) // Perfil de usuario validando TOKEN
router.put("/usuario/update_perfil", validarToken, usuarioController.updateUsuario) // Actualizacion info de Usuario
router.delete("/usuario/borrar/:id", validarToken, usuarioController.borrarUsuario) // Borrar Usuario
router.post("/publicaciones/imagenes", validarToken, imagenesController.agregarImagenes) // Agregar imagenes a Publicacion
router.put("/publicaciones/imagenes/:id", validarToken, imagenesController.actualizarImagenes) // Actualizar imagenes de Publicacion
router.put("/publicaciones/borrar_imagenes/:id", validarToken, imagenesController.borrarImagenes) // Actualizar imagenes con NULL
router.post("/pedidos", pedidosController.agregarPedido) // Agregar producto a tabla de pedidos
router.post('/favoritos', agregarFavorito);
router.get('/favoritos/:usuario_id', obtenerFavoritos);
router.delete('/favoritos/:usuario_id', eliminarFavorito);
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
// POST POST --- LISTO
// GET POST  --- LISTO
// DELETE POST --- LISTO

export default router






