import { Router } from "express";
import { publicacionController } from "../controllers/publicacioncontroller.js";

const router = Router()

// Desplegar Galeria
router.get("/galeria", publicacionController.readGaleria);
router.post("/publicaciones", publicacionController.agregarPublicacion);

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






