import { Router } from "express";
import { publicacionController } from "../controllers/publicacioncontroller.js";
import { pedidosController } from "../controllers/pedidosController.js";
import { agregarProducto, obtenerProductos, actualizarCantidad, eliminarProducto } from '../controllers/carritocontroller.js';
import {crearUsuario} from '../controllers/usuariosController.js';
const router = Router()

// Desplegar Galeria
router.get("/galeria", publicacionController.readGaleria);
router.post("/publicaciones", publicacionController.agregarPublicacion);
router.get("/publicaciones/:id", publicacionController.detallePublicacion);
router.get("/usuarios/perfil/:id", publicacionController.publicacionesUsuarios);
router.delete("/publicaciones/:id", publicacionController.eliminarPublicacion);
router.post('/carrito', agregarProducto);
router.get('/carrito/:usuario_id', obtenerProductos);
router.put('/carrito', actualizarCantidad);
router.delete('/carrito', eliminarProducto);
router.post("/usuario", crearUsuario);
//Publicaciones
// GET PUBLICACIONES PARA CATALOGO - LISTO-> Modificado con JOIN para incluir IMG PORTADA
// POST PUBLICACION - LISTO
// GET PUBLICACIONES: ID - LISTO
// GET PUBLICACIONES DE USUARIO - LISTO
// DELETE PUBLICACION ID - LISTO

//Registro de usuarios
// POST REGISTRO USUARIO
// PUT USUARIO ACTUALIZAR

//Inicio de sesión de usuarios
// POST LOGIN recibir TOKEN 
// GET LOGIN USUARIO validar token

//Imágenes
// POST IMAGENES ????
// PUT IMAGENES
// GET IMAGENES  USAR JOIN
// DELETE IMAGENES

//Favoritos
// POST FAVORITOS
// DELETE FAVORITOS: ID

//Carrito
// POST CARRITO
// GET CARRITO 
// PUT CARRITO 
// DELETE CARRITO

//Pedidos
// POST PEDIDO
router.post("/pedidos", pedidosController.agregarPedido)
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






