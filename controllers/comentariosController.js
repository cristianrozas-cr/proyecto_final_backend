import { consultasComentarios } from "../consultas/consultasComentarios.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const JWT_SECRET = process.env.JWT_SECRET;

// Agregar Comentarios
const agregarComentario = async (req, res) => {
    try {
        const publicacion_id = req.params.publicacion_id;
        const usuario_id = req.user.id
        const { texto } = req.body;
        const nuevoPost = await consultasComentarios.addPost({ publicacion_id, usuario_id, texto });
        res.status(201).json({
            message: "Comentario agregado con éxito",
            publicacion: nuevoPost,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudo agregar el Comentario",
            error: error.message,
        });
    }
};

// Obtener Comentarios de Publicacion
const obtenerComentarios = async (req, res) => {

    try {
        const publicacion_id = req.params.publicacion_id;
        const obtenerPost = await consultasComentarios.readPost({ publicacion_id });
        res.status(201).json({
            message: "Comentarios cargados con éxito",
            publicacion: obtenerPost,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudieron cargar los Comentarios",
            error: error.message,
        });
    }
}



// Borrar Comentario
const borrarComentario = async (req, res) => {

    try {
        const { post_id } = req.body
        const publicacion_id = req.params.publicacion_id;
        const usuario_id = req.user.id

        const existingPost = await consultasComentarios.comprobarPost({ post_id, publicacion_id, usuario_id })

        if (existingPost.rowCount === 0) {
            return res.status(400).json({ error: 'El comentario que se desea eliminar no existe o pertenece a otro usuario' });
        }

        const borrarPost = await consultasComentarios.deletePost({ post_id, publicacion_id, usuario_id });

        res.status(201).json({
            message: 'Comentario id:' + `${post_id}` + ' eliminado exitosamente',
            publicacion: borrarPost,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudo borrar el comentario",
            error: error.message,
        });
    }
}

export const comentariosController = { agregarComentario, obtenerComentarios, borrarComentario }