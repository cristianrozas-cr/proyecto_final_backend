import { Router } from "express";
import { publicacionController } from "../controllers/publicacioncontroller.js";
import { usuarioController } from "../controllers/usuariosController.js";
import { agregarProducto, obtenerProductos, actualizarCantidad, eliminarProducto } from '../controllers/carritocontroller.js';

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
router.put("/update_perfil", usuarioController.updateUsuario) //Actualizacion info de Usuario
router.delete("/usuario/:id", usuarioController.borrarUsuario) //Borrar Usuario


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
// DELETE USUARIO

//Inicio de sesión de usuarios
// POST LOGIN recibir TOKEN ---LISTO
// GET LOGIN USUARIO validar token ---LISTO

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






