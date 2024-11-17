import { Router } from "express";
import { publicacionController } from "../controllers/publicacioncontroller.js";
import { agregarProducto, obtenerProductos, actualizarCantidad, eliminarProducto } from '../controllers/carritocontroller.js';
import {crearUsuario} from '../controllers/usuariosController.js';
import { agregarFavorito, obtenerFavoritos, eliminarFavorito } from "../controllers/favoritocontroller.js";
import { agregarDireccion, obtenerDireccion, eliminarDireccion } from "../controllers/direccionController.js";
const router = Router()

// Desplegar Galeria
router.get("/galeria", publicacionController.readGaleria);
router.post("/publicaciones", publicacionController.agregarPublicacion);
//rutas carrito
router.post('/carrito', agregarProducto);
router.get('/carrito/:usuario_id', obtenerProductos);
router.put('/carrito', actualizarCantidad);
router.delete('/carrito', eliminarProducto);

router.post("/usuario", crearUsuario);


//rutas favoritos
router.post('/favoritos', agregarFavorito);
router.get('/favoritos/:usuario_id', obtenerFavoritos);
router.delete('/favoritos/:usuario_id', eliminarFavorito);


//direcciones
router.post('/direccion', agregarDireccion);
router.get('/direccion/:usuario_id', obtenerDireccion);
router.delete('/direccion/:id', eliminarDireccion);


//Publicaciones
// GET PUBLICACIONES PARA CATALOGO - LISTO-> Modificado con JOIN para incluir IMG PORTADA
// POST PUBLICACION - Lista
// GET PUBLICACIONES: ID
// GET PUBLICACIONES DE USUARIO
// DELETE PUBLICACION ID

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






