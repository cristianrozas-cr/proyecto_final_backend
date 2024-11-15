import { Router } from "express";
import { publicacionController } from "../controllers/publicacionController.js";

const router = Router()

router.get("/galeria", publicacionController.readGaleria);

// GET PUBLICACIONES PARA CATALOGO - LISTO-> Modificado con JOIN para incluir IMG PORTADA
// POST REGISTRO USUARIO
// POST LOGIN recibir TOKEN 
// GET LOGIN USUARIO validar token
// PUT USUARIO ACTUALIZAR
// POST PUBLICACION
// POST IMAGENES ????
// PUT IMAGENES
// GET IMAGENES  USAR JOIN
// DELETE IMAGENES
// GET PUBLICACIONES: ID
// POST FAVORITOS
// DELETE FAVORITOS: ID
// GET PUBLICACIONES DE USUARIO
// DELETE PUBLICACION ID
// POST CARRITO 
// GET CARRITO 
// PUT CARRITO 
// DELETE CARRITO
// POST PEDIDO
// GET PEDIDO
// PUT PEDIDO(PDTE O ENVIADO)
// POST DIRECCIONES
// GET DIRECCIONES
// DELETE DIRECCIONES
// POST POST
// GET POST
// DELETE POST

export default router






